import geopandas as gpd
from shapely.ops import transform
from shapely.geometry import MultiLineString
from functools import partial
import pyproj

def scale_coordinates(geometry):
    # Define a function to apply the scaling transformation
    def scaling(x, y):
        #x = (x ) * 8192 / 360
        #y = (y) * 4096 / 180
        return x, y

    # Apply the scaling transformation to the geometry
    return transform(scaling, geometry)

# Read the original GeoJSON file
geojson_path = 'textures/CountryBoundaries.geojson'
gdf = gpd.read_file(geojson_path)

# Apply the scaling function to the 'geometry' column
gdf['geometry'] = gdf['geometry'].apply(scale_coordinates)

# Save the result to a new GeoJSON file
scaled_geojson_path = 'textures/ScaledCountryBoundaries.geojson'
gdf.to_file(scaled_geojson_path, driver='GeoJSON')

