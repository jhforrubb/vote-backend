start-mongo:
	@echo Starting docker mongo

	@if [ $(shell docker ps -a | grep -ci voting_mongo) -eq 0 ]; then \
		echo starting voting_mongo; \
		docker run --name voting_mongo -d \
			-p 27017:27017 \
			-e MONGO_INITDB_ROOT_USERNAME=vote \
			-e MONGO_INITDB_ROOT_PASSWORD=vote123 \
			-e MONGO_INITDB_DATABASE=voting \
			mongo:5.0.9; > /dev/null; \
	elif [ $(shell docker ps | grep -ci voting_mongo) -eq 0 ]; then \
		echo starting voting_mongo; \
		docker start voting_mongo; > /dev/null; \
	fi
