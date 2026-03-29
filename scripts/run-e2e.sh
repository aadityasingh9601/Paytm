docker-compose -f docker-compose-test.yml up -d
echo '🟡 - Waiting for database to be ready...'
./scripts/wait-for-it.sh "postgresql://postgres:mysecretpassword@localhost:5432/paytm_test_db" -- echo '🟢 - Database is ready!'
DATABASE_URL=postgresql://postgres:mysecretpassword@localhost:5432/paytm_test_db \
npx prisma migrate deploy --schema ./packages/db/prisma/schema.prisma
npx playwright test
docker-compose -f docker-compose-test.yml down