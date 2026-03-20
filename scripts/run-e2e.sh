docker-compose -f docker-compose-test.yml up -d
echo '🟡 - Waiting for database to be ready...'
./wait-for-it.sh "postgresql://postgres:mysecretpassword@localhost:5432/postgres" -- echo '🟢 - Database is ready!'
npx prisma migrate deploy --name init
npx playwright test
docker-compose -f docker-compose.test.yml down