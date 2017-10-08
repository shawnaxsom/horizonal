# Horizonal

## Installation

* npm install -g serverless
* cd ./lambda
* echo "darkskySecretAccessKey: YOUR_DARKSKY_SECRET_ACCESS_KEY" > secrets.yml
* serverless deploy

* cd ..
* npm install
* npm start

## Created with

* create-react-app sunnyio
* serverless create --template aws-nodejs --path lambda

## Debug Lambda with

* serverless deploy function -f hello
* serverless invoke -f hello -l
