#!/usr/bin/env bash

# Navigate to the root of the repository.
cd "$(dirname "${BASH_SOURCE}")/..";

EXPECTED='44911';
ACTUAL="$(node cli.js tests/fixtures/*.png)";
if [ "${ACTUAL}" != "${EXPECTED}" ]; then
	echo "Error!";
	echo "Expected: ${EXPECTED}";
	echo "Actual:   ${ACTUAL}";
	exit 1;
fi;
