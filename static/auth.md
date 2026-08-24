# Agent authentication on microlink.io

How an agent gets credentials for the Microlink API, and which credentials
actually exist. Most of Microlink needs none: every documented endpoint answers
anonymous requests, and a key only raises the quota. This file follows the
auth.md convention (WorkOS draft: https://workos.com/auth-md/docs/auth-md).

## Discover

Everything an agent needs to call Microlink is published as a file:

- OpenAPI 3.1 description: https://microlink.io/openapi.json
- API catalog (RFC 9727): https://microlink.io/.well-known/api-catalog
- Agentic resource catalog: https://microlink.io/.well-known/ai-catalog.json
- MCP server card: https://microlink.io/.well-known/mcp
- Site index for agents: https://microlink.io/llms.txt

The OpenAPI document declares both servers and the single security scheme, so a
spec-driven client needs nothing from this page. The scheme is an API key sent
as the `x-api-key` request header.

## Pick a method

There is one credential and one alternative to having one.

**No credential.** `https://api.microlink.io` answers unauthenticated requests
with a soft limit of 25 requests per day per IP address. Nothing to register,
nothing to store. Use this to try the API, and for low-volume automation.

**API key.** `https://pro.microlink.io` answers authenticated requests with the
quota of the plan the key belongs to. Send the key as the `x-api-key` header.

There is no OAuth 2.0, no OpenID Connect, no dynamic client registration and no
token endpoint. Microlink does not issue tokens to software agents on its own
authority: a key belongs to the person or company that bought the plan.

## Register

Registration is a self-serve purchase at https://microlink.io/pricing. Pick a
plan, pay, and the key is shown in the confirmation and emailed to the address
used at checkout. There is no free tier that issues a key — the free tier is
the keyless endpoint above.

An agent cannot complete this step by itself. If you are an agent and you need
a key, ask the human you are acting for to buy a plan, or stay on
`api.microlink.io` and keep inside 25 requests per day.

## Claim

There is nothing to claim. The key is delivered at purchase and does not
expire, rotate on a schedule, or need to be exchanged for a short-lived token.
Treat the key itself as the credential.

## Use the credential

Send it as a request header against the pro endpoint:

```
curl 'https://pro.microlink.io/?url=https%3A%2F%2Fexample.com' \
  -H 'x-api-key: YOUR_API_KEY'
```

Confirm it was accepted by reading `x-pricing-plan: pro` on the response. Every
response also carries `x-rate-limit-limit`, `x-rate-limit-remaining` and
`x-rate-limit-reset` (UTC epoch seconds), so a client can pace itself without
guessing.

Never put the key in a URL, a query string, or client-side code. For browser
traffic, put it behind a proxy that allowlists your own domains:
https://github.com/microlinkhq/proxy

## Errors

Errors come back as JSON with a stable `code` field. The two that concern
credentials:

- `EAUTH` — the key is missing or invalid on the pro endpoint. Check that the
  header is spelled `x-api-key` and that the key was copied whole.
  https://microlink.io/docs/api/basics/error-codes
- `ERATE` — the quota for the window is spent. HTTP 429. Wait until
  `x-rate-limit-reset` before retrying; retrying sooner will not succeed. On
  `api.microlink.io` this means the 25/day anonymous limit was reached.
  https://microlink.io/docs/api/basics/error-codes

The full list of codes, each with its cause and its fix, is at
https://microlink.io/docs/api/basics/error-codes and enumerated in
https://microlink.io/openapi.json

## Revocation

Keys are managed by a human, not by an API. To rotate a key, revoke a leaked
one, or close an account, write to hello@microlink.io from the address that
owns the plan, or use https://microlink.io/contact. Report a suspected
compromise through https://microlink.io/security

Revoking a key takes effect immediately: subsequent requests answer `EAUTH`.
The keyless endpoint keeps working, at 25 requests per day per IP.
