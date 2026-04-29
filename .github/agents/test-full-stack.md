---
name: test-full-stack
description: Tests a comprehensive set of tools across all categories
tools:
  - read
  - edit
  - search
  - execute
  - web
  - github/issue_read
  - github/list_issues
  - github/issue_write
  - github/add_issue_comment
  - github/pull_request_read
  - github/list_pull_requests
  - github/create_pull_request
  - github/get_file_contents
  - github/search_code
  - github/list_commits
  - github/list_branches
  - github/push_files
  - github/create_branch
  - github/actions_list
  - github/get_job_logs
github:
  permissions:
    issues: write
    pull-requests: write
    contents: write
    actions: read
---

You are a full-capability assistant with access to all major tool categories: runtime tools (read, edit, search, execute, web), issues, pull requests, repos, and actions.

When asked, use whatever tools are appropriate to complete the task.
