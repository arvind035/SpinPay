$(document).ready(function () {

    const user_id_from_session = $('#getuserid').val();

    $('#dashboard').click(function () {
        $("#transaction-div").hide();
        $("#request-div").hide();
        $('#loanApply-div').hide();
        $("#profile-div").hide();
        $("#document-div").hide();
        $("#query-div").hide();
        $("#loan-div").hide();
        $('#dashboard-div').show();
        $('#dashboard').addClass('navbarBtn');
        $('#loan').removeClass('navbarBtn');
        $('#transaction').removeClass('navbarBtn');
        $('#profile').removeClass('navbarBtn');
        $('#documents').removeClass('navbarBtn');
        $('#request').removeClass('navbarBtn');
        $('#anyquery').removeClass('navbarBtn');
        $("#detailHeading").empty();
    });

    $('#loan').click(function () {
        $.ajax({
            url: 'http://localhost:8000/api/request/loandetails',
            type: 'POST',
            data: {
                user_id: user_id_from_session
            },
            // beforeSend: function () {
                // $('#loan').addClass('navbarBtn');
                // $('#dashboard').removeClass('navbarBtn');
                // $('#transaction').removeClass('navbarBtn');
                // $('#profile').removeClass('navbarBtn');
                // $('#documents').removeClass('navbarBtn');
                // $('#request').removeClass('navbarBtn');
            // },
            success: function (response) {
                if (response['status'] != 200) {
                    alert('We are facing some issue please try later');
                } else {
                    $('#loan').addClass('navbarBtn');
                    $('#dashboard').removeClass('navbarBtn');
                    $('#transaction').removeClass('navbarBtn');
                    $('#profile').removeClass('navbarBtn');
                    $('#documents').removeClass('navbarBtn');
                    $('#request').removeClass('navbarBtn');
                    $('#anyquery').removeClass('navbarBtn');
                    $('#dashboard-div').hide();
                    $('#loanApply-div').hide();
                    $("#transaction-div").hide();
                    $("#request-div").hide();
                    $("#profile-div").hide();
                    $("#query-div").hide();
                    $("#document-div").hide();
                    $("#loan-div").show();
                    $("#row").empty();
                    $("#detailHeading").empty();
                    var hd = 'Status of all the taken loan';
                    $('#detailHeading').append(hd);
                    var trHTML = '';
                    $.each(response['message'], function (i, item) {
                        let status = "";
                        if (item.status == 'ongoing')
                            status =
                                '<span style="padding:5px 15px;border-radius:1000px;background-color:yellow; color:black">Ongoing</span>';
                        let buttonDisbaled = "";
                        if (item.status == 'overdue') {
                            status =
                                '<span style="padding:5px 15px;border-radius:1000px;background-color:red;">Overdue</span>';
                        }
                        if (item.status == 'repaid') {
                            status =
                                '<span style="padding:5px 15px;border-radius:1000px;background-color:green;">Repaid </span>';
                            buttonDisbaled = "disabled";
                        }
                        let applicationid = "SPINPAYOO12E" + item.id;
                        var date = new Date(item.start_date);
                        starting_date = date.getDate() + "/" + (date
                            .getMonth() + 1) + "/" + date.getFullYear();
                        var date2 = new Date(item.end_date);
                        ending_date = date2.getDate() + "/" + (date2
                            .getMonth() + 1) + "/" + date2.getFullYear();
                        trHTML += '<tr style="color:white"><td>' +
                            applicationid + '</td><td>$ ' + item
                                .amount + '</td><td>' + starting_date +
                            '</td><td>' + ending_date +
                            '</td><td>' +
                            status +
                            '</td><td><button style="border-radius:10px;border:none; width:100px;height:27px;background-color:rgb(67, 181, 216)" onclick="repayment(' +
                            item.id +
                            ',' + i +
                            ')" id="' + i + '" ' + buttonDisbaled +
                            '>PAY NOW<button>' +
                            '</td></tr>';
                    });
                    $('#row').append(trHTML);
                }
            }
        });
    });

    $('#transaction').click(function () {
        $.ajax({
            url: 'http://localhost:8000/api/request/transactiondetails',
            type: 'POST',
            data: {
                user_id: user_id_from_session
            },
            beforeSend: function () {
                // $('#transaction').addClass('navbarBtn');
                // $('#dashboard').removeClass('navbarBtn');
                // $('#loan').removeClass('navbarBtn');
                // $('#profile').removeClass('navbarBtn');
                // $('#documents').removeClass('navbarBtn');
                // $('#request').removeClass('navbarBtn');
            },
            success: function (response) {
                // console.log(response);
                if (response['status'] != 200) {
                    alert('We are facing some issue please try later');
                } else {
                    $('#transaction').addClass('navbarBtn');
                    $('#dashboard').removeClass('navbarBtn');
                    $('#loan').removeClass('navbarBtn');
                    $('#profile').removeClass('navbarBtn');
                    $('#documents').removeClass('navbarBtn');
                    $('#request').removeClass('navbarBtn');
                    $('#anyquery').removeClass('navbarBtn');
                    $('#dashboard-div').hide();
                    $("#loan-div").hide();
                    $('#loanApply-div').hide();
                    $("#request-div").hide();
                    $("#profile-div").hide();
                    $("#document-div").hide();
                    $("#query-div").hide();
                    $("#transaction-div").show();
                    $("#transaction_row").empty();
                    $("#detailHeading").empty();
                    var hd = 'All the transaction'
                    $('#detailHeading').append(hd);

                    var trHTML = '';
                    $.each(response['message'], function (i, item) {
                        let transactionid = "SPINPAYOO12E" + item.id;
                        var date = new Date(item.created_at);
                        created = date.getDate() + "/" + (date.getMonth() + 1) +
                            "/" + date.getFullYear();
                        let statustr = "";
                        if (item.status == "failed") {
                            statustr =
                                '<span style="padding:5px 15px;border-radius:1000px;background-color:red;">Failed</span>';
                        }
                        if (item.status == "successfull") {
                            statustr =
                                '<span style="padding:5px 15px;border-radius:1000px;background-color:green;">Success</span>';
                        }
                        trHTML += '<tr style="color:white"><td>' +
                            transactionid + '</td><td>$ ' + item
                                .amount + '</td><td>' +
                            statustr + '</td><td>' + created + '</td></tr>';
                    });
                    $('#transaction_row').append(trHTML);
                }
            }
        });
    });
    $('#request').click(function () {
        $.ajax({
            url: 'http://localhost:8000/api/request/allrequest',
            type: 'POST',
            data: {
                user_id: user_id_from_session
            },
            // beforeSend: function () {
                // $('#request').addClass('navbarBtn');
                // $('#dashboard').removeClass('navbarBtn');
                // $('#loan').removeClass('navbarBtn');
                // $('#transaction').removeClass('navbarBtn');
                // $('#profile').removeClass('navbarBtn');
                // $('#documents').removeClass('navbarBtn');
            // },
            success: function (response) {
                console.log(response);
                if (response['status'] != 200) {
                    alert('We are facing some issue please try later');
                } else {
                    $('#request').addClass('navbarBtn');
                    $('#dashboard').removeClass('navbarBtn');
                    $('#loan').removeClass('navbarBtn');
                    $('#transaction').removeClass('navbarBtn');
                    $('#profile').removeClass('navbarBtn');
                    $('#documents').removeClass('navbarBtn');
                    $('#anyquery').removeClass('navbarBtn');
                    isapproved = "-";
                    $('#dashboard-div').hide();
                    $('#loanApply-div').hide();
                    $("#loan-div").hide();
                    $("#transaction-div").hide();
                    $("#profile-div").hide();
                    $("#document-div").hide();
                    $("#query-div").hide();
                    $("#request-div").show();
                    $("#request_row").empty();
                    $("#detailHeading").empty();
                    var hd = 'Total raised request for laon by me'
                    $('#detailHeading').append(hd);
                    var trHTML = '';

                    $.each(response['message'], function (i, item) {
                        let requestid = "SPINPAYOO12E" + item.id;
                        if (item.status == 'approved') {
                            var date2 = new Date(item.updated_at);
                            isapproved = date2.getDate() + "/" + (date2
                                .getMonth() + 1) + "/" + date2.getFullYear();
                        }
                        var date = new Date(item.created_at);
                        let created = date.getDate() + "/" + (date.getMonth() +
                            1) + "/" + date.getFullYear();
                        let statusCSS = "";
                        if (item.status == 'pending')
                            statusCSS =
                                '<span style="padding:5px 15px;border-radius:1000px;background-color:yellow;color:black">Peding</span>';
                        if (item.status == 'approved') {
                            statusCSS =
                                '<span style="padding:5px 15px;border-radius:1000px;background-color:green;">Approved</span>';
                        }
                        if (item.status == 'rejected') {
                            statusCSS =
                                '<span style="padding:5px 15px;border-radius:1000px;background-color:red;">Rejected</span>';
                        }
                        trHTML += '<tr style="color:white"><td>' + requestid +
                            '</td><td>$ ' + item
                                .amount + '</td><td>' +
                            statusCSS + '</td><td>' + item
                                .tenure + ' month</td><td>' + created +
                            '</td><td>' + isapproved + '</td></tr>';
                    });
                    $('#request_row').append(trHTML);
                }
            }
        });
    });
    $('#profile').click(function () {
        $.ajax({
            url: 'http://localhost:8000/api/showuserdetails',
            type: 'GET',
            data: {
                id: user_id_from_session
            },
            // beforeSend: function () {
                // $('#profile').addClass('navbarBtn');
                // $('#request').removeClass('navbarBtn');
                // $('#dashboard').removeClass('navbarBtn');
                // $('#loan').removeClass('navbarBtn');
                // $('#transaction').removeClass('navbarBtn');
                // $('#documents').removeClass('navbarBtn');
            // },
            success: function (response) {
                console.log(response['status']);
                if (response['status'] == 500) {
                    alert('We are facing some issue please try later');
                } else {
                    $('#profile').addClass('navbarBtn');
                    $('#request').removeClass('navbarBtn');
                    $('#dashboard').removeClass('navbarBtn');
                    $('#loan').removeClass('navbarBtn');
                    $('#transaction').removeClass('navbarBtn');
                    $('#documents').removeClass('navbarBtn');
                    $('#anyquery').removeClass('navbarBtn');
                    $('#dashboard-div').hide();
                    $("#loan-div").hide();
                    $("#transaction-div").hide();
                    $("#request-div").hide();
                    $('#loanApply-div').hide();
                    $("#profile-div").show();
                    $("#document-div").hide();
                    $("#query-div").hide();
                    $("#details").empty();
                    $("#age-div").empty();
                    $("#gender-div").empty();
                    $("#location-div").empty();
                    // $("#photo-container").empty();
                    $("#detailHeading").empty();
                    var hd = 'Profile Details'
                    // $('#detailHeading').append(hd);
                    var details =
                        '<h1 style = "color:goldenrod; margin-left:100px ">Personal Details</h1><h3 style = "padding-left:200px;color:#d267f0">' +
                        response[0].name +
                        '</h3>' +
                        '<h3 style = "padding-left:200px;color:#d267f0">' + response[0]
                            .email +
                        '</h3>' +
                        '<h3 style = "padding-left:200px; color:#d267f0">' + response[0]
                            .phone +
                        '</h3>' +
                        '<h3 style = "padding-left:200px;color:#d267f0">' + response[0]
                            .address_line +
                        '</h3>' +
                        '<h3 style = "padding-left:200px;color:#d267f0">' + response[0]
                            .pincode +
                        '</h3>';
                    $('#details').append(details);
                    var a = '<h1>AGE</h1>';
                    $('#age-div').append(a);
                    var age = '<h3 style = "color:white">' + response[0].age + '</h3>';
                    $('#age-div').append(age);
                    var b = '<h1>GENDER</h1>';
                    $('#gender-div').append(b);
                    var gender = '<h3 style = "color:white">' + response[0].gender +
                        '</h3>';
                    $('#gender-div').append(gender);
                    var c = '<h1>LOCATION</h1>';
                    2
                    $('#location-div').append(c);
                    var location = '<h3 style = "color:white">' + response[0].city +
                        '</h3>';
                    $('#location-div').append(location);

                    // var pfeimage =
                    //     '<img src="' + '{{asset("storage")}}/' + response[0].image +
                    //     '" alt="Profile Image" width="225" height="225" style="border-radius:50%;">';
                    // $('#photo-container').append(pfeimage);
                    // var down = "";
                    var obj = document.getElementById('profileImageTag');
                    var images1 = obj.src;
                    images1 = images1 + response[0].image;
                    console.log(images1);
                    $('#profileImageTag').prop('src', images1);

                }
            }
        });
    });
    $('#documents').click(function () {
        // console.log("hola");
        $.ajax({
            url: 'http://localhost:8000/api/showuserdetails',
            type: 'GET',
            data: {
                id: user_id_from_session
            },
            beforeSend: function () {
                // $('#documents').addClass('navbarBtn');
                // $('#request').removeClass('navbarBtn');
                // $('#dashboard').removeClass('navbarBtn');
                // $('#loan').removeClass('navbarBtn');
                // $('#transaction').removeClass('navbarBtn');
                // $('#profile').removeClass('navbarBtn');
            },
            success: function (response) {

                // console.log(response);
                if (response['status'] == 500) {
                    alert('We are facing some issue please try later');
                } else {
                    $('#documents').addClass('navbarBtn');
                    $('#request').removeClass('navbarBtn');
                    $('#dashboard').removeClass('navbarBtn');
                    $('#loan').removeClass('navbarBtn');
                    $('#transaction').removeClass('navbarBtn');
                    $('#profile').removeClass('navbarBtn');
                    $('#anyquery').removeClass('navbarBtn');
                    $('#dashboard-div').hide();
                    $("#loan-div").hide();
                    $('#loanApply-div').hide();
                    $("#request-div").hide();
                    $("#profile-div").hide();
                    $("#query-div").hide();
                    $("#transaction-div").hide();
                    $("#detailHeading").empty();
                    $("#document_row").empty();
                    $("#document-div").show();
                    var hd = 'Document Details';
                    $('#detailHeading').append(hd);
                    console.log(response[1]);
                    var details = {};
                    var documentcheck = {
                        one: false,
                        two: false,
                        threeone: false,
                        threetwo: false,
                        threethree: false,
                        four: false
                    }
                    var trHTML = "";
                    $.each(response[1], function (i, item) {
                        if (item.master_document_id == 1) {
                            documentcheck.one = true;
                            details.name = "Adharcard Card";
                            details.number = item.document_number;
                            if (item.is_verified == 'approved') {
                                details.status = "Approved";
                            }
                            if (item.is_verified == 'reject') {
                                details.status = "Rejected";
                            }
                            if (item.is_verified == 'pending') {
                                details.status = "Pending";
                            }

                        }
                        if (item.master_document_id == 2) {
                            documentcheck.two = true;
                            details.name = "Pan Card";
                            details.number = item.document_number;
                            if (item.is_verified == 'approved') {
                                details.status = "Approved";
                            }
                            if (item.is_verified == 'reject') {
                                details.status = "Rejected";
                            }
                            if (item.is_verified == 'pending') {
                                details.status = "Pending";
                            }
                        }
                        if (item.master_document_id == 4) {
                            documentcheck.four = true;
                            details.name = "Bank Statement";
                            details.number = "SPINPAYOO12E" + item
                                .document_number;
                            if (item.is_verified == 'approved') {
                                details.status = "Approved";
                            }
                            if (item.is_verified == 'reject') {
                                details.status = "Rejected";
                            }
                            if (item.is_verified == 'pending') {
                                details.status = "Pending";
                            }
                        }
                        if (item.master_document_id == 3) {
                            if (item.document_number == 31) {
                                documentcheck.threeone = true;
                                details.name = "Pay Slip-1";
                                details.number = "SPINPAYOO12E" + item
                                    .document_number;
                                if (item.is_verified == 'approved') {
                                    details.status = "Approved";
                                }
                                if (item.is_verified == 'reject') {
                                    details.status = "Rejected";
                                }
                                if (item.is_verified == 'pending') {
                                    details.status = "Pending";
                                }
                            }
                            if (item.document_number == 32) {
                                documentcheck.threetwo = true;
                                details.name = "Pay Slip-2";
                                details.number = "SPINPAYOO12E" + item
                                    .document_number;
                                if (item.is_verified == 'approved') {
                                    details.status = "Approved";
                                }
                                if (item.is_verified == 'reject') {
                                    details.status = "Rejected";
                                }
                                if (item.is_verified == 'pending') {
                                    details.status = "Pending";
                                }
                            }
                            if (item.document_number == 33) {
                                documentcheck.threethree = true;
                                details.name = "Pay Slip-3";
                                details.number = "SPINPAYOO12E" + item
                                    .document_number;
                                if (item.is_verified == 'approved') {
                                    details.status = "Approved";
                                }
                                if (item.is_verified == 'reject') {
                                    details.status = "Rejected";
                                }
                                if (item.is_verified == 'pending') {
                                    details.status = "Pending";
                                }
                            }
                        }
                        // console.log(details);

                        let button =
                            '<button style="border-radius:10px;border:none; width:100px;height:27px;background-color:rgb(67, 181, 216)" disabled>Re-Upload</button>';
                        if (details.status == 'Rejected') {
                            button =
                                '<button style="border-radius:10px;border:none; width:100px;height:27px;background-color:rgb(67, 181, 216)" onclick = "DocumentReupload(\'' +
                                item.master_document_id + '\'' + ',' + '\'' +
                                item
                                    .document_number + '\')">Re-Upload</button>';
                            // console.log(details);
                        }
                        statustr = '';
                        if (details.status == "Approved") {
                            statustr =
                                '<span style="padding:5px 15px;border-radius:1000px;background-color:green;">' +
                                details.status + '</span>';
                        }
                        if (details.status == "Rejected") {
                            statustr =
                                '<span style="padding:5px 15px;border-radius:1000px;background-color:red;">' +
                                details.status + '</span>';
                        }
                        if (details.status == "Pending") {
                            statustr =
                                '<span style="padding:5px 15px;border-radius:1000px;background-color:yellow;color:black">' +
                                details.status + '</span>';
                        }
                        trHTML += '<tr style="color:white"><td>' +
                            details.name + '</td><td> ' +
                            details.number + '</td><td>' +
                            statustr + '</td><td>' + button + '</td></tr>';
                    });
                    // console.log(documentcheck);
                    if (documentcheck.one == false) {
                        var reupload =
                            '<button style="border-radius:10px;border:none; width:100px;height:27px;background-color:rgb(67, 181, 216)" onclick = "DocumentReupload(\'' +
                            1 + '\'' + ',' + '\'' + 1 + '\')">Re-Upload</button>';
                        trHTML +=
                            '<tr style="color:white"><td>Aadhar Card</td><td>-</td><td>Not Uploaded</td><td>' +
                            reupload + '</td></tr>';
                    }
                    if (documentcheck.two == false) {
                        var reupload =
                            '<button style="border-radius:10px;border:none; width:100px;height:27px;background-color:rgb(67, 181, 216)" onclick = "DocumentReupload(\'' +
                            2 + '\'' + ',' + '\'' + 2 + '\')">Re-Upload</button>';
                        trHTML +=
                            '<tr style="color:white"><td>Pan Card</td><td>-</td><td>Not Uploaded</td><td>' +
                            reupload + '</td></tr>';
                    }
                    if (documentcheck.threeone == false) {
                        var reupload =
                            '<button style="border-radius:10px;border:none; width:100px;height:27px;background-color:rgb(67, 181, 216)" onclick = "DocumentReupload(\'' +
                            3 + '\'' + ',' + '\'' + 31 + '\')">Re-Upload</button>';
                        trHTML +=
                            '<tr style="color:white"><td>Pay Slip-1</td><td>-</td><td>Not Uploaded</td><td>' +
                            reupload + '</td></tr>';
                    }
                    if (documentcheck.threetwo == false) {
                        var reupload =
                            '<button style="border-radius:10px;border:none; width:100px;height:27px;background-color:rgb(67, 181, 216)" onclick = "DocumentReupload(\'' +
                            3 + '\'' + ',' + '\'' + 32 + '\')">Re-Upload</button>';
                        trHTML +=
                            '<tr style="color:white"><td>Pay Slip-2</td><td>-</td><td>Not Uploaded</td><td>' +
                            reupload + '</td></tr>';
                    }
                    if (documentcheck.threethree == false) {
                        var reupload =
                            '<button style="border-radius:10px;border:none; width:100px;height:27px;background-color:rgb(67, 181, 216)" onclick = "DocumentReupload(\'' +
                            3 + '\'' + ',' + '\'' + 33 + '\')">Re-Upload</button>';
                        trHTML +=
                            '<tr style="color:white"><td>Pay Slip-3</td><td>-</td><td>Not Uploaded</td><td>' +
                            reupload + '</td></tr>';
                    }
                    if (documentcheck.four == false) {
                        var reupload =
                            '<button style="border-radius:10px;border:none; width:100px;height:27px;background-color:rgb(67, 181, 216)" onclick = "DocumentReupload(\'' +
                            4 + '\'' + ',' + '\'' + 41 + '\')">Re-Upload</button>';
                        trHTML +=
                            '<tr style="color:white"><td>Bank Statement</td><td>-</td><td>Not Uploaded</td><td>' +
                            reupload + '</td></tr>';
                    }
                    $('#document_row').append(trHTML);
                    // console.log(trHTML);

                }
            }
        });
    });
    $('#btn').click(function () {
        $("#transaction-div").hide();
        $("#request-div").hide();
        $("#profile-div").hide();
        $("#loan-div").hide();
        $('#dashboard-div').hide();
        $('#loanApply-div').show();
        // $.ajax({
        //     url: '/api/ShowUsersDetails',
        //     type: 'GET',
        //     data: {
        //         id: 46
        //     },
        //     success: function(response) {
        //         console.log(response);
        //     }
        // });
    });
    $('#submitBtn').click(function () {
        var month = $("#month").val()
        var amount = $("#amount").val()
        $('#errorMsg').hide();
        $('#successMsg').hide();
        $.ajax({
            url: 'http://localhost:8000/api/request/loan',
            type: 'POST',
            data: {
                tenure: month,
                amount_request: amount,
                user_id: user_id_from_session

            },
            success: function (response) {
                // console.log(response);
                console.log(response['status']);
                if (response['status'] == 500) {
                    alert('We are facing some issue please try later');
                }
                if (response['status'] == 400) {
                    $('#errorMsg').show();
                    $('#errorMsg').html(response['message']);
                }
                if (response['status'] == 401) {
                    let errors = "";
                    let t = 0;
                    $('#errorMsg').show();
                    if (response['Validation Failed']['amount_request']) {
                        // console.log('amount error');
                        errors += response['Validation Failed']['amount_request'];
                        t += 1;
                    }
                    if (response['Validation Failed']['tenure']) {
                        // console.log('tenure error');
                        errors += response['Validation Failed']['tenure'];
                        t += 1;
                    }
                    if (t == 2) {
                        $('#errorMsg').html("Fields Cannot Be empty");
                    } else {
                        $('#errorMsg').html(errors);
                    }

                }
                if (response['status'] == 200) {
                    $('#successMsg').show();
                    $('#successMsg').html(
                        'Your laon request is raised please waite till approvred');
                }
            }
        });
    });
    $('#closeSideNavbar').click(function () {
        $("#leftContainer").hide();
        $('#rightContainer').removeClass('toggleContainerCSS');
        $('#closeSideNavbar').hide();
        $('#showSideNavbar').show();
    });
    $('#showSideNavbar').click(function () {
        $('#leftContainer').show();
        $('#rightContainer').addClass('toggleContainerCSS');
        $('#showSideNavbar').hide();
        $('#closeSideNavbar').show();
    });


    // ReUploading Documents
    $('#documentUpload').click(function (event) {
        event.preventDefault();
        let apiurl = $('#apiurl').text();
        let documentNumber = $('#documentNumber').text();
        let MasterdocumentNumber = $('#MasterdocumentNumber').text();

        // console.log(documentNumber);
        if (documentNumber == 31 || documentNumber == 32 || documentNumber == 33) {
            $('#document_input').prop('value', documentNumber);
        }
        if (MasterdocumentNumber == 4) {
            $('#document_input').prop('value', documentNumber);
        }
        let upload = new FormData(document.getElementById('documentsReUploads'));
        upload.append('user_id', user_id_from_session);
        upload.append('master_document_id', MasterdocumentNumber);

        $.ajax({
            url: apiurl,
            type: 'post',
            dataType: 'json',
            data: upload,
            processData: false,
            contentType: false,
            success: function (result) {
                console.log(result);
                // console.log(result['status']);
                if (result['status'] == 200) {
                    $('#modalerror').empty();
                    $('#document_input_image').val('');
                    $('#document_input').val('');
                    $('#close').click();
                } else {
                    $('#modalerror').append(result['message']);
                }
            }
        });
    });
    // query div
    $('#anyquery').click(function (event) {
        console.log('hello');

        $.ajax({
            url: '/api/raise/show',
            type: 'post',
            data: {
                'user_id': user_id_from_session
            },
            success: function (response) {
                console.log(response);
                if (response['status'] == 500) {
                    alert('We are facing issue please try later');
                }
                if (response['status'] == 200) {
                    $('#documents').removeClass('navbarBtn');
                    $('#request').removeClass('navbarBtn');
                    $('#dashboard').removeClass('navbarBtn');
                    $('#loan').removeClass('navbarBtn');
                    $('#transaction').removeClass('navbarBtn');
                    $('#profile').removeClass('navbarBtn');
                    $('#anyquery').addClass('navbarBtn');
                    $('#dashboard-div').hide();
                    $("#loan-div").hide();
                    $('#loanApply-div').hide();
                    $("#request-div").hide();
                    $("#profile-div").hide();
                    $("#transaction-div").hide();
                    $("#document-div").hide();
                    $('#query_row').empty();
                    $("#query-div").show();
                    let trHTML = "";
                    $.each(response['message'], function (i, item) {
                        var updated = "-";
                        let issueid = "SPINPAYOO12E" + item.id;
                        if (item.reply_message != null) {
                            let date2 = new Date(item.updated_at);
                            updated = date2.getDate() + "/" + (date2
                                .getMonth() + 1) + "/" + date2.getFullYear();
                        }
                        var replymsg = '';
                        if(item.reply_message == null){
                            replymsg = '-';
                        }else{
                            replymsg = item.reply_message;
                        }
                        var date = new Date(item.created_at);
                        let created = date.getDate() + "/" + (date.getMonth() +
                            1) + "/" + date.getFullYear();
                        trHTML += '<tr style="color:white"><td>' + issueid +
                            '</td><td>' + item
                                .category + '</td><td>' +
                            item.user_message + '</td><td>' + replymsg + '</td><td>' + created +
                            '</td><td>' + updated + '</td></tr>';
                    });
                    $('#query_row').append(trHTML);
                    // console.log('asjghad');
                }


            }
        });

    });

    // submit querybfrom the user
    $('#submitquery').click(function (event) {
        $('#error').empty();
        event.preventDefault();
        let category = $('#category-name').val();
        let issue = $('#issue-text').val();
        if (category == "" || issue == "") {
            $('#error').append("<p style='color:red'>*Fields Cannot Be Empty</p>");
        } else {
            let raisequery = {
                'user_id': user_id_from_session,
                'category': category,
                'user_message': issue
            }
            $.ajax({
                url: '/api/raise/query',
                type: 'post',
                data: raisequery,
                success: function (response) {
                    if (response['status'] == 401) {
                        console.log(response);
                        let ptag = "<p style='color:red'>*" + response[
                            'Validation Failed'] + "</p>"
                        $('#error').append(ptag);
                    } else if (response['status'] != 200) {
                        let ptag = "<p style='color:red'>*" + response['message'] +
                            "</p>"
                        $('#error').append(ptag);

                    } else {
                        $('#anyquery').click();
                        $('#closequery').click();
                    }
                }
            });

        }

    });

});

