build:
	docker-compose build
run-sh:
	docker-compose run syl-frontend-dev sh
	exit
run-dev:
	docker-compose up
run-prd:
	docker-compose -f docker-compose-prod.yml up --build
deploy:
	docker-compose -f docker-compose-prod.yml up -d --build
exit:
	docker-compose down
