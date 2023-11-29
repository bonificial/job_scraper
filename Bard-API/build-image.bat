@echo off

rem Retrieve an authentication token and authenticate your Docker client to your registry
aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/j9c2n9s8

rem Build your Docker image (replace 'path_to_your_dockerfile' with the path to your Dockerfile)
docker build -t bard_api .

rem Tag your Docker image
docker tag bard_api:latest public.ecr.aws/j9c2n9s8/bard_api:latest

rem Push the image to your AWS repository
docker push public.ecr.aws/j9c2n9s8/bard_api:latest
