// Teacher Qty
const Teacher = () => {
    $.get('/GiangVien/GetList', (data) => {
        $('#TeacherQty').text(data.length);
    })
        .fail((xhr, status, error) => {
            console.log(error);
        });
};
Teacher();

// Subject Qty
const Subject = () => {
    $.get('/DeTai/GetList', (data) => {
        $('#SubjectQty').text(data.length);
    })
        .fail((xhr, status, error) => {
            console.log(error);
        });
};
Subject();


// Departmnent Qty
const Department = () => {
    $.get('/Khoa/GetList', (data) => {
        $('#DepartmentQty').text(data.length);
    })
        .fail((xhr, status, error) => {
            console.log(error);
        });
};
Department();

// Student Qty
const Student = () => {
    $.get('/SinhVien/GetList', (data) => {
        $('#StudentQty').text(data.length);
    })
        .fail((xhr, status, error) => {
            console.log(error);
        });
};
Student();

var table = $('#DashboardTbl').DataTable({
    language: { url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/vi.json', },
    paging: true,
    pageLength: 5,
    "order": [[5, 'desc']],
    searching: true,
    "bLengthChange": false,
    "bFilter": false,
    "ajax": {
        "url": "/HuongDan/GetList",
        "dataSrc": "",
    },
    "columns": [
        { "data": "mahd" },
        { "data": "SinhVien.hotensv" },
        { "data": "DeTai.madt" },
        { "data": "GiangVien.hotengv" },
        { "data": "SinhVien.Khoa.tenkhoa" },
        { "data": "ketqua" }
    ]
});