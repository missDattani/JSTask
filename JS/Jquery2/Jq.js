$(document).ready(function () {
  var rowCount = 6;

  //Insert Rows
  $("#addRowBtn").click(function () {
    $("#dataTable").append('<tr><td>' +
      rowCount + '</td><td><input type="text" class="form-control name_Ip" id="name' + rowCount + '"  placeholder="Enter Name"></td>'
      + '<td><input type="text" class="form-control sub_Ip" id="sub' + rowCount + '"  placeholder="Enter Subject"></td>'
      + '<td><input type="text" class="form-control mark_Ip" id="mark' + rowCount + '" placeholder="Enter Marks"></td>'
      + '<td><button type="button" id="accept" class="btn btn-success">Accept</button>'
      + '<button type="button" id="reject" class="btn btn-danger mx-1">Reject</button></td>'
      + '<td><button class="btn btn-dark delBtn">Delete</button></td></tr>'
    );
    rowCount++;
  });

  //Delete Rows
  $(document).on('click', '.delBtn', function () {
    if(confirm("Are you sure?")){
    $(this).parent().parent().remove();
    rowCount--;
    $("#dataTable tr").each(function (i) {
      $(this).find("td:first").html(i);
    });
  }else{
    return false;
  }
  });

  
  //countdown
  var timer2 = "00:10";
  countdown();
 function countdown(){
  var x = setInterval(function() {
    var timer = timer2.split(':');
    var minutes = parseInt(timer[0]);
    var seconds = parseInt(timer[1]);
    --seconds;
    minutes = (seconds < 0) ? --minutes : minutes;
    if (minutes < 0) {
      timer2 = "00:10";
      clearInterval(x);
      message();
    }
    else{ seconds = (seconds < 0) ? 59 : seconds;
      seconds = (seconds < 10) ? '0' + seconds : seconds;
      $('.clock').html(minutes + ':' + seconds);
      timer2 = minutes + ':' + seconds;}
  }, 1000); 
 }


 //popup
setTimeout(message ,360000);
 function message(){
  Swal.fire({
    allowOutsideClick:false,
    allowEscapeKey:false,
    allowEnterKey:false,
    title: 'JQuery Task-2',
    text: 'Countdown over',
    imageUrl:'clock.gif',
    imageWidth: 400,
    imageHeight: 200,
  }).then(() => {
    setTimeout(message ,360000);
  countdown();
  });
 }

});