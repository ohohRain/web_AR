# Web AR Model Viewer

A web-based augmented reality (AR) application that allows users to visualize 3D models in their physical space using their device's camera. Built with HTML5, CSS3, JavaScript, and Google's model-viewer web component.

## How It Works

This project uses **WebXR** and **model-viewer** technology to create AR experiences:

1. **3D Model Loading**: Uses `<model-viewer>` web component to load GLB/GLTF 3D models
2. **WebXR API**: Leverages browser's WebXR support for AR functionality
3. **Device Integration**: 
   - **iOS**: Uses ARKit through Safari's QuickLook AR
   - **Android**: Uses ARCore through Chrome's Scene Viewer
4. **HTTPS Requirement**: AR features require secure connections for camera access
5. **Real-time Rendering**: Models are rendered in real-time with lighting and shadows

## Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **3D Engine**: Google Model-Viewer (built on Three.js)
- **AR Framework**: WebXR API
- **3D Format**: GLB/GLTF 2.0
- **Server**: Python HTTP server + ngrok for HTTPS tunneling
- **Platforms**: iOS Safari, Android Chrome

## Features

- 🎯 View 3D models in your browser
- 📱 AR placement on mobile devices
- 🔄 Rotate and scale the model
- 🎨 Real-time shadows and lighting
- 📐 Touch gestures for model manipulation
- 📏 Actual size scaling support

## Requirements

### Browser Support
- **iOS**: Safari 12+ with ARKit support
- **Android**: Chrome 79+ with ARCore support
- **Desktop**: Any modern browser (Chrome, Firefox, Safari, Edge) for 3D viewing only

### Device Requirements
- AR features require:
  - iOS: iPhone 6S or newer with iOS 11+
  - Android: ARCore-supported device

## Setup Instructions

### 1. Convert Your 3D Model

Your current model (`Custom PODS MVP.SLDPRT`) needs to be converted to GLTF/GLB format:

#### Option A: Using SolidWorks
1. Open your SLDPRT file in SolidWorks
2. Go to File → Save As
3. Choose STL (*.stl) or VRML (*.wrl) format
4. Save with high quality settings

#### Option B: Using Online Converters
- [CAD Exchanger](https://cadexchanger.com/online-converter)
- [Aspose 3D Converter](https://products.aspose.app/3d/conversion)

#### Convert to GLTF/GLB
1. Download [Blender](https://www.blender.org/) (free)
2. Import your STL/VRML file
3. File → Export → glTF 2.0 (.glb/.gltf)
4. Save as `pod.glb` in the `models` folder

### 2. Run the Application

#### Local Development
1. Due to browser security, you need to serve files over HTTPS for AR features
2. Use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js
   npx http-server -p 8000

   # Using VS Code Live Server extension
   # Right-click index.html → Open with Live Server
   ```

3. Access via `http://localhost:8000`

#### For AR Testing on Mobile (Required for iOS)
1. Keep your local server running: `python3 -m http.server 8000`
2. In a new terminal, run ngrok:
   ```bash
   ngrok http 8000
   ```
3. Copy the HTTPS URL from ngrok output (e.g., `https://abc123.ngrok-free.app`)
4. **Important for iPhone users:**
   - Use Safari browser (Chrome doesn't support AR on iOS)
   - Open the HTTPS URL from ngrok
   - Click "View in AR" and allow camera access
5. Point at a flat surface and tap to place the model

### 3. Deployment Options

#### GitHub Pages (Free)
1. Push code to GitHub repository
2. Settings → Pages → Deploy from main branch
3. Access via `https://yourusername.github.io/repository-name`

#### Netlify (Free tier available)
1. Drag and drop project folder to [Netlify](https://netlify.com)
2. Automatic HTTPS and deployment

#### Vercel (Free tier available)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Follow prompts

## Project Structure

```
web_AR/
├── index.html                    # Main AR viewer page
├── css/
│   └── styles.css               # Styling and responsive design
├── js/
│   └── app.js                   # JavaScript functionality, AR controls
├── models/
│   ├── benchy.glb              # Current 3DBenchy boat model
│   ├── spacers M5 v1.glb       # M5 spacer component
│   └── untitled.glb            # Original test model
├── project-plan.md              # Detailed project plan
└── README.md                    # This documentation
```

## How to Build and Run

### Architecture Overview

The application follows a simple client-server architecture:

1. **Static Web Server**: Serves HTML, CSS, JS, and 3D model files
2. **Model-Viewer Component**: Handles 3D rendering and AR functionality
3. **WebXR Integration**: Provides AR capabilities through browser APIs
4. **HTTPS Tunnel**: ngrok provides secure connection for mobile AR testing

### Build Process

This is a **static web application** - no build process required:

1. **Development**: Direct file editing of HTML/CSS/JS
2. **3D Models**: GLB files are pre-processed and optimized
3. **Deployment**: Copy files to any web server
4. **Testing**: Local server + HTTPS tunnel for AR testing

## Usage

1. Open the web app on a compatible device
2. Click "View in AR" button
3. Allow camera permissions when prompted
4. Point camera at a flat surface (floor/table)
5. Tap to place the pod model
6. Use gestures to:
   - **Pinch**: Scale the model
   - **Rotate**: Turn the model
   - **Drag**: Move the model

## Customization

### Adjust Model Properties
Edit `index.html` to modify model-viewer attributes:
- `camera-orbit`: Initial viewing angle
- `shadow-intensity`: Shadow darkness (0-1)
- `exposure`: Brightness adjustment
- `ar-scale`: How model scales in AR

### Styling
Modify `css/styles.css` to change:
- Colors and fonts
- Button styles
- Layout and spacing

### Features
Add functionality in `js/app.js`:
- Custom controls
- Animation triggers
- Model variants
- Measurement tools

## Troubleshooting

### Model Not Loading
- Ensure `pod.glb` is in the `models` folder
- Check browser console for errors
- Verify file size is < 50MB

### AR Not Working
- Ensure HTTPS connection
- Check device compatibility
- Update browser to latest version
- Grant camera permissions

### Performance Issues
- Optimize model in Blender:
  - Reduce polygon count
  - Compress textures
  - Remove unnecessary details
- Use [glTF-Transform](https://gltf-transform.donmccurdy.com/) for optimization

## Resources

- [Model-viewer Documentation](https://modelviewer.dev/)
- [WebXR API Guide](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
- [GLTF Format Info](https://www.khronos.org/gltf/)
- [ARCore Supported Devices](https://developers.google.com/ar/devices)
- [ARKit Compatible Devices](https://www.apple.com/augmented-reality/)

## License

This project is open source. Feel free to modify and use for your needs.