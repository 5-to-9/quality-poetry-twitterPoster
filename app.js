var http = require('http')
var Twitter = require('twitter')
var config = require('./config.js')

var client = new Twitter(config)

http.get("http://api.qualitypoetry.com/v2/create/poem", function(res) {
  var rawResponse = ''

  res.on('data', function (chunk) {
    rawResponse += chunk
  })

  res.on('end', function () {
  var responseJSON = JSON.parse(rawResponse)

  var poem = responseJSON.poem
  var title = poem.title
  var lines = poem.lines

  var tweetContent = ''
  var lineText = ''
  var titleContent = ''
  var lineStyle = ''

  for (var i = 0; i < lines.length; ++i) {
    tweetContent += lines[i] + '\r\n'
  }

  client.post('statuses/update', {status: tweetContent})
    .then(function (tweet) {
      // console.log(tweet) // use for debugging

      // use id_str instead of id - #justJSONthings
      var newTweetId = tweet.id_str

      // posting a reply requires mentioning the original tweet's poster
      titleContent = 'I call this poem "' + title + '". For more, please follow @QualityPoetry #poems #poetry'
      client.post('statuses/update', {status: titleContent, in_reply_to_status_id: newTweetId})
  	    .then(function (tweet) {
          // console.log(tweet) // use for debugging
  	    })
  	    .catch(function (error) {
  	    	throw error
  	    })
    })
    .catch(function (error) {
      throw error
    })
  })
})
