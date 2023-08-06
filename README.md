# 3DGlobe
The goal of our project is to map Various categories of demographic data onto a 3D globe. Extremely detailed geographical and terrain is not necessary; an interactive 3D globe with boundaries for countries and states (maybe prominent cities) should be sufficient.

## General Guide
For now, we can start the project with Three.js

### 3D Library Setup:
Set up Three.js library and then create a scene, a camera, and a renderer. Finally, append the renderer to the HTML document.

### Creating the Globe:
The globe can be created as a sphere geometry in Three.js. For the material of the sphere, we can use a texture loader to load an equirectangular image of the Earth. 

### Adding Country and State boundaries:
We can use a vector data format such as GeoJSON, KML, or Shapefile for the boundaries of the countries and states. We can then format it to overaly on the globe.

### Interactivity
To select countries or states, we can use ray casting. The first object that the ray intersects with is determined to be the object the user clicked on.
 