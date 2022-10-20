---
title: H.identify()
slug: GqZd-hidentify
createdAt: 2021-09-13T23:29:03.000Z
updatedAt: 2022-03-21T18:16:30.000Z
---

This method is used to add an identity to a user for the session. You can learn more [Identifying Users](/session-replay/identifying-users).

```typescript
H.identify(identifier: string, metadata?: [key: string]: string | boolean | number) => void;
```

## `identifier`* (string) *Required

The identifier for the user in the session. This is often an email or UUID.

## `metadata`

Metadata for the user. You can think of these as additional tags for the user. If the `highlightDisplayName` or `email` fields are set, they will be used instead of `identifier` as the user's display name on the session viewer and session feed.

### Example

```typescript
H.identify("alice@corp.com", {
    highlightDisplayName: "Alice Customer",
    accountType: "premium",
    hasUsedFeature: true
});
```

