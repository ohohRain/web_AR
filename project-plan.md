## Web AR Pod Viewer - Project Plan

### Project Overview
Build a web-based AR application that allows users to visualize a 3D pod model in their space using their phone's camera, similar to IKEA's AR furniture placement app.

### Current Status
- **3D Model**: You have a SolidWorks file (`.SLDPRT`) which needs to be converted to a web-compatible format

### Technology Stack Recommendation

#### Frontend Framework
- **Model-viewer**: Google's web component for 3D/AR viewing (recommended for simplicity)
- Alternative: **A-Frame** with AR.js for more customization
- Alternative: **Three.js** with WebXR for maximum control

#### 3D Model Format
- Convert SLDPRT → **GLTF/GLB** format (web standard for 3D models)
- Tools: Use SolidWorks export, or online converters like CAD Exchanger

### Project Structure
```
web_AR/
├── index.html          # Main page with AR viewer
├── css/
│   └── styles.css      # Styling
├── js/
│   └── app.js          # AR functionality
├── models/
│   └── pod.glb         # Converted 3D model
├── project-plan.md     # This file
└── README.md           # Documentation
```

### Implementation Plan

#### Phase 1: Model Preparation
1. **Convert 3D Model**
   - Export SLDPRT to STL/OBJ from SolidWorks
   - Convert to GLTF/GLB using Blender or online tools
   - Optimize file size (target < 10MB for mobile)

#### Phase 2: Basic Setup
1. **Create HTML structure**
   - Add model-viewer component
   - Create AR button
   - Add instructions overlay

2. **Implement basic AR viewer**
   ```html
   <model-viewer 
     src="models/pod.glb"
     ar
     ar-modes="webxr scene-viewer quick-look"
     camera-controls
     auto-rotate>
   </model-viewer>
   ```

#### Phase 3: Enhanced Features
1. **Add placement controls**
   - Scale adjustment
   - Rotation controls
   - Shadow/lighting for realism

2. **Improve UX**
   - Loading indicators
   - Error handling
   - Mobile-optimized UI

#### Phase 4: Testing & Deployment
1. **Device Testing**
   - iOS Safari (ARKit)
   - Android Chrome (ARCore)
   - Fallback for unsupported devices

2. **Deployment**
   - GitHub Pages (free)
   - Netlify/Vercel (better performance)

### Technical Requirements
- **HTTPS required** for camera access
- Compatible browsers: Chrome 79+, Safari 12+
- Devices need ARCore (Android) or ARKit (iOS)

### Model Conversion Steps
Since you have a SLDPRT file, here are the detailed conversion steps:

1. **Using SolidWorks (if available)**:
   - Open your "Custom PODS MVP.SLDPRT" file
   - File → Save As → Select "STL (*.stl)" or "VRML (*.wrl)"
   - Save with appropriate quality settings

2. **Convert to GLTF/GLB**:
   - Use Blender (free):
     - Import STL/VRML file
     - File → Export → glTF 2.0
   - Or use online converter:
     - https://www.creators3d.com/online-converter
     - https://products.aspose.app/3d/conversion

3. **Optimize the model**:
   - Use https://gltf.report/ to analyze
   - Compress textures if needed
   - Reduce polygon count if > 100k for mobile

### Development Tasks
1. ✅ Create project plan (this document)
2. ⏳ Convert SLDPRT to GLTF/GLB format
3. ⏳ Set up basic HTML structure with model-viewer
4. ⏳ Create CSS for responsive mobile UI
5. ⏳ Add JavaScript for enhanced controls
6. ⏳ Test AR functionality on devices
7. ⏳ Add loading states and error handling
8. ⏳ Deploy to hosting service

### Resources
- [Model-viewer documentation](https://modelviewer.dev/)
- [WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
- [GLTF format info](https://www.khronos.org/gltf/)