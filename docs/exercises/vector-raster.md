---
title: Vector and raster
description: In this section we will be using vector data in QGIS. We will work with categorized data, graduated data, and then learn how to switch the data from vector to raster.
authors:
  - name: Nick Sandburg
    url: https://www.linkedin.com/in/nicksandburg/
date: 2025-09-25
---

::: warning
This exercise is a work in progress.
:::

# Vector and Raster data

## Categorized data
Double click your "**SDG Indicator...**" layer.
A new window should pop up.
Click "**Symbology**" on the left side.
Towards the top there should be a drop-down menu that currently says "**Single Symbol**."
Click this and go down to "**Categorized**."
In here, we can color our data based on the category data or value that we select. 
Directly under, there is a "**Value**" drop-down.
Click the down arrow and select "**drinking_water_percentile**."
This will organize the selected data by color.
In the lower left click "**Classify**."
We can uncheck certain values by unselecting them in the checkbox on the left side.
We can also double click the one of the current colors.
This will open up another window where you can change the color, opacity, etc.
We are going to click cancel for now.
This just shows you how we can color the categorized data.

## Graduated data
Double click your "**SDG Indicator...**" layer again.
Click "**Symbology**" on the left side.
In the drop-down menu towards the top click "**Graduated**."
If you click the "**Value**" drop-down nothing will pop up.
This is because we need to change the data type.
Click "**Cancel**" to get out.

Towards the top right of the screen next to "Help," click "**Processing**" and then "**Toolbox**."
This should open on the right side of your screen.
Search "**ref**" to find "**Refactor fields**" and double click on it.
This will open a new window and look for "**drinking_water_percentile**" under the "**Name**" column.
The "**Type**" of it should say "**Text (string)**."
Click it and change it to "**Decimal (double)**."
Then, click "**Run**."

A new layer should appear called "**Refactored**."
Double click this layer and go back to "**Graduated**."
Now, when we click on the "**Value**" drop-down we should see the drinking water percentile.
Click on it.
We can click on the "**Color ramp**" drop-down and choose one.
I am going to select Magma.
Next, click on the "**Mode**" drop-down and select "**Natural Breaks**."
We should now be able to see different value ranges as well as their specified color.
Click "**Apply**" then "**OK**."
Now, we can uncheck the previous SDG Indicator... layer that we were using.
You should now see something like this:

<ContentFigure 
   :imgSrc="'/exercise_files/images/pic5.png'"
   :description="'Graduated data'"
   :style="{'width': '275px' }"
/>

We can also double click on the colors under "**Layers**" and change each of them to be 50% Opacity.
This will make it so we can see more of the OSM layer as seen below:

<ContentFigure 
   :imgSrc="'/exercise_files/images/pic6.png'"
   :description="'Graduated data (50% Opacity)'"
   :style="{'width': '275px' }"
/>

Next, right click the Refractored layer and go to "**Export**" and then "**Save as Layer Definition File...**"
Click the 3 dots to the right of "**File name**" and select the save path.
Next name the file and then click save.
This should save as a .qlr file.
This will save our layer with the changes we made.

## Rasterize (vector to raster)
To rasterize the data, click on "**Raster**" at the top of the screen.
Next, go to "**Conversion**" and then click on "**Rasterize (Vector to Raster)...**"
Make sure that you have the correct vector "**Input layer**" that you want  to rasterize.
It should still be named "**Refactored**."
For the "**Field to use for burn-in value**" choose "**drinking_water_percentile**." Next, change the "**Output raster size units**" to "**Pixels**," and the "**Width**" and "**Height**" to 1,000 and 1,000.
Click "**Run**" and then "**Close**."
Your water percentile data has now been rasterized.
You should see something like this:

<ContentFigure 
   :imgSrc="'/exercise_files/images/pic7.png'"
   :description="'Rasterized Layer'"
   :style="{'width': '275px' }"
/>

If you would like to save this, right click on the "**Rasterized**" layer, go to "**Export**" and click "**Save As...**"
Click the 3 dots to the right of "**File name**."
First select the correct path where you would like to save it.
It should be saved in the folder for this exercise.
Then name the file in "**File name**."
Then, click "**Save**."
You should notice that the file extension is "**.tif**."
Also, at the top, the "**Format**" says "**GeoTIFF**."
Finally, click "**OK**."
You are now able to delete the temporary "**Rasterized**" layer, as you now have a new layer saved.

<!--
<p>
<a href="https://www.inaturalist.org/"> iNaturalist</a>.
</p>
-->