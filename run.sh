#!/bin/bash

ENV="dev"

if [[ "$1" == "--prod" ]]; then
    ENV="prod"
elif [[ "$1" != "--dev" ]]; then
    echo "Unknown option $1. Using default environment (dev)."
fi

./setup.sh

if [[ "$ENV" == "dev" ]]; then
    echo "Starting development environment..."
    cd backend
    docker compose -f ../docker-compose.dev.yml up --build
elif [[ "$ENV" == "prod" ]]; then
    echo "Starting production environment..."
    cd backend
    docker compose -f ../docker-compose.prod.yml up --build -d  # Detached for production
fi
