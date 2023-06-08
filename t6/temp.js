var data = [];
var datatable;
var val;
var obj;
var validname,validemail,validnumber;
var Information=[];
$(document).ready(function () {
    datatable = $('#Table').DataTable({
        data: data,
        columns: [
            {
                title: "",
                data: null,
                defaultContent: "",
                class: "dt-control",
            },
            {
                title: "Name",
                data: "Name",
            },
            {
                title: "Age",
                data: "Age",
            },
            {
                title: "Contact Number",
                data: "ContactNumber",
            },
            {
                title: "Address",
                data: "Address",
            },
            {
                title: "Action",
                data: null,
                defaultContent: '<button type="button" id="treatment" class="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Treatment</button><br><button type="button" id="edit" class="btn btn-primary btn-sm mt-1">Edit</button><button type="button" id="delete" class="btn btn-danger btn-sm mt-1 mx-1">Delete</button>',
            },

        ]

    });
    //clickevent();

    $('#Save').on('click', function () {

        validname = "/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/";
        validemail ="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
        validnumber = "/(^[0-9]{0,10}[0-9]$)/"
        var nameinput = $('#nameinput').val();
        
        var DOBinput = $('#DOBinput').val();
        var inputval = $("input[id='gender']:checked").val();
        var emailinput = $('#emailinput').val();
        var numinput = $('#numinput').val();
        var countryinput = $('#countryinput').val();
        var Stateinput = $('#Stateinput').val();
        var cityinput = $('#cityinput').val();
        var address = cityinput + " " + Stateinput + " " + countryinput;
        var year = new Date(DOBinput).getFullYear();
        var currentyear = new Date().getFullYear();
        var age = currentyear - year;
        savadata();

        if(!nameinput || validname.test(nameinput) ){
            $(".nameinput").text("Enter Valid Name")
            $(".nameinput").css('color','red')
        } if(!emailinput || validemail.test(emailinput) ){
            $(".emailinput").text("Enter Valid Email")
            $(".emailinput").css('color','red')
        }
        if(!numinput || validnumber.test(numinput) ){
            $(".numinput").text("Enter Valid Number")
            $(".numinput").css('color','red')
        } if(!DOBinput){
            $(".DOBinput").text("Please Enter Date")
            $(".DOBinput").css('color','red')
        } if(!inputval){
            $(".inputval").text("Please select Gender Date")
            $(".inputval").css('color','red')
        } if(!countryinput){
            $(".countryinput").text("Please select Country ")
            $(".countryinput").css('color','red')
        } if(!Stateinput){
            $(".Stateinput").text("Please select State ")
            $(".Stateinput").css('color','red')
        } if(!cityinput){
            $(".cityinput").text("Please select City ")
            $(".cityinput").css('color','red')
        }if(age<=15){
            alert("age is not valid ")
        }else{
            obj = {Name:nameinput,Age:age,ContactNumber:numinput,Address:address,Information:[]}
            data.push(obj)
            datatable.clear().draw();
            datatable.rows.add(data).draw();
        }
      
    
    })
    $('.table').on('click','#edit', function () { 
        
        var val1 = $(this).parents('tr').find('td:eq(0)').text() 
               

    
    })
    $('#AddSave').on('click',function savadata(){
        var Disease = $('#Disease')
        var Doctor = $('#Doctor')
        var Medicine = $('#Medicine')
        var FollowUpDate =$('#FollowUpDate')
        Array.from(Disease).forEach(element,index => {
            obj.Information.push({
                disease:element.value,
                doctor:Doctor[index].value,
                medicine:Medicine[index].value,
                followupdate:FollowUpDate[index].value
            })
        })
  
    })
    $('#AddData').on('click', function () {    
        $('.modal-body input').val('')
        $('.modal-body select').val('') 
    })
    $('.table').on('click','#delete', function () {    
        datatable.row($(this).parents('tr'))
        .remove()
        .draw();
    })
  
    
    $('table tbody').on('click', '.dt-control', function () {
       var tr = $(this).closest('tr');
       var index = $(this).parents('tr').index()
        var row = datatable.row(tr);
      
        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        } else {
            // Open this row
            row.child(format(data[index].Information)).show();
            tr.addClass('shown');
        }
    
    });
});
function format(d) {
    var str = `<table class="table">
    <thead>
        <tr>
            <th>Disease</th>
            <th>Doctor</th>
            <th>Medicine</th>
            <th>Follow Up Date</th>
        </tr>
    </thead><tbody>`
    d.forEach(element => {
        str += `<tr><td>${element.disease}</td> <td>${element.doctor}</td> <td>${element.medicine}</td> <td>${element.followupdate}</td></tr>`       
    })
    str += `</tbody></table>`
    return (str);
}

// function clickevent() {
//     $('.dt-control').off().click(function () {
//         AddData();
//     });
//     $('#edit').off().click(function () {
//         EditForm();
//     })
//     $('#delete').off().click(function () {
//         DeleteData();
//     })
// }










