var table = document.getElementById("table3")
var rowCount = 3;

function addRow() {
    rowCount++;
    var row = table.insertRow();
    var id = row.insertCell(0);
    id.setAttribute('data-label', 'No');
    id.innerHTML = rowCount;

    var name = row.insertCell();
    name.setAttribute('data-label', 'Name');
    name.innerHTML = '<input type="text" class="form-control name_Ip" id="name' + rowCount + '"><span></span>'

    var sub = row.insertCell();
    sub.setAttribute('data-label', 'Subject');
    sub.innerHTML = '<input type="text" class="form-control sub_Ip" id="sub' + rowCount + '"><span></span>'

    var mark = row.insertCell();
    mark.setAttribute('data-label', 'Marks');
    mark.innerHTML = '<input type="number" class="form-control mark_Ip" id="mark' + rowCount + '"><span></span>'

    var result = row.insertCell();
    result.setAttribute('data-label', 'Result');
    result.innerHTML = '<button type="button" class="btn btn-success" id="accept' + rowCount + '" onclick="Accept(this)" data-clicked="false">Accept</button><button type="button" class="btn btn-danger" id="reject' + rowCount + '" onclick="Reject(this)">Reject</button>'

    var action = row.insertCell();
    action.innerHTML = '<button type="button" class="btn btn-dark" onclick="rmRow(this)">Delete</button>'
}

function rmRow(e) {
    e.parentNode.parentNode.remove();
    rowCount--;
    for (let i = 1; i < table.rows.length; i++) {
        table.rows[i].cells[0].innerHTML = i;
    }
}

function saveData() {
    displayData();
    resultData();
}

function displayData() {
    if (validate()) {
        document.getElementById("head1").style.display = "block";
        var table4 = '<tr><th>No.</th><th>Name</th><th>Subject</th><th>Mark</th></tr>';
        for (let i = 1; i <= rowCount; i++) {
            var mark = document.getElementById("mark" + i).value;
            var color = mark < 33 ? "red" : "";
            var acceptBtn = document.getElementById("accept" + i);
            if (acceptBtn.getAttribute('data-clicked') === 'true') {
                var rejectBtn = document.getElementById("reject" + i);
                if (rejectBtn.getAttribute('data-clicked') !== 'true') {
                    table4 += "<tr style='background-color:" + color + "'>" +
                        `<td class="counterCell">` + "</td><td>" +
                        document.getElementById("name" + i).value + "</td><td>" +
                        document.getElementById("sub" + i).value + "</td><td>" +
                        document.getElementById("mark" + i).value + "</td></tr>";
                }
            }
        }
        document.getElementById("table4").innerHTML = table4;
    }
    return false;
}

function resultData() {
    if (validate()) {
        document.getElementById("head2").style.display = "block";
        var studData = {};
        for (var i = 1; i <= rowCount; i++) {
            var name = document.getElementById("name" + i).value;
            var mark = parseFloat(document.getElementById("mark" + i).value);
            var acceptBtn = document.getElementById("accept" + i);
            if (acceptBtn.getAttribute('data-clicked') == 'true') {
                if (!studData[name]) {
                    studData[name] = { totalMarks: mark, count: 1 };
                } else {
                    studData[name].totalMarks += mark;
                    studData[name].count++;
                }
            }
        }

        var table5 = "<tr><th>No.</th><th>Name</th><th>Percentage</th></tr>";
        var counter = 1;
        for (var name in studData) {
            var totalMarks = studData[name].totalMarks;
            var count = studData[name].count;
            var avg = (totalMarks / (count * 100)) * 100;
            let color = (avg < 40) ? "red" : "";
            table5 += "<tr style='background-color:" + color + "'><td>" + counter++ + "</td><td>" + name + "</td><td>" + avg.toFixed(2) + "%" + "</td></tr>";
        }

        document.getElementById("table5").innerHTML = table5;
    }

    return false;
}

function Accept(Btn) {
    Btn.classList.add('stateColor');
    Btn.parentElement.lastElementChild.classList.remove('stateColor');
    Btn.setAttribute('data-clicked', 'true');
    var rejectBtn = Btn.parentElement.querySelector('.btn-danger');
    rejectBtn.setAttribute('data-clicked', 'false');
}

function Reject(Btn) {
    Btn.classList.add('stateColor');
    Btn.parentElement.firstElementChild.classList.remove('stateColor');
    //var row = Btn.closest("tr");
    var acceptBtn = Btn.parentElement.querySelector('.btn-success');
    acceptBtn.setAttribute('data-clicked', 'false');
    document.getElementById("table4").row.remove();
    rowCount--;
}

function validate() {
    var status = true;
    var error = ""
    var nameIp = document.querySelectorAll('.name_Ip');
    nameIp.forEach((input) => {
        if (input.value == "") {
            error = "Name Cannot be empty";
            input.nextElementSibling.innerHTML = error;
            input.nextElementSibling.style.color = "red";
            status = false;
        } else {
            input.nextElementSibling.innerHTML = "";
        }
    });

    var subIp = document.querySelectorAll('.sub_Ip');
    subIp.forEach((input) => {
        if (input.value == "") {
            error = "Subject Cannot be empty";
            input.nextElementSibling.innerHTML = error;
            input.nextElementSibling.style.color = "red";
            status = false;
        } else {
            input.nextElementSibling.innerHTML = "";
        }
    });

    var markIp = document.querySelectorAll('.mark_Ip');
    markIp.forEach((input) => {
        if (input.value == "") {
            error = "Marks Cannot be empty";
            input.nextElementSibling.innerHTML = error;
            input.nextElementSibling.style.color = "red";
            status = false;
        } else {
            input.nextElementSibling.innerHTML = "";
        }
    });

    return status;
}