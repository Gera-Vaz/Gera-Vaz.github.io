// script-3d.js

const container = document.getElementById('threejs-container');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Luz
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 1);
scene.add(light);

// Carga del modelo
let model;
const loader = new THREE.GLTFLoader();
loader.load('logo3d.glb', (gltf) => {
    model = gltf.scene;
    model.scale.set(2, 2, 2); // ← Aquí se escala al doble
    scene.add(model);
  }, undefined, (error) => {
    console.error('Error cargando modelo:', error);
  });
  

// Movimiento con el mouse
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
  mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
});

function animate() {
  requestAnimationFrame(animate);
  if (model) {
    const maxY = Math.PI / 6;
    const maxX = Math.PI / 12;
    model.rotation.y = THREE.MathUtils.clamp(mouseX * Math.PI / 2, -maxY, maxY);
    model.rotation.x = THREE.MathUtils.clamp(mouseY * Math.PI / 3, -maxX, maxX);
    model.rotation.z = 0;
  }
  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
