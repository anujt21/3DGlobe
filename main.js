import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// create a sphere
const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const geometry = new THREE.SphereGeometry(5, 50, 50);
const sphere = new THREE.Mesh( geometry, material);

scene.add(sphere)

// This is done to position the camera outside the sphere 
camera.position.z = 10

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

animate();
