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
    $(this).parent().parent().remove();
    rowCount--;
    $("#dataTable tr").each(function (i) {
      $(this).find("td:first").html(i++);
    });
  });


  $("#subButton").click(function(){
    $('#head1').show;
    $('#searchInput').show;
    var count = $("#tableData tr").length;
    $("#tableData").append('<tr><th>No.</th><th>Name</th><th>Subject</th><th>Marks</th></tr>');
      $("tableData").append('<tr><td>' + count +'</td><td>' + $("#name" + i).val() + '</td><td>' + $("#sub" + i).val() + '</td><td>' + $("#mark" + i).val +'</td></tr>');
  });

});