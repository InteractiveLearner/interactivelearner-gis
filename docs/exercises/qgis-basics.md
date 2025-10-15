---
title: QGIS basics
description: In this section we will be learning basic tasks in QGIS using vector data.
authors:
  - name: Nick Sandburg
    url: https://www.linkedin.com/in/nicksandburg/
date: 2025-10-14
---

# QGIS Basics

In this exercise you will create a new QGIS project, add a San Diego drinking water contaminants GeoJSON layer, navigate the map (pan and zoom), install and use the [QuickMapServices plugin](https://plugins.qgis.org/plugins/quick_map_services/) to add a basemap, set the project CRS to EPSG:3857, adjust layer symbology, and review concepts (choropleth and vector data) with a short quiz.

## Creating a new project

Open QGIS and left click twice on "**New Empty Project**" under "**Project Templates**."
You can also click on "**Project**" in the top left and select "**New**."
Create a folder somewhere on your computer to store this exercise.
This folder will be referred to as "**your exercise folder**."
This folder will store the data downloads as well as your overall QGIS project.

## What data are we using?

Lets say you are working for the City of San Diego's public health department.
You have been asked to identify areas where drinking water contaminants are higher compared to the rest of the city.
We can map this data in QGIS and then even style the data in different ways.
We are going to style this data by changing the color of each area to be lighter or darker depending on the percentile of contaminants found in drinking water.

What type of map this is?
This is a **choropleth map** because we are using shaded areas to represent our (drinking water contaminants by percentile) data.
You can also refer back to [types of maps](/lessons/map-types#types-of-thematic-maps).

## Downloading vector data

Lets start by creating a map using vector data from the [City of San Diego Open Data Portal](https://opendata.sandag.org/).
You can click [this link](https://opendata.sandag.org/Sustainable-Development-Goals/SDG-Indicator-6-3-2-Map-Drinking-Water/ig5f-77ey) or find the download on this project's GitHub under the "**exercise-download**" file.

Another option is to follow the instructions below to find the download through the website.
In the search for data bar type: "**water san diego 6.3.2**."
On the left side under "**View Types**" select "**Maps**."
Click on "**SDG Indicator 6.3.2 Map - Drinking Water**."
Click "**Export**" in the top right and for the Export Format select "**GeoJSON**."
Recall when we learned about the common vector data formats in the lesson: [Spatial data and its types](/lessons/spatial-data#types-of-spatial-data).

After downloading the file, open up another file window, and go to where your exercise folder is. 
Drag the download into your exercise folder.

## Adding a vector layer in QGIS

Go back to QGIS and find your file on the left side.
This file should now have the GeoJSON file inside of it.
Hold left click and drag the GeoJSON file and release it when under the **Layers** section just below.
You can also right click the GeoJSON file and select "**Add Layer to Project**." You should now see something like this:

<ContentFigure 
   :imgSrc="'/exercise_files/images/pic1.png'"
   :style="{'width': '275px' }"
/>

To read more about layers, click [this link](https://docs.qgis.org/3.40/en/docs/user_manual/managing_data_source/create_layers.html#).

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

## Basemap layers, Plugins, and saving

We are going to create a basemap layer.
This layer will go directly under our layer to give it geographic context.
It helps us see where our data or areas are located in relation to real-world features.
There are two different ways to add the basemap layer that we will cover.

1. **Using XYZ Tiles** <br>
Scroll down on the left side of the QGIS window where the documents are.
Look for "**XYZ Tiles**" and double click "**OpenStreetMap**."

2. **QuickMapServices plugin** <br>
There are some very useful plugins in QGIS.
If you would like to get some practice with plugins, let’s try adding one now: <br>
In the bar towards the top of the screen, click "**Plugins**" and "**Manage and Install Plugins...**"
In the search bar, type and install: "**QuickMapServices**."
The author is [NextGIS](https://nextgis.com/).
Make sure it pops up on the left side under "**Installed**" to see if it is downloaded.

If you are using the plugin, you may need to restart QGIS.
**Before restarting**, let's make sure that you save the exercise.
Click "**Project**" in the top left and "**save**."
Select a location and choose a file name.
The file should save as "**.qgz**."

## Finishing the basemap layer

If you installed the plugin, continue here.
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

Lets briefly cover **coordinate reference systems (CRS)**: <br>
The **CRS** defines how our data location corresponds to real places on Earth.
We want to make sure all layers have the same **CRS**.
If we don't, layers can appear shifted or misaligned.
In the bottom right corner, you should see something like "**EPSG: 4326**."
Change the map projection by clicking this and select: "**EPSG: 3857**." 
**EPSG: 3857** is what most maps use.
Click "**Apply**" and "**Okay**."
For more information on **CRS**, click [here](https://gis.stackexchange.com/questions/383434/changing-shapefiles-from-geographic-wgs84-to-projected-epsg2263-coordinate/383437#383437).

## Formatting Data

Double click your layer, it should look something like "**SDG Indicator...**" under "**Layers**" on the left side.
A new window should pop up.
On the left side, click "**Symbology**."
In here you can change the color of your data, the opacity, as well as choose different icons.
If you are happy with your changes, click "**Apply**" and then "**Okay**." Otherwise, just click cancel.

<Quiz :quiz-data="{
  questions: [
    {
      question: 'What type of map are we using in our exercise that shows drinking water contaminants by percentile?',
      options: [
        {
          answer: 'Choropleth Map',
          key: 1
        },
        {
          answer: 'Chorochromatic Map',
          key: 2
        },
        {
          answer: 'None of the above',
          key: 3
        }
      ],
      correctAnswer: 1
    },
    {
      question: 'What kind of data are we downloading?',
      options: [
        {
          answer: 'Raster',
          key: 1
        },
        {
          answer: 'Vector',
          key: 2
        }
      ],
      correctAnswer: 2
    },
  ]
}" />

**Didn't get the correct answer?**

**Question 1:** <br>
Refer back to [Types of spatial data](/lessons/spatial-data#types-of-spatial-data).

**Question 2:** <br>
Refer back to [Types of maps](/lessons/map-types#types-of-thematic-maps).