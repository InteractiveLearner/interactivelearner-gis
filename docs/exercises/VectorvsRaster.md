---
title: Implementing Vector and Raster Data
description: In this section we will be using vector data in QGIS. We will then learn how to switch the data from vector to raster.
authors:
  - name: Nick Sandburg
    url: https://www.linkedin.com/in/nicksandburg/
date: 2025-14-07
---

::: warning
This exercise is a work in progress.
:::

<h1>Creating a new project</h1>
<p> Open QGIS and left click twice on "<b>New Empty Project</b>" under "<b>Project Templates</b>." You can also click on "<b>Project</b>" in the top left and select "<b>New.</b>" Create a file somewhere on your computer to store this exercise. This file will store the data downloads as well as your overall QGIS project. </p>

<h1>Downloading vector data</h1>
<p> Lets start by creating a map using vector data. This data is going to come from the website: <a href="https://www.inaturalist.org/"> City of San Diego Open Data Portal</a>. You can find the exact download file inside of the "<b>exercise_files</b>" folder. You can also click <a href="https://opendata.sandag.org/Sustainable-Development-Goals/SDG-Indicator-6-3-2-Map-Drinking-Water/ig5f-77ey"> this link</a> or follow the instructions below to find the download through the website.</p>

<p>1. In the search for data bar type: "<b>water san diego 6.3.2</b>." <br>
2. On the left side under "<b>View Types</b>" select "<b>Maps</b>" and click on "<b>SDG Indicator 6.3.2 Map - Drinking Water</b>." <br>
3. Click "<b>Export</b>" in the top right and for the Export Format select "<b>GeoJSON</b>." <br>
4. Open up another file window and drag this download into your selected file. <br></p>

<h1>Adding a vector layer in QGIS</h1>
<p>Go back to QGIS and find your file on the left side. This file should now have the GeoJSON file inside of it. Hold left click and drag the GeoJSON file and release it when under the <b>Layers</b> section just below. You can also right click the GeoJSON file and select "<b>Add Layer to Project</b>." You should now see something like this:</p>

<h1>Plugins and saving</h1>
<p> Next, in the bar towards the top of the screen, click "<b>Plugins</b>" and "<b>Manage and Install Plugins...</b>." In the search bar, type and install: "<b>QuickMapServices</b>." The author is NextGIS. Make sure it pops up on the left side under "<b>Installed</b>" to see if it is downloaded. You might need to restart QGIS to be able to use the plugin. Before restarting, make sure that you save the exercise. Click "<b>Project</b>" in the top left and "<b>save</b>." Select a location and choose a file name. The file should save as "<b>.qgz</b>." </p>

<h1>Create a basemap layer</h1>
<p> Towards the top right of the screen, hover your mouse over a few of the icons and find "<b>QuickMapServices</b>." It should look like this: </p>

<p>Click on it -> OSM -> OSM Standard.<br> You should now see something like this:
In the bottom right corner, you should see something like "<b>EPSG: 4326</b>." We can change the map projection by clicking this and select: "<b>EPSG: 3857</b>." This is what most maps use. Click "<b>Apply</b>" and "<b>Okay</b>."
</p>




<p> Towards the top right of the screen, click "<b>Processing</b>" and "<b>Toolbox</b>." </p>

<p>
<a href="https://www.inaturalist.org/"> iNaturalist</a>.
</p>