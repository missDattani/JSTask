$(document).ready(function () {

  var rowCount = 6;


  //Insert Rows
  $("#addRowBtn").click(function () {
    $("#dataTable").append('<tr><td>' +
      rowCount + '</td><td><input type="text" class="form-control name_Ip" id="name' + rowCount + '"  placeholder="Enter Name"><div></div></td>'
      + '<td><input type="text" class="form-control sub_Ip" id="sub' + rowCount + '"  placeholder="Enter Subject"><div></div></td>'
      + '<td><input type="text" class="form-control mark_Ip" id="mark' + rowCount + '" placeholder="Enter Marks" onkeydown= "return event.keyCode !== 69"><div></div></td>'
      + '<td><button type="button" id="accept' + rowCount + '" class="btn btn-success accept-btn" data-clicked="false">Accept</button>'
      + '<button type="button" id="reject' + rowCount + '" class="btn btn-danger mx-1 reject-btn">Reject</button></td>'
      + '<td><button class="btn btn-dark delBtn">Delete</button></td></tr>'
    );
    rowCount++;
  });


  //submit data
  function displayTable() {
    var rowCount = $('#dataTable tr').length;
    $('#head1').show();
    $('#searchInput').show();
    var tableData = "<tr><th>No.</th><th id='sort-name' class='asc' onclick='sortTable(1,'asc')'>Name</th><th id='sort-sub' class='asc' onclick='sortTable(2,'asc')'>Subject</th><th>Marks</th></tr>";
    for (let i = 1; i < rowCount; i++) {
      var mark = $('#mark' + i).val();
      var color = mark < 33 ? 'red' : '';
      var acceptBtn = $('#accept' + i);
      var clicked = acceptBtn.attr("data-clicked");
      if (clicked == "true") {
        var rejectBtn = $('#reject' + i);
        var reject = rejectBtn.attr("data-clicked");
        if (reject !== 'true') {
          tableData +=
            "<tr style='background-color:" + color + "'><td class='counterCell'>" +
            "</td><td>" +
            $("#name" + i).val() +
            "</td><td>" +
            $("#sub" + i).val() +
            "</td><td>" +
            $("#mark" + i).val() +
            "</td></tr>";
        }
        // tableData += '</table>';
      }
    }
    $("#tableData").html(tableData);
    localStorage.setItem("tableData", tableData);
    $("#tableData").html(localStorage.getItem("tableData"));

    $('#sort-name').click(function () {
      sortTable(1, 'asc');
    });

    // $('#sort-sub').click(function(){
    //   sortTable(2,'asc');
    // });

    return false;
  }


  //Result table
  function displayResult() {
    var rowCount = $('#dataTable tr').length;
    $('#head2').show();
    var studData = {};
    for (let i = 1; i <= rowCount; i++) {
      var name = $('#name' + i).val();
      var mark = parseFloat($('#mark' + i).val());
      var acceptBtn = $('#accept' + i);
      if (acceptBtn.attr('data-clicked') == 'true') {
        if (!studData[name]) {
          studData[name] = { totalMarks: mark, count: 1 };
        } else {
          studData[name].totalMarks += mark;
          studData[name].count++;
        }
      }
    }

    var resultData = "<tr><th>No.</th><th>Name</th><th>Percentage</th></tr>";
    var counter = 1;
    for (var name in studData) {
      var totalMarks = studData[name].totalMarks;
      var count = studData[name].count;
      var avg = (totalMarks / (count * 100)) * 100;
      resultData += '<tr><td>' + counter++ + '</td><td>' + name + '</td><td>' + avg.toFixed(2) + "%" + '</td></tr>'
    }

    $('#resultData').html(resultData);
    localStorage.setItem('resultData', resultData);
    $('#resultData').html(localStorage.getItem('resultData'));
    return false;
  }

  //Accept result
  $('#dataTable').on('click', '.accept-btn', function () {
    var acceptBtn = $(this);
    acceptBtn.addClass('stateColor');
    acceptBtn.parent().find(':last-child').removeClass('stateColor');
    acceptBtn.attr('data-clicked', 'true');
    acceptBtn.siblings('.reject-btn').attr('data-clicked', 'false');
  });

  
  //Reject result
  $('#dataTable ').on('click', '.reject-btn', function () {
    var rejectBtn = $(this);
    rejectBtn.addClass('stateColor');
    rejectBtn.parent().find(':first-child').removeClass('stateColor');
    var row = rejectBtn.closest('tr');
    var acceptBtn = $(row).find('.btn-success');
    $(acceptBtn).attr('data-clicked', 'false');
    $('#tableData').find(row).remove();
    rowCount--;
  });


  //Delete Rows
  $(document).on('click', '.delBtn', function () {
    if (confirm("Are you sure want to delete this data ?")) {
      $(this).parent().parent().remove();
      rowCount--;
      $("#dataTable tr").each(function (i) {
        $(this).find("td:first").html(i++);
      });
    } else {
      return false;
    }
  });


  //Search input
  $(document).on('keyup', '#searchInput', function () {
    var search = $("#searchInput").val().toUpperCase();
    $("#tableData tr:gt(0)").each(function () {
      var tr = $(this);
      var match = false;
      tr.find("td").each(function () {
        var td = $(this);
        var value = td.text();
        if (value.toUpperCase().startsWith(search)) {
          match = true;
        }
      });
      if (match) {
        tr.show();
      } else {
        tr.hide();
      }
    });
  });


  //sort name
  function sortTable(col, order) {
    let tRow = $('#tableData tr');
    tRow.sort(function (a, b) {
      let aVal, bVal;
      if (col === 1) {
        aVal = $(a).find('td:eq(1)').text();
        bVal = $(b).find('td:eq(1)').text();
      }
      //else if(col === 2){
      //   aVal = $(a).find('td:eq(2)').text();
      //   bVal = $(b).find('td:eq(2)').text();
      // }

      if (order === 'asc') {
        return aVal.localeCompare(bVal);
      } else {
        return bVal.localeCompare(aVal);
      }
    })
    $('#tableData').html(tRow);
  }


  //validation
  $('#subButton').click(function () {
    var error = "";

    var name_Ip = $('.name_Ip');
    name_Ip.each(function (e) {
      // console.log(name_Ip.eq(e));
      if (name_Ip.eq(e).val() == "") {
        // alert("Name cannot be empty");
        error = "**Name cannot be empty**";
        name_Ip.eq(e).siblings().html(error).css('color', 'red');
        // return false;
      }
      else if (!/^[a-zA-Z ]+$/.test(name_Ip.eq(e).val())) {
        // alert("Name can only contain letter and spaces");
        error = "**Name can only contain letter and spaces**";
        name_Ip.eq(e).siblings().html(error).css('color', 'red');
        // return false;
      }
    });

    var sub_Ip = $('.sub_Ip');
    sub_Ip.each(function (e) {
      if (sub_Ip.eq(e).val() == "") {
        // alert("Subject cannot be empty");
        error = "**Subject cannot be empty**";
        sub_Ip.eq(e).siblings().html(error).css('color', 'red');
        // return false;
      }
      else if (!/^[a-zA-Z ]+$/.test(sub_Ip.eq(e).val())) {
        // alert("Subject can only contain letter and spaces");
        error = "**Subject can only contain letter and spaces**";
        sub_Ip.eq(e).siblings().html(error).css('color', 'red');
        // return false;
      }
    });

    var mark_Ip = $('.mark_Ip');
    mark_Ip.each(function (e) {
      if (mark_Ip.eq(e).val() == "") {
        // alert("Marks cannot be empty");
        error = "**Marks cannot be empty**";
        mark_Ip.eq(e).siblings().html(error).css('color', 'red');
        // return false;
      }
      if (mark_Ip.eq(e).val() < 0 || mark_Ip.eq(e).val() > 100) {
        // alert("Marks can only contain letter and spaces");
        error = "**Marks must be between 0 to 100**";
        mark_Ip.eq(e).siblings().html(error).css('color', 'red');
        // return false;
      }
    });

    if (error == "") {

      displayTable();
      displayResult();
    }

  });


});




