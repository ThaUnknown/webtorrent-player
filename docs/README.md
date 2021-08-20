<div align="center">
<img src="logo.png" width="300">

# WebTorrentPlayer
</div>

**WebTorrentPlayer** is a high performance player module for your next **WebTorrent** based project, it works around all the gotchas with WebTorrent when working with any sort of video files. It also fully supports streaming in all it's features.

General motivation is to get rid of all duplicate RAM usage and reduce CPU usage, provide better/working alternatives for existing WebTorrent functionality, and provide any features you'd see in a modern video player, ex: YouTube's.

# Install
```
npm install https://github.com/ThaUnknown/webtorrent-player
```
Then
```js
import WebTorrentPlayer from 'webtorrent-player'

new WebTorrentPlayer({ opts })
```
Or you can include the bundle file [see index.html for an example]

Note: the user needs to include the `/sw.js` and `/lib/subtitles-octopus-worker.*` since they are imported externally by the browser when registering workers.
# Features
- Support for ludicrous file sizes [upwards of 100GB]*
- Browser based support for streaming video containers, codecs and multi-audio*
- Streamed file downloading [allows you to start saving files to drive before they finish downloading, allowing for external playback/modification]
- Subtitle support [SRT, VTT, SSA, ASS]*
	- Softcoded/embedded subtitles [embedded in video file]
	- External subtitles [external files]
	- Full subtitle support display in PiP
	- Full subtitle support in Cast
- Offline file storage [allows you to play back specified torrents when offline]*
- Feature rich UI*
	- Highly optimized and responsive
	- Supports MediaSession
	- Mobile friendly
	- Keybinds
	- Seeking preview thumbnails
- Auto-play next video
- Cast support
	- All subtitles formats [if burn-in is enabled]
	- All codecs [even ones unsupported by cast, if burn-in is enabled]
  - Multi-audio support*
- Fully client-sided

\* more information below

# Browser support
Firefox is bad. I mean, it's good as a browser, but it clearly doesn't want to support webapps, so a lot of firefox functionality is limited, for example it only allows IDB files up to 2.14GB meaing you will end up using a lot more RAM, doesn't support threaded canvas rendering etc.

# Container and codec support
WebTorrentPlayer uses the browser's built in video player [thanks to [jimmywarting](https://github.com/jimmywarting/webtorrent-server-browser) for this idea] to play back files, this means playback support is browser dependent

|Containers|Chromium|Mobile Chromium|Edge Chromium|Firefox|
|-|:-:|:-:|:-:|:-:|
|3g2|✓|✓|✓|✓|
|3gp|✓|✓|✓|✘|
|avi|✘|✘|✘|✘|
|m2ts|✘|✘|✓**|✘|
|m4v etc.|✓*|✓*|✓*|✓*|
|mp4|✓|✓|✓|✓|
|mpeg|✘|✘|✘|✘|
|mov|✓|✓|✓|✓|
|ogm ogv|✓|✓|✓|✓|
|webm|✓|✓|✓|✓|
|mkv|✓|✓|✓|✘|

\* Container might be supported, but the container's codecs might not be.  
\*\* Documented as working, but can't reproduce.  
Full list of all tested video extensions:  
.3g2 .3gp .asf .avi .dv .flv .gxf .m2ts .m4a .m4b .m4p .m4r .m4v .mkv .mov .mp4 .mpd .mpeg .mpg .mxf .nut .ogm .ogv .swf .ts .vob .webm .wmv .wtv  
Are any missing?

|Video Codecs|Chromium|Mobile Chromium|Edge Chromium|Firefox|
|-|:-:|:-:|:-:|:-:|
|AV1|✓|✓|✓|✓|
|H.263|✘|✘|✘|✘|
|H.264|✓|✓|✓|✓|
|H.265|✘|✘|✓*|✘|
|MPEG-2/4|✘|✘|✘|✘|
|Theora|✓|✘|✓|✓|
|VP8/9|✓|✓|✓|✓|

\* Requires MSStore extension which you can get by opening this link `ms-windows-store://pdp/?ProductId=9n4wgh0z6vhq` while using Edge.

|Audio Codecs|Chromium|Mobile Chromium|Edge Chromium|Firefox|
|-|:-:|:-:|:-:|:-:|
|AAC|✓|✓|✓|✓|
|AC3|✘|✘|✓|✘|
|DTS|✘|✘|✘|✘|
|EAC3|✘|✘|✓|✘|
|FLAC|✓|✓*|✓|✓|
|MP3|✓|✓|✓|✓|
|Opus|✓|✓|✓|✓|
|TrueHD|✘|✘|✘|✘|
|Vorbis|✓|✓|✓|✓*|

\* Might not work in some video containers.

Multi-audio tracks is only supported in after enabling flags:
- Chromium: `chrome://flags/#enable-experimental-web-platform-features`
- Firefox: `media.track.enabled`

# UI Features
- Classic controls: Play, Pause, Next, Last, Fullscreen, Mute, Volume, but also: Change audio track, Change subtitle track, Enter PiP, Cast, Enter theatre
- Seeking preview thumbnails
- MediaSession display
- Buffering UI
- Immersing after inactivity
- Torrent status display
- Mobile YouTube-like controls
- Download currently playing file

# Offline storage
Offline storage also uses IDB which on Firefox has a 2.14GB limit, meaning you can't actually offline store all that much when using Firefox, this isn't an issue on any Chromium browser.

This feature allows you to download torrents across multiple sessions, and even play them back without any internet connection.
