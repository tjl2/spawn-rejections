#!/usr/bin/env bash

# Accept an arg to tell us if we succeed or fail
if [ "$1" == "success" ]; then
  echo "Success"
  exit 0
else
  echo "Starting..."
  sleep 2
  echo "Failure" >&2
  exit 1
fi