function repayment(id, btid) {
    console.log(id, btid);
    $.ajax({
        url: 'http://localhost:8000/api/loanrepayment',
        type: 'POST',
        data: {
            loan_id: id
        },
        success: function (response) {
            // console.log(btid, response)
            $("#" + btid).attr("disabled", true);
            console.log(response);
            alert('Your repayment is successfull');
            $('#loan').click();
        }
    });
}

function DocumentReupload(master_document_id, document_number) {
    $('#document_input').css('display', 'block')
    // console.log(master_document_id, " ", document_number);
    let heading = "";
    let url = "";
    let document;
    // exampleModalLabel
    if (master_document_id == 1) {
        heading = "Aadhar Card";
        url = "http://localhost:8000/api/aadhar";

    }
    if (master_document_id == 2) {
        heading = "Pan Card";
        url = "http://localhost:8000/api/pancard";
    }
    if (master_document_id == 3) {
        if (document_number == 31) {
            heading = "Pan Slip 1";
            document = 31;
        }
        if (document_number == 32) {
            heading = "Pan Slip 2";
            document = 32;
        }
        if (document_number == 33) {
            heading = "Pan Slip 3";
            document = 33;
        }
        url = "http://localhost:8000/api/payslip";
        $('#document_input').css('display', 'none')
    }
    if (master_document_id == 4) {
        heading = "Bank Statement";
        url = "http://localhost:8000/api/bankstatement";
        $('#document_input').css('display', 'none');
        document = 41;
    }
    let ptag = '<p style="display:none" id="apiurl"' + '>' + url +
        '</p><p style="display:none" id="documentNumber"' + '>' + document +
        '</p><p style="display:none" id="MasterdocumentNumber"' + '>' + master_document_id + '</p>';
       console.log(heading);
        // $('#exampleModalLabel1').html('asd');
        $('#exampleModalLabel1').html(heading);
    $('#modalerror').append(ptag)
    $('#modalid').click();
}

function closeButton() {
    $('#documents').click();
}