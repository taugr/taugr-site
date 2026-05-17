---
title: 'Change Blackboard Collaborate recording playback speed'
description: "Blackboard Collaborate lecture recordings don't have a button to adjust the playback speed. I wrote a simple bookmarklet to achieve this instead."
date: 2020-09-30
tags: ['hacks']
draft: false
originalUrl: 'https://tomauger.gitlab.io/posts/2020/2020-09-30-speed-up-blackboard-collaborate/'
archivePath: '2020/2020-09-30-speed-up-blackboard-collaborate'
---

> Archived from the old blog. Original URL: [https://tomauger.gitlab.io/posts/2020/2020-09-30-speed-up-blackboard-collaborate/](https://tomauger.gitlab.io/posts/2020/2020-09-30-speed-up-blackboard-collaborate/).

Blackboard Collaborate lecture recordings don't have a button to adjust the playback speed. I wrote a simple bookmarklet to achieve this instead.

To install, drag the button below to your bookmarks bar (in Firefox you can also right click and select 'Bookmark This Link') and name it whatever you like:

<div style="text-align:center">
<a title="Speed up lecture" id="bookmarkletbtn" href="javascript:void(document.querySelectorAll(%27video%27)[0].playbackRate=window.prompt(%27Enter playback speed%27, %271.5%27))">
Speed up lecture
</a>
</div>

When you are watching a lecture recording in Blackboard click the bookmark you've just created.

A prompt will ask you to enter the playback speed, 1.5 is entered as the default, but you can enter any decimal number. Press enter or click OK and the playback speed will be immediately applied.

<div style="text-align:center">

![input prompt](/img/2020-09-30/inputbox.png)

</div>

You'll need to repeat this every time you load a new recording or refresh the page.

To change the default playback speed edit the bookmark and change `1.5` to another value in the code in the bookmark URL.

Tested on Chrome and Firefox.

Unfortunately fast forward doesn't work with live lecture streams! 😉
