import geopandas as gpd
import json
from shapely.geometry import mapping

# Load GeoJSON files and ensure they're the same CRS
vancouver_boundary = gpd.read_file("van-boundary.geojson")
graffiti_points = gpd.read_file("van-graffiti.geojson")
graffiti_points = graffiti_points.to_crs(vancouver_boundary.crs)

output_features = []

# Iterate over each boundary and calculate graffiti counts
for _, boundary in vancouver_boundary.iterrows():
    # Create a GeoDataFrame for the current boundary
    boundary_gdf = gpd.GeoDataFrame([boundary], crs=vancouver_boundary.crs)
    
    # Perform a spatial join to find graffiti points within the boundary
    graffiti_within_boundary = gpd.sjoin(
        graffiti_points, boundary_gdf, how="inner", predicate="within"
    )

    # Sum up the 'count' property for all graffiti points within the boundary
    total_graffiti_count = graffiti_within_boundary["count"].sum()
    
    # Add the boundary and graffiti count to the output
    output_features.append({
        "type": "Feature",
        "geometry": mapping(boundary.geometry),
        "properties": {
            "neighborhood": boundary["name"],
            "graffiti_count": int(total_graffiti_count)
        }
    })

# Create the final GeoJSON structure
output_data = {
    "type": "FeatureCollection",
    "features": output_features
}

output_file = "VancouverGraffitiCount.json"
with open(output_file, "w") as f:
    json.dump(output_data, f, indent=4)
