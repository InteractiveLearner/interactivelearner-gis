import json
from shapely.geometry import shape
from shapely.ops import transform
import pyproj

# Load the JSON file
with open("./docs/data/us-states.json", "r") as f:
    data = json.load(f)

# Function to calculate area in square kilometers
def calculate_area_sqkm(feature):
    geom = shape(feature["geometry"])
    # Project geometry to an equal-area projection (e.g., Albers Equal Area)
    project = pyproj.Transformer.from_crs("EPSG:4326", "EPSG:5070", always_xy=True).transform
    geom_projected = transform(project, geom)
    area_sqkm = geom_projected.area / 1e6  # Convert m² to km²
    return round(area_sqkm, 2)

# Add area_sqkm and population density to each state's properties
for feature in data["features"]:
    try:
        area_sqkm = calculate_area_sqkm(feature)
        feature["properties"]["area_sqkm"] = area_sqkm
        # Calculate population density if population is available
        population = feature["properties"].get("population")
        if population and area_sqkm > 0:
            feature["properties"]["density"] = round(int(population) / area_sqkm, 2)
        else:
            feature["properties"]["density"] = None
    except Exception as e:
        feature["properties"]["area_sqkm"] = None
        feature["properties"]["density"] = None  # fallback if calculation fails

# Save the modified JSON to a new file
output_path = "./docs/data/us-states-with-area-density.json"
with open(output_path, "w") as f:
    json.dump(data, f, indent=2)

output_path