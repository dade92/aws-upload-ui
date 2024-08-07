echo "Pulling the latest images..."
docker compose pull frontend
docker compose pull proxy

echo "Starting frontend app..."
docker compose up -d frontend
sleep 2

#echo "Starting mongo express interface on port 8081..."
#docker compose up -d mongo-express
#sleep 2

echo "Starting nginx reverse proxy listening on port 80..."
docker compose up -d proxy
sleep 4

docker ps

echo "App seems up and running."


