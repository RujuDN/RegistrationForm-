jQuery(document).ready(function () {
    GetAllDetails();

    jQuery('#showModal').on('click', function () {
        jQuery('#registrationFormModal').modal('show');
    });

    jQuery.ajax({
        url: "RegisterForm/GetAllState",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data != null && data.length > 0) {
                jQuery("#state-dropdown").empty();
                jQuery.each(data, function (index, row) {
                    jQuery("#state-dropdown").append("<option value='" + row.Id + "'>" + row.StateName + "</option>")
                });
                jQuery("#state-dropdown").get(0).selectedIndex = '-1';

            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });

    jQuery("#state-dropdown").on("change", function () {
        var stateId = jQuery(this).val();
        jQuery.ajax({
            url: "RegisterForm/GetAllCities?stateId=" + stateId,
            type: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data != null && data.length > 0) {
                    jQuery("#city-dropdown").empty();
                    jQuery.each(data, function (index, row) {
                        jQuery("#city-dropdown").append("<option value='" + row.Id + "'>" + row.CityName + "</option>")
                    });
                    jQuery("#city-dropdown").get(0).selectedIndex = '-1';
                }
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    });

    jQuery("#Phone").on("keypress", function () {
        var regex = /^[6-9]{1}[0-9]{9}$/;
        if (regex.test($("#Phone").val())) {
            $("#Phone").css("border", "1px solid #00000036");
        } else {
            $("#Phone").css("border", "1px solid red");
        }
    });
});

function GetAllDetails() {
    jQuery.ajax({
        url: "RegisterForm/GetAllDetails",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result != null && result.length > 0) {
                var html = '';
                jQuery.each(result, function (key, item) {
                    html += '<tr>';
                    html += '<td>' + item.Id + '</td>';
                    html += '<td>' + item.Name + '</td>';
                    html += '<td>' + item.Email + '</td>';
                    html += '<td>' + item.Phone + '</td>';
                    html += '<td>' + item.Address + '</td>';
                    html += '<td>' + item.StateName + '</td>';
                    html += '<td>' + item.CityName + '</td>';
                    html += '<td><a href="#" class="btn btn-primary" onclick="return getDetailByID(' + item.Id + ')">Edit</a> | <a href="#" class="btn btn-warning" onclick="DeleteDetail(' + item.Id + ')">Delete</a></td>';
                    html += '</tr>';
                });
                jQuery('.tbody').html(html);
            } else {
                jQuery('.tbody').empty();
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function InsertUpdateDetail() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var regiObj = {
        Id: jQuery('#hdnID').val(),
        Name: jQuery('#Name').val(),
        Age: jQuery('#Age').val(),
        StateId: jQuery('#state-dropdown').val(),
        CityId: jQuery('#city-dropdown').val(),
        Email: jQuery('#Email').val(),
        Address: jQuery('#Address').val(),
        Phone: jQuery('#Phone').val(),
    };
    if (jQuery('#agree').is(':checked')) {
        jQuery.ajax({
            url: "RegisterForm/InsertUpdateDetails",
            data: JSON.stringify(regiObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                if (result == true) {
                    if (regiObj.Id == 0) {
                        toastr.success('Detail Inserted Successfully!');
                    } else {
                        toastr.success('Detail Updated Successfulyy!');
                    }
                }
                GetAllDetails();
                jQuery('#registrationFormModal').modal('hide');
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
    else {
        alert("Please click on checkbox first");
    }
}

function getDetailByID(Id) {
    jQuery('#Name').css('border-color', 'lightgrey');
    jQuery('#Age').css('border-color', 'lightgrey');
    jQuery('#State').css('border-color', 'lightgrey');
    jQuery('#Country').css('border-color', 'lightgrey');
    jQuery.ajax({
        url: "/RegisterForm/GetAllDetailById/" + Id,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            jQuery('#hdnID').val(result.Id);
            jQuery('#Name').val(result.Name);
            jQuery('#Age').val(result.Age);
            jQuery('#state-dropdown').val(result.StateId);
            jQuery('#state-dropdown').trigger("change");            
            jQuery('#Email').val(result.Email);
            jQuery('#Address').val(result.Address);
            jQuery('#Phone').val(result.Phone);
            setTimeout(function(){
                jQuery('#city-dropdown').val(result.CityId);
            }, 2000);
            jQuery('#registrationFormModal').modal('show');
            jQuery('#btnUpdate').show();
            jQuery('#btnSubmit').text('Update');
            jQuery('#agree').attr("checked", true);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

function DeleteDetail(Id) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        jQuery.ajax({
            url: "/RegisterForm/DeleteDetail/" + Id,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                if (result == true) {
                    toastr.success('Detail Deleted Successfully!');
                    GetAllDetails();
                } else {
                    toastr.error('There is some error in delete process!');
                }               
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function clearTextBox() {
    jQuery('#hdnID').val(0);
    jQuery('#Name').val("");
    jQuery('#Age').val("");
    jQuery('#Email').val("");
    jQuery('#Phone').val("");
    jQuery('#Address').val("");
    jQuery('#state-dropdown').val("");
    jQuery('#city-dropdown').val("");
    jQuery('#btnSubmit').text('Add');
    jQuery('#Name').css('border-color', 'lightgrey');
    jQuery('#Age').css('border-color', 'lightgrey');
    jQuery('#State').css('border-color', 'lightgrey');
    jQuery('#Country').css('border-color', 'lightgrey');
}

function validate() {
    var isValid = true;
    if (jQuery('#Name').val()?.trim() == "") {
        jQuery('#Name').css('border-color', 'Red');
        isValid = false;
    }
    else {
        jQuery('#Name').css('border-color', 'lightgrey');
    }
    if (jQuery('#Email').val()?.trim() == "") {
        jQuery('#Email').css('border-color', 'Red');
        isValid = false;
    }
    else {
        jQuery('#Email').css('border-color', 'lightgrey');
    }

    if (validateEmail(jQuery('#Email').val()?.trim())) {
        jQuery('#Email').css({
            background: "transparent",
            color: "black"
        });

    } else {
        jQuery('#Email').css({
            color: "red",
            border: "1px solid red"
        });
        return false;
    }

    if (jQuery('#Age').val()?.trim() == "") {
        jQuery('#Age').css('border-color', 'Red');
        isValid = false;
    }
    else {
        jQuery('#Age').css('border-color', 'lightgrey');
    }
    if (jQuery('#state-dropdown').val()?.trim() == "") {
        jQuery('#state-dropdown').css('border-color', 'Red');
        isValid = false;
    }
    else {
        jQuery('#state-dropdown').css('border-color', 'lightgrey');
    }
    if (jQuery('#city-dropdown').val()?.trim() == "") {
        jQuery('#city-dropdown').css('border-color', 'Red');
        isValid = false;
    }
    else {
        jQuery('#city-dropdown').css('border-color', 'lightgrey');
    }
    return isValid;
    }

function validateEmail(email) {
    var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    return $.trim(email).match(pattern) ? true : false;
}

