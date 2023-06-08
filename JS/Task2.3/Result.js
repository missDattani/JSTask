var table = document.getElementById("dataTable");
var rowCount = 5;
var addRowBtn = document.getElementById("addRowtn");

// insert Row
function addRow() {
  rowCount++;
  var row = table.insertRow();
  var num = row.insertCell(0);
  num.setAttribute('data-label', 'No.');
  num.innerHTML = rowCount;

  var name = row.insertCell();
  name.setAttribute('data-label', 'Name');
  name.innerHTML = "<input type='text' class='form-control name_Ip' placeholder='Enter Name' id='name" + rowCount +"'><div></div>";

  var sub = row.insertCell();
  sub.setAttribute('data-label', 'Subject');
  sub.innerHTML ="<input type='text' class='form-control sub_Ip'placeholder='Enter Subject' id='sub" + rowCount + "'><div></div>";

  var mark = row.insertCell();
  mark.setAttribute('data-label', 'Marks');
  mark.innerHTML = "<input type='text'class='form-control mark_Ip' placeholder='Enter Marks' id='mark" + rowCount + "' onkeydown='return event.keyCode !== 69'><div></div>";

  var result = row.insertCell();
  result.innerHTML = "<button type='button' class='btn btn-success pass-btn' onclick='Pass(this)' id='pass" +
    rowCount +"' data-clicked = 'false'>Accept</button> <button type='button' class='btn btn-danger fail-btn'  onclick='Fail(this)'  id='fail" +
    rowCount + "'>Reject</button>";
  //result.parentElement.classList.add("pass");

  var action = row.insertCell();
  action.innerHTML = "<button class='btn btn-danger delBTN' onclick='remove(this)'>Delete</button>";

}


// display table
function displayTable() {
  document.getElementById("head1").style.display = "block";
  document.getElementById("searchInput").style.display = "block";
  var tableData = "<tr><th>No.</th><th onclick='sortTable(1)' class='asc' title='Click to sort'>Name</th><th onclick='sortTable(2)' class='asc' title='Click to sort'>Subject</th><th>Marks</th></tr>";
  for (var i = 1; i <= rowCount; i++) {
    var mark = document.getElementById("mark" + i).value;
    var color = mark < 33 ? "red" : "";
    var PassBtn = document.getElementById("pass" + i);
    var clicked = PassBtn.getAttribute("data-clicked");
    if (clicked === "true") {
      var failBtn = document.getElementById("fail" + i);
      var reject = failBtn.getAttribute("data-clicked");
      if(reject !== 'true'){
      tableData += "<tr style='background-color:" + color + "'>" +
        `<td class="counterCell">` + "</td><td>" +
        document.getElementById("name" + i).value + "</td><td>" +
        document.getElementById("sub" + i).value + "</td><td>" +
        document.getElementById("mark" + i).value + "</td></tr>";
    }
  }
}
  document.getElementById("tableData").innerHTML = tableData;
  localStorage.setItem("tableData", tableData);
  document.getElementById("tableData").innerHTML = localStorage.getItem("tableData");
  return false;
}

//pass button
function Pass(Btn) {
  Btn.classList.add("stateColor");
 Btn.parentElement.lastElementChild.classList.remove("stateColor");

  Btn.setAttribute("data-clicked", "true");
  var failBtn = Btn.parentElement.querySelector('.btn-danger');
  failBtn.setAttribute('data-clicked','false');
}

//fail button
function Fail(Btn) {
  Btn.classList.add("stateColor");
  Btn.parentElement.firstElementChild.classList.remove("stateColor");

  var row = Btn.closest("tr");
  var PassBtn = row.querySelector(".btn-success");
  PassBtn.setAttribute("data-clicked","false");
  document.getElementById("tableData").row.remove();
  rowCount--;
}

//Calculate Percentage
function displayResult() {
  document.getElementById("head2").style.display = "block";
  var studData = {};
  for (var i = 1; i <= rowCount; i++) {
    var name = document.getElementById("name" + i).value;
    var mark = parseFloat(document.getElementById("mark" + i).value);
    var PassBtn = document.getElementById("pass" + i);
    if (PassBtn.getAttribute("data-clicked") == "true") {
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
    let color = avg < 40 ? "red" : "";
    resultData += "<tr style='background-color:" + color + "'><td>" + counter++ + "</td><td>" + name + "</td><td>" + avg.toFixed(2) + "%" + "</td></tr>";
  }

  document.getElementById("resultData").innerHTML = resultData;
  localStorage.setItem("resultData", resultData);
  document.getElementById("resultData").innerHTML = localStorage.getItem("resultData");
  return false;
}

//displays both table
document.getElementById("subButton").addEventListener("click", function () {
  var error = "";
  var nameIp = document.querySelectorAll(".name_Ip");
  nameIp.forEach((input) => {
    if (input.value === "") {
      // alert("Name cannot be empty");
      error = "**Name cannot be empty**";
      input.nextElementSibling.innerHTML = error;
      input.nextElementSibling.style.color = "red";
      return false;
    }
    if (!/^[a-zA-Z ]+$/.test(input.value)) {
      // alert("Name can only contain letter and spaces");
      error = "**Name can only contain letter and spaces**";
      input.nextElementSibling.innerHTML = error;
      input.nextElementSibling.style.color = "red";
      return false;
    }
    input.prevVal = input.value;
  });

  var subIp = document.querySelectorAll(".sub_Ip");
  subIp.forEach((input) => {
    if (input.value === "") {
      // alert("Subject cannot be empty");
      error = "**Subject cannot be empty**";
      input.nextElementSibling.innerHTML = error;
      input.nextElementSibling.style.color = "red";
      return false;
    }
    if (!/^[a-zA-Z ]+$/.test(input.value)) {
      // alert("Subject can only contain letter and spaces");
      error = "**Subject can only contain letter and spaces**";
      input.nextElementSibling.innerHTML = error;
      input.nextElementSibling.style.color = "red";
      return false;
    }
    input.prevVal = input.value;
  });

  var markIp = document.querySelectorAll(".mark_Ip");
  markIp.forEach((input) => {
    if (input.value === "") {
      // alert("Marks cannot be empty");
      error = "**Marks cannot be empty**";
      input.nextElementSibling.innerHTML = error;
      input.nextElementSibling.style.color = "red";
      return false;
    }
    if (input.value < 0 || input.value > 100) {
      // alert("Marks must be between 0 and 100");
      error = "**Marks must be between 0 and 100**";
      input.nextElementSibling.innerHTML = error;
      input.nextElementSibling.style.color = "red";
      return false;
    }
    input.prevVal = input.value;
  });

  if (error == "") {
    displayTable();
    displayResult();
  }
});


//delete rows
function remove(element) {
  if (confirm("Are you sure you want to delete this record?")) {
    element.parentNode.parentNode.remove();
    rowCount--;
    for (let i = 1; i < table.rows.length; i++) {
      table.rows[i].cells[0].innerHTML = i;
    }
  }
}


//search value
function searchTable() {
  var input, filter, table, tr, tds, i, txtValue;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("tableData");
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    tds = tr[i].getElementsByTagName("td");
    var matches = false;

    for (j = 1; j < tds.length; j++) {
      if (tds[j]) {
        txtValue = tds[j].textContent || tds[j].innerText;
        if (txtValue.toUpperCase().startsWith(filter)) {
          matches = true;
        }
      }
    }

    if (matches == true) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}


//sort table colums
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("tableData");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        switching = true;
      }
    }
  }
}
