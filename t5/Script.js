$(document).ready(function () {
    var rowCount = 3;

    $('#addR').click(function () {
        rowCount++;
        $('#table3').append('<tr><td>' + rowCount + '</td>' +
            '<td><input type="text" id="name' + rowCount + '" class="form-control name_Ip" /><span></span></td>'
            + '<td><input type="text" id="sub' + rowCount + '" class="form-control sub_Ip" /><span></span></td>'
            + '<td><input type="text" id="mark' + rowCount + '" class="form-control mark_Ip" /><span></span></td>'
            + '<td><button type="button" class="btn btn-success" id="accept' + rowCount + '" onclick="Accept(this)" data-clicked="false">Accept</button> <button type="button" class="btn btn-danger" id="reject' + rowCount + '" onclick="Reject(this)">Reject</button></td>'
            + '<td><button type="button" class="btn btn-secondary dltBtn">Delete</button></td></tr>'
        );

    });

    $('#table3').on('click', '.dltBtn', function () {
        $(this).parent().parent().remove();
        rowCount--;
        $('#table3 tr').each(function (i) {
            $(this).find('td:first').html(i);
        });
    });


    function displayTable() {
        if (validate()) {
            $('#head1').show();

            var table4 = "<tr><th>No.</th><th>Name</th><th>Subject</th><th>Marks</th></tr>";
            let flag = false;
            $("#table3 tr").each(function () {
                if (flag) {

                    let name = $(this).find("input:eq(0)").val();
                    let subject = $(this).find("input:eq(1)").val();
                    let mark = $(this).find("input:eq(2)").val();
                    let color = mark < 33 ? "red" : "";
                    let acceptBtn = $(this).find("button:eq(0)");
                    if (acceptBtn.attr('data-clicked') == 'true') {
                        let rejectBtn = $(this).find("button:eq(1)");
                        if (rejectBtn.attr('data-clicked') != 'true') {
                            table4 += '<tr style="background-color:' + color + '"><td class="counterCell"></td><td>' + name + '</td><td>' + subject + '</td><td>' + mark + '</td></tr>'
                        }
                    }

                }
                else {
                    flag = true;
                }
            });
            $("#table4").html(table4);
        }
        return false;
    }


    function resultTable() {
        if (validate()) {
            $("#head2").show();
            var studData = {};
            let flag = false;
            $("#table3 tr").each(function () {
                if (flag) {
                    // let i =1;
                    let name = $(this).find("input:eq(0)").val();
                    let mark = parseFloat($(this).find("input:eq(2)").val());
                    let acceptBtn = $(this).find("button:eq(0)");

                    if (acceptBtn.attr('data-clicked') == 'true') {
                        if (!studData[name]) {
                            studData[name] = { totalMark: mark, count: 1 };
                        } else {
                            studData[name].totalMark += mark;
                            studData[name].count++;
                        }
                    }
                } else {
                    flag = true;
                }


            });


            var table5 = '<tr><th>No</th><th>Name</th><th>Percentage</th></tr>'
            var counter = 1;
            for (let name in studData) {
                var totalMark = studData[name].totalMark;
                var count = studData[name].count;
                var avg = (totalMark / (count * 100)) * 100;
                let color = avg < 40 ? "red" : "";
                table5 += '<tr style="background-color:' + color + '"><td>' + counter++ + '</td><td>' + name + '</td><td>' + avg.toFixed(2) + '%' + '</td></tr>';
            }


            $("#table5").html(table5);
        }
        return false;
    }

    $('#table3').on('click', '.btn-success', function () {
        var acceptBtn = $(this);
        acceptBtn.addClass('stateColor');
        acceptBtn.parent().find(':last-child').removeClass('stateColor');
        acceptBtn.attr('data-clicked', 'true');
        acceptBtn.siblings('.btn-danger').attr('data-clicked', 'false');
    });

    $('#table3').on('click', '.btn-danger', function () {
        var rejectBtn = $(this);
        rejectBtn.addClass('stateColor');
        rejectBtn.parent().find(':first-child').removeClass('stateColor');
        var row = rejectBtn.closest("tr");
        var acceptBtn = row.find('.btn-success');
        acceptBtn.attr('data-clicked', 'false');
        $("#table4").find(row).remove();
        rowCount--;
    });


    $('#subBtn').click(function () {
        displayTable();
        resultTable();
    });

    function validate() {
        var status = true;
        var error = "";

        var name_Ip = $('.name_Ip');
        name_Ip.each(function (e) {
            if (name_Ip.eq(e).val() == "") {
                error = "Name cannot be empty";
                name_Ip.eq(e).siblings().html(error).css('color', 'red');
                status = false;
            } else if (!/^[a-zA-Z ]+$/.test(name_Ip.eq(e).val())) {
                error = "Name can only contain letters and spaces";
                name_Ip.eq(e).siblings().html(error).css('color', 'red');
                status = false;
            } else {
                name_Ip.eq(e).siblings().html("")
            }
        });

        var sub_Ip = $('.sub_Ip');
        sub_Ip.each(function (e) {
            if (sub_Ip.eq(e).val() == "") {
                error = "Subject cannot be empty";
                sub_Ip.eq(e).siblings().html(error).css('color', 'red');
                status = false;
            } else if (!/^[a-zA-Z ]+$/.test(sub_Ip.eq(e).val())) {
                error = "Subject can only contain letters and spaces";
                sub_Ip.eq(e).siblings().html(error).css('color', 'red');
                status = false;
            } else {
                sub_Ip.eq(e).siblings().html("")
            }
        });

        var mark_Ip = $('.mark_Ip');
        mark_Ip.each(function (e) {
            if (mark_Ip.eq(e).val() == "") {
                error = "Marks cannot be empty";
                mark_Ip.eq(e).siblings().html(error).css('color', 'red');
                status = false;
            } else if (mark_Ip.eq(e).val() < 0 || mark_Ip.eq(e).val() > 100) {
                error = "Marks must be between 0 and 100";
                mark_Ip.eq(e).siblings().html(error).css('color', 'red');
                status = false;
            } else {
                mark_Ip.eq(e).siblings().html("")
            }
        });

        return status;

    }

});