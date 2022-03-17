# (c) ECOLE POLYTECHNIQUE FEDERALE DE LAUSANNE, Switzerland, 2022.

SHELL := /bin/bash

.PHONY: help
help:
	@echo "Main:"
	@echo "  make help                  — Display this help"
	@echo "Utilities:"
	@echo "  make set-dockerfile-dev    — Prepare Dockerfile-dev"
	@echo "  make build                 — Build"
	@echo "  make build-force           — Force build"
	@echo "  make up                    — Run"

.PHONY: copy-dockerfile-to-dockerfile-dev
set-dockerfile-dev:
	@cp Dockerfile Dockerfile-dev
	@sed -i 's#docker-registry.default.svc:5000/wwp-test/##g' Dockerfile-dev

.PHONY: build
build: set-dockerfile-dev
	@docker-compose build

.PHONY: build-force
build-force: set-dockerfile-dev
	@docker-compose build --force-rm --no-cache --pull

.PHONY: up
up:
	@docker-compose up
