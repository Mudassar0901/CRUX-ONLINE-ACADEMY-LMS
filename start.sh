#!/usr/bin/env bash
set -euo pipefail
echo "🚀 Starting Crux API and Dashboard..."
# Start API
cd backend
nohup npm run start:dev >/workspaces/backend.log 2>&1 &
API_PID=$!
echo "API PID: $API_PID"
# Start Frontend
cd ../frontend
nohup npm run dev -- --host 0.0.0.0 >/workspaces/frontend.log 2>&1 &
UI_PID=$!
echo "UI PID: $UI_PID"
echo "✅ Both services started. Check forwarded ports 4000 and 5173."