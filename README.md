# Back to Analog's Extra Life NodeCG v0.9 Bundle

[View the stream archive here](https://youtu.be/NyqZVYSCT9A?t=2h12m5s)

#### Like the bundle?
If you appreciate this project, please feel free to [donate to my Extra Life campaign.](https://tinyurl.com/AnalogExtraLife)

## About:
The Back to Analog Extra Life Overlay is a [NodeCG](http://github.com/nodecg/nodecg) bundle.
It works with NodeCG versions which satisfy this [semver](https://docs.npmjs.com/getting-started/semantic-versioning) range: `~0.9.0`
You will need to have an appropriate version of NodeCG installed to use it.

## Features:
1. **Donor Scroll**: Want to show all of your awesome donors? By default, this overlay will display the most recent 10 donors to your Extra Life campaign. This option can be turned off in the NodeCG dashboard if you wish to do so.
2. **Donation Tracker**: In the bottom-right corner of the screen, you will be able to display the current amount of donations you have received and your donation goal. These will update every 10 minutes by default, you can edit the code to change how long the updates wait.
3. **Message Bar Featuring Current and Upcoming Games**: Need to display any other information during your stream? Using the message bar, you can write messages and even choose to enable and/or disable messages for later use. This message bar also uses a games list that you can supply in the NodeCG dashboard. This way, you can tell your viewers what they are watching and what's coming up if they stick around.
4. **Game View Blocker**: For those times when you need to enter sensitive data without having to switch scenes, you can quickly block the game view. Now no one will see anything you don't want them to.

## Notes:
1. The stream uses Google Fonts so you will either need to have an internet connection (you probably have that already if you are streaming) or you will need to download the offline fonts and update the CSS in graphics/index.html.
2. All of the messages and game data is stored in a local JSON file in the lower-third-data folder. Make sure you **do not remove** the folder and the corresponding JSON file within.
3. I tried to make this as lightweight as I could for my first attempt to maintain 720p 60fps. That said, it usually runs best when you aren't running any other resource-heavy applications.
4. Please feel free to make any changes you see fit to the layout itself. You can easily adjust the fixed heights and widths to make this work for a 1080p stream as well.

## Usage:
* You must have [NodeCG](http://nodecg.com/) installed for this bundle to run. It is also helpful to install [nodecg-cli](https://github.com/nodecg/nodecg-cli) but it's not required. Don't forget to run `npm install` and `bower install` on the NodeCG project.

1. Clone the folder into your NodeCG's 'bundles' folder.
2. Open command line and navigate to the newly cloned 'b2aExtraLife' directory. Run `npm install` and `bower install` to ensure all dependencies have been properly installed.
3. In `extension -> donations.js` and `extension -> donor-sidebar.js`, you will need to replace `const parID = 'INSERT participantID HERE'` with your Extra Life Participant ID. You can find this ID in your Extra Life profile page's URL.
4. Navigate command line back to the 'nodecg' directory and if nodecg-cli is installed, run 'nodecg start'. Otherwise run 'node index.js'

## License:
Use is granted under the MIT license. I only ask as a courtesy to include a link back to this Github project on whatever streaming platform you choose.
The full license is included in the project folder.

## Credits:
This NodeCG bundle uses the following open-source libraries

1. [Velocity.js](http://velocityjs.org/) - © 2014 Julian Shapiro - MIT License
2. [Zepto.js](http://zeptojs.com/) - © 2010-2016 Thomas Fuchs - MIT License
3. [Numeral.js](http://numeraljs.com/) - © 2012 Adam Draper - MIT License
4. [Request-Promise](https://github.com/request/request-promise) - ISC License
