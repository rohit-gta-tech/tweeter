/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
    //fake tweet data
    const data = [
        {
          "user": {
            "name": "Newton",
            "avatars": "https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557216671.5403_tunyra_n.jpg"
            ,
            "handle": "@SirIsaac"
          },
          "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
          },
          "created_at": 1461116232227
        },
        {
          "user": {
            "name": "Descartes",
            "avatars": "https://i.redd.it/f9e5jk44cw741.jpg",
            "handle": "@rd" },
          "content": {
            "text": "Je pense , donc je suis"
          },
          "created_at": 1461113959088
        }
      ]

    //function for rendering an array of tweets in HTML format and appending it to the tweet container in index.html
    const renderTweets  = function(tweetArray) {
        for (const tweet of tweetArray) {
            const newTweet= createTweetElement(tweet);
            $('#tweets-container').append(newTweet)
        }
    }

    //function for rendering a single tweet in HTML format with a given single tweet object
    const createTweetElement = function(tweetData) {
        const $tweet = 
        `<article class="posted-tweet">
        <header>
          <div class="pic-name">
            <img src="${tweetData.user.avatars}">
            <p>${tweetData.user.name}</p>
          </div>
          <p class="handle">${tweetData.user.handle}</p>
        </header>
        <p class="tweet-body">${tweetData.content.text}</p>
        <footer>
          <p>${moment(new Date(tweetData.created_at)).fromNow()}</p>  
          <div class="tweet-flags">
            <button class="report-btn"><i class="fas fa-flag"></i></button>
            <button class="retweet-btn"><i class="fas fa-retweet"></i></button>
            <button class="like-btn"><i class="fas fa-heart"></i></button>
          </div>
        </footer>
      </article>`
      return $tweet;
    }
  // calling the tweet rendering function with fake data for now
  renderTweets(data);

  // Form Submission using AJAX and JQuery
  $('#submit-tweet').on("submit", function(event) {
    event.preventDefault();
    const tweet = $(this).serialize();
    $(this).children("#tweet-text").val('');
    $.ajax({
        url: 'http://localhost:8080/tweets',
        method: 'POST',
        data: tweet
    })
    .done (() => console.log('Data posted through AJAX'))
    .fail (() => console.log('Cant send posted tweet data to the server'))
  });

  //function to make a request to /tweets and receive the array of tweets as JSON.
  
});
