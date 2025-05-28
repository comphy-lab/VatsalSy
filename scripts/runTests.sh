#!/bin/bash

# Run tests
echo "Running tests..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js to run tests."
    exit 1
fi

# Run the simple test script directly
node scripts/simple-test.js

# Check if tests passed
if [ $? -eq 0 ]; then
    echo "✅ All tests passed!"
else
    echo "❌ Tests failed!"
    exit 1
fi