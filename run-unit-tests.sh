#!/bin/bash

set -e;

echo -e "\nStarting server-side tests \n";
cd src/server && CI=true yarn test;

echo -e "\nStarting client-side tests\n";
cd ../client && CI=true yarn test;