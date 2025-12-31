#!/usr/bin/env bash

if [ ! -f ".env" ]; then
  echo ".env file not found"
  exit 1
fi

source .env

rsync -avL --delete ./contents/ "$SSH_USER@$SSH_HOST:$SSH_DIR/contents"
