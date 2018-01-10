$(()=>{

  $('.test').append(`<h1>test</h1>`);
  $.ajax({
    url: 'https://bittrex.com/api/v1.1/public/getmarkets',
    success: function(res) { console.log(`Success ${res}`); },
    error: function(res) { console.log(`Error ${res}`); }
  })


})
