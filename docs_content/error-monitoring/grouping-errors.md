---
title: Grouping Errors
slug: nskl-grouping-errors
createdAt: 2022-03-22T15:27:43.000Z
updatedAt: 2022-06-27T03:34:47.000Z
---

Highlight groups errors together based on their error message and stack trace. When an error is thrown, Highlight finds the closest matching error and adds the new error instance to it.&#x20;

An error is matched if:

1.  It has the same error message OR

2.  It has the same top stack frame and 3 of the next 4 stack frames are the same (in any order)

A stack frame is matched if:

1.  It has the same filename, function name, line number, and column number OR

2.  It has the same source code and context (if sourcemaps are enabled)

If there is no match with an existing error, a new error is created instead.

All error instances and their relevant sessions can be viewed in the panel at the bottom-right of the errors page:

![](https://archbee-image-uploads.s3.amazonaws.com/XPwQFz8tul7ogqGkmtA0y/dtskjMnjjfkc83L_CVIsX_screen-shot-2022-03-22-at-113751-am.png)

## Grouping Rules

If your errors are in JSON form, you can add JSONPath expressions in your [project settings](https://app.highlight.run/settings) to select parts of your errors that you want to group on. For example, if your errors look like:

```json
{
    "type": "StackOverflowError",
    "user": "alice",
    "message": "Oh no! You got an error on line 41!!"
}

{
    "type": "StackOverflowError",
    "user": "bob",
    "message": "Oh no! You got an error on line 50!!"
}
```

They would not be grouped together since the errors are not an exact match and since they were thrown at different lines in your code. In this case, if you wanted to group all errors of the same type into the same error group, you can add an expression `$.type` in your project settings.





