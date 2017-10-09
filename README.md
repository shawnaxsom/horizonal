# Horizonal

## Installation

* npm install -g serverless
* cd ./lambda
* echo "darkskySecretAccessKey: YOUR_DARKSKY_SECRET_ACCESS_KEY" > secrets.yml
* echo "googleMapsSecretAccessKey: YOUR_GOOGLE_MAPS_SECRET_ACCESS_KEY" >> secrets.yml
* serverless deploy

* cd ..
* npm install
* npm start

[Unit]
Description=My Miscellaneous Service
After=network.target

## Systemd
/etc/systemd/system/horizonal.service
sudo service horizonal start

```
[Unit]
Description=Horizonal
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/dev/horizonal/
ExecStart=/usr/local/bin/npm start
Restart=on-abort

[Install]
WantedBy=multi-user.target
```

## Created with

* create-react-app sunnyio
* serverless create --template aws-nodejs --path lambda

## Debug Lambda with

* serverless deploy function -f hello
* serverless invoke -f hello -l
