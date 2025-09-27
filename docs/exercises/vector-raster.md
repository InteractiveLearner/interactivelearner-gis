---
title: Vector and raster
description: In this section we will be using vector data in QGIS. We will then learn how to switch the data from vector to raster.
authors:
  - name: Nick Sandburg
    url: https://www.linkedin.com/in/nicksandburg/
date: 2025-09-25
---

::: warning
This exercise is a work in progress.
:::

# Categorized data

<h2>Categorized data</h2>
<p>Double click your "<b>SDG Indicator...</b>" layer. A new window should pop up. Click "<b>Symbology</b>" on the left side. Towards the top there should be a drop-down menu that currently says "<b>Single Symbol</b>." Click this and go down to "<b>Categorized</b>." In here, we can color our data based on the category data or value that we select. Directly under, there is a "<b>Value</b>" drop-down. Click the down arrow and select "<b>drinking_water_percentile</b>." This will organize the selected data by color. In the lower left click "<b>Classify</b>." We can uncheck certain values by unselecting them in the checkbox on the left side. We can also double click the one of the current colors. This will open up another window where you can change the color, opacity, etc. We are going to click cancel for now. This just shows you how we can color the categorized data.</p>

<h2>Graduated data</h2>
<p>Double click your "<b>SDG Indicator...</b>" layer again. Click "<b>Symbology</b>" on the left side. In the drop-down menu towards the top click "<b>Graduated</b>." If you click the "<b>Value</b>" drop-down nothing will pop up. This is because we need to change the data type. Click "<b>Cancel</b>" to get out.</p>

<p>Towards the top right of the screen next to "Help," click "<b>Processing</b>" and then "<b>Toolbox</b>." This should open on the right side of your screen. Search "<b>ref</b>" to find "<b>Refactor fields</b>" and double click on it. This will open a new window and look for "<b>drinking_water_percentile</b>" under the "<b>Name</b>" column. The "<b>Type</b>" of it should say "<b>Text (string)</b>." Click it and change it to "<b>Decimal (double)</b>." Then, click "<b>Run</b>."</p>

<p>A new layer should appear called "<b>Refactored</b>." Double click this layer and go back to "<b>Graduated</b>." Now, when we click on the "<b>Value</b>" drop-down we should see the drinking water percentile. Click on it. We can click on the "<b>Color ramp</b>" drop-down and choose one. I am going to select Magma. Next, click on the "<b>Mode</b>" drop-down and select "<b>Natural Breaks</b>." We should now be able to see different value ranges as well as their specified color. Click "<b>Apply</b>" then "<b>OK</b>." Now, we can uncheck the previous SDG Indicator... layer that we were using. You should now see something like this:</p>

<ContentFigure 
   :imgSrc="'/exercise_files/images/pic5.png'"
   :description="'Graduated data'"
   :style="{'width': '275px' }"
/>

<p>We can also double click on the colors under "<b>Layers</b>" and change each of them to be 50% Opacity. This will make it so we can see more of the OSM layer as seen below:</p>

<ContentFigure 
   :imgSrc="'/exercise_files/images/pic6.png'"
   :description="'Graduated data (50% Opacity)'"
   :style="{'width': '275px' }"
/>

<p>Next, right click the Refractored layer and go to "<b>Export</b>" and then "<b>Save as Layer Definition File...</b>" Click the 3 dots to the right of "<b>File name</b>" and select the save path. Next name the file and then click save. This should save as a .qlr file. This will save our layer with the changes we made.</p>

<h2>Rasterize (vector to raster)</h2>
<p>To rasterize the data, click on "<b>Raster</b>" at the top of the screen. Next, go to "<b>Conversion</b>" and then click on "<b>Rasterize (Vector to Raster)...</b>" Make sure that you have the correct vector "<b>Input layer</b>" that you want  to rasterize. It should still be named "<b>Refactored</b>." For the "<b>Field to use for burn-in value</b>" choose "<b>drinking_water_percentile</b>." Next, change the "<b>Output raster size units</b>" to "<b>Pixels</b>," and the "<b>Width</b>" and "<b>Height</b>" to 1,000 and 1,000. Click "<b>Run</b>" and then "<b>Close</b>." Your water percentile data has now been rasterized. You should see something like this: </p>

<ContentFigure 
   :imgSrc="'/exercise_files/images/pic7.png'"
   :description="'Rasterized Layer'"
   :style="{'width': '275px' }"
/>

<p>If you would like to save this, right click on the "<b>Rasterized</b>" layer, go to "<b>Export</b>" and click "<b>Save As...</b>" Click the 3 dots to the right of "<b>File name</b>." First select the correct path where you would like to save it. It should be saved in the folder for this exercise. Then name the file in "<b>File name</b>." Then, click "<b>Save</b>." You should notice that the file extension is "<b>.tif</b>." Also, at the top the "<b>Format</b>" says "<b>GeoTIFF</b>." Finally, click "<b>OK</b>." You are now able to delete the temporary "<b>Rasterized</b>" layer, as you now have a new layer saved.</p>

<!--
<p>
<a href="https://www.inaturalist.org/"> iNaturalist</a>.
</p>
-->