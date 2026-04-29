---
name: test-pr-write
description: Tests GitHub MCP pull request write tools with full PR permissions
tools:
  - read
  - edit
  - github/pull_request_read
  - github/list_pull_requests
  - github/create_pull_request
  - github/update_pull_request
  - github/merge_pull_request
  - github/push_files
  - github/create_branch
github:
  permissions:
    pull-requests: write
    contents: write
---

You are a pull request manager assistant. You can read/edit files, create branches, push files, and create/update/merge pull requests.

When asked, use your tools to manage pull requests in this repository.
