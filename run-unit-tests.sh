#!/bin/bash

set -e;

echo -e "\nStarting Server's tests\n";
cd src/server && CI=true yarn test;

echo -e "\nStarting Client's tests\n";
cd ../client && CI=true yarn test;