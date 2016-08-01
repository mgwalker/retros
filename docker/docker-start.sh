#!/bin/bash

docker ps | grep retros-run > /dev/null

if [ $? -eq 0 ]
then
  docker restart retros-run
else
  docker run --name retros-run -p 23526:23526 -d -v `pwd`/..:/usr/share/retros retros
fi
