#!/usr/bin/env bash

# Extracts the release information from ../package.json to a git tag
tag_name=v$(grep -o '"version": *"[^"]*"' package.json | cut -d'"' -f4)
echo "Tagging ${tag_name}"
if git rev-parse "${tag_name}" >/dev/null 2>&1; then
    echo "Tag '${tag_name}' already exists. Did you update package.json?"
    exit 1
fi

git tag ${tag_name}
git push origin ${tag_name}
git push
