---
title: Session Search Deep Linking
slug: RXhV-session-search-deep-linking
createdAt: 2022-01-26T19:50:50.000Z
updatedAt: 2022-01-26T21:38:34.000Z
---

The queries you build when searching for sessions are reflected in the URL parameters. You can share these URLs with others to deep link to search results, or even create them programatically.

## Syntax

`/sessions?query={and|or}||{property1},{operator1},{valueA},{valueB}`&#x20;

*   Highlight supports `and` and `or` queries

*   User properties:
    *   `user_{your_property_name}`&#x20;

*   Track properties:
    *   `track_{your_property_name}`&#x20;

*   Sessions built-in properties (these are automatically populated by Highlight):
    *   `user_identifier
        `&#x20;


    *   `session_browser_version`&#x20;

    *   `session_browser_name`&#x20;

    *   `session_device_id`

    *   `session_environment`

    *   `session_os_name`

    *   `session_os_version`

    *   `session_referrer`

    *   `session_reload`

    *   `session_visited-url`

    *   `custom_app_version`

    *   `custom_created_at`

    *   `custom_active_length`&#x20;

    *   `custom_viewed`&#x20;

    *   `custom_processed`&#x20;

    *   `custom_first_time`&#x20;

    *   `custom_starred` &#x20;

*   Operators:
    *   `is`&#x20;

    *   `is_not`&#x20;

    *   `contains`&#x20;

    *   `not_contains`&#x20;

    *   `exists`&#x20;

    *   `not_exists`&#x20;

    *   `matches` (uses Lucene regex syntax)

    *   `not_matches` (uses Lucene regex syntax)

    *   `between` (for active\_length)

    *   `not_between` (for active\_length)

    *   `between_date` (for created\_at)

    *   `not_between_date` (for created\_at)

## Examples

Viewing sessions for a particular user:&#x20;

&#x20;`/sessions?query=and||user_identifier,is,alice@example.com`

Excluding sessions from your organization:&#x20;

&#x20;`/sessions?query=and||user_identifier,not_contains,@yourdomain.com`

Viewing sessions for a particular page in your app:

`/sessions?query=and||session_visited-url,contains,/your/path/name`&#x20;

Multiple properties

`/sessions?query=or||user_identifier,is,Bob||user_email,is_not,alice@example.com`&#x20;
