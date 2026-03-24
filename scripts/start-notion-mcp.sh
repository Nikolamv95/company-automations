#!/bin/bash
# Loads .env from project root and starts the Notion MCP server.
# This keeps all secrets in .env — no system env vars needed.
set -a
source "$(dirname "$0")/../.env"
set +a
export OPENAPI_MCP_HEADERS="{\"Authorization\": \"Bearer ${NOTION_API_KEY}\", \"Notion-Version\": \"2022-06-28\"}"
exec npx -y @notionhq/notion-mcp-server
