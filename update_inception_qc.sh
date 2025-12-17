#!/bin/bash

# -----------------------------
# Configuration
# -----------------------------
AUTH_URL="https://explorer.adamma.in/api/generateAuthCode"
API_URL="https://explorer.adamma.in/api/apiroutes/updateInceptionQC"
USER="ebrahim@adamma.in"
PASSWORD="Adamma@123"

# -----------------------------
# Step 1: Get Auth Token
# -----------------------------
ACCESS_TOKEN=$(curl -s -X POST "$AUTH_URL" \
  -H "Content-Type: application/json" \
  -d "{\"userId\": \"$USER\", \"password\": \"$PASSWORD\"}" | jq -r '.accessToken')

if [ -z "$ACCESS_TOKEN" ] || [ "$ACCESS_TOKEN" == "null" ]; then
  echo "❌ Failed to get auth token"
  exit 1
fi

echo "✅ Auth token received"

# -----------------------------
# Step 2: Call PATCH API
# -----------------------------
RESPONSE=$(curl -s -X PATCH "$API_URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ACCESS_TOKEN")

echo "API Response:"
echo "$RESPONSE"

