$(document).ready(function (){
   var table = $('#dTable').DataTable();
   var erow;

    $('#save').click(function(){
        var status = true;
        var fname = $('#fname').val();
        var lname = $('#lname').val();
        var address = $('#address').val();

        if(fname == ""){
            $("#fnm").html("This field is required").css('color','red');
            status = false;
        }else{
            $("#fnm").html("");
        }

        if(lname == ""){
            $("#lnm").html("This field is required").css('color','red');
            status = false;
        }else{
            $("#lnm").html("");
        }

        if(address == ""){
            $("#add").html("This field is required").css('color','red');
            status = false;
        }else{
            $("#add").html("");
        }

        if(status){
            $("#fnm").html("");
            $("#lnm").html("");
            $("#add").html("");
            
        $("#form").trigger("reset");
            table.row.add([fname,lname,address,`<button type="button" class="btn btn-primary me-2 edt" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button><button type="button" class="btn btn-danger dlt">Delete</button>`]).draw();
            $('#close').click();
        }
    });

    
$('#dTable').on('click','.dlt',function(){
    let crow = $(this).closest("tr");
    table.row(crow).remove();
    table.draw();
});

$('#dTable').on('click','.edt',function(){
        $('#save').hide();
        $('#edit').show();
       erow = $(this).closest("tr");
       var fname = $('#fname');
       fname.val(erow.find("td").eq(0).html());
      var lname = $('#lname');
      lname.val(erow.find("td").eq(1).html());
    var address = $('#address');
    address.val(erow.find("td").eq(2).html());


});

$('#edit').on('click',function(){
    var fname = $('#fname').val();
    var lname = $('#lname').val();
    var address = $('#address').val();

    erow.find("td").eq(0).html(fname);
    erow.find("td").eq(1).html(lname);
    erow.find("td").eq(2).html(address);

    
    $('#close').click();

    $("#form").trigger("reset");

});

$('#addr').click(function(){
    $('#save').show();
     $('#edit').hide();
});

});

