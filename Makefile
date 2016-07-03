wwwData=/var/www/html/
all:

install:
	npm install
deployWeb:
	@echo "You need to have apache2 with rewrite mode on nad php5"
	cp -rf ./raspTV $(wwwData)
	cp -rf ./danaworld/ $(wwwData)
	chown www-data $(wwwData)raspTV -R
	chown www-data $(wwwData)danaworld -R

