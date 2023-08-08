## Overview

The Spotify Playlist Bake application is a React front-end which uses the Spotify Open Web API to generate playlists. Users first choose seed artists, then fine-tune audio feature settings to generate suggested tracks. Finally, users can save the generated playlist to their account. The goal of the site is to expose the multitude of track attributes, audio parameters, and seed data that are used internally by the Spotify recommendation engine system. Rather than obfuscating these parameters into general questions and making black-box decisions, the site allows more users to fine-tune suggestions and tweak recomendation parameters to create meticulously curated playlists. For more information on recommendation criteria:

[https://developer.spotify.com/documentation/web-api/reference/get-recommendations](https://developer.spotify.com/documentation/web-api/reference/get-recommendations)

## Installation

To install and run the application locally, simply install dependencies and then start the dev server:

```
$ npm install
$ npm start
```


## Further work

Feature requests:

 - Ability to seed playlsits with genres and tracks

 - Ability to compose playlists using multiple different setting groups

 - Ability to fine-tune market and time signature settings

 - Ability to "spin the wheel" and create random playlists
