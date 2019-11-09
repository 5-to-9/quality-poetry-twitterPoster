<img src="http://5to9.io/logo.svg" width=250px alt="5 to 9 logo">

# Quality Poetry TwitterPoster

The script for posting quality tweets to Twitter.

## Getting Started

`git clone`, `npm install`

Copy config-example.js to config.js and fill it out with the keys for your Twitter bot. You'll need a Twitter developer account to get these.

Run app.js and it'll post a tweet!

You'll probably want to set up a cron job with something like:
`*/10 * * * * /usr/local/bin/node path/to/app.js`
