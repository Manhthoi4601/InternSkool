//Render
var table = $('#ScoreTbl').DataTable({
    language: { url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/vi.json', },
    paging: true,
    pageLength: 5,
    searching: true,
    "bLengthChange": false,
    "bFilter": false,
    "ajax": {
        "url": "/TraCuu/DiemLst",
        "dataSrc": "",
    },
    "columns": [
        { "data": "masv" },
        { "data": "SinhVien.hotensv" },
        {
            "data": "SinhVien.ngaysinh",
            "render": function (data, type, row) {
                return data ? new Date(data).toLocaleDateString('en-GB') : '&nbsp;';
            }
        },
        { "data": "SinhVien.quequan" },
        { "data": "SinhVien.Khoa.tenkhoa" },
        { "data": "GiangVien.hotengv" },
        { "data": "DeTai.tendt" },
        { "data": "ketqua" },
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
handleSearchInput('#searchDeTai');
handleSearchInput('#searchKhoa');

$('#resetBtn').click(function () {
    $('#searchName').val('');
    $('#searchDeTai').val('');
    $('#searchKhoa').val('');
    table.search('').draw();
    table.ajax.reload();
    $('#Tbl').hide();
});
