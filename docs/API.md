# WebTorrentPlayer Documentation
## Usage:
```js
const client = new WebTorrentPlayer(options)
```
Options:

\* required
```js
{
  video: Node,                  // * Video element for the player
  player: Node,                 // * DOM Node that contains the player elements
  playerWrapper: Node,
  controls: {                   // Object of player control DOM nodes
    functionName: Node|[Node]   // DOM Node or Array of Nodes that trigger their respective key functions
  },
  defaultSSAStyles: String,     // Default/fallback styles for subtitles following the ASS format
  resolveFileMedia: Function,   // Function to return media of currently played file, more below
  generateThumbnails: Boolean,  // If true, the player will generate thumbnails after a file is downloaded [CPU intensive]
  thumbnailWidth: Number,       // Number in px for thumbnail width
  visibilityLossPause: Boolean, // If true, video playback will pause if the tab lost visibility
  immerseTime: Number,          // Time in seconds of inactivity that it takes for the player controls to hide
  burnIn: Boolean,              // If true, PiP will burn-in subtitles real time [only if subtitles are available][VERY CPU intensive]
  seekTime: Number,             // Time in seconds for the player to seek
  streamedDownload: Boolean,    // If true, the player will only download pieces directly needed for playback
  destroyStore: Boolean,        // If false, the files will be kept in storage even after playback finishes
  WebTorrentOpts: Object       // Object of opts for WebTorrent
}
```
Most of these options can be also **changed** after creating the WebTorrentPlayer instance, but some of them will need to be declared on init [optimisation ¯\\\_(ツ)\_/¯]


## `playTorrent(torrentID, options)`

Plays selected torrent/magnet/etc, looks for playable video files and plays them.

Options:
```js
{
  file: File,                   // Plays the specified file
  media: FileMedia,             // Uses this FileMedia instead of trying to resolve.
  forceMedia: Boolean           // When playing back batches [>1 video file] and specifying both file and media the player will ignore the media, and resolve for the target file, this forces it to use the given media instead of resolving, REQUIRES BOTH file and media to be specified to take effect
}
```

## `cleanupTorrents()`

Removes all torrents that aren't offline stored.

## `async buildVideo(torrent, options)`

Plays the specified Torrent object, requires videoFiles to contain valid video files [don't use this if you don't already modify a lot of existing functionality!]

Options:
```js
{
  file: File,                   // Plays the specified file
  media: FileMedia,             // Uses this FileMedia instead of trying to resolve.
  forceMedia: Boolean           // When playing back batches [>1 video file] and specifying both file and media the player will ignore the media, and resolve for the target file, this forces it to use the given media instead of resolving, REQUIRES BOTH file and media to be specified to take effect
}
```

## `cleanupVideo()`

Cleans up player data, mainly to reduce RAM usage and mitigate video caching, this is always ran when you run `buildVideo()`

## `offlineDownload(torrentID)`

Downloads and stores specified torrent/magnet/etc allowing to download torrents across multiple sessions, and even play them back without any internet connection.

## `async resolveFileMedia(options)`

Since lexical analysis is masochistic, I leave it up to the user to figure out what media currently is being played. Every time the player wants to know what a file's media is, it will await for this function to return a FileMedia

Options:
```js
{
  fileName: String
}
```
FileMedia:
```js
{
  mediaTitle: String,           // Media title
  mediaCover: String,           // URL for cover image
  episodeNumber: Number,        // Number of the currently playing episode
  episodeTitle: String,         // Specific title for the episode
  episodeThumbnail: String,     // URL for the episode's thumbnail image
  name: String                  // Name of your site/app
}
```

## `controls`
The controls option is an object of DOM Nodes or Arrays of Nodes that trigger their respective key functions. All of these are optional, if a control isn't specified, it's respective functions and events won't ever trigger. These and are as follows:
- `playPause` - toggles playback
- `ppToggle` - needs to be deprecated!
- `playNext` - plays next video, if one isn't available, triggers the onNext event
- `playLast` - plays last video, if one isn't available, triggers the onLast event
- `openPlaylist` - triggers the onPlaylist event
- `selectCaptions` - selects a subtitle track
- `selectAudio` - selects an audio track
- `audioButton` - button for audio
- `captionsButton` - button for subtitles
- `toggleMute` - toggles audio
- `setVolume` - sets volume to specified value
- `setProgress` - sets video progress to specified value
- `thumbnail` - seeking preview thumbnail img
- `toggleTheatre` - toggles theatre mode, it actually just adds `.immersed` to the [`playerWrapper`]() node
- `toggleFullscreen` - toggles fullscreen, requires [`player`]() node
- `togglePopout` - toggles PiP
- `toggleCast` - toggles ChromeCast
- `forward` - seeks forwards by amt specified in `seekTime`
- `rewind` - seeks backwards by amt specified in `seekTime`
- `downSpeed` - UI for displaying download speed
- `upSpeed` - UI for displaying upload speed
- `peers` - UI for displaying peers
- `nowPlaying` - UI for displaying currently playing [FileMedia]()
- `downloadFile` - `<a>` node for downloading current file


You can call all those functions manually too [which I don't recommend], but many might not work because they require the event target parameter.

You can ofc modify the UI I made, but it might be painful.

## `on Events`

- `client.on('watched', { file, filemedia } => {})` triggers when the user watches most of the video
- `client.on('playlist', { files } => {})` triggers when the user clicks the playlist button [TLDR make your own UI for playlist]
- `client.on('next', { file, filemedia } => {})` - triggers when the player cant find the next file to play
- `client.on('prev', { file, filemedia } => {})` - triggers when the player cant find the last file to play
- `client.on('video-files', { files, torrent } => {})` - triggers when the player finds video files [for creating playlist UI, maybe download progress etc]
- `client.on('download-done', { file } => {})` - triggers when a file finishes downloading
- `client.on('offline-torrent', torrent => {})` - triggers when an offline torrent loads [for creating UI]
- `client.on('no-files', torrent => {})` - triggers when the player cant find a video file to play back
- `client.on('no-peers', torrent => {})` - triggers when the player cant find peers to connect to