---
title: GitHub Pages
description: Learn how to use GitHub Pages to host your map online. This will allow anyone to easily view your QGIS project on the web.
authors:
  - name: Nick Sandburg
    url: https://www.linkedin.com/in/nicksandburg/
date: 2025-10-21
---

# Sharing your map

Now that you have a map, you probably want to learn how to share it!
In this exercise, we will be learning how to do this with GitHub Pages.
GitHub Pages allows you to host your map online for anyone to view.

## GitHub account

**Note:** 
If you have a GitHub account, you can skip this section.

First, you will need to make a GitHub account.
Go to: [GitHub.com](https://github.com/) and create an account.
After you create an acoount, the next step is to create a repository, or a repo for short.
To learn more about GitHub and repositories, click [here](https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories).

## GitHub repository

**What is a GitHub repository?** <br>
A repository is like the central hub for a project.
The repository will contain all of your files for the project.
By making a repository, you can: track changes to your project, allow for multiple people to collaboration on your project, allow you to show different versions of your project, and you can even make it public or private.

**Create your repository** <br>
Let's start by creating a GitHub repository.
Now that your account has been created, click on the green "**New**" button.
At the top it should say "**Create a new repository**."
You will see your GitHub name with an empty repository name.
Create an appropriate name for your project here.
Next, create a small description of your project in the "**description**" text box.
Make sure that we are on "Public" under "**Choose visibility**."
After, click the on switch to turn on "**Add README**."
Finally, click the green "**Create repository**" button towards the bottom.

## Uploading files to our repository

Now that we have an empty project repository, we want to upload our files into it.
Click the "**Add file**" or "**+**" button next to the green "**<> Code**" button.
Next, click "upload files" and go to your files on your computer.
Find the folder containing all of your project files.
This file should contain your QGIS save file (ending with the .qgz extension), .geojson, along with other saved layers.

We don't need all of these files, We will only need our .geojson file.
Add only this file by dragging it to where it says, "Drag files here to add them to your repository."
Next, click on the green "**Commit changes**" button after the file has loaded.

**Note:**
Make sure that this .geojson file is not inside a folder on GitHub, otherwise the map will not show up when we make our page.
This is because GitHub pages will only check under root and not inside of a folder.
If for some reason this .geojson file is inside of a folder, you will need to move it from outside of the folder it's in.

## Adding Leaflet files
**Note:**
You will need Visual Studio Code or some type of text editor.

We will use [Leaflet](https://leafletjs.com/), a JavaScript library to display our map.
Refer back to the web mapping libraries section. **TODO: LINK BACK TO THE SECTION**
We will need to create 3 files:
1. index.html - contains the structure of our map and text or headings
2. script.js - JavaScript code that uses Leaflet to upload our map layers
3. style.css - stylesheet that determines the appearance of the map and page

Create these 3 files somewhere on your computer so you can drag them into GitHub after.
Use a text editor to add the following code below:

::: code-group

```html [index.html] ts:line-numbers {1}
<html>
  <head>
    <title>QGIS Drinking Water Map</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Leaflet CSS -->
    <link
      rel="stylesheet"
      href="https://unpkg.com/leaflet/dist/leaflet.css"
    />

    <!-- Custom stylesheet -->
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <div id="map"></div>

    <!-- Leaflet JS -->
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

    <!-- Custom JS -->
    <script src="./script.js"></script>
  </body>
</html>
```

```js [script.js] ts:line-numbers {1}
// Create the map centered roughly on San Diego
const map = L.map('map').setView([32.7157, -117.1611], 10);

// Add the base map tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/%7Bz%7D/%7Bx%7D/%7By%7D.png', {
  attribution: '© OpenStreetMap contributors',
}).addTo(map);

// Load your local GeoJSON file (it must be in the same folder)
fetch('SDG_Indicator_6.3.2_Clean_Water_andSanitation-_Tract_20251021.geojson')
  .then((response) => response.json())
  .then((data) => {
    L.geoJSON(data, {
      style: {
        color: 'blue',
        weight: 1,
        fillColor: 'skyblue',
        fillOpacity: 0.5,
      },
      onEachFeature: (feature, layer) => {
        const name = feature.properties.NAME || 'No name';
        layer.bindPopup(name);
      },
    }).addTo(map);
  })
  .catch((error) => console.error('Error loading GeoJSON:', error));
  ```

```css [style.css] ts:line-numbers {1}
#map {
  height: 100vh;
  width: 100%;
}
```

:::

Recall to the section above when we added the .geojson file to GitHub.
Repeat similar steps to add these 3 files to your GitHub.

**Note:**
Again, make sure that these 3 files are not inside of a folder.

**TODO**
finish here.

## Setting up GitHub pages

Now that you have a repository, lets set up GitHub pages.
GitHub pages allows you to have one "main" site per account and many "project" sites per account. <br>
**Main site example:** 
github-username.github.io <br>
**Project site example:** 
github-username.github.io/project-name

Towards the top of the screen, you should see a "**Settings**" tab.
Click on it.
On the left side, click on "**Pages**."
Under "**Build and deployment**" and **Source**," it should say "Deploy from a branch."
Under "**Branch**" select "**main**" and then "**root**" for the folder.
Click save.
Towards the top of the screen, click on the "**Actions**" tab.
Here we should see something like: "Pages build and deployment."
If there is a yellow loading circle, wait or refresh the page, and it should turn into a green check. 
This will show that the build is successful.

**Note:**
If nothing pops up, go back to Pages, and click "**none**" for the branch and then back to "**main**" to reset it.

After the build is successful, go back to "**Settings**" and "**Pages**."
Towards the top, we should now see that your site is live.
Click on "**Visit site**."
Your map should now pop up!

## Adding text to our page
Right now, we only see the map on our github page.
We can add text by editing our .html file and fix the format by editing our .css file.

**TODO**
finish here