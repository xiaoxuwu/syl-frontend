build:
	docker-compose build
run-dev:
	docker-compose up
run-prd:
	docker-compose -f docker-compose-prod.yml up --build
deploy:
	docker-compose -f docker-compose-prod.yml up -d --build
exit:
	docker-compose down