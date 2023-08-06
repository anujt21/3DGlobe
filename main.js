import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer(
	{
	antialias:  true
});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild( renderer.domElement );

// create a sphere

const material = new THREE.ShaderMaterial( { 
	vertexShader,
	fragmentShader
} );

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
