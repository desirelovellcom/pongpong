#!/bin/bash

# PongPong Build Script for Linux
echo "Building PongPong for Linux..."

# Install dependencies
npm install

# Build the application
npm run build

# Create distribution directory
mkdir -p dist/pongpong

# Copy built files
cp -r out/* dist/pongpong/
cp config.json dist/pongpong/
cp README.md dist/pongpong/
cp LICENSE dist/pongpong/

# Create launcher script
cat > dist/pongpong/pongpong.sh << 'EOF'
#!/bin/bash
cd "$(dirname "$0")"
if command -v xdg-open > /dev/null; then
    xdg-open index.html
elif command -v firefox > /dev/null; then
    firefox index.html
elif command -v chromium-browser > /dev/null; then
    chromium-browser index.html
else
    echo "Please open index.html in your web browser"
fi
EOF

chmod +x dist/pongpong/pongpong.sh

echo "Build complete! Run ./dist/pongpong/pongpong.sh to start the game"
