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

## Integration of geographical data

There are several sources for the geographical data for country, state, and city boundaries: Natural Earth, OpenStreetMap, GADM, DIVA-GIS, etc. For our project, Natural Earth should be a good fit. With boundaries we would require dynamic loading and unloading of detailed textures and features. This is referred to as Level of Detail (LOD). Three.js has built-in support for LOD.

The following give a general idea of how we can implement this:

### Level of Detail (LOD): 
When the globe is fully zoomed out, a lower resolution texture can be used, and no country or state boundaries need to be shown. As the user zooms in, higher resolution textures can be loaded, and more details (like country boundaries) can start to be drawn. Each of level of detail would be a different mesh that gets swapped out based on the camera's distance to the globe.

### Dynamic Loading:
Loading all textures and geographic features at the highest level of detail from the start would be resource-intensive. Therefore, we would ideally want to load (and unload) these resources dynamically as needed.

### Optimization: 
Loading high-resolution textures and a large amount of geographic data can be time consuming, so we would want to optimize this as much as possible. 