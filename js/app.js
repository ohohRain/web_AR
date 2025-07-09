// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Get model viewer element
    const modelViewer = document.querySelector('#pod-viewer');
    const arPrompt = document.querySelector('#ar-prompt');
    
    // Handle model loading progress
    modelViewer.addEventListener('progress', (event) => {
        const progressBar = event.target.querySelector('.update-bar');
        const progress = event.detail.totalProgress;
        progressBar.style.width = `${progress * 100}%`;
        
        if (progress === 1) {
            // Hide progress bar after loading
            setTimeout(() => {
                progressBar.parentElement.style.display = 'none';
            }, 500);
        }
    });
    
    // Handle AR session events
    modelViewer.addEventListener('ar-status', (event) => {
        if (event.detail.status === 'session-started') {
            // AR session started
            console.log('AR session started');
            arPrompt.style.display = 'flex';
            
            // Hide prompt after 5 seconds
            setTimeout(() => {
                arPrompt.style.display = 'none';
            }, 5000);
        } else if (event.detail.status === 'not-presenting') {
            // AR session ended
            console.log('AR session ended');
            arPrompt.style.display = 'none';
        }
    });
    
    // Handle model loading errors
    modelViewer.addEventListener('error', (event) => {
        console.error('Model loading error:', event.detail);
        showError('Failed to load 3D model. Please check the model file.');
    });
    
    // Handle AR tracking status
    modelViewer.addEventListener('ar-tracking', (event) => {
        if (event.detail.state === 'tracking') {
            console.log('AR tracking active');
        }
    });
    
    // Check AR support after model loads
    modelViewer.addEventListener('load', () => {
        checkARSupport();
    });
    
    // Add keyboard controls for desktop testing
    addKeyboardControls();
    
    // Initialize color controls
    initializeColorControls();
});

// Check if AR is supported on the device
function checkARSupport() {
    const modelViewer = document.querySelector('#pod-viewer');
    const arButton = document.querySelector('#ar-button');
    
    // For iOS Safari, always show AR button since it should work
    if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
        console.log('iOS Safari detected - AR should be available');
        return;
    }
    
    // Check Android device
    if (navigator.userAgent.includes('Android')) {
        if (!modelViewer.canActivateAR) {
            arButton.style.display = 'none';
            showInfo('AR requires ARCore support. Check if your device is compatible at: https://developers.google.com/ar/devices');
            console.log('Android device detected but ARCore not supported');
        }
    } else if (!modelViewer.canActivateAR) {
        arButton.style.display = 'none';
        showInfo('AR is not supported on this device. You can still view the 3D model.');
    }
}

// Show error message
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #e74c3c;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideDown 0.3s ease;
    `;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Show info message
function showInfo(message) {
    const infoDiv = document.createElement('div');
    infoDiv.className = 'info-message';
    infoDiv.textContent = message;
    infoDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #3498db;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 1000;
        animation: slideDown 0.3s ease;
    `;
    
    document.body.appendChild(infoDiv);
    
    setTimeout(() => {
        infoDiv.remove();
    }, 5000);
}

// Add keyboard controls for desktop testing
function addKeyboardControls() {
    const modelViewer = document.querySelector('#pod-viewer');
    
    document.addEventListener('keydown', (event) => {
        switch(event.key) {
            case 'r':
                // Reset camera
                modelViewer.cameraOrbit = '45deg 75deg 2.5m';
                break;
            case '+':
            case '=':
                // Zoom in
                const currentDistance = parseFloat(modelViewer.cameraOrbit.split(' ')[2]);
                modelViewer.cameraOrbit = modelViewer.cameraOrbit.replace(/[\d.]+m$/, `${Math.max(1, currentDistance - 0.5)}m`);
                break;
            case '-':
                // Zoom out
                const currentDist = parseFloat(modelViewer.cameraOrbit.split(' ')[2]);
                modelViewer.cameraOrbit = modelViewer.cameraOrbit.replace(/[\d.]+m$/, `${Math.min(5, currentDist + 0.5)}m`);
                break;
        }
    });
}

// Initialize color controls
function initializeColorControls() {
    const modelViewer = document.querySelector('#pod-viewer');
    const customColorPicker = document.querySelector('#custom-color');
    
    // Function to apply color to model
    function applyColor(color) {
        modelViewer.addEventListener('load', () => {
            const material = modelViewer.model?.materials[0];
            if (material) {
                material.pbrMetallicRoughness.setBaseColorFactor(color);
            }
        });
        
        // If model already loaded, apply immediately
        const material = modelViewer.model?.materials[0];
        if (material) {
            material.pbrMetallicRoughness.setBaseColorFactor(color);
        }
    }
    
    // Handle custom color picker
    customColorPicker.addEventListener('change', (e) => {
        applyColor(e.target.value);
    });
    
    // Set initial color to grey
    modelViewer.addEventListener('load', () => {
        applyColor('#808080');
    });
}

// Add CSS animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
`;
document.head.appendChild(style);