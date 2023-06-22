﻿//Show Pop-up
const showPopup = (icon, title, text) => {
    Swal.fire({ icon, title, text });
};

//Hide Modal
const HideModal = () => {
    $("#create-form")[0].reset();
    $("#create-modal").modal("hide");
    $("#edit-modal").modal("hide");
}

//Toggle
$('#togglebtn').click(function () {
    $(this).find('i').toggleClass('fa-filter fa-xmark');
    $(this).toggleClass('collapsed');
});

//Render
var table = $('#InternTbl').DataTable({
    language: { url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/vi.json', },
    paging: true,
    pageLength: 5,
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
        { "data": "ketqua" },
        {
            "data": "mahd",
            "createdCell": cell => $(cell).addClass('text-center'),
            "render": function (data, type, row) {
                if (type === "display") {
                    return `
                    <div>
                        <a class="btn btn-sm bg-success-light me-2 edit-btn" data-id="${data}"><i class="feather-edit"></i></a>
                        <a class="btn btn-sm bg-danger-light me-2 details-btn" data-id="${data}"><i class="feather-eye"></i></a>
                        <a class="btn btn-sm bg-danger-light me-2 delete-btn" data-id="${data}"><i class="feather-trash"></i></a>
                    </div>`;
                }
                return data;
            }
        },
    ]
});


//Search
$('#searchInput').on('input', function () {
    const input = $(this).val().toLowerCase();
    table.search(input).draw();
});

$('#resetBtn').click(function () {
    $('#searchInput').val('');
    table.search('').draw();
    table.ajax.reload();
});


//Details
table.on('click', '.details-btn', function () {
    var id = $(this).data('id');
    $.ajax({
        url: '/HuongDan/GetDetails',
        data: { id: id },
        type: 'GET',
        success: function (data) {
            $('#Id').text(data.mahd);
            $('#Name').text(data.SinhVien.hotensv);
            $('#Subject').text(data.DeTai.tendt);
            $('#Teacher').text(data.GiangVien.hotengv);
            $('#Depart').text(data.SinhVien.Khoa.tenkhoa);
            $('#Score').text(data.ketqua);
            $('#detail-modal').modal('show');
        },
        error: function () {
            showPopup('error', 'Opps...', "Có lỗi xảy ra khi lấy dữ liệu");
        }
    });
});

//Create 
$(document).on('click', '.create-new ', () => {
    getSVList();
    getDeTaiList();
    getGVList();
});

//Get List Select Input
const getSVList = async () => {
    try {
        const data = await $.get("/SinhVien/GetList");
        const $LstSelect = $("#cbSV");
        $LstSelect.empty();
        data.forEach((item) => {
            $LstSelect.append($("<option>").val(item.masv).text(item.hotensv));
        });
    } catch (error) {
        console.log(error);
        showPopup('error', 'Opps...', "Có lỗi xảy ra trong quá trình lấy dữ liệu");
    }
};

const getDeTaiList = async () => {
    try {
        const data = await $.get("/DeTai/GetList");
        const $LstSelect = $("#cbDeTai");
        $LstSelect.empty();
        data.forEach((item) => {
            $LstSelect.append($("<option>").val(item.madt).text(item.tendt));
        });
    } catch (error) {
        console.log(error);
        showPopup('error', 'Opps...', "Có lỗi xảy ra trong quá trình lấy dữ liệu");
    }
};

const getGVList = async () => {
    try {
        const data = await $.get("/GiangVien/GetList");
        const $LstSelect = $("#cbGV");
        $LstSelect.empty();
        data.forEach((item) => {
            $LstSelect.append($("<option>").val(item.magv).text(item.hotengv));
        });
    } catch (error) {
        console.log(error);
        showPopup('error', 'Opps...', "Có lỗi xảy ra trong quá trình lấy dữ liệu");
    }
};


$("#create-form").submit(function (e) {
    e.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
        url: "/HuongDan/Create",
        type: "POST",
        data: formData,
        success: function () {
            showPopup('success', 'Thành Công', "Thêm mới thành công");
            HideModal();
            table.ajax.reload(null, false);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
            showPopup('error', 'Opps...', "Kiểm tra lại dữ liệu!");
            HideModal();
        }
    });
});

//Remove
table.on('click', '.delete-btn', function () {
    var Id = $(this).data('id');
    Delete(Id);
});
const Delete = (id) => {
    const confirmDelete = async () => {
        const confirmResult = await Swal.fire({
            title: 'Bạn có chắc muốn xóa?',
            text: "Hành động này không thể hoàn tác!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy bỏ'
        });

        if (confirmResult.isConfirmed) {
            $.ajax({
                url: "/HuongDan/Delete",
                type: "POST",
                data: { Id: id },
                success: function (data) {
                    Swal.fire({
                        title: 'Thành Công', text: "Xóa Thành Công", icon: 'success',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            table.ajax.reload(null, false);
                        }
                    })
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.responseText);
                    showPopup('error', 'Opps...', "Có lỗi xảy ra khi xóa");
                }
            });
        }
    };
    confirmDelete();
};


//Edit
const getSVByID = async (id) => {
    try {
        const data = await $.get(`/SinhVien/GetList`);
        const $khoa = $("#masv");
        $khoa.empty();
        $.each(data, function (index, item) {
            $khoa.append($("<option>").val(item.masv).text(item.hotensv));
        });
        $khoa.val(id);
    } catch (error) {
        console.log(error);
        showPopup('error', 'Opps...', "Có lỗi xảy ra trong quá trình lấy dữ liệu");
    }
};

const getDTByID = async (id) => {
    try {
        const data = await $.get(`/DeTai/GetList`);
        const $Lst = $("#madt");
        $Lst.empty();
        $.each(data, function (index, item) {
            $Lst.append($("<option>").val(item.madt).text(item.tendt));
        });
        $Lst.val(id);
    } catch (error) {
        console.log(error);
        showPopup('error', 'Opps...', "Có lỗi xảy ra trong quá trình lấy dữ liệu");
    }
};


const getGVByID = async (id) => {
    try {
        const data = await $.get(`/GiangVien/GetList`);
        const $Lst = $("#magv");
        $Lst.empty();
        $.each(data, function (index, item) {
            $Lst.append($("<option>").val(item.magv).text(item.hotengv));
        });
        $Lst.val(id);
    } catch (error) {
        console.log(error);
        showPopup('error', 'Opps...', "Có lỗi xảy ra trong quá trình lấy dữ liệu");
    }
};
getSVByID();
getDTByID();
getGVByID();

table.on('click', '.edit-btn', function () {

    var id = $(this).data('id');
    $.ajax({
        url: '/HuongDan/GetDetails',
        data: { id: id },
        type: 'GET',
        success: function (data) {
            $('#mahd').val(data.mahd);
            $('#masv').val(data.SinhVien.masv);
            $('#magv').val(data.GiangVien.magv);
            $('#madt').val(data.DeTai.madt);
            $('#ketqua').val(data.ketqua);
            $('#edit-modal').modal('show');
        },
        error: function () {
            showPopup('error', 'Opps...', "Có lỗi xảy ra khi lấy dữ liệu");
        }
    });
});


$("#edit-form").submit(function (e) {
    e.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
        url: "/HuongDan/Update",
        type: "POST",
        data: formData,
        success: function () {
            showPopup('success', 'Thành Công', "Cập nhật thành công");
            HideModal();
            table.ajax.reload(null, false);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
            showPopup('error', 'Opps...', "Kiểm tra lại dữ liệu!");
            HideModal();
        }
    });
});