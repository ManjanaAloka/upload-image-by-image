$(document).ready(function() {
    // ######################################== Check duplicate company email address ==############################################
    // $('input[name="email"]').keyup(function(e) {
    //     // alert("asd");
    //     $email = $(this).val();
    //     $.post("../super_admin/assets/ajax/upload.php", { 'check_mail': true, 'keyUp_mail': $email },
    //         function(data, textStatus) {
    //             var response = JSON.parse(data);
    //             if (response["check_mail"] == "invalid") {
    //                 $('input[name="email"]').css({ "color": "red" });
    //                 $('.emp-pro-btn').attr("disabled", true);
    //                 // alert("vada");
    //             } else {
    //                 $('input[name="email"]').css({ "color": "green" });
    //                 $('.emp-pro-btn').attr("disabled", false);
    //             }

    //         }
    //     );
    // });


    // ######################################== Add employee form ==############################################

    $("#employee-profile").submit(function(event) {
        event.preventDefault();

        var fullName = document.querySelector('input[name="fullname"]');
        var designation = document.querySelector('input[name="designation"]');
        var department = document.querySelector('input[name="department"]');
        var nic = document.querySelector('input[name="nic"]');
        var regNumber = document.querySelector('input[name="reg"]');
        var EPF_numb = document.querySelector('input[name="epf"]');
        var tel = document.querySelector('input[name="tel"]');
        var email = document.querySelector('input[name="email"]');
        var address = document.querySelector('input[name="address"]');
        var district = document.querySelector('input[name="district"]');
        var country = document.querySelector('input[name="country"]');
        var pcode = document.querySelector('input[name="pcode"]');


        var fileInput = document.getElementById('image-input');
        var file = fileInput.files[0];

        if (fullName.value && designation.value && department.value && nic.value && tel.value && regNumber.value && EPF_numb.value && email.value && address.value && district.value && country.value && pcode.value && file) {
            var formData = new FormData();
            formData.append('fullname', fullName.value);
            formData.append('designation', designation.value);
            formData.append('department', department.value);
            formData.append('email', email.value);
            formData.append('tel', tel.value);
            formData.append('nic', nic.value);
            formData.append('epf', EPF_numb.value);
            formData.append('reg', regNumber.value);
            formData.append('address', address.value);
            formData.append('district', district.value);
            formData.append('country', country.value);
            formData.append('pcode', pcode.value);

            formData.append('image', file);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', '../admin/assets/ajax/employee_profile.php', true);

            xhr.onload = function() {
                if (xhr.status === 200) {
                    // document.getElementById('result').innerHTML = xhr.responseText;
                    var response = JSON.parse(xhr.responseText);
                    if (response["img"] == "ok") {
                        $.iaoAlert({
                            msg: "Successfull",
                            type: "success",
                            mode: "dark",
                        });
                        setInterval(function() {
                            $('#employee-profile')[0].reset();
                        }, 1000);
                    } else if (response["img"] == "t_error") {
                        $.iaoAlert({
                            msg: "Image type error",
                            type: "error",
                            mode: "dark",
                        });
                    } else if (response["img"] == "s_error") {
                        $.iaoAlert({
                            msg: "Image size error.",
                            type: "error",
                            mode: "dark",
                        });
                    } else if (response["img"] == "error") {
                        $.iaoAlert({
                            msg: "please check again.",
                            type: "error",
                            mode: "dark",
                        });
                    } else if (response["img"] == "upload_error") {
                        $.iaoAlert({
                            msg: "Upload error , please retry.",
                            type: "error",
                            mode: "dark",
                        });
                    } else if (response["img"] == "not_file select") {
                        $.iaoAlert({
                            msg: "Not File Select.",
                            type: "error",
                            mode: "dark",
                        });
                    } else {
                        $.iaoAlert({
                            msg: "Error.",
                            type: "error",
                            mode: "dark",
                        });
                    }
                } else {
                    $.iaoAlert({
                        msg: "An error occurred while uploading the file.",
                        type: "error",
                        mode: "dark",
                    });
                }
            };

            xhr.send(formData);
        } else {
            $.iaoAlert({
                msg: "Please fill in all fields and select a file to upload.",
                type: "error",
                mode: "dark",
            });
        }

    });

    // ######################################== Add employee  basic salary ==###########################################

    // email eka check karala fill kiriima 
    $(".emails").change(function(e) {
        e.preventDefault();
        var val = $(this).val();
        $.post("../admin/assets/ajax/model.php", { 'event01': true, 'value': val },
            function(data, textStatus, jqXHR) {
                var response = JSON.parse(data);
                if (response['event01'] == 'ok') {
                    $("input[name='memberId']").val(response['memberId']);
                    $("input[name='department']").val(response['department']);
                    $("input[name='epf']").val(response['epf']);
                    $('.basicSalary').attr("disabled", false);
                } else {
                    $("input[name='memberId']").val('No Result');
                    $("input[name='department']").val('No Result');
                    $("input[name='epf']").val('No Result');
                    $('.basicSalary').attr("disabled", true);
                }
            }
        );

    });
    //=========================== basic Salary ====================================
    $("#basic-salary").submit(function(e) {
        e.preventDefault();
        var val = $(this).serialize();

        var aditions = [];
        var deduction = [];
        $('#aditions :selected').each(function(i, selected) {
            aditions[i] = $(selected).val();
        });
        $('#deduction :selected').each(function(i, selected) {
            deduction[i] = $(selected).val();
        });


        $.post("../admin/assets/ajax/model.php", { 'basic_salary': true, 'values': val, 'aditions': aditions, 'deduction': deduction },
            function(data, textStatus) {
                var response = JSON.parse(data);
                if (response['basic'] == "1") {
                    $.iaoAlert({
                        msg: "Added New Employee Basic Salary",
                        type: "success",
                        mode: "dark",
                    });
                    // setInterval(function() {
                    //      $('#basic-salary')[0].reset();
                    // }, 1000);
                } else if (response['basic'] == "2") {
                    $.iaoAlert({
                        msg: "Update " + response['month'] + " month basic salary.",
                        type: "success",
                        mode: "dark",
                    });
                    // setInterval(function() {
                    //     $('#basic-salary')[0].reset();
                    // }, 1000);
                } else if (response['basic'] == "3") {
                    $.iaoAlert({
                        msg: "Added " + response['month'] + " Basic salary.",
                        type: "success",
                        mode: "dark",
                    });
                    // setInterval(function() {
                    //     $('#basic-salary')[0].reset();
                    // }, 1000);
                } else if (response['basic'] == "4") {
                    $.iaoAlert({
                        msg: "Input Field is required!.",
                        type: "warning",
                        mode: "dark",
                    });
                    // setInterval(function() {
                    //     $('#basic-salary')[0].reset();
                    // }, 1000);
                } else {
                    $.iaoAlert({
                        msg: "Enter the correct data and try again",
                        type: "error",
                        mode: "dark",
                    });
                }
            }
        );
    });

    // ######################################== Addition form ==############################################
    $(".addition").submit(function(e) {
        e.preventDefault();
        var val = $(this).serialize();
        $.post("../admin/assets/ajax/model.php", { 'addition': true, 'value': val },
            function(data, textStatus) {
                var response = JSON.parse(data);
                if (response['addition'] == '1') {
                    $.iaoAlert({
                        msg: "add addition",
                        type: "success",
                        mode: "dark",
                    });
                } else if (response['addition'] == '2') {
                    $.iaoAlert({
                        msg: "Duplicate addition",
                        type: "warning",
                        mode: "dark",
                    });
                } else if (response['addition'] == '3') {
                    $.iaoAlert({
                        msg: "empty field, check again",
                        type: "warning",
                        mode: "dark",
                    });
                } else {
                    $.iaoAlert({
                        msg: "error",
                        type: "error",
                        mode: "dark",
                    });
                }
            }
        );
    });

    // ######################################== Deduction form ==############################################

    $(".deduction-form").submit(function(e) {
        e.preventDefault();
        var val = $(this).serialize();
        $.post("../admin/assets/ajax/model.php", { 'deduction': true, 'value': val },
            function(data, textStatus) {
                var response = JSON.parse(data);
                if (response['deduction'] == '1') {
                    $.iaoAlert({
                        msg: "add deduction",
                        type: "success",
                        mode: "dark",
                    });
                } else if (response['deduction'] == '2') {
                    $.iaoAlert({
                        msg: "Duplicate deduction",
                        type: "warning",
                        mode: "dark",
                    });
                } else if (response['deduction'] == '3') {
                    $.iaoAlert({
                        msg: "empty field, check again",
                        type: "warning",
                        mode: "dark",
                    });
                } else {
                    $.iaoAlert({
                        msg: "error",
                        type: "error",
                        mode: "dark",
                    });
                }
            }
        );
    });

    // ######################################== search_employee ==############################################

    $('.search_employee').submit(function(e) {
        e.preventDefault();
        $val = $(this).serialize();
        $('.emp_info').remove();
        $.post("../admin/assets/ajax/model.php", { 'search_employee': true, 'value': $val },
            function(data, textStatus) {
                var response = JSON.parse(data);
                if (response["search_employee"] == "ok") {
                    $('.result1').append(`<div class="info-bx d-flex emp_info">
                                            <div>
                                                <div class="event-time">
                                                    <img src="../admin/uploads/employee/` + response['pic'] + `" alt="" width="150px" height="150px">
                                                </div>
                                            </div>
                                            <div class="event-info">
                                                <h4 class="event-title">` + response['emp_name'] + `</h4>
                                                <ul class="media-post">
                                                    <li><i class="fa fa-envelope-o" aria-hidden="true"></i> ` + response['email'] + `</li>
                                                    <li><i class="fa fa-phone" aria-hidden="true"></i>` + response['tel'] + `</li>
                                                </ul>
                                                <ul>
                                                    <li> Register Number :- ` + response['member_id'] + `</li>
                                                    <li> NIC Number :- ` + response['nic'] + `</li>
                                                    <li> EPF Number :- ` + response['epf_number'] + `</li>
                                                    <li> Designation :- ` + response['designation'] + `</li>
                                                    <li> Department :- ` + response['department'] + `</li>
                                                </ul>
                                            </div>
                                        </div> `);
                } else {
                    $.iaoAlert({
                        msg: "There is no employee in the entered data.!!🙁",
                        type: "warning",
                        mode: "dark",
                    });
                }

            }
        );
    });


    // ######################################== emp_profile validation (event 2) ==############################################
    // email eka check karala fill kiriima 
    $("input[name='nic'] ,input[name='reg'], input[name='epf'], input[name='tel'], input[name='email']").keyup(function(e) {
        e.preventDefault();
        var val = $(this).val();
        $.post("../admin/assets/ajax/model.php", { 'event02': true, 'value': val },
            function(data, textStatus) {
                var response = JSON.parse(data);
                if (response['reg'] == 'ok') {
                    $.iaoAlert({
                        msg: response['value'] + " Used before.!",
                        type: "warning",
                        mode: "dark",
                    });
                    $('#employee-profile .submit').attr("disabled", true);
                    $("input[name='reg']").css({ "background-color": "#FFC0C0" });
                } else if (response['nic'] == 'ok') {
                    $.iaoAlert({
                        msg: response['value'] + " Used before.!",
                        type: "warning",
                        mode: "dark",
                    });
                    $('#employee-profile .submit').attr("disabled", true);
                    $("input[name='nic']").css({ "background-color": "#FFC0C0" });
                } else if (response['epf_number'] == 'ok') {
                    $.iaoAlert({
                        msg: response['value'] + " Used before.!",
                        type: "warning",
                        mode: "dark",
                    });
                    $('#employee-profile .submit').attr("disabled", true);
                    $("input[name='epf']").css({ "background-color": "#FFC0C0" });
                } else if (response['tel'] == 'ok') {
                    $.iaoAlert({
                        msg: response['value'] + " Used before.!",
                        type: "warning",
                        mode: "dark",
                    });
                    $('#employee-profile .submit').attr("disabled", true);
                    $("input[name='tel']").css({ "background-color": "#FFC0C0" });
                } else if (response['email'] == 'ok') {
                    $("input[name='email']").css({ "background-color": "#FFC0C0" });
                    $.iaoAlert({
                        msg: response['value'] + " Used before.!",
                        type: "warning",
                        mode: "dark",
                    });
                    $('#employee-profile .submit').attr("disabled", true);
                } else if (response['error'] == 'ok') {
                    // alert('success');
                    $('#employee-profile .submit').attr("disabled", false);
                    $("#employee-profile input").css({ "background": "none" });
                }
            }
        );

    });

    // ######################################== update pay sheet ==############################################

    $('.paysheet_form').submit(function(e) {
        e.preventDefault();
        $val = $(this).serialize();
        $.post("../admin/assets/ajax/model.php", { 'paysheet': true, 'value': $val },
            function(data, textStatus) {
                var response = JSON.parse(data);
                if (response['paysheet'] == 'ok') {
                    // $(".full_content").css("display", "contents");
                    $(".com_name").html(response['com_name']);
                    $(".district").html(response['district']);
                    $(".tel").html(response['tel']);
                    $(".com_email").html(response['com_email']);
                    $(".emp_name").html(response['emp_name']);
                    $(".reg").html(response['reg']);
                    $(".month").html(response['month']);
                    $(".basicSalary").html(response['basic_salary']);
                    $.each(response['additionName'], function(i, item) {
                        var addition_description = "<li>" + item + "</li>";
                        $(".addition_description").append(addition_description);
                    });
                    $.each(response['additionValue'], function(i, item) {
                        var addition_value = "<li>" + item + "</li>";
                        $(".addition_value").append(addition_value);
                    });
                    $.each(response['deductionName'], function(i, item) {
                        var deduction_description = "<li>" + item + "</li>";
                        $(".deduction_description").append(deduction_description);
                    });
                    $.each(response['deductionValue'], function(i, item) {
                        var deduction_value = "<li>" + item + "</li>";
                        $(".deduction_value").append(deduction_value);
                    });
                    $(".gross_addition").html(response['grossAddition']);
                    $(".gross_deduction").html(response['grossDeduction']);
                    $(".net_pay").html(response['netpay']);
                } else {
                    $.iaoAlert({
                        msg: "Please Recheck employee email and try again!",
                        type: "error",
                        mode: "dark",
                    });
                }
            }
        );


    });

    // ######################################== custom report ==############################################
    $(".custom-report").change(function(e) {
        e.preventDefault();
        $val = $(this).serialize();
        var filterType = [];
        $('#filterType :selected').each(function(i, selected) {
            filterType[i] = $(selected).val();
        });
        $.post("../admin/assets/ajax/model.php", { "customReport": true, "value": $val, "filterType": filterType },
            function(data, textStatus) {
                var response = JSON.parse(data);
                // alert(response['asd']);
                if (response['customResult'] == 'ok') {
                    $.each(response['customResultRow'], function(i, item) {
                        var row = item;
                        $(".customReportBody").append(row);
                    });
                }
            }
        );
    });

    // ######################################== Employer Profile ==############################################
    //===========================company Details
    $(".companyDetails").submit(function(e) {
        e.preventDefault();
        var abbreviation = document.querySelector('input[name="abbreviation"]');
        var com_name = document.querySelector('input[name="com_name"]');
        var com_address = document.querySelector('input[name="com_address"]');
        var com_email = document.querySelector('input[name="com_email"]');
        var tel = document.querySelector('input[name="tel"]');
        var web = document.querySelector('input[name="web"]');
        var description = document.querySelector('input[name="description"]');
        var n_emp = document.querySelector('input[name="n_emp"]');
        var n_project = document.querySelector('input[name="n_project"]');
        var n_client = document.querySelector('input[name="n_client"]');


        var fileInput = document.getElementById('image-input');
        var file = fileInput.files[0];

        // if (abbreviation.value && com_name.value && com_email.value && com_address.value && tel.value && web.value && description.value && n_emp.value && n_project.value && n_client.value && file) {
        var formData = new FormData();
        formData.append('abbreviation', abbreviation.value);
        formData.append('com_name', com_name.value);
        formData.append('com_address', com_address.value);
        formData.append('com_email', com_email.value);
        formData.append('tel', tel.value);
        formData.append('web', web.value);
        formData.append('description', description.value);
        formData.append('n_emp', n_emp.value);
        formData.append('n_project', n_project.value);
        formData.append('n_client', n_client.value);

        formData.append('image', file);
        formData.append('companyDetails', true);


        var xhr = new XMLHttpRequest();
        xhr.open('POST', '../admin/assets/ajax/model.php', true);

        xhr.onload = function() {
            if (xhr.status === 200) {
                // document.getElementById('result').innerHTML = xhr.responseText;
                var response = JSON.parse(xhr.responseText);
                if (response["companyDetails"] == "1") {
                    $.iaoAlert({
                        msg: "update successfull.",
                        type: "success",
                        mode: "dark",
                    });
                    setInterval(function() {
                        location.reload();
                    }, 1000);
                } else {
                    alert("error");
                }
            } else {
                $.iaoAlert({
                    msg: "An error occurred while uploading the file.",
                    type: "error",
                    mode: "dark",
                });
            }
        };

        xhr.send(formData);
        // }

    });

    //==========================company service
    var counter = 2;
    $('.addService').click(function(event) {
        event.preventDefault();
        $(".did").val(counter);
        $("#add-service").append(`
            <tr class="list-item tr${counter}">
                <td>
                    <div class="row">
                        <div class="col-md-3">
                            <label class="col-form-label">Service Name</label>
                            <div>
                                <input class="form-control" type="text" name="serviceName${counter}" placeholder="Devn Recriut">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <label class="col-form-label">Service Description</label>
                            <div>
                                <input class="form-control" type="text" name="description${counter}" placeholder="describe the service">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label class="col-form-label">Upload Image</label>
                            <div class="form-group col-3">
                                <input type="file" name="image${counter}" id="service-image">
                            </div>
                        </div>
                        <div class="col-md-2">
                            <input type="text" value="${counter}" name="remove_id" class="sid sid${counter}" id="s${counter}" hidden>
                            <label for="s${counter}" class="delete delete${counter}"><i class="fa fa-close"></i></label>
                        </div>
                    </div>
                </td>
            </tr>
        `);
        counter++;
    });
    // ~~~~~~~~~~~~~~~~~~~~~~~remove company service~~~~~~~~~~~~~~~~~~~~~~~~~~

    $(document).on('click', `.sid`, function() {
        var sid = $(this).val();
        $(`.tr${sid}`).remove();
        alert(sid);
        counter--;
    });
    // ~~~~~~~~~~~~~~~~~~~~~~ company service form ~~~~~~~~~~~~~~~~~~~~~~~~~~~
    $(".companyServices").submit(function(e) {
        e.preventDefault();
        var formData = new FormData(this);
        formData.append('companyServices', true);
        $.ajax({
            url: "../admin/assets/ajax/model.php",
            type: "POST",
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: function(data) {
                alert(data);
            }
        });
    });




});