#!/bin/sh
echo "⏳ Esperando a MySQL en mysql:3306..."
while ! nc -z mysql 3306; do
  sleep 2
done
echo "✅ MySQL está disponible, arrancando app..."
exec java -jar app.jar
