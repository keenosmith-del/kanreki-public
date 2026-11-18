#!/bin/sh
# Keep capture rasterization on the CPU: avoids intermittent repeated texture tiles.
exec "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --disable-gpu-rasterization --disable-gpu-compositing --disable-gpu --disable-skia-graphite "$@"
