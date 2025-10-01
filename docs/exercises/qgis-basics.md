---
title: QGIS basics
description: In this section we will be learning basic tasks in QGIS using vector data.
authors:
  - name: Nick Sandburg
    url: https://www.linkedin.com/in/nicksandburg/
date: 2025-08-20
---

::: warning
In this exercise, we'll be covering a few basic tasks in QGIS using vector data.
:::

# QGIS Basics

## Creating a new project
Open QGIS and left click twice on "**New Empty Project**" under "**Project Templates**."
You can also click on "**Project**" in the top left and select "**New**."
Create a file somewhere on your computer to store this exercise.
This file will store the data downloads as well as your overall QGIS project.

## Downloading vector data
Lets start by creating a map using vector data.
This data is going to come from the website: [City of San Diego Open Data Portal](https://www.inaturalist.org/).
You can find the exact download file inside of the "**exercise_files**" folder.
You can also click [this link](https://opendata.sandag.org/Sustainable-Development-Goals/SDG-Indicator-6-3-2-Map-Drinking-Water/ig5f-77ey)
 or follow the instructions below to find the download through the website.

 <Stepper 
  :steps="[
    { heading: 'water san diego 6.3.2', content: 'Step 1 content.'},
    { heading: 'Add data', content: 'Step 2 content' },
    { heading: 'Add images', content: 'Step 3 content' },
    { heading: 'Review', content: 'Step 4 content' }
  ]"
  :currentStep="2"
/>

1. In the search for data bar type: "**water san diego 6.3.2**." <br>
2. On the left side under "**View Types**" select "**Maps**" and click on "**SDG Indicator 6.3.2 Map - Drinking Water**." <br>
3. Click "**Export**" in the top right and for the Export Format select "**GeoJSON**."

After downloading the file, open up another file window, and go to where your selected exercise file is. 
Drag the download into this exercise file.

## Adding a vector layer in QGIS
Go back to QGIS and find your file on the left side.
This file should now have the GeoJSON file inside of it.
Hold left click and drag the GeoJSON file and release it when under the **Layers** section just below.
You can also right click the GeoJSON file and select "**Add Layer to Project**." You should now see something like this:

<ContentFigure 
   :imgSrc="'/exercise_files/images/pic1.png'"
   :style="{'width': '275px' }"
/>

## Navigating QGIS
By default, you should already have "**Pan Map**" selected.
This is the hand icon towards the top of the screen.
In this mode you can hold left click, and move around to see different parts of the map.
Refer to the picture below:

<ContentFigure 
   :imgSrc="'/exercise_files/images/pic4.png'"
   :description="'Pan Map icon'"
   :style="{'width': '300px' }"
/>

In this picture, there is also a zoom in (magnifying glass with a plus) and zoom out button (magnifying glass with a minus).
You can click one of these and then left click to either zoom in or zoom out.
You can also zoom in and out by either moving your mouse scroll, or using CTRL + and CTRL - if on windows.
Don't forget to click back on "**Pan Map**" in order to move the map around again.

## Plugins and saving
Next, in the bar towards the top of the screen, click "**Plugins**" and "**Manage and Install Plugins...**"
In the search bar, type and install: "**QuickMapServices**."
The author is [NextGIS](https://nextgis.com/).
Make sure it pops up on the left side under "**Installed**" to see if it is downloaded.
You might need to restart QGIS to be able to use the plugin.
Before restarting, make sure that you save the exercise.
Click "**Project**" in the top left and "**save**."
Select a location and choose a file name.
The file should save as "**.qgz**."

## Create a basemap layer
Towards the top right of the screen, hover your mouse over a few of the icons and find "**QuickMapServices**."
It should look like this:

<ContentFigure 
   :imgSrc="'/exercise_files/images/pic2.png'"
   :description="'QuickMapServices'"
   :style="{'width': '300px' }"
/>

Click on it -> OSM -> OSM Standard.<br> 
You should now see something like this:<br>

<ContentFigure 
   :imgSrc="'/exercise_files/images/pic3.png'"
   :description="'QuickMapServices'"
   :style="{'width': '275px' }"
/>

In the bottom right corner, you should see something like "**EPSG: 4326**."
We can change the map projection by clicking this and select: "**EPSG: 3857**." This is what most maps use.
Click "**Apply**" and "**Okay**."

## Formatting Data
Double click your layer, it should look something like "**SDG Indicator...**" under "**Layers**" on the left side.
A new window should pop up.
On the left side, click "**Symbology**."
In here you can change the color of your data, the opacity, as well as choose different icons.
If you are happy with your changes, click "**Apply**" and then "**Okay**." Otherwise, just click cancel.