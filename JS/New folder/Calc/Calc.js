$(document).ready(function(){

    var table = $('#dTable').DataTable();
    var erow;
    var addition = $('#add');
    var substraction = $('#sub');
    var division = $('#div');
    var multiplication = $('#mul');

    
    function add(v1,v2){
        if(addition.prop('checked')){
            return (parseInt(v1) + parseInt(v2));
        }
        else{
            return null;
        }
    }
    

    function sub(v1,v2){
        if(substraction.prop('checked')){
            return (parseInt(v1) - parseInt(v2));
        }
        else{
            return null;
        }
    }


    function div(v1,v2){
        if(division.prop('checked')){
            return (parseInt(v1) / parseInt(v2)).toFixed(2);
        }
        else{
            return null;
        }
    }
    

    function mul(v1,v2){
        if(multiplication.prop('checked')){
            return (parseInt(v1) * parseInt(v2));
        }
        else{
            return null;
        }
    }

    $('#save').click(function(){
        var v1 = $('#val1').val();
        var v2 =$('#val2').val();

        let obj = {
            val1: v1,
            val2: v2,
            addition: add(v1,v2),
            substraction: sub(v1,v2),
            division: div(v1,v2),
            multiplication: mul(v1,v2)
        }

        if(validate()){
            $("#form").trigger("reset");

            table.row.add([obj.val1,obj.val2,obj.addition,obj.substraction,obj.division,obj.multiplication,
        `<button type="button" class="btn btn-primary me-1 edt" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button><button type="button" class="btn btn-danger dlt">Delete</button>`]).draw();

        $('#close').click();
        }

    });


    $('#dTable').on('click','.edt',function(){
        $('#save').hide();
        $('#edit').show();

        erow = $(this).closest("tr");
        var v1 = $('#val1');
        v1.val(erow.find("td").eq(0).html());
        var v2 = $('#val2');
        v2.val(erow.find("td").eq(1).html());
        
        var a = $('#add');
        if(erow.find("td").eq(2).html()){
            a.prop("checked",true);
        }
        var s = $('#sub');
        if(erow.find("td").eq(3).html()){
            s.prop("checked",true);
        }
        var d = $('#div');
        if(erow.find("td").eq(4).html()){
            d.prop("checked",true);
        }
        var m = $('#mul');
        if(erow.find("td").eq(5).html()){
            m.prop("checked",true);
        }
       
    });
    

    $('#edit').click(function(){
        var v1 = $('#val1').val();
        var v2 = $('#val2').val();
        var a = add(v1,v2);
        var s = sub(v1,v2);
        var d = div(v1,v2);
        var m = mul(v1,v2);


        if(validate()){
            erow.find("td").eq(0).html(v1);
            erow.find("td").eq(1).html(v2);
            erow.find("td").eq(2).html(a);
            erow.find("td").eq(3).html(s);
            erow.find("td").eq(4).html(d);
            erow.find("td").eq(5).html(m);
    
            $('#close').click();
            $("#form").trigger("reset");
        }
        
    });

    $('#addr').click(function(){
        $('#save').show();
         $('#edit').hide();

         $("#form").trigger("reset");
    });

    $('#dTable').on('click','.dlt',function(){
        let drow = $(this).closest("tr");
        table.row(drow).remove();
        table.draw();
    });

    function validate(){
        var status = true;
        var v1 = $('#val1').val();
        var v2 = $('#val2').val();

        if(v1 == ""){
            $('#v1').html("This field is required").css('color','red');
            status=false;
        }
        else{
            $('#v1').html("");
        }

        if(v2 == ""){
            $('#v2').html("This field is required").css('color','red');
            status=false;
        }
        else{
            $('#v2').html("");
        }

        return status;
    }


});

