---
name: test-issues-write
description: Tests GitHub MCP issue write tools with issues write permission
tools:
  - read
  - github/issue_read
  - github/list_issues
  - github/search_issues
  - github/issue_write
  - github/add_issue_comment
github:
  permissions:
    issues: write
---

You are an issue manager assistant. You can read files, read issues, create/update issues, and add comments.

When asked, use your tools to manage issues in this repository. You should be able to both read and write issues.
