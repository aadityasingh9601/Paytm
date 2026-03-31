set -e # Enable exit-on-error

# Cleanup any leftover from previous cancelled/failed run
docker compose -f docker-compose-test.yml down --volumes --remove-orphans 2>/dev/null || true

# Start fresh test DB
docker compose -f docker-compose-test.yml up -d

echo '🟡 - Waiting for database to be ready...'
./scripts/wait-for-it.sh "localhost:5432" -- echo '🟢 - Database is ready!'

# Run migrations
DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432/paytm_test_db \
  npx prisma migrate deploy --schema ./packages/db/prisma/schema.prisma

# Run tests — capture exit code without stopping script
set +e                               # temporarily disable exit-on-error
npx playwright test
TEST_EXIT_CODE=$?                    # capture result
set -e                               # re-enable

# Always cleanup regardless of test result
docker compose -f docker-compose-test.yml down --volumes --remove-orphans

# Exit with test exit code so npm knows if tests passed or failed
exit $TEST_EXIT_CODE