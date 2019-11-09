var http = require('http')
var Twitter = require('twitter')
var config = require('./config.js')

var client = new Twitter(config)

var authors = ['default', 'rupiKaur', 'tumblrPoet']
var author = authors[Math.floor(Math.random() * authors.length)]

var moods = ['basic', 'love', 'angst']
var mood = moods[Math.floor(Math.random() * moods.length)]

http.get("http://api.qualitypoetry.com/create/poem?author=" + author + "&mood=" + mood, function(res) {
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
  var lineStyle = ''

  for (var i = 0; i < lines.length; ++i) {
    lineText = lines[i].text
    lineStyle = (lines[i].style) ? lines[i].style : ''

    if (lineStyle === 'parentheses') {
      lineText = '(' + lineText + ')'
    }

    if (lineStyle === 'quotation') {
      lineText = '"' + lineText + '"'
    }

    tweetContent += lineText + '\r\n'
  }

  client.post('statuses/update', {status: tweetContent})
		.then(function (tweet) {
      console.log(tweet)
    })
    .catch(function (error) {
      throw error
    })
  })
})
