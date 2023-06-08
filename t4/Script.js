$(document).ready(function () {

    var table = $("#dTable").DataTable();
    var rowCount = 4;

    $("#addR").click(function () {
        // var table = $("#dTable").DataTable();
        table.row.add([
            '<tr>' + `<p class="counterCell"></p>`,
            '<td><input type="text" class="form-control name_Ip" id="name' + rowCount + '"><span></span></td>',
            '<td><input type="text" class="form-control sub_Ip" id="sub' + rowCount + '"><span></span></td>',
            '<td><input type="number" class="form-control mark_Ip" id="mark' + rowCount + '"><span></span></td>',
            '<td><button type="button" class="btn btn-success">Accept</button>&nbsp;<button type="button" class="btn btn-danger">Reject</button></td>',
            '<td><button type="button" class="btn btn-secondary dlt">Delete</button></td></tr>'
        ]).draw();
        rowCount++;
    });

    $("#dTable").on('click', '.dlt', function () {
        var rRow = $(this).closest("tr");
        table.row(rRow).remove();
        table.draw();
    });

    function display() {
        if (validate()) {
            $("#head1").show();
            var table2 = $("#sTable").DataTable();
            table2.clear();
            $("#th").show();
            for (let i = 1; i < rowCount; i++) {
                table2.row.add([
                    '<tr>' + `<p class="counterCell"></p>`,
                    '<td>' + $("#name" + i).val() + '</td>',
                    '<td>' + $("#sub" + i).val() + '</td>',
                    '<td>' + $("#mark" + i).val() + '</td></tr>'
                ]).draw();
            }
        }
    }

    function resultData() {
        if (validate()) {
            $("#head2").show();
            var table3 = $("#rTable").DataTable();
            table3.clear();
            $("#th1").show();

            var studData = {};
            for (let i = 1; i < rowCount; i++) {
                var name = $("#name" + i).val();
                var mark = parseFloat($("#mark" + i).val());

                if (!studData[name]) {
                    studData[name] = { totalMarks: mark, count: 1 };
                } else {
                    studData[name].totalMarks += mark;
                    studData[name].count++;
                }
            }

            var counter = 1;
            for (var name in studData) {
                var totalMarks = studData[name].totalMarks;
                var count = studData[name].count;
                var avg = (totalMarks / (count * 100)) * 100;

                table3.row.add([
                    '<tr><td>' + counter++ + '</td>',
                    '<td>' + name + '</td>',
                    '<td>' + avg.toFixed(2) + "%" + '</td></tr>'
                ]).draw();
            }
        }

    }


    $("#subBtn").click(function () {
        display();
        resultData();

    });

    function validate() {
        var status = true;
        var error = "";
        
        var nameIp = $('.name_Ip');
        nameIp.each(function (e) {
            if (nameIp.eq(e).val() == "") {
                error = "Name Cannot be empty";
                nameIp.eq(e).siblings().html(error).css('color', 'red');
                status = false;
            } else if (!/^[a-zA-Z ]+$/.test(nameIp.eq(e).val())) {
                error = "**Name can only contain letter and spaces**";
                nameIp.eq(e).siblings().html(error).css('color', 'red');
                status = false;
            } else {
                nameIp.eq(e).siblings().html("");
            }
        });


        var subIp = $('.sub_Ip');
        subIp.each(function (e) {
            if (subIp.eq(e).val() == "") {
                error = "Subject Cannot be empty";
                subIp.eq(e).siblings().html(error).css('color', 'red');
                status = false;
            } else if (!/^[a-zA-Z ]+$/.test(subIp.eq(e).val())) {
                error = "**Name can only contain letter and spaces**";
                subIp.eq(e).siblings().html(error).css('color', 'red');
                status = false;
            } else {
                subIp.eq(e).siblings().html("");
            }
        });

        var markIp = $('.mark_Ip');
        markIp.each(function (e) {
            if (markIp.eq(e).val() == "") {
                error = "Marks Cannot be empty";
                markIp.eq(e).siblings().html(error).css('color', 'red');
                status = false;
            } else if (markIp.eq(e).val() < 0 || markIp.eq(e).val() > 100) {
                error = "**Marks must be between 0 to 100**";
                markIp.eq(e).siblings().html(error).css('color', 'red');
                status = false;
            } else {
                markIp.eq(e).siblings().html("");
            }
        });

        return status;
    }
});