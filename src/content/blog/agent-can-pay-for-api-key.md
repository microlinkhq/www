---
title: 'An Agent That Can Pay for Its Own API Key'
subtitle: 'The missing loop between discovering a tool and becoming its customer'
description: 'A design for agent-driven plan selection, checkout, human approval, and one-time API-key recovery through MCP and device authorization.'
authors:
  - kiko
date: '2026-09-17'
---

An agent can discover an API, read its documentation, and decide that it fits the task. Then the automation stops.

A person has to open the site, find the plan, create an account, pay, copy an API key, and paste it back into the agent's environment. The agent is capable of using the product but incapable of becoming a customer.

We have been closing that loop for Microlink.

> This post describes the complete design. Device authorization is still under review and is not deployed yet.

## The full loop

The target experience is simple:

1. The agent lists Microlink plans over MCP.
2. It presents the plan and cost to the person.
3. After the person chooses, it creates a Stripe Checkout Session with an idempotency key.
4. The person reviews and pays in Stripe Checkout.
5. The agent polls until Microlink has provisioned the subscription and key id.
6. If the key needs to be recovered, the agent starts device authorization.
7. The person signs in by email, sees masked keys, selects one, and approves.
8. The agent redeems the approval once and receives only that key.

The person remains in the money and credential decisions. The agent owns the plumbing around them.

## Checkout without pretending payment is autonomous

Microlink exposes three account-lifecycle tools through MCP:

```text
microlink_list_plans
microlink_create_checkout_session
microlink_get_checkout_session
```

The create call takes an email, a plan id, an optional key label, and an `Idempotency-Key`. It returns a Stripe-hosted checkout URL. Status is derived from Stripe rather than copied into a separate onboarding database:

- `open`: Checkout has not completed.
- `expired`: the unpaid Checkout Session expired.
- `paid`: Stripe has payment, while key provisioning is still running.
- `ready`: the subscription item has the provisioned key id.

The endpoint never returns key material. Checkout creates the commercial relationship; device authorization handles access to an existing secret.

This distinction matters. Paying and releasing a credential are different capabilities and should not be collapsed into one bearer URL.

## Why device authorization

The existing `microlink login` flow begins in a browser and returns to a listener on `127.0.0.1`. That works for a CLI running on the same computer as the person's browser. It does not work for a remote agent.

Device authorization reverses the connection. The agent gets a public approval URL and a transaction id. The person can open the URL in any browser. The agent waits on the transaction rather than receiving a localhost callback.

The proposed flow starts anonymously:

```http
POST /api/v1/connect/device
```

It returns a transaction id, approval URL, expiration, and polling interval. It does not accept an email or account identifier.

That omission is deliberate. An unauthenticated "does this email have an account?" endpoint would become a customer-enumeration oracle. The sign-in attempt is the safe probe because it involves the email owner.

## Approval owns account selection

The approval page uses the person's authenticated Microlink session. After the email-link sign-in, it lists the account's API keys in masked form.

The person chooses exactly one key and approves or denies the transaction. The server verifies that the selected key belongs to that signed-in account. The full key is never rendered into the approval page.

This keeps the agent's initial request intentionally weak. It cannot name a victim, select another account, or ask the browser to disclose all keys.

## One approval, one redemption

After approval, polling changes from `pending` to `approved` and returns a short-lived redemption token. The token is bound to the transaction, carries a dedicated audience and random identifier, and expires with the transaction.

The agent then calls:

```http
POST /api/v1/connect/device/:transactionId/redeem
```

A successful redemption returns only the selected key and moves the transaction to `redeemed`. A second redemption is rejected.

That last property requires state. A signed token alone remains replayable until it expires. The design uses Microlink's existing shared cache and lock primitive for the smallest one-time state machine:

```text
pending -> approved | denied -> redeemed
```

The transaction expires after ten minutes. Creation, polling, and redemption are rate-limited.

## MCP is the product surface

HTTP endpoints make the flow possible. MCP makes it legible to an agent.

The tool descriptions can tell the model when to ask the person, how often to poll, which state is provisional, and what never belongs in conversation. Errors can carry the exact next step. The agent no longer has to reverse-engineer a dashboard intended for people.

The result is a useful division of labor:

- the agent discovers the product, compares plans, creates the checkout, watches provisioning, and stores the approved credential;
- the person chooses the spend, completes payment, authenticates, and approves which key leaves the account;
- Microlink binds each transition and exposes only the minimum secret.

## Agents becoming customers

Agent-ready does not mean removing the person from consequential choices. It means removing all the mechanical work around those choices.

An agent should be able to reach the point where one human approval unlocks the next bounded capability. Payment has its approval. Credential release has another. Neither requires copying secrets through chat.

When device authorization ships, Microlink will have the complete loop: discover, choose, pay, provision, approve, redeem, use.

That is what it means for an API to be ready for agents as customers, not just callers.

## Related work

- [Microlink MCP](/integrations/mcp)
- [MCP documentation](/docs/api/getting-started/mcp)
- [Microlink on GitHub](https://github.com/microlinkhq/microlink)
