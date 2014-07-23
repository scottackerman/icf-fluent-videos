# Videos
A simple website for viewing videos from the 2014 Fluent conference.

## Latest updates
Created new model for showing result numbers based on query and lecture type

## Development
This project uses [ngBoilerpalate](http://joshdmiller.github.com/ng-boilerplate).
Follow the quick start guide to get up and running.

## Adding a new video
1. Add a new video object to `src/assets/videos.json`
2. Add the video to `videofiles/`, and the file name to the `filename` attribute in `videos.json`.
3. If there's a zip to download, add it to `downloads`, and the file name to the `download` attribute in `videos.json`.

## Deployment 
Copy the contents of the `build` directory to ifcworkshops.com/videos. 
- Be careful not to overwrite the `videofiles` or the `downloads` directories - thats where the videos and associated assets are kept respectively.
- Make sure to upload any new video or download files to the server as well.

## TODO
- Get size of video