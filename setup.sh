#!/usr/bin/env bash
set -euo pipefail
echo "🔧 Setting up Crux LMS workspace..."
cd backend
docker compose up -d db
npm install
npx prisma generate
npx prisma migrate dev --name init
cd ../frontend
npm install
echo "✅ Setup complete"