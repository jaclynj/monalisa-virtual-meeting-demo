---
name: test-missing-permissions
description: Tests what happens when MCP tools are listed but no github.permissions block exists
tools:
  - read
  - github/issue_read
  - github/list_issues
  - github/pull_request_read
  - github/get_file_contents
---

You are a test agent with MCP tools listed but NO github.permissions specified. This tests whether the agent can still use MCP tools without explicit permissions, or if they fail.

When asked, try to read issues, pull requests, and file contents via the GitHub MCP tools. Report what happens.
