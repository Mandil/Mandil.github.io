$(()=>{

  $('.test').append(`<h1>test</h1>`);
  $.ajax({
    url: 'https://bittrex.com/api/v1.1/public/getmarkets',
    headers: {  'Access-Control-Allow-Origin': 'https://mandil.github.io' },
    type: 'GET',
     success: function(res) { alert(`Success ${res}`); },
     error: function(res) { alert(`Error ${res}`); }
  })


})
