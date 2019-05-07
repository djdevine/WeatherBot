console.log('Bot Starting');

const fs = require('fs');

var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);

console.log('Connected to Twitter');

function fcn_tweeted(err, data, response) {
	if (err) {
		console.log("Issue posting tweet");
	}
	else {
		console.log("Posted");
	}
	console.log(data);
}

function post_tweet(img_path) {
	var b64content = fs.readFileSync(img_path, { encoding: 'base64' });
	T.post('media/upload', { media_data: b64content }, function (err, data, response) {
		var mediaIdStr = data.media_id_string;
  		var altText = "It's Amazing!";
  		var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };
 
  		T.post('media/metadata/create', meta_params, function (err, data, response) {
    		if (!err) {
      			// now we can reference the media and post a tweet (media will attach to the tweet)
      			var params = { status: "It's Amazing!", media_ids: [mediaIdStr] };
 
      			T.post('statuses/update', params, function (err, data, response) {
        			console.log("I just posted the file at " + img_path);
      			})
    		}
  		})
	})
}

function fact_time() {
	var image_number = Math.floor(Math.random() * 17) + 1;

	var image_loc = "images/IMG" + image_number + ".jpg";

	post_tweet(image_loc);
}

fact_time();
setInterval(fact_time, 1000*60*60*12)