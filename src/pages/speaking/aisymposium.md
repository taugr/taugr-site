---
layout: ../../layouts/PageLayout.astro
title: 'Data Analysis with ChatGPT Code Interpreter'
description: 'Data analysis with ChatGPT Code Interpreter prompts and resources.'
---

> Preserved from the old site: [https://tomauger.gitlab.io/aisymposium/](https://tomauger.gitlab.io/aisymposium/).

# Slides

https://docs.google.com/presentation/d/1KEGd7oV_wgkbVEhzQ6PkBn5McmP2Dgw_D6qORsEXyyY/edit?usp=sharing

# Datasets

- [https://github.com/tom-auger/tumo-ai-symposium](https://github.com/tom-auger/tumo-ai-symposium)
- Kaggle: [https://www.kaggle.com/datasets](https://www.kaggle.com/datasets)
- Project Gutenberg: [https://www.gutenberg.org/](https://www.gutenberg.org/)
- Armenian Data Catalog: [https://data.opendata.am/dataset/](https://data.opendata.am/dataset/)
- YouTube Audio Library: [https://studio.youtube.com/channel/UC6zu5WIr0n6TPqXDTeL4UPQ/music](https://studio.youtube.com/channel/UC6zu5WIr0n6TPqXDTeL4UPQ/music)

# Prompts

## General Analysis

```
Analyse this dataset and create visualizations of anything interesting.
```

```
Do a really sophisticated and interesting analysis with visualisations, create at least one 3D chart.
```

```
Conclude this analysis in one sentence. What are the key take-aways?
```

## Interactive Maps

### Haypost Dataset

https://data.opendata.am/dataset/armenian-post-branches

```
The following dataset contains details of post offices in Armenia including their addresses. Create an interactive map using the folium library. When I hover over each postal location show some interesting information. Create the dashboard as an HTML file I can download and run locally.
```

## Animated Charts

https://github.com/tom-auger/tumo-ai-symposium/raw/main/mostpopularsites.zip

```
Create an animated bar chart showing the popular websites per year using the plotly library and create an HTML file I can download and run locally.
```

### GPX Analysis

https://github.com/tom-auger/tumo-ai-symposium/raw/main/Isle_of_Mull_Sportive.gpx

```
Analyse this dataset and plot it on a map using the folium library. You can use folium and generate an HTML file that I can download and view. Show some interesting statistics like speed when hovering over the map.
```

```
Partition the route into sections for length 2km. For each section calculate the average speed over that section. Then on the map draw that section in a color based on the average speed for that section. Give me the map and a legend for the colours
```

## CSV Analysis

https://www.kaggle.com/datasets/nelgiriyewithana/top-spotify-songs-2023

```
Create a 3D interactive chart of these songs. Use the first row of the CSV to get the column headers. Highlight the most streamed song in each release month in yellow.
```

## Dashboards

```
Create an interactive dashboard with at least 6 insightful charts, including one in 3D. Make the dashboard look beautiful.
```

https://www.kaggle.com/datasets/rtatman/lego-database

```
This is Lego data. Give me a downloadable file with the following:

- A .html dashboard with the logo at the top center of the page
- Sans serif font
- Color scheme of LEGO both for the page and for the visualization
- Interactive plots using plotly.

The page should focus on design as much as on functionality. The design should be minimal. Use LEGO brand colors, drop shadows, and gradients. Visualizations should be in a grid layout.

Make sure the page will run locally on my machine.
```

## MP3 Analysis

https://github.com/tom-auger/tumo-ai-symposium/raw/main/Manj%20Khammaj%20-%20Aditya%20Verma.mp3

```
Analyse the following MP3 file. Do a sophisticated analysis. Identify the beat and tempo of the music. Analyse any emotions. Create charts to illustrate your findings.
```

```
Can you identify the musical key and time signature?
```

## Book Analysis

https://github.com/tom-auger/tumo-ai-symposium/raw/main/alice_adventures_wonderland.txt

```
Create a word cloud for this book.
```

```
Analyse this book and give me a summary consisting of bullet points telling me what the book is about and what happens in the story. Generate some visualisations that show what topics are covered in each chapter. Also create a word cloud.
```

## Create a snake game

```
Create a snake game that I can run in the browser. The game should fill the entire screen and start when I press any arrow key. Use interesting colours and effects. Give it to me as an HTML file to download.
```

# Tips

1. Let ChatGPT make a first attempt and then refine its output by asking for changes.

2. To make ChatGPT less chatty add something like "notalk;justgo" to the end of your prompts.

3. If you don't understand the output that ChatGPT has given you ask it to explain in simple terms.

# Things to try

1. Find another dataset on [https://www.kaggle.com/datasets](https://www.kaggle.com/datasets) or books from [https://www.gutenberg.org/](https://www.gutenberg.org/) to analyse. Create charts, dashboards, ask it for any interesting trends in the dataset.

2. Ask ChatGPT for interesting ways to analyse a particular type of dataset, then try them with code interpreter.

3. Create a Mind Map for a book or dataset.

4. Try using Claude AI to analyse books: [https://claude.ai](https://claude.ai).
