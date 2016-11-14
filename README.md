The Back to Analog Extra Life Overlay is a [NodeCG](http://github.com/nodecg/nodecg) bundle.
It works with NodeCG versions which satisfy this [semver](https://docs.npmjs.com/getting-started/semantic-versioning) range: `~0.8.0`
You will need to have an appropriate version of NodeCG installed to use it.

__##NOTES:__
1. The stream uses Google Fonts so you will either need to have an internet connection (you probably have that already if you are streaming) or you will need to download the offline fonts and update the CSS in graphics/index.html.
2. I tried to make this as lightweight as I could for my first attempt to maintain 60fps. That said, it usually runs best when you aren't running any other resource-heavy applications.

__##Usage:__
* You must have [NodeCG](http://nodecg.com/) installed for this bundle to run. It is also helpful to install [nodecg-cli](https://github.com/nodecg/nodecg-cli)

1. Clone the folder into your NodeCG's 'bundles' folder.
2. Open command line and navigate to the newly cloned 'b2aExtraLife' directory. Run 'npm install' and 'bower install' to ensure all dependencies have been properly installed.
3. Navigate command line back to the 'nodecg' directory and if nodecg-cli is installed, run 'nodecg start'. Otherwise run 'node index.js'
