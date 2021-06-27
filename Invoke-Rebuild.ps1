$project = "infinitybear"

docker container stop $project
docker container rm $project
docker image rm $project
docker build -t $project -f docker/Dockerfile .
docker run -d -p 80:80 --name $project $project