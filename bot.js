console.log('Bot Starting');

const fs = require('fs');

var Twit = require('twit');

var config = require('./config');

var image_list = [];
for (var i = 1; i <= 17; i++) {
    image_list.push(i);
}

var images_posted = 0;

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

function shuffle_images(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function fact_time() {
	var image_loc = "images/IMG" + image_list[images_posted] + ".jpg";

	if (images_posted < 16) {
		images_posted ++;
	}
	else {
		shuffle_images(image_list);
		images_posted = 0;
	}

	post_tweet(image_loc);

	var time_period = 1000*60*60*(Math.random()*6 + 10);
	setTimeout(fact_time, time_period)
}

fact_time();