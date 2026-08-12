# auth.md

You are an agent. This service supports **agentic registration**: discover → register → (claim if needed) → exchange for an access_token → call API → handle revocation. Follow the steps in order; do not skip ahead.

Examples use real hosts: `https://decastropt.com` (resource server hosting the API) and `https://decastropt.com` (authorization server that handles registration).

## Step 1 — Discover

Discovery is two hops — you may have already done this.

The 401 response that pointed you here also carries a `WWW-Authenticate` header with the PRM URL:

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Bearer resource_metadata="https://decastropt.com/.well-known/oauth-protected-resource"
```

Pull the `resource_metadata` value from that header and fetch it (1a). If you don't have the 401 in hand, the conventional path on the resource server is `/.well-known/oauth-protected-resource`.

### 1a. Fetch the Protected Resource Metadata

```http
GET /.well-known/oauth-protected-resource
```

Response shape:

```json
{
  "resource": "https://decastropt.com",
  "resource_name": "Decastro PT",
  "authorization_servers": ["https://decastropt.com"],
  "scopes_supported": ["booking:read", "booking:write", "profile"],
  "bearer_methods_supported": ["header"]
}
```

### 1b. Fetch the Authorization Server metadata

```http
GET /.well-known/oauth-authorization-server
```

Response shape:

```json
{
  "issuer": "https://decastropt.com",
  "token_endpoint": "https://decastropt.com/auth/token",
  "revocation_endpoint": "https://decastropt.com/auth/revoke",
  "grant_types_supported": [
    "urn:ietf:params:oauth:grant-type:jwt-bearer",
    "urn:workos:agent-auth:grant-type:claim"
  ],
  "agent_auth": {
    "skill": "https://decastropt.com/auth.md",
    "identity_endpoint": "https://decastropt.com/auth/register",
    "claim_endpoint": "https://decastropt.com/auth/claim",
    "events_endpoint": "https://decastropt.com/auth/events",
    "identity_types_supported": ["anonymous", "service_auth"],
    "events_supported": [
      "https://schemas.workos.com/events/agent/auth/identity/assertion/revoked"
    ]
  }
}
```

## Step 2 — Pick a method

Use this decision tree:

1. **You have only the user's email** → [service_auth](#service_auth). Claim ceremony required.
2. **You have neither** → [anonymous](#anonymous). Claim ceremony optional; deferred until the user wants to take ownership.

## Step 3 — Register

### service_auth

```http
POST /auth/register
Content-Type: application/json

{
  "type": "service_auth",
  "login_hint": "user@example.com"
}
```

Response:

```json
{
  "registration_id": "reg_...",
  "registration_type": "service_auth",
  "claim_token": "clm_...",
  "claim_token_expires": "2026-08-07T00:00:00.000Z",
  "post_claim_scopes": ["booking:read", "booking:write"],
  "claim": {
    "user_code": "123456",
    "expires_in": 600,
    "verification_uri": "https://decastropt.com/auth/claim"
  }
}
```

### anonymous

```http
POST /auth/register
Content-Type: application/json

{
  "type": "anonymous"
}
```

Response:

```json
{
  "registration_id": "reg_...",
  "registration_type": "anonymous",
  "identity_assertion": "<service-signed JWT>",
  "assertion_expires": "2026-08-07T00:00:00.000Z",
  "scopes": ["booking:read"],
  "claim_token": "clm_...",
  "claim_token_expires": "2026-08-07T00:00:00.000Z"
}
```

## Step 4 — Claim ceremony

### 4a. Get the ceremony materials

For `service_auth` registrations, the claim block is already in the registration response. For `anonymous`, POST to the claim endpoint:

```http
POST /auth/claim
Content-Type: application/json

{
  "claim_token": "clm_...",
  "email": "user@example.com"
}
```

### 4b. Hand off to the user

Surface `verification_uri` and `user_code` to the user. The user opens the link, signs in at decastropt.com, and enters the code.

### 4c. Poll for completion

```http
POST /auth/token
Content-Type: application/x-www-form-urlencoded

grant_type=urn:workos:agent-auth:grant-type:claim&claim_token=clm_...
```

Returns `authorization_pending` while waiting; on success a standard token response.

## Step 5 — Exchange the assertion

```http
POST /auth/token
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=<identity_assertion>
```

Response:

```json
{
  "access_token": "eyJ...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "booking:read booking:write"
}
```

## Step 6 — Use the access_token

```http
GET /api/services
Authorization: Bearer <access_token>
```

When the access_token expires, re-exchange the same identity_assertion. When the assertion itself expires, restart at registration.

## Step 7 — Revocation

### Credential layer

```http
POST /auth/revoke
Content-Type: application/x-www-form-urlencoded

token=<access_token>
```

### Registration layer

The provider POSTs a Security Event Token to `/auth/events` to invalidate the assertion and all derived tokens.

## Errors

| Error | Endpoint | Action |
|-------|----------|--------|
| `invalid_request` | `/auth/register` | Fix the request body |
| `service_auth_not_enabled` | `/auth/register` | Fall back to anonymous |
| `anonymous_not_enabled` | `/auth/register` | Fall back to service_auth |
| `invalid_claim_token` | `/auth/claim` | Restart registration |
| `claim_expired` | `/auth/claim` | Re-call `/auth/claim` for fresh code |
| `authorization_pending` | `/auth/token` | Keep polling |
| `expired_token` | `/auth/token` | Re-call `/auth/claim` for fresh code |
| `invalid_grant` | `/auth/token` | Restart at registration |
| `invalid_client` | `/auth/token` | Check credentials |

## Contact

- Email: info@decastropt.com
- Website: https://decastropt.com
