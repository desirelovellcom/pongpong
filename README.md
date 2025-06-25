# PongPong 🏓

A modern, customizable take on the classic Pong game with neon aesthetics and unique features.

## ✨ Features

- **Classic Pong Gameplay**: Two paddles, one ball, endless fun
- **Custom Ball Images**: Upload any image to use as your game ball
- **Disintegration Mode**: Watch your custom ball break down with each hit
- **Neon Aesthetics**: Beautiful glowing paddles and visual effects
- **Cross-Platform**: Runs on desktop, mobile, and web browsers
- **Touch Controls**: Full mobile support with intuitive touch controls
- **Customizable**: Adjust colors, speeds, and gameplay settings
- **Open Source**: MIT licensed for full customization freedom

## 🎮 How to Play

### Desktop Controls
- **W/S**: Move left paddle up/down
- **↑/↓**: Move right paddle up/down
- **Space**: Pause/Resume game

### Mobile Controls
- **Touch**: Tap left or right side of screen
- **Drag**: Move paddles up and down

## 🛠️ Installation

### Web Version (Recommended)
1. Open the game in any modern web browser
2. No installation required - runs directly in browser
3. Add to home screen on mobile for app-like experience

### Desktop Version
1. Download the source code
2. Install Node.js and npm
3. Run \`npm install\`
4. Run \`npm run build\`
5. Open \`dist/index.html\` in your browser

### Building for Different Platforms

#### Linux
\`\`\`bash
# Install dependencies
npm install

# Build for production
npm run build

# Create Linux package (optional)
npm run package:linux
\`\`\`

#### Windows
\`\`\`batch
REM Install dependencies
npm install

REM Build for production
npm run build

REM Create Windows executable (optional)
npm run package:windows
\`\`\`

## 🎨 Customization

### Custom Ball Images
1. Go to **Customize** menu
2. Click **Upload Image**
3. Select any image (faces work great!)
4. Image is automatically cropped to circle
5. Save and activate your custom ball

### Disintegration Mode
Enable in **Settings** to make your custom ball gradually break down with each paddle hit:
- **Slow**: Ball degrades over many hits
- **Medium**: Balanced degradation
- **Fast**: Quick disintegration

### Themes and Colors
- Choose from Neon, Retro, or Minimal themes
- Customize paddle colors
- Adjust glow effects and visual settings

## 🔧 Configuration

Edit \`config.json\` to customize:
- Game physics and speeds
- Visual themes and colors
- Control mappings
- Audio settings
- Disintegration effects

## 🎯 Game Modes

### Single Player
- Play against AI (coming soon)
- Practice mode with adjustable difficulty

### Two Player
- Local multiplayer on same device
- Keyboard or touch controls

### Custom Modes
- Disintegration mode for unique visual effects
- Speed variations and difficulty settings

## 🔊 Audio

- Ambient synth sound effects
- Customizable volume and audio settings
- Different sounds for paddle hits, walls, and scoring

## 📱 Mobile Optimization

- Responsive design for all screen sizes
- Touch-optimized controls
- Hardware acceleration support
- Smooth 60fps gameplay

## 🛡️ Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Technical Details

### Built With
- HTML5 Canvas for rendering
- JavaScript for game logic
- CSS3 for UI styling
- Web Audio API for sound

### Performance
- 60fps target framerate
- Hardware acceleration when available
- Optimized for ARM processors
- Minimal resource usage

## 🤝 Contributing

PongPong is open source! Contributions welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Areas for Contribution
- New visual effects and themes
- Additional disintegration modes
- AI opponent implementation
- Performance optimizations
- Mobile-specific features

## 📄 License

MIT License - see LICENSE file for details.

You are free to:
- Use commercially
- Modify and distribute
- Create derivative works
- Use privately

## 🐛 Bug Reports

Found a bug? Please report it with:
- Device/browser information
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 🎮 Game Tips

- Use high-contrast images for better visibility
- Face photos work great with disintegration mode
- Adjust paddle speed for your skill level
- Try different themes for varied visual experience
- Enable sound for better gameplay feedback

## 🚀 Future Features

- AI opponent with difficulty levels
- Online multiplayer
- Tournament mode
- More disintegration effects
- Custom sound packs
- Replay system
- Statistics tracking

---

**Enjoy playing PongPong!** 🏓✨
