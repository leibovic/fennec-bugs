var util = require("util"),
    twitter = require("twitter"),
    bz = require("bz"),
    config = require("./config");

var twit = new twitter({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token_key: config.access_token_key,
  access_token_secret: config.access_token_secret
});

var bugzilla = bz.createClient();
var searchParams = { quicksearch: "blocking-fennec:+ @nobody" };
var callback = function(error, bugs) {
  if (error) {
    console.log(util.inspect(error));
    return;
  }

  // Find a random bug
  var index = Math.floor(Math.random() * bugs.length);
  var bug = bugs[index];

  var tweet = "Bug " + bug.id + " - " + bug.summary + " http://bugzil.la/" + bug.id;
  console.log(tweet);

  twit.updateStatus(tweet, function(data) {
    console.log(util.inspect(data));
  });
}

bugzilla.searchBugs(searchParams, callback);
