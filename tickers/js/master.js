
  import * as bittrex from 'node-bittrex-api';
  bittrex.options({
    'apikey' : '868145ed286844318964abf6c6959ab3',
    'apisecret' : 'aec47260f81a49dfaaa1609449b69ff0',
  });
  bittrex.getmarketsummaries( function( data, err ) {
    if (err) {
      return console.error(err);
    }
    for( var i in data.result ) {
      bittrex.getticker( { market : data.result[i].MarketName }, function( ticker ) {
        console.log( ticker );
      });
    }
  });

  // $('.test').append(`<h1>test</h1>`);
  // $.ajax({
  //   url: 'https://bittrex.com/api/v1.1/public/getmarkets',
  //   dataType: 'jsonp',
  //   success: function(res) { console.log(`Success ${res}`); },
  //   error: function(res) { console.log(`Error ${res}`); }
  // })
