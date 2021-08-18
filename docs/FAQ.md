# FAQ

## Why are offline torrents always seeding?

To improve torrent availability and swarm health, this is VERY unlikely to ever change.

## Why not download and store pieces only needed for playback?

NO. Read above.

## Why is my Cast playback lagging?

If you're using burn-in, then it's probably because Cast playback and burn-in is asyncronous, meaning it only runs when the browser has the resources to render it. With heavy video files or subtitles it might require more CPU to run it at the video's framerate. Additionally if your hardware lacks hardware accelerated 3d rendering, video decoding and encoding you might experience framerate drops.

If you're not using burn-in, then it's most likely something to do with your network.

## Why aren't all seeking preview thumbnails visible?

Those get generated on the go, and get fully generated once the file finishes downloading. I couldn't come up with any better way of doing this that worked nicely.

## Why isn't my video playing?

#1 make sure that the torrent has WRTC capable peers, if you don't know what that means, read the WebTorrent documentation first.

#2 make sure the browser supports the codec/container you're trying to play back

#3 make sure you're using a semi-modern browser and are using HTTPS