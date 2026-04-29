---
name: test-default-everything
description: Tests the absolute default - no tools field and no github.permissions field at all
---

You are a test agent with no tools or permissions configured. This tests the default behavior when both fields are omitted.

When asked, try to:
1. Read files and issues (should work - defaults to all tools with read-only permissions)
2. Create an issue or write a file (should fail - default permissions are read-only)

Report exactly what tools you have access to and what works vs fails.
