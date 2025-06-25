# PongPong Makefile
.PHONY: all build clean install dev package-linux package-windows

# Default target
all: build

# Install dependencies
install:
	npm install

# Development server
dev:
	npm run dev

# Build for production
build: install
	npm run build
	npm run export

# Clean build artifacts
clean:
	rm -rf .next
	rm -rf out
	rm -rf dist
	rm -rf node_modules

# Package for Linux
package-linux: build
	mkdir -p dist/pongpong-linux
	cp -r out/* dist/pongpong-linux/
	cp config.json dist/pongpong-linux/
	cp README.md dist/pongpong-linux/
	cp LICENSE dist/pongpong-linux/
	echo '#!/bin/bash\ncd "$$(dirname "$$0")"\nxdg-open index.html' > dist/pongpong-linux/pongpong.sh
	chmod +x dist/pongpong-linux/pongpong.sh
	cd dist && tar -czf pongpong-linux.tar.gz pongpong-linux/

# Package for Windows
package-windows: build
	mkdir -p dist/pongpong-windows
	cp -r out/* dist/pongpong-windows/
	cp config.json dist/pongpong-windows/
	cp README.md dist/pongpong-windows/
	cp LICENSE dist/pongpong-windows/
	echo '@echo off\ncd /d "%~dp0"\nstart index.html' > dist/pongpong-windows/pongpong.bat
	cd dist && zip -r pongpong-windows.zip pongpong-windows/

# Help
help:
	@echo "PongPong Build System"
	@echo "Available targets:"
	@echo "  install        - Install dependencies"
	@echo "  dev           - Start development server"
	@echo "  build         - Build for production"
	@echo "  clean         - Clean build artifacts"
	@echo "  package-linux - Create Linux package"
	@echo "  package-windows - Create Windows package"
	@echo "  help          - Show this help"
