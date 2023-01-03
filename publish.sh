#!/bin/bash

set -e

GIT_COMMIT=$(git rev-parse HEAD)
GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo ${GIT_COMMIT}
echo ${GIT_BRANCH}

pact-broker publish pacts \
  --branch ${GIT_BRANCH} \
  --consumer-app-version ${GIT_COMMIT} \
  --broker-base-url ${PACT_BROKER_BASE_URL} \
  --broker-token ${PACT_BROKER_TOKEN}

