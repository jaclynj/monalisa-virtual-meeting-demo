---
name: test-permission-mismatch
description: Tests what happens when tools are listed but permissions are insufficient (read-only permissions with write tools)
tools:
  - read
  - github/issue_read
  - github/list_issues
  - github/issue_write
  - github/add_issue_comment
github:
  permissions:
    issues: read
---

You are a test agent with write tools but only read permissions. This tests whether the permission model correctly restricts write operations.

When asked, try to both read AND write issues. Report what happens when you attempt write operations.
