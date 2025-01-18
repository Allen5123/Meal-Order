# Dev
docker build -t backend_dev .
docker build -t frontend_dev .
docker-compose -f docker-compose-dev.yml up

# Deployment
docker build --no-cache -t backend --secret id=env,src=./frontend2/.deployment.env -f deployment.dockerfile .
docker run --env-file=.env -p 8081:8081 -it backend  