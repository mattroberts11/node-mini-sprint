$(document).ready(function() {

// get a quote from the server when the page loads and add it to the dom
  getQuote();

// when the user enters data and clicks submit, post the quote to the server
  $('#submit').click((e) => {
    e.preventDefault();
    let quote = $('input').val();
    addQuote(quote);
  });

function getQuote(callback) {
  //YOUR CODE HERE, Add a GET request
    $.get('http://localhost:3000/quote/',  function( data ){
        $('h2').html(data);
    })

    .done( data => {
      console.log('Success!');
    })
  }

function addQuote(quote){
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/quote/",
    data: quote
  })

  .done(function( msg ) {

      $('#response').html(msg);
  });

  }
});
