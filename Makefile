up: ## Run local dev server with Tailwind watch
	@echo ""
	@printf "  \033[1;32m● Tenor Cards\033[0m dev server\n"
	@printf "  \033[32m  Server: \033[0m http://localhost:8080\n"
	@printf "  \033[32m  Tailwind:\033[0m watching for changes\n"
	@echo ""
	@npx tailwindcss -i ./assets/css/main.css -o ./assets/css/twind.css --watch &
	npx http-server . -p 8080 -c-1

build: ## Build Tailwind CSS for production
	npm install
	npx tailwindcss -i ./assets/css/main.css -o ./assets/css/twind.css --minify

surge: ## Deploy to surge (prod)
	npx surge . --domain tenor-cards.surge.sh

surge_dev: ## Deploy to surge (dev)
	npx surge . --domain tc_dev.surge.sh

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'
