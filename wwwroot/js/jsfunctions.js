'use-strict';
$(document).ready(function () {

    //load customer statement on page load
    ldb.init();

    //register customer
    $('.form_register_customer .btnRegCustomer').click(function (e) {
        //  alert("yes!")
        var formData = $(".form_register_customer").serialize();
        e.preventDefault()
        Swal.fire({
            title: "Are you sure?",
            text: "Proceed to register customer",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, Register!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    type: "POST",
                    url: "/Home/InsertCustomerDetails",
                    dataType: "json",
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    data: formData,
                    async: true
                }).done(function (response) {
                    switch (response) {
                        case "success":
                            Swal.fire
                                ({
                                    title: "Customer Registered!",
                                    text: "Customer details saved successfully!",
                                    type: "success"
                                }).then(() => { 
                                    window.location.reload();
                                    App.alert({
                                        container: "#feedbackMsg",
                                        place: "append",
                                        type: "success",
                                        message: "Customer Added!",
                                        close: true,
                                        reset: true,
                                        focus: true,
                                        closeInSeconds: 10,
                                        icon: "check"
                                    });
                                });
                            break;
                        case "error":
                            Swal.fire
                                ({
                                    title: "Op Fail!",
                                    text: "Unknown Error Occured!",
                                    type: "warning"
                                }).then(() => {
                                    App.alert({
                                        container: ".feedbackMsg",
                                        place: "append",
                                        type: "error",
                                        message: "Unknown Error occured!",
                                        close: true,
                                        reset: true,
                                        focus: true,
                                        closeInSeconds: 10,
                                        icon: "error"
                                    });
                                });

                            break;

                        case "access_denied":
                            Swal.fire
                                ({
                                    title: "Operation Failed!",
                                    text: "No enough permissions!",
                                    type: "warning"
                                }).then(() => {
                                    App.alert({
                                        container: ".feedbackMsg",
                                        place: "append",
                                        type: "error",
                                        message: "Not Permitted!",
                                        close: true,
                                        reset: true,
                                        focus: true,
                                        closeInSeconds: 10,
                                        icon: "error"
                                    });
                                });
                            break;
                    }


                });

            } //end if

        });
    }); 

    //add customer account
    $('.form_enter_customer_account .btnAddCstAccount').click(function (e) {
        //  alert("yes!")
        var formData = $(".form_enter_customer_account").serialize();
        e.preventDefault()
        Swal.fire({
            title: "Are you sure?",
            text: "Proceed to add customer Account",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, Add Account!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    type: "POST",
                    url: "/Home/InsertCustomerAccount",
                    dataType: "json",
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    data: formData,
                    async: true
                }).done(function (response) {
                    switch (response) {
                        case "success":
                            Swal.fire
                                ({
                                    title: "Account Added!",
                                    text: "Customer account saved successfully!",
                                    type: "success"
                                }).then(() => {
                                    window.location.reload();
                                    App.alert({
                                        container: "#feedbackMsg",
                                        place: "append",
                                        type: "success",
                                        message: "Account Added!",
                                        close: true,
                                        reset: true,
                                        focus: true,
                                        closeInSeconds: 10,
                                        icon: "check"
                                    });
                                });
                            break;
                        case "error":
                            Swal.fire
                                ({
                                    title: "Op Fail!",
                                    text: "Unknown Error Occured!",
                                    type: "warning"
                                }).then(() => {
                                    App.alert({
                                        container: ".feedbackMsg",
                                        place: "append",
                                        type: "error",
                                        message: "Unknown Error occured!",
                                        close: true,
                                        reset: true,
                                        focus: true,
                                        closeInSeconds: 10,
                                        icon: "error"
                                    });
                                });

                            break;

                        case "access_denied":
                            Swal.fire
                                ({
                                    title: "Operation Failed!",
                                    text: "No enough permissions!",
                                    type: "warning"
                                }).then(() => {
                                    App.alert({
                                        container: ".feedbackMsg",
                                        place: "append",
                                        type: "error",
                                        message: "Not Permitted!",
                                        close: true,
                                        reset: true,
                                        focus: true,
                                        closeInSeconds: 10,
                                        icon: "error"
                                    });
                                });
                            break;
                    }


                });

            } //end if

        });
    });

    //add sale transaction
    $('.form_make_sale_to_customer .btnAddSale').click(function (e) {
         // alert("test yes!")
        var formData = $(".form_make_sale_to_customer").serialize();
        e.preventDefault()
        Swal.fire({
            title: "Are you sure?",
            text: "Proceed to add a sale",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, Add Sale!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    type: "POST",
                    url: "/Home/InsertSaleTransaction",
                    dataType: "json",
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    data: formData,
                    async: true
                }).done(function (response) {
                    switch (response) {
                        case "success":
                            Swal.fire
                                ({
                                    title: "Sale Added!",
                                    text: "Sale transaction saved successfully!",
                                    type: "success"
                                }).then(() => {
                                    window.location.reload();
                                    App.alert({
                                        container: "#feedbackMsg",
                                        place: "append",
                                        type: "success",
                                        message: "Sale Added!",
                                        close: true,
                                        reset: true,
                                        focus: true,
                                        closeInSeconds: 10,
                                        icon: "check"
                                    });
                                });
                            break;
                        case "error":
                            Swal.fire
                                ({
                                    title: "Op Fail!",
                                    text: "Unknown Error Occured!",
                                    type: "warning"
                                }).then(() => {
                                    App.alert({
                                        container: ".feedbackMsg",
                                        place: "append",
                                        type: "error",
                                        message: "Unknown Error occured!",
                                        close: true,
                                        reset: true,
                                        focus: true,
                                        closeInSeconds: 10,
                                        icon: "error"
                                    });
                                });

                            break;

                        case "access_denied":
                            Swal.fire
                                ({
                                    title: "Operation Failed!",
                                    text: "No enough permissions!",
                                    type: "warning"
                                }).then(() => {
                                    App.alert({
                                        container: ".feedbackMsg",
                                        place: "append",
                                        type: "error",
                                        message: "Not Permitted!",
                                        close: true,
                                        reset: true,
                                        focus: true,
                                        closeInSeconds: 10,
                                        icon: "error"
                                    });
                                });
                            break;
                    }
                });

            } //end if

        });
    });

    //add sale invoice
    $('.form_generate_invoice .btnGenerateInvoice').click(function (e) {
        // alert("test yes!")
        var formData = $(".form_generate_invoice").serialize();
        e.preventDefault()
        Swal.fire({
            title: "Are you sure?",
            text: "Proceed to add invoice",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, Add Invoice!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    type: "POST",
                    url: "/Home/InsertSaleInvoice",
                    dataType: "json",
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    data: formData,
                    async: true
                }).done(function (response) {
                    switch (response) {
                        case "success":
                            Swal.fire
                                ({
                                    title: "Invoice Generated!",
                                    text: "Invoice generated successfully!",
                                    type: "success"
                                }).then(() => {
                                    window.location.reload();
                                    App.alert({
                                        container: "#feedbackMsg",
                                        place: "append",
                                        type: "success",
                                        message: "Invoice generated!",
                                        close: true,
                                        reset: true,
                                        focus: true,
                                        closeInSeconds: 10,
                                        icon: "check"
                                    });
                                });
                            break;
                        case "error":
                            Swal.fire
                                ({
                                    title: "Op Fail!",
                                    text: "Unknown Error Occured!",
                                    type: "warning"
                                }).then(() => {
                                    App.alert({
                                        container: ".feedbackMsg",
                                        place: "append",
                                        type: "error",
                                        message: "Unknown Error occured!",
                                        close: true,
                                        reset: true,
                                        focus: true,
                                        closeInSeconds: 10,
                                        icon: "error"
                                    });
                                });

                            break;

                        case "access_denied":
                            Swal.fire
                                ({
                                    title: "Operation Failed!",
                                    text: "No enough permissions!",
                                    type: "warning"
                                }).then(() => {
                                    App.alert({
                                        container: ".feedbackMsg",
                                        place: "append",
                                        type: "error",
                                        message: "Not Permitted!",
                                        close: true,
                                        reset: true,
                                        focus: true,
                                        closeInSeconds: 10,
                                        icon: "error"
                                    });
                                });
                            break;
                    }
                });

            } //end if

        });
    });

    //make payment
    $('.form_make_payment .btnPayInvoice').click(function (e) {
        // alert("test yes!")
        var formData = $(".form_make_payment").serialize();
        e.preventDefault()
        Swal.fire({
            title: "Are you sure?",
            text: "Proceed to pay",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, Pay!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    type: "POST",
                    url: "/Home/InsertInvoicePayment",
                    dataType: "json",
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    data: formData,
                    async: true
                }).done(function (response) {
                    alert(response)
                    switch (response) {
                        case "success":
                            Swal.fire
                                ({
                                    title: "Payment Done!",
                                    text: "Paid successfully!",
                                    type: "success"
                                }).then(() => {
                                    window.location.reload();
                                    App.alert({
                                        container: "#feedbackMsg",
                                        place: "append",
                                        type: "success",
                                        message: "Paid Success!",
                                        close: true,
                                        reset: true,
                                        focus: true,
                                        closeInSeconds: 10,
                                        icon: "check"
                                    });
                                });
                            break;
                        case "error":
                            Swal.fire
                                ({
                                    title: "Op Fail!",
                                    text: "Unknown Error Occured!",
                                    type: "warning"
                                }).then(() => {
                                    App.alert({
                                        container: ".feedbackMsg",
                                        place: "append",
                                        type: "error",
                                        message: "Unknown Error occured!",
                                        close: true,
                                        reset: true,
                                        focus: true,
                                        closeInSeconds: 10,
                                        icon: "error"
                                    });
                                });

                            break;

                        case "access_denied":
                            Swal.fire
                                ({
                                    title: "Operation Failed!",
                                    text: "No enough permissions!",
                                    type: "warning"
                                }).then(() => {
                                    App.alert({
                                        container: ".feedbackMsg",
                                        place: "append",
                                        type: "error",
                                        message: "Not Permitted!",
                                        close: true,
                                        reset: true,
                                        focus: true,
                                        closeInSeconds: 10,
                                        icon: "error"
                                    });
                                });
                            break;
                    }
                });

            } //end if

        });
    });

    $(".tbl_datatable").dataTable({
        lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
        pageLength: 5,
        language: { lengthMenu: " _MENU_ records" },
        columnDefs: [
            {
                orderable: !0,
                defaultContent: "-",
                targets: "_all"
            },
            {
                searchable: !0,
                targets: "_all"
            }
        ],
        order: [
            [0, "asc"]
        ],
        bDestroy: true,
        info: false,
        processing: true,
        retrieve: true
    });    

    $('.select2').select2({
        //you can specify specs here
        width: '100%'
    });

    $(".ddlInvpayment_terms").change(function () {
        var daysT = parseInt($(".ddlInvpayment_terms option:selected").val());
        var trxdate = $("#trxDate").val();       
       
    });  

});

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

