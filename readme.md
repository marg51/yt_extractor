```bash
youtube-dl -x --audio-format=mp3 https://www.youtube.com/watch?v=S2o7UMFYdJU
```

```bash
cat playlist.txt | node bin/index.js music.mp3
# mac
pbpaste | node bin/index.js music.mp3
```


### Format

format of playlist.txt

```
00:00:00 Title 1
00:02:45 title 2
00:05:15 title 3
[...]
```
