$(document).ready(function (){
    $('#example').DataTable({
        ajax : './data.json',
        columns : [
            {data: 'name'},
            {data: 'position'},
            {data: 'office'}
        ],
    });
});

array = []

console.log(array);