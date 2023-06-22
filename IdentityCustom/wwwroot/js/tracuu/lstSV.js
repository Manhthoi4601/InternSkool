//Render
var table = $('#StudentTbl').DataTable({
    language: { url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/vi.json', },
    paging: true,
    pageLength: 5,
    searching: true,
    "bLengthChange": false,
    "bFilter": false,
    "ajax": {
        "url": "/TraCuu/SVLst",
        "dataSrc": "",
    },
    "columns": [
        { "data": "masv" },
        { "data": "hotensv" },
        { "data": "quequan" },
        {
            "data": "ngaysinh",
            "render": function (data, type, row) {
                return data ? new Date(data).toLocaleDateString('en-GB') : '&nbsp;';
            }
        },
        { "data": "Khoa.tenkhoa" },     
    ]
});

//Search
function handleSearchInput(inputSelector) {
    $(inputSelector).on('input', function () {
        const input = $(this).val().toLowerCase();
        if (input !== '') {
            $('#Tbl').show();
        } else {
            $('#Tbl').hide();
        }
        table.search(input).draw();
    });
}

handleSearchInput('#searchName');
handleSearchInput('#searchKhoa');

$('#resetBtn').click(function () {
    $('#searchName').val('');
    $('#searchKhoa').val('');
    $('#searchDate').val('');
    table.search('').draw();
    table.ajax.reload();
    $('#Tbl').hide();
});

$('#searchBtn').on('click', function () {
    $('#Tbl').show();
    var inputDate = moment($("#searchDate").val(), 'YYYY-MM-DD');
    table.search(inputDate.format('DD/MM/YYYY'), false, true).draw();
});