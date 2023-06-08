
var table = document.getElementById("dataTable");
var rowCount = 5;
var addRowBtn = document.getElementById("addRowtn");
addRowBtn.addEventListener('click',addRow);

// insert Row
function addRow() {
    rowCount++;
    var row = table.insertRow();
    var num = row.insertCell(0);
    num.innerHTML = rowCount;
    var name = row.insertCell();
    name.innerHTML = "<input type='text' class='form-control name_Ip' id='name" + rowCount + "' required>";
    var sub = row.insertCell();
    sub.innerHTML = "<input type='text' class='form-control sub_Ip' id='sub" + rowCount + "' required>";
    var mark = row.insertCell();
    mark.innerHTML = "<input type='text'class='form-control mark_Ip' id='mark" + rowCount + "' required>";
    var result = row.insertCell();
    result.innerHTML = "<button type='button' class='btn btn-success pass-btn'>Pass</button> <button type='button' class='btn btn-danger fail-btn'>Fail</button>";
    var action = row.insertCell();
    action.innerHTML = "<button class='btn btn-danger delBTN' onclick='remove(this)'>Delete</button>";

    //validate name
    var nameIp = document.querySelectorAll('.name_Ip');
    nameIp.forEach(input => {
        input.addEventListener('input', () => {
    
            if (!/^[a-zA-Z ]+$/.test(input.value)) {
                alert("Name can only contain letter and spaces");
                input.value = "";
            }
        });
    });
    
    //validate subject
    var subIp = document.querySelectorAll('.sub_Ip');
    subIp.forEach(input => {
        input.addEventListener('input', () => {
    
            if (!/^[a-zA-Z ]+$/.test(input.value)) {
                alert("Subject can only contain letter and spaces");
                input.value = "";
            }
        });
    });
    
    //validate marks
    var markIp = document.querySelectorAll('.mark_Ip');
    markIp.forEach(input => {
        input.addEventListener('input', () => {
    
            if (input.value < 0 || input.value > 100) {
                alert("Marks must be between 0 and 100");
                input.value = "";
            }
        });
    });
}


//delete rows
function remove(element) {
    element.parentNode.parentNode.remove();
    rowCount--;
    for (let i = 1; i < table.rows.length; i++) {
        table.rows[i].cells[0].innerHTML = i;

    }
}

// display table
function displayTable() {
    var tableData = "<tr><th>No.</th><th onclick='sortTable(1)' class='asc' title='Click to sort'>Name</th><th onclick='sortTable(2)' class='asc' title='Click to sort'>Subject</th><th>Marks</th></tr>";
    for (var i = 1; i <= rowCount; i++) {
        var mark = document.getElementById("mark" + i).value;
        var color = (mark < 33) ? "red" : "";
        tableData += "<tr style='background-color:" + color + "'>" + `<td class="counterCell"></td>` + "<td>" + document.getElementById("name" + i).value + "</td><td>" + document.getElementById("sub" + i).value + "</td><td>" + document.getElementById("mark" + i).value + "</td></tr>";
    }
    document.getElementById("tableData").innerHTML = tableData;
    localStorage.setItem("tableData", tableData);
    document.getElementById("tableData").innerHTML = localStorage.getItem("tableData");
    return false;
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
                if (txtValue.toUpperCase().startsWith(filter) ) {
                    matches = true;
                }
            }
        }

        if (matches == true) {
            tr[i].style.display = "";
        }
        else {
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
        for (i = 1; i < (rows.length - 1); i++) {
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

