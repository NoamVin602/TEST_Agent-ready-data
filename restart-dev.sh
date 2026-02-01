#!/bin/bash
# Restart Next.js dev server script

echo "Stopping any running Next.js processes..."
pkill -f "next dev" || true

echo "Clearing Next.js cache..."
rm -rf .next

echo "Starting dev server..."
npm run dev
