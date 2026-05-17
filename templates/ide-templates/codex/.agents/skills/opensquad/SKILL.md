---
name: opensquad
description: Run Opensquad — multi-agent orchestration. Immediately use this skill when the user's message starts with /opensquad or when they ask to create, run, edit, list, or manage squads.
---

Treat `/opensquad` as the explicit entrypoint for this skill.

For Codex sessions, expect the same runtime capabilities as Claude Code: Opensquad MCP servers should be configured in Codex `config.toml` as the equivalent of the project `.mcp.json`.

Read `AGENTS.md` at the project root and adopt the Opensquad system role. Follow all initialization, command routing, and workflow instructions defined there.
