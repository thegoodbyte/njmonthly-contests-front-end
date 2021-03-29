#!/bin/sh

npm run build
forever stopall
kill $(lsof -t -i:8081)
forever start -c "npm run start" ./
