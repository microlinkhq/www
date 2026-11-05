# Microlink auth.md

How an AI agent gets and uses credentials for [Microlink API](https://microlink.io/docs/api/getting-started/overview).

## Audience

Any agent, script, or MCP client that calls Microlink API on behalf of a human or an organization.

## Methods

Microlink API authenticates with an API key. There is no OAuth flow.

| Method | Endpoint | Limit | Registration |
| --- | --- | --- | --- |
| Anonymous | `https://api.microlink.io` | 5 requests per day | None |
| Free API key | `https://pro.microlink.io` | 25 requests per day | [dashboard.microlink.io/signup](https://dashboard.microlink.io/signup) |
| Paid API key | `https://pro.microlink.io` | Plan quota | [microlink.io/pricing](https://microlink.io/pricing) |

## Registration

1. A human signs up at [dashboard.microlink.io/signup](https://dashboard.microlink.io/signup). The free API key is issued on signup.
2. To buy a paid plan from an agent, run [Microlink MCP](https://microlink.io/docs/api/getting-started/mcp) (`npx -y @microlink/mcp`), call `microlink_create_checkout_session`, hand the returned checkout URL to the human, then poll `microlink_get_checkout_session` until it reports `ready`. The tools never return the key: the human receives it by email and in the dashboard.

Agents never create accounts on their own: registration always ends with a human.

## Credential use

Send the key in the `x-api-key` header to the Pro endpoint:

```bash
curl -G https://pro.microlink.io \
  -H "x-api-key: $MICROLINK_API_KEY" \
  -d url=https://example.com
```

Keep the key out of URLs, logs, and client-side code. A key placed in a query string ends up in browser history and server logs.

For Microlink MCP, set `MICROLINK_API_KEY` in the server environment, or send `x-api-key` (or `Authorization: Bearer <key>`) on requests to `https://mcp.microlink.io/mcp`.

## Errors

An invalid key returns `EAUTH`. Without a key, the anonymous quota returns HTTP `429` once spent. See [error codes](https://microlink.io/docs/api/basics/error-codes) and [rate limit](https://microlink.io/docs/api/basics/rate-limit).

## Machine-readable

- [API catalog](https://microlink.io/.well-known/api-catalog)
- [OpenAPI](https://microlink.io/openapi.json)
- [MCP server card](https://microlink.io/.well-known/mcp/server-card.json)
