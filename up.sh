#!/bin/sh

npm --prefix client/ run start &

docker-compose up \
    --build
