$(document).ready(function(){
    var table = $('#tableData').DataTable();
    var Name = $('#name');
    var DOB = $('#dob');
   // var Email = $('#email');
    var Contact = $('#contact');
    var Country = $('#country');
    var State = $('#state');
    var City = $('#city');
    var eRow;

    function getAge(){
        var selected = new Date(DOB.val());
        var getNow = new Date();
        var selectedYear = selected.getFullYear();
        var getNowYear = getNow.getFullYear();
        var Age = getNowYear - selectedYear ;

        return Age;
    }


   
    $('#save').click(function(){
        if(validate()){
           // let checkVal = $('input[name="gender"]:checked').val();
            let name = Name.val();
            let contact = Contact.val();
            let country = Country.val();
            let state = State.val();
            let city = City.val();
        
    
            let info = {
                name: name,
                age : getAge(),
                contact : contact,
                address : city+','+state+','+country,
                action : `<button type="button" class="btn btn-outline-info btn-sm me-1" data-bs-toggle="modal" data-bs-target="#addTmodal" id="addT">Add Treatment</button><button type="button" class="btn btn-primary me-1 btn-sm edt" data-bs-toggle="modal" data-bs-target="#addPmodal">Edit</button><button type="button" class="btn btn-danger dlt btn-sm">Delete</button>`
            };
    
             $('#close').click();
            table.row.add(["",info.name,info.age,info.contact,info.address,info.action]).draw();
            $("#tableData tbody td:first-child").addClass("dt-control");
        }
  
    });

    $('#tableData').on('click','.edt',function(){
        $('#save').hide();
        $('#update').show();

        eRow = $(this).closest('tr');
        let nm = $('#name');
        nm.val(eRow.find('input').eq(0).html());
        let dob = $('#dob');
        dob.val(eRow.find('input').eq(1).html());
        let eml = $('#email');
        eml.val(eRow.find('input').eq(5).html());
        let mo = $('#contact')
        mo.val(eRow.find('input').eq(6).html());

        var m = $("#male");
        if(eRow.find('input').eq(2).html()){
            m.prop('checked',true);
        }

        var f = $("#female");
        if(eRow.find('input').eq(3).html()){
            f.prop('checked',true);
        }

    });


    $('#update').click(function(){
        let name = Name.val();
        let age = getAge();
        let contact = Contact.val();
        let address = City.val()+','+State.val()+','+Country.val();

        eRow.find('td').eq(1).html(name);
        eRow.find('td').eq(2).html(age);
        eRow.find('td').eq(3).html(contact);
        eRow.find('td').eq(4).html(address);

        $('#form').trigger('reset');
        $('#close').click();
        
    });


    $('#tableData').on('click','.dlt',function(){
        let dRow = $(this).closest('tr');
        table.row(dRow).remove();
        table.draw();
    });

    $('#addR').click(function(){
        $('#save').show();
        $('#update').hide();

        $('#form').trigger('reset');
    });

    $('#addT').click(function(){
        $('#form').trigger('reset');
    });

    $('#save1').click(function(){
        $('#close1').click();
    })

    function format(){
        var Disease = $('#disease').val();
        var Doctor = $('#doctor').val();
        var Medicine = $('#medicine').val();
        var FollowDate = $('#date').val();
    
        return(
            '<table cellpadding="5" cellspacing="0" style="padding-left:50px;" id="tTable">' +
            '<tr>' +
            '<th>Disease</th>' + 
            '<th>Doctor</th>' + 
            '<th>Medicine</th>' + 
            '<th>Follow Up Date</th>' + 
            '</tr>' +
            '<tr>' +
            '<td>' + Disease + '</td>' + 
            '<td>' + Doctor+ '</td>' + 
            '<td>' + Medicine + '</td>' + 
            '<td>' + FollowDate + '</td>' + 
            '</tr>'+
            '</table>'
        )
    }


    $('#tableData tbody').on('click', 'td.dt-control', function(){
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if(row.child.isShown()){
            row.child.hide();
            tr.removeClass('shown');
        }else{
            row.child(format(row)).show();
            tr.addClass('shown');
        }
    });

    function validate(){
        var status = true;

        let nm = $('#name');
        if(nm.val() == ""){
            nm.next().html('Name cannot be empty').css('color','red');
            status = false;
        }else{
            nm.next().html("");
        }

        let dob = $('#dob');
        if(dob.val() == ""){
            dob.next().html('Please select any date').css('color','red');
            status = false; 
        }else{
            dob.next().html(""); 
        }

        let checkVal = $('input[name="gender"]:checked');
        if(!checkVal.val()){
            $('#main').html('please select your gender').css('color','red');
            status = false;
        }else{
            $('#main').html("");
        }

        let em = $('#email');
        if(em.val() == ""){
            em.next().html('Please enter your email').css('color','red');
            status = false;
        }else{
            em.next().html();
        }

        let mo = $('#contact');
        if(mo.val() == ""){
            mo.next().html('Please enter contcat number').css('color','red');
            status = false;
        }else{
            mo.next().html("");
        }

        return status;
    }

});