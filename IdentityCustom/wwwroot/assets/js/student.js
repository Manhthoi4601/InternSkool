
//Modal Hide
function HidePopUpModal() {
    $('#StudentModal').modal('hide');
};
//Clear value from textbox
function Clear() {
    $('#masv').val('')
    $('#hotensv').val('');
    $('#quequan').val('');
    $('#namsinh').val('');
    $('#makhoa').val('');
};

//AddStudent
function AddStudent() {
    var data = $("#AddStudentForm").serializeArray();
    console.log(data);
    $.ajax({
        type: 'POST',
        url: '/SinhVien/CreateSinhVien',
        dataType: "json",
        data: data,
        success: function () {
            $.notify("Thêm Sinh Viên Thành Công", {
                position: "top-center",
                className: 'success',
            });
            Clear();
            HidePopUpModal();
            $('#myDiv').load(' #myDiv');
        },
        error: function (errormessage) {
            $.notify("Lỗi", {
                position: "top-center",
                className: 'error',
            });
            //alert(errormessage.responseText);
        }
    });
};


//Edit
function ShowEditStudentModel(id) {
    $('#masv').attr('readonly', 'true');

    $.ajax({
        url: "/SinhVien/GetStudent",
        type: "GET",
        data: { id: id },
        dataType: "json",
        success: function (result) {
            $("#editStudentModalBody").html(result);
        },
        error: function (error) {
            alert(error.responseText);
        }
    });
};
function EditStudent() {
    var data = $("#EditStudentForm").serializeArray();
    console.log(data);
  
    $.ajax({
        url: "/SinhVien/EditStudent",
        type: "POST",
        dataType: "json",
        data: data,
        success: function (result) {
            if (result.success) {
                $.notify(" Cập Nhật Thành Công", {
                    position: "top-center",
                    className: 'success',
                });
                Clear();
                HidePopUpModal();
                window.location.reload();
            } else {
                $("#editStudentModalBody").html(result);
            }
        },
        error: function () {
            $.notify("Lỗi", {
                position: "top-center",
                className: 'error',
            });
        }
    });
};

//Delete

function DeleteStudent(id) {
    if (confirm("Bạn có chắc muốn xoá sinh viên này?")) {
        $.ajax({
            url: "/SinhVien/DeleteStudentConfirmed",
            type: "POST",
            data: { id: id },
            success: function (result) {
                if (result.success) {
                    $.notify("Xoá Sinh Viên Thành Công", {
                        position: "top-center",
                        className: 'success',
                    });
                    $('#myDiv').load(' #myDiv');  
                }
            },
            error: function (errormessage) {
                $.notify("Lỗi khi xoá", {
                    position: "top-center",
                    className: 'error',
                });
                //alert(errormessage.responseText);
            }
        });
    }
};
