#!/usr/bin/env bash

if [ ! -f ".env" ]; then
  echo ".env file not found"
  exit 1
fi

source .env

ssh "$SSH_USER@$SSH_HOST" <<EOF
    cd "$SSH_DIR"
    composer run build
EOF