//START: customer statement
var ldb = function () {
    s_w_b = function () {

        $("#tbl_customer_statement").dataTable({
            lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
            pageLength: 5,
            language: { lengthMenu: " _MENU_ records" },
            /*  dom: 'Bfrtip',*/
            dom: '<"dt-top-container"<l><"dt-center-in-div"B><f>r>t<"dt-filter-spacer"f><ip>',
            buttons: [
                {
                    extend: "pdf", className: "btn dark btn-outline", title: 'Customer Statement', orientation: 'landscape', filename: 'Customer Statement', pageSize: 'LEGAL', footer: true

                },
                {
                    extend: "excel", className: "btn yellow btn-outline", title: 'Customer Statement', orientation: 'landscape', filename: 'Customer Statement', pageSize: 'LEGAL', footer: true

                },
                {
                    extend: "print", className: "btn dark btn-outline", title: 'Customer Statement', orientation: 'landscape', filename: 'Customer Statement', pageSize: 'LEGAL', footer: true

                },
                {
                    extend: "copy", className: "btn red btn-outline", title: 'Customer Statement', orientation: 'landscape', filename: 'Customer Statement', pageSize: 'LEGAL', footer: true

                }

            ],
            columnDefs: [
                {
                    orderable: !0,
                    defaultContent: "-",
                    targets: "_all"
                },
                {
                    searchable: !0,
                    targets: "_all"
                }
            ],
            order: [
                [0, "asc"]
            ],
            bDestroy: true,
            info: false,
            procesing: true,
            retrieve: true,

            footerCallback: function (e, t, a, r, o) {
              var n = this.api(),
                  s = function (e) {
                      return "string" == typeof e ? 1 * e.replace(/[\$,]/g, "") : "number" == typeof e ? e : 0;
                  };
              (total = n
                  .column(4)
                  .data()
                  .reduce(function (e, t) {
                      return s(e) + s(t);
                  }, 0)),
                  (pageTotal = n
                      .column(4, { page: "current" })
                      .data()
                      .reduce(function (e, t) {
                          return s(e) + s(t);
                      }, 0)),
                  $(n.column(4).footer()).html("Copies This Page: " + formatNumber(Number(pageTotal)) + " ( Total Copies: " + formatNumber(Number(total)) + ")");
            }
        });
    }  
    return {
        init: function () {
            s_w_b();
        }
    }
}();