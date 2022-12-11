var http = require('http')
var Twitter = require('twitter')
var config = require('./config.js')

var client = new Twitter(config)

http.get("http://api.qualitypoetry.com/v3/create/poem", function(res) {
  var rawResponse = ''

  res.on('data', function (chunk) {
    rawResponse += chunk
  })

  res.on('end', function () {
    var response = JSON.parse(rawResponse)
    var poemResponse = response.poem

    var gptStatusCode = response.gpt.status

    var poemTitle = poemResponse.title

    var poem = ""
    if (gptStatusCode == 200) {
      poem = poemResponse.final
    } else {
      poem = poemResponse.raw
    }

    client.post('statuses/update', {status: poem})
      .then(function (tweet) {
        // use id_str instead of id - #justJSONthings
        var newTweetId = tweet.id_str

        // posting a reply requires mentioning the original tweet's poster
        titleContent = 'I call this poem "' + poemTitle + '". For more, please follow @QualityPoetry #poems #poetry'

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
