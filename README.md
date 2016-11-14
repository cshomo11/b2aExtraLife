#Back to Analog's Extra Life 2016 NodeCG Bundle
[View the stream archive here](https://youtu.be/NyqZVYSCT9A?t=2h12m5s)

The Back to Analog Extra Life Overlay is a [NodeCG](http://github.com/nodecg/nodecg) bundle.
It works with NodeCG versions which satisfy this [semver](https://docs.npmjs.com/getting-started/semantic-versioning) range: `~0.8.0`
You will need to have an appropriate version of NodeCG installed to use it.

##NOTES:
1. The stream uses Google Fonts so you will either need to have an internet connection (you probably have that already if you are streaming) or you will need to download the offline fonts and update the CSS in graphics/index.html.
2. All of the messages and game data is stored in a local JSON file in the lower-third-data folder. Make sure you **do not remove** the folder and the corresponding JSON file within.
3. I tried to make this as lightweight as I could for my first attempt to maintain 720p 60fps. That said, it usually runs best when you aren't running any other resource-heavy applications.
4. Please feel free to make any changes you see fit to the layout itself. You can easily adjust the fixed heights and widths to make this work for a 1080p stream as well.

##USAGE:
* You must have [NodeCG](http://nodecg.com/) installed for this bundle to run. It is also helpful to install [nodecg-cli](https://github.com/nodecg/nodecg-cli)

1. Clone the folder into your NodeCG's 'bundles' folder.
2. Open command line and navigate to the newly cloned 'b2aExtraLife' directory. Run 'npm install' and 'bower install' to ensure all dependencies have been properly installed.
3. In extension -> donations.js and extension -> donor-sidebar.js, you will need to replace `const parID = 'INSERT participantID HERE'` with your Extra Life Participant ID. You can find this ID in your Extra Life profile page's URL.
4. Navigate command line back to the 'nodecg' directory and if nodecg-cli is installed, run 'nodecg start'. Otherwise run 'node index.js'

##License:
Use is granted under the MIT license. I only ask as a courtesy to include a link back to this github project on whatever streaming platform you choose.
The full license is included in the project folder.
