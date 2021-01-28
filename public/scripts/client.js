/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  //function to make a request to /tweets and receive the array of tweets as JSON.
  const getPostedTweets = function() {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET'
    })
      .done((data) => renderTweets(data))
      .fail(() => console.log('Sorry, Error loading tweets!'));
  };

  //calling get Posted tweets function on document ready
  getPostedTweets();
    
  //function for rendering an array of tweets in HTML format and appending it to the tweet container in index.html
  const renderTweets  = function(tweetArray) {
    for (const $tweet of tweetArray) {
      const $newTweet = createTweetElement($tweet);
      $('#tweets-container').prepend($newTweet);
    }
  };

  //function for rendering a single tweet in HTML format with a given single tweet object
  const createTweetElement = function(tweetData) {
    // Function for escaping cross site scripting
    const escape =  function(str) {
        let div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }
    const $tweet =
        `<article class="posted-tweet">
        <header>
          <div class="pic-name">
            <img src="${escape(tweetData.user.avatars)}">
            <p>${tweetData.user.name}</p>
          </div>
          <p class="handle">${escape(tweetData.user.handle)}</p>
        </header>
        <p class="tweet-body">${escape(tweetData.content.text)}</p>
        <footer>
          <p>${moment(new Date(tweetData.created_at)).fromNow()}</p>  
          <div class="tweet-flags">
            <button class="report-btn"><i class="fas fa-flag"></i></button>
            <button class="retweet-btn"><i class="fas fa-retweet"></i></button>
            <button class="like-btn"><i class="fas fa-heart"></i></button>
          </div>
        </footer>
      </article>`;
    return $tweet;
  };

  // Form Submission using AJAX and JQuery
  $('#submit-tweet').on("submit", function(event) {
    event.preventDefault();
    const tweet = $(this).serialize();
    //Form validation
    const tweetLength = $(this).children("#tweet-text").val().length;
    if (tweetLength > 140) {
      $(this).closest(".new-tweet").children("#limit-exceed").slideDown();
    } else {
      $(this).closest(".new-tweet").children("#limit-exceed").slideUp(); 
      $(this).children("#tweet-text").val('');
      $(this).find('.counter').text(140);
      //AJAX Post call if form is validated
      $.ajax({
        url: 'http://localhost:8080/tweets',
        method: 'POST',
        data: tweet
      })
        .done(() => {
            $('#tweets-container').empty();
            getPostedTweets();
        })
        .fail(() => console.log('Cant send posted tweet data to the server'));
    }   
  });

  //For toggling of new tweet section when clicking on write a new tweet button
  $('#compose-btn').on("click", function(event) {
    const $newTweet = $(this).closest("nav").nextAll(".container").children(".new-tweet");
    if($newTweet.css("display") === "none") {
       $newTweet.slideDown();
    } else {
       $newTweet.slideUp();
    }
  })
});
