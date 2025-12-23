console.log("✅ 3D Avatar loaded");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.z = 4;

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(300, 300);
document.getElementById("avatarContainer").appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1.2);
light.position.set(3, 5, 4);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// HEAD
const head = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0x00aaff })
);
scene.add(head);

// LEFT EYE
const leftEye = new THREE.Mesh(
  new THREE.SphereGeometry(0.1, 16, 16),
  new THREE.MeshStandardMaterial({ color: 0x000000 })
);
leftEye.position.set(-0.3, 0.3, 0.9);
scene.add(leftEye);

// RIGHT EYE
const rightEye = leftEye.clone();
rightEye.position.x = 0.3;
scene.add(rightEye);

// MOUTH (FIXED SIZE)
const mouth = new THREE.Mesh(
  new THREE.BoxGeometry(0.45, 0.15, 0.1),
  new THREE.MeshStandardMaterial({ color: 0x000000 })
);
mouth.position.set(0, -0.45, 0.9);
scene.add(mouth);
const mouthBaseY = mouth.position.y;

// Speaking state
let speaking = false;

// Animation helpers
let smoothMouth = 1;
let blinkTime = 0;
let talkTime = 0;

// Animate
function animate() {
  requestAnimationFrame(animate);

  // Idle head rotation
  head.rotation.y += 0.002;

  // Eye blinking
  blinkTime += 0.05;
  const blink = Math.abs(Math.sin(blinkTime)) > 0.98 ? 0.1 : 1;
  leftEye.scale.y = blink;
  rightEye.scale.y = blink;

  // Simulated lip-sync (FIXED)
  if (speaking) {
    talkTime += 0.15;

    // Speech pulse (open / close rhythm)
    const pulse = Math.abs(Math.sin(talkTime));
    const targetMouth = 1 + pulse * 0.6;

    smoothMouth += (targetMouth - smoothMouth) * 0.25;
    mouth.scale.y = smoothMouth;
    mouth.position.y = mouthBaseY - (smoothMouth - 1) * 0.08;

     // Subtle head movement
    head.rotation.x = pulse * 0.05;
    head.scale.set(1.03, 1.03, 1.03);
  } else {
    smoothMouth += (1 - smoothMouth) * 0.25;
    mouth.scale.y = smoothMouth;
    mouth.position.y = mouthBaseY;


    head.scale.set(1, 1, 1);
    head.rotation.x = 0;
  }

  renderer.render(scene, camera);
}

animate();

// Speech controls
window.startSpeaking = () => {
  speaking = true;
  talkTime = 0;
};

window.stopSpeaking = () => {
  speaking = false;
  talkTime = 0;
  smoothMouth = 1;
};

