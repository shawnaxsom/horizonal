# Horizonal

## Installation
cd ./lambda
npm install -g serverless
serverless deploy

cd ..
npm install
npm start

## Created with
create-react-app sunnyio
serverless create --template aws-nodejs --path lambda

## Debug Lambda with
serverless deploy function -f hello
serverless invoke -f hello -l
