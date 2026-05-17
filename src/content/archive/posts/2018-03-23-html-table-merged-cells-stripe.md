---
title: 'Striping an HTML table with merged cells'
description: 'A common style applied to HTML tables with lots of data is to make them striped, i.e. set the background color of alternate rows. This is easy to do when each tr represents an individual row to be striped, but if you...'
date: 2018-03-23
tags: ['html', 'css']
draft: false
originalUrl: 'https://tomauger.gitlab.io/posts/2018-03-23-html-table-merged-cells-stripe/'
archivePath: '2018-03-23-html-table-merged-cells-stripe'
---

> Archived from the old blog. Original URL: [https://tomauger.gitlab.io/posts/2018-03-23-html-table-merged-cells-stripe/](https://tomauger.gitlab.io/posts/2018-03-23-html-table-merged-cells-stripe/).

A common style applied to HTML tables with lots of data is to make them striped, i.e. set the background color of alternate rows. This is easy to do when each `tr` represents an individual row to be striped, but if you have cells merged across multiple rows then this doesn't work.

When each `tr` represents a single row, the standard way of striping a table is with some CSS such as:

```css
table tbody tr:nth-child(even) {
  background-color: #e8e8e8;
}
```

This will produce a table like the following:

<table>
  <thead>
    <tr>
      <th>Team</th>
      <th>Bikes</th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <td>BMC Racing</td>
      <td>BMC</td>
    </tr>
    <tr>
      <td>Team Movistar</td>
      <td>Canyon</td>
    </tr>
    <tr>
      <td>Team Sky</td>
      <td>Pinarello</td>
    </tr>
  </tbody>
</table>

In this case everything works fine, but it goes horribly wrong if you have cells that span multiple rows:

<table>
  <thead>
    <tr>
      <th>Country</th>
      <th>Bike Manufacturers</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">Germany</td>
      <td>Canyon</td>
    </tr>
    <tr>
      <td>Cube</td>
    </tr>
    <tr>
      <td>Focus</td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td rowspan="2">United Kingdom</td>
      <td>Raleigh</td>
    </tr>
    <tr>
      <td>Ribble</td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td rowspan="2">United States</td>
      <td>Marin</td>
    </tr>
    <tr>
      <td>Trek</td>
    </tr>
  </tbody>
</table>

To solve this problem, use multiple `tbody` elements by placing all the rows with a common background into their own dedicated `tbody`. The CSS to stripe such a table becomes:

```css
table tbody:nth-child(even) {
  background-color: #e8e8e8;
}
```

The following CodePen demonstrates this trick:

<p></p>
<p data-height="500" data-theme-id="0" data-slug-hash="MVvbaO" data-default-tab="html,result" data-user="tomauger" data-embed-version="2" data-pen-title="TableHighlightFail" class="codepen">See the Pen <a href="https://codepen.io/tomauger/pen/MVvbaO/">TableHighlightFail</a> by Tom Auger (<a href="https://codepen.io/tomauger">@tomauger</a>) on <a href="https://codepen.io">CodePen</a>.</p>
