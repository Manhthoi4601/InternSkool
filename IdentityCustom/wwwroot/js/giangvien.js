//Show Pop-up
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
var table = $('#TeacherTbl').DataTable({
    language: { url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/vi.json', },
    paging: true,
    pageLength: 5,
    searching: true,
    "bLengthChange": false,
    "bFilter": false,
    "ajax": {
        "url": "/GiangVien/GetList",
        "dataSrc": "",
    },
    "columns": [
        { "data": "magv" },
        { "data": "hotengv" },
        { "data": "dienthoai" },
        {
            "data": "email",
        },
        { "data": "Khoa.tenkhoa" },
        {
            "data": "magv",
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
    $('#searchDate').val('');
    table.search('').draw();
    table.ajax.reload();
});

$('#searchBtn').on('click', function () {
    var inputDate = moment($("#searchDate").val(), 'YYYY-MM-DD');
    table.search(inputDate.format('DD/MM/YYYY'), false, true).draw();
});

//Details
table.on('click', '.details-btn', function () {
    var id = $(this).data('id');
    $.ajax({
        url: '/GiangVien/GetDetails',
        data: { id: id },
        type: 'GET',
        success: function (data) {
            $('#Id').text(data.magv);
            $('#Name').text(data.hotengv);
            $('#Phone').text(data.dienthoai);
            $('#Mail').text(data.email);
            $('#Khoa').text(data.Khoa.tenkhoa);
            $('#detail-modal').modal('show');
        },
        error: function () {
            showPopup('error', 'Opps...', "Có lỗi xảy ra khi lấy dữ liệu");
        }
    });
});

//Create 
$(document).on('click', '.create-new ', () => {
    getkhoaList();
});

//Get KhoaLst
const getkhoaList = async () => {
    try {
        const data = await $.get("/Khoa/GetList");
        const $khoaSelect = $("#cbKhoa");
        $khoaSelect.empty();
        data.forEach((khoa) => {
            $khoaSelect.append($("<option>").val(khoa.makhoa).text(khoa.tenkhoa));
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
        url: "/GiangVien/Create",
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
                url: "/GiangVien/Delete",
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

////Edit
const getKhoaByID = async (id) => {
    try {
        const data = await $.get(`/Khoa/GetList`);
        const $khoa = $("#khoa");
        $khoa.empty();
        $.each(data, function (index, item) {
            $khoa.append($("<option>").val(item.makhoa).text(item.tenkhoa));
        });
        $khoa.val(id);
    } catch (error) {
        console.log(error);
        showPopup('error', 'Opps...', "Có lỗi xảy ra trong quá trình lấy dữ liệu");
    }
};
getKhoaByID();

table.on('click', '.edit-btn', function () {
    var id = $(this).data('id');
    $.ajax({
        url: '/GiangVien/GetDetails',
        data: { id: id },
        type: 'GET',
        success: function (data) {
            $('#magv').val(data.magv);
            $('#hotengv').val(data.hotengv);
            $('#dienthoai').val(data.dienthoai);
            $('#email').val(data.email);
            $('#khoa').val(data.Khoa.makhoa);
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
        url: "/GiangVien/Update",
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