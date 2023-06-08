$(document).ready(function () {
$('#btnFetch').click(function(){
    $.ajax({
        url: 'https://api.publicapis.org/entries',
        type: 'GET',
        dataType: 'json',
        success: function (result) {
                result.entries.forEach((data) => {
                $('#apiTbl tbody').append($('<tr>')
                    .append($('<td>', { text: data.API }))
                    .append($('<td>', { text: data.Description }))
                    .append($('<td>', { text: data.Auth }))
                    .append($('<td>', { text: data.Cors }))
                    .append($('<td>').html($('<a>',{href : data.Link, text: data.Link})))
                    .append($('<td>', { text: data.Category }))
                )
            });
        }
    });
});
  
});