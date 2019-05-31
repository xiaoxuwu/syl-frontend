build:
	exit
	docker-compose build
run-sh:
	exit
	docker-compose run syl-frontend-dev sh
run-dev:
	exit
	docker-compose up
run-prd:
	docker-compose -f docker-compose-prod.yml up --build
deploy:
	docker-compose -f docker-compose-prod.yml up -d --build
exit:
	docker-compose down
