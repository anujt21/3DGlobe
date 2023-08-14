import * as THREE from 'three';
import { GeoJsonGeometry } from 'three-geojson-geometry'; 
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';



// Rotation using mouse
/*
let targetRotationX = 0.01
let targetRotationY = 0.01
let mouseX = 0, mouseXOnMouseDown = 0, mouseY = 0, mouseYOnMouseDown = 0;
const windowHalfX = window.innerWidth/2
const windowHalfY = window.innerHeight/2
const dragFactor = 0.0002
const slowingFactor = 0.95
*/

// Create Scene and Renderer
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer(
	{
	antialias:  true
});
const maxLineWidth = renderer.getContext().getParameter(renderer.getContext().ALIASED_LINE_WIDTH_RANGE);
console.log('Max line width:', maxLineWidth[1]);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild( renderer.domElement );

// create earth geometry
const earthMaterial = new THREE.MeshPhongMaterial( { 
	map: new THREE.TextureLoader().load('textures/earthmap.jpeg'),
	bumpMap: new THREE.TextureLoader().load('textures/earth_bump.jpg'),
	bumpScale: 0.03
} );
const earthGeometry = new THREE.SphereGeometry(0.6, 64, 64);
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);


// Function to create a cylindrical line segment between two points
function createCylinderLine(v1, v2, radius) {
	const direction = new THREE.Vector3().subVectors(v2, v1);
	const orientation = new THREE.Matrix4();
	orientation.lookAt(v1, v2, new THREE.Object3D().up);
	orientation.multiply(new THREE.Matrix4().set(
	  1, 0, 0, 0,
	  0, 0, 1, 0,
	  0, -1, 0, 0,
	  0, 0, 0, 1
	));
	const edgeGeometry = new THREE.CylinderGeometry(radius, radius, direction.length(), 8, 1);
	const edgeMesh = new THREE.Mesh(edgeGeometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
	edgeMesh.applyMatrix4(orientation);
	const position = new THREE.Vector3().addVectors(v1, v2).divideScalar(2);
	edgeMesh.position.set(position.x, position.y, position.z);
	return edgeMesh;
}
  

fetch('textures/ScaledCountryBoundaries.geojson')
	.then((response) => response.json())
	.then((geojson) => {
	  geojson.features.forEach((feature) => {
		const coordinates = feature.geometry.coordinates[0]; // Assumes each feature is a single polygon
		coordinates.forEach((coord, index) => {
		  const [lng, lat] = coord;
		  const nextCoord = coordinates[(index + 1) % coordinates.length];
		  const [nextLng, nextLat] = nextCoord;
		  const radius = 0.6;
  
		  const theta1 = (90 - lat) * (Math.PI / 180);
		  const phi1 = (90+lng ) * (Math.PI / 180);
		  const v1 = new THREE.Vector3();
		  v1.setFromSphericalCoords(radius, theta1, phi1);
  
		  const theta2 = (90 - nextLat) * (Math.PI / 180);
		  const phi2 = (90+ nextLng ) * (Math.PI / 180);
		  const v2 = new THREE.Vector3();
		  v2.setFromSphericalCoords(radius, theta2, phi2);
  
		  const cylinderLine = createCylinderLine(v1, v2, 0.0002); // Radius of 0.001 for the cylindrical line
		  earthMesh.add(cylinderLine);
		});
	  });
	});




scene.add(earthMesh);

// create cloud geometry
const cloudMaterial = new THREE.MeshPhongMaterial( { 
	map: new THREE.TextureLoader().load('textures/earthCloud.png'),
	transparent: true
} );
const cloudGeometry = new THREE.SphereGeometry(0.605, 64, 64);
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(cloudMesh);

// create star geometry
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
const pointerlight = new THREE.PointLight(0xffffff, 20);
pointerlight.position.set(2.5,1.5,2.5);
scene.add(pointerlight);

// Add the camera
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 1.5

/*
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
*/

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true; // Enable inertia
controls.dampingFactor = 0.1; // Inertia factor

controls.rotateSpeed = 0.3; // Slower rotation speed
controls.zoomSpeed = 0.5; // Slower zoom speed
controls.panSpeed = 0.4; // Slower pan speed

controls.minDistance = 1; // Minimum zoom distance
controls.maxDistance = 10; // Maximum zoom distance

//controls.minPolarAngle = 0; // Restrict upward tilt
//controls.maxPolarAngle = Math.PI / 2; // Restrict downward tilt

controls.screenSpacePanning = false; // Panning behavior


// Animate and Render
function animate() {
	requestAnimationFrame( animate );
	controls.update();
	/*
	earthMesh.rotateOnWorldAxis(new THREE.Vector3(0,1,0), targetRotationX);
	earthMesh.rotateOnWorldAxis(new THREE.Vector3(1,0,0), targetRotationY);
	cloudMesh.rotateOnWorldAxis(new THREE.Vector3(0,1,0), targetRotationX);
	cloudMesh.rotateOnWorldAxis(new THREE.Vector3(1,0,0), targetRotationY);
	targetRotationX *= slowingFactor;
	targetRotationY *= slowingFactor;
	*/
	renderer.render( scene, camera );
}

animate();
document.addEventListener('mousedown', onDocumentMouseDown, false)
