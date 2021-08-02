# FAQ

## Why are offline torrents always seeding?

To improve torrent availability and swarm health, this is VERY unlikely to ever change.

## Why not download and store pieces only needed for playback?

NO. Read above.

## Will you do ChromeCast?

It is in [theory possible](https://github.com/johanholmerin/browsercast), even with subtitles for which I could re-use the PiP code, but I don't know how. If you have an idea how to cast a `canvas.captureStream()` source object, then please, make a PR!

## Why aren't all seeking preview thumbnails visible?

Those get generated on the go, and get fully generated once the file finishes downloading. I couldn't come up with any better way of doing this that worked nicely.

## Why isn't my video playing?

#1 make sure that the torrent has WRTC capable peers, if you don't know what that means, read the WebTorrent documentation first.

#2 make sure the browser supports the codec/container you're trying to play back

#3 make sure you're using a semi-modern browser and are using HTTPS