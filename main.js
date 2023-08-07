import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

// Rotation using mouse
let targetRotationX = 0.01
let targetRotationY = 0.01
let mouseX = 0, mouseXOnMouseDown = 0, mouseY = 0, mouseYOnMouseDown = 0;
const windowHalfX = window.innerWidth/2
const windowHalfY = window.innerHeight/2
const dragFactor = 0.0002
const slowingFactor = 0.99

// Create Scene and Renderer
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer(
	{
	antialias:  true
});

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild( renderer.domElement );

// create earth geometry
const earthMaterial = new THREE.MeshPhongMaterial( { 
	map: new THREE.TextureLoader().load('textures/earthmap.jpeg'),
	bumpMap: new THREE.TextureLoader().load('textures/earth_bump.jpg'),
	bumpScale: 0.01
} );
const earthGeometry = new THREE.SphereGeometry(0.5, 64, 64);
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);

// create cloud geometry
const cloudMaterial = new THREE.MeshPhongMaterial( { 
	map: new THREE.TextureLoader().load('textures/earthCloud.png'),
	transparent: true
} );
const cloudGeometry = new THREE.SphereGeometry(0.505, 64, 64);
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(cloudMesh);

// create start geometry
const starGeometry = new THREE.SphereGeometry(50, 100, 100);
const starMaterial = new THREE.MeshBasicMaterial({
	map: new THREE.TextureLoader().load('textures/galaxy.png'),
	side: THREE.BackSide
});
const starMesh =  new THREE.Mesh(starGeometry, starMaterial);
scene.add(starMesh)

// Add light
const ambientlight = new THREE.AmbientLight(0xffffff, 0.14);
scene.add(ambientlight);
const pointerlight = new THREE.PointLight(0xffffff, 30);
pointerlight.position.set(2.5,1.5,2.5);
scene.add(pointerlight);

// Add the camera
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 1.5

// Mouse movements
function onDocumentMouseDown( event ) {
    event.preventDefault();
    document.addEventListener('mousemove', onDocumentMouseMove, false );
    document.addEventListener('mouseup', onDocumentMouseUp, false );
    mouseXOnMouseDown = event.clientX - windowHalfX;
    mouseYOnMouseDown = event.clientY - windowHalfY;
}

function onDocumentMouseMove( event ) {
    mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
    targetRotationX = ( mouseX - mouseXOnMouseDown ) * dragFactor;
    targetRotationY = ( mouseY - mouseYOnMouseDown ) * dragFactor;
}

function onDocumentMouseUp( event ) {
    document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
    document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
}

// Animate and Render
function animate() {
	requestAnimationFrame( animate );
	earthMesh.rotateOnWorldAxis(new THREE.Vector3(0,1,0), targetRotationX);
	earthMesh.rotateOnWorldAxis(new THREE.Vector3(1,0,0), targetRotationY);
	cloudMesh.rotateOnWorldAxis(new THREE.Vector3(0,1,0), targetRotationX);
	cloudMesh.rotateOnWorldAxis(new THREE.Vector3(1,0,0), targetRotationY);
	targetRotationX *= slowingFactor;
	targetRotationY *= slowingFactor;
	renderer.render( scene, camera );
}

animate();
document.addEventListener('mousedown', onDocumentMouseDown, false)
