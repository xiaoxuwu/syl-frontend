build:
	docker-compose build
run-dev:
	docker-compose up
deploy:
	docker-compose -f docker-compose-prod.yml up -d --build
run-prod:
	docker-compose -f docker-compose-prod.yml up --build
