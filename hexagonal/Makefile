build:
	@go build -o bin/main ./application/
	@chmod +x bin/main


run: build
	@./bin/main

test:
	@go test -v ./...