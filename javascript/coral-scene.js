import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

// get reference to the existing canvas element
const canvas = document.getElementById('glCanvas');
const container = document.getElementById('coral-container');
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;

// create an orthographic camera
const aspect = containerWidth / containerHeight;
const d = 1.2;
const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
camera.position.set(5, 5, 5); // all components equal
camera.lookAt(scene.position); // or the origin


// create a WebGLRenderer and specify the canvas
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(containerWidth, containerHeight);

// load GLB model
const loader = new GLTFLoader();
loader.load(
    'https://firebasestorage.googleapis.com/v0/b/fed-ca1-92e58.appspot.com/o/coral.glb?alt=media&token=3df23d65-9c81-4e98-acc5-9bdf9f288257',
    function (gltf) {
        const model = gltf.scene;
        model.position.y -= 0.55; // move the model down by 5 units
        // add loaded model to the scene
        scene.add(gltf.scene);
    },
    undefined,
    function (error) {
        console.error('Error loading GLB model:', error);
    }
);

// create OrbitControls with rotation only
const controls = new OrbitControls(camera, canvas);
controls.enableRotate = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.autoRotate = true; 
controls.autoRotateSpeed = 1.0; 

// lock the y-axis rotation
controls.maxPolarAngle = Math.PI / 2.5; // 90 degrees
controls.minPolarAngle = Math.PI / 2.5; // 90 degrees

controls.update();

const ambientLight = new THREE.AmbientLight(0xd6ffe9, 5); 
scene.add(ambientLight);

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const aspect = containerWidth / containerHeight;

    camera.left = -d * aspect;
    camera.right = d * aspect;
    camera.top = d;
    camera.bottom = -d;

    camera.updateProjectionMatrix();

    renderer.setSize(containerWidth, containerHeight);
}

// animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // update controls
    renderer.render(scene, camera);
}
animate();


