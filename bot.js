console.log('Bot Starting')

var Twit = require('twit')

var config = require('./config')

var T = new Twit(config)

console.log('Connected to Twitter')

function fcn_tweeted(err, data, response) {
	if (err) {
		console.log("Issue posting tweet")
	}
	else {
		console.log("Posted")
	}
	console.log(data)
}

function post_tweet() {
	var ranint = Math.floor(Math.random()*100);

	var tweet = {
		status: 'Testing Testing ' + ranint
	}

	T.post('statuses/update', tweet, fcn_tweeted);
}

post_tweet()
setInterval(post_tweet, 1000*60*60*12)