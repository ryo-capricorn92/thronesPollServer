/* global $ */
$.ajax({
  method: 'GET',
  url: "/polls",
})
  .done(function (data) {
    $('#main').html(JSON.stringify(data));
  })
  .fail(function () {
    console.log('ERROR');
  })
