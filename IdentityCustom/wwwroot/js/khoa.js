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
var table = $('#DepartmentTbl').DataTable({
    language: { url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/vi.json', },
    paging: true,
    pageLength: 5,
    searching: true,
    bLengthChange: false,
    bFilter: false,
    info: true,
    "ajax": {
        "url": "/Khoa/GetList",
        "dataSrc": "",
    },
    "columns": [
        { "data": "makhoa" },
        { "data": "tenkhoa" },
        { "data": "dienthoai" },
        {
            "data": "makhoa",
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
        }
    ],
});

//Create 
$("#create-form").submit(function (e) {
    e.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
        url: "/Khoa/Create",
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
                url: "/Khoa/Delete",
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
//Search
$('#searchInput').on('input', function () {
    const input = $(this).val().toLowerCase();
    table.search(input).draw();
});

$('#resetBtn').on('click', function () {
    table.search('').draw();
    $('#searchInput').val('');
});

//Details
table.on('click', '.details-btn', function () {
    var id = $(this).data('id');
    $.ajax({
        url: '/Khoa/GetDetails',
        data: { id: id },
        type: 'GET',
        success: function (data) {
            $('#Id').text(data.makhoa);
            $('#Name').text(data.tenkhoa);
            $('#Phone').text(data.dienthoai);
            $('#detail-modal').modal('show');
        },
        error: function () {
            showPopup('error', 'Opps...', "Có lỗi xảy ra khi lấy dữ liệu");
        }
    });
});

//Edit
table.on('click', '.edit-btn', function () {
    var id = $(this).data('id');
    $.ajax({
        url: '/Khoa/GetDetails',
        data: { id: id },
        type: 'GET',
        success: function (data) {
            $('#makhoa').val(data.makhoa);
            $('#tenkhoa').val(data.tenkhoa);
            $('#dienthoai').val(data.dienthoai);
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
        url: "/Khoa/Update",
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