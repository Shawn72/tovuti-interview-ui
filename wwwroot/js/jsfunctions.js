'use-strict';
$(document).ready(function () {
   
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
                                        message: "Student Deleted!",
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

    //delete student    
    $('#tbl_students_all .delete_std').click(function () {
        var row = $(this).parents("tr")[0];
        var data = row.cells[0].innerHTML;

        Swal.fire({
            title: "Are you sure?",
            text: "Proceed to delete " + row.cells[0].innerHTML + "?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, Delete this!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    type: "POST",
                    url: "/Home/DeleteStudent",
                    // data: JSON.stringify({ 'Id': row.cells[0].innerHTML }),
                    dataType: "json",
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    data: { "Id": data.trim() },
                    async: true
                }).done(function (response) {
                    switch (response) {
                        case "success":
                            Swal.fire
                                ({
                                    title: "Student Removed!",
                                    text: "Student successfully deleted!",
                                    type: "success"
                                }).then(() => {                                    //
                                    row.remove();
                                   // window.location.reload();
                                    App.alert({
                                        container: "#feedbackMsg",
                                        place: "append",
                                        type: "success",
                                        message: "Student Deleted!",
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
                                    title: "Delete Fail!",
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
                                    title: "Delete Fail!",
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

    //$(".ddlstudent").change(function () {
    //    $(".issueTo").val($(".ddlstudent option:selected").text());
    //});

    //$(".ddlteacher").change(function () {
    //    $(".issueTo").val($(".ddlteacher option:selected").text());
    //});

    //Edit a book    
    $('#form_edit_a_book .btnEditBookNSubmit').click(function (e) {
        e.preventDefault();
        var formData = $("#form_edit_a_book").serialize();

        //check dropdownlists
        var autha =  $("#ddlAuths").val()
        var bktype = $("#ddlBktype").val()
        var bkcat =  $("#ddlBookCat").val()
        var bkpub =  $("#ddlBookPub").val()

        if (autha == 0 || !autha) {
            alert("Book Author can't be empty!");
            return;
        }
        if (bktype == 0 || !bktype) {
            alert("Book Type can't be empty!");
            return;
        }
        if (bkcat == 0 || !bkcat) {
            alert("Book Category can't be empty!");
            return;
        }
        if (bkpub == 0 || !bkpub) {
            alert("Book Publisher can't be empty!");
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "Proceed to Edit the Book?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, Edit!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajaxSetup({
                    global: false,
                    type: "PUT",
                    url: "/Books/SubmitEditBook",
                    beforeSend: function () {
                        $(".modalspinner").show();
                    },
                    complete: function () {
                        $(".modalspinner").hide();
                    }
                });

                $.ajax({                   
                    dataType: "json",
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    data: formData,
                    async: true,
                    success: function (data) {
                        switch (data) {
                            case "success":
                                Swal.fire
                                ({
                                    title: "Book Edited!",
                                    text: "Book edited success!",
                                    type: "success"
                                }).then(() => {
                                    $("#feedbackMsg").css("display", "block");
                                    App.alert({
                                        container: "#feedbackMsg",
                                        place: "append",
                                        type: "success",
                                        message: "Book edited!",
                                        close: true,
                                        reset: true,
                                        focus: true,
                                        closeInSeconds: 10,
                                        icon: "check"
                                    });
                                });
                                break;
                            default:
                                Swal.fire
                                ({
                                    title: "Error Occured!",
                                    text: "Error Occured while editing!",
                                    type: "warning"
                                }).then(() => {
                                    $("#feedbackMsg").css("display", "block");
                                    App.alert({
                                        container: "#feedbackMsg",
                                        place: "append",
                                        type: "danger",
                                        message: "An error occured!",
                                        close: true,
                                        reset: true,
                                        focus: true,
                                        closeInSeconds: 10,
                                        icon: "error"
                                    });
                                });
                                break;
                        }

                    },
                    error: function () {
                        alert('Network Error! Please try again!!');
                    }
                }).done(function ()
                {
                    $(".modalspinner").hide();
                });

            } //end if

        });

    });

    $(".authorEditDropdown").change(function () {
        $(".txtAuthor").val($(".authorEditDropdown option:selected").text());
    });        

   
    
   
    //delete book
    $('#tblBooks .delete_book').click(function () {
        var row = $(this).parents("tr")[0];
        var data = row.cells[0].innerHTML;

        Swal.fire({
            title: "Are you sure?",
            text: "Proceed to delete " + row.cells[1].innerHTML + "?",
            type: "warning",
            showCancelButton: true,
            closeOnConfirm: true,
            confirmButtonText: "Yes, Delete this!",
            confirmButtonClass: "btn-success",
            confirmButtonColor: "#008000",
            position: "center"
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    type: "POST",
                    url: "/Books/DeleteBook",
                    // data: JSON.stringify({ 'Id': row.cells[0].innerHTML }),
                    dataType: "json",
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    data: { "Id": data.trim() },
                    async: true
                }).done(function (response) {
                    //console.log(data)
                    switch (response) {
                        case "success":
                            Swal.fire
                                ({
                                    title: "Book Removed!",
                                    text: "Book successfully deleted!",
                                    type: "success"
                                }).then(() => {
                                    row.remove();
                                    window.location.reload();
                                    App.alert({
                                        container: "#feedbackMsg",
                                        place: "append",
                                        type: "success",
                                        message: "Book Deleted!",
                                        close: true,
                                        reset: true,
                                        focus: true,
                                        closeInSeconds: 10,
                                        icon: "check"
                                    });
                                });
                            break;
                        case "access_denied":
                            Swal.fire
                                ({
                                    title: "Delete Fail!",
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
                        default:
                            Swal.fire
                                ({
                                    title: "Delete Fail!",
                                    text: "An error occured! " + response,
                                    type: "warning"
                                }).then(() => {
                                    App.alert({
                                        container: ".feedbackMsg",
                                        place: "append",
                                        type: "error",
                                        message: "Error occured!",
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

    //paged listpage selection 
    $("#pageselector .pagerButton").click(function (e) {
        e.preventDefault()
        var pageNumber = parseInt($("#pageNo").val());
        var pageSize = 100;
        var totalPagesCount = parseInt($("#txtTotalPgs").val());

        // alert("pages: " + pageNumber)

        if (pageNumber < 1 || !pageNumber) {
            alert("Logical error, fill in page number first!")
            return
        }
        if (pageNumber > totalPagesCount) {
            alert("Logical error, pagenumber input out of bounds!, pageNumber should be <=" + totalPagesCount)
            return
        }
        // now you can continue, no return
        fetchBooksData(pageNumber, pageSize);
    })

});

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

//START: list books
var ldb = function () {

    b = function () {
        var tl = $("#tbl_dashb_books"),
            l = tl.dataTable({
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

        $.ajax({
            type: "POST",
            url: "/Home/DashboardBooks",
            async: true,
        }).done(function (json) {
            //parse string to JSON                
            var newarr = JSON.parse(JSON.stringify(json));           
            l.fnClearTable();
            for (var i = 0; i < newarr.length; i++) {
                l.fnAddData([
                    '<img class="imgresize img-responsive" oneerror="image_error();" src="/books_images/' + newarr[i].id + '.jpg " />',
                    newarr[i].isbn,
                    newarr[i].bookNumber,
                    newarr[i].title,
                    newarr[i].author,
                    newarr[i].price,
                    newarr[i].numberofCopies

                ]);
            }
        });
    };

    s_w_b = function () {
        var tl = $("#tbl_students_w_books"),
            l = tl.dataTable({
                lengthMenu: [[5, 15, 20, -1], [5, 15, 20, "All"]],
                pageLength: 5,
                language: { lengthMenu: " _MENU_ records" },
                /*  dom: 'Bfrtip',*/
                dom: '<"dt-top-container"<l><"dt-center-in-div"B><f>r>t<"dt-filter-spacer"f><ip>',
                buttons: [

                    {
                        extend: "pdf", className: "btn dark btn-outline", title: 'Students with books List', orientation: 'landscape', filename: 'Students with books List', pageSize: 'LEGAL', footer: true,
                        exportOptions: {
                            columns: ':not(:last-child)'
                        } },
                    {
                        extend: "excel", className: "btn yellow btn-outline", title: 'Students with books List', orientation: 'landscape', filename: 'Students with books List', pageSize: 'LEGAL', footer: true,
                        exportOptions: {
                            columns: ':not(:last-child)'
                        } },
                    {
                        extend: "print", className: "btn dark btn-outline", title: 'Students with books List', orientation: 'landscape', filename: 'Students with books List', pageSize: 'LEGAL', footer: true,
                        exportOptions: {
                            columns: ':not(:last-child)'
                        } },
                    {
                        extend: "copy", className: "btn red btn-outline", title: 'Students with books List', orientation: 'landscape', filename: 'Students with books List', pageSize: 'LEGAL', footer: true,
                        exportOptions: {
                            columns: ':not(:last-child)'
                        }},

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
                processing: true,
                retrieve: true
            });
    }
   
    a_auths = function () {
        var tl = $("#tbl_authors"),
            l = tl.dataTable({
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

        $.ajax({
            type: "POST",
            url: "/Home/AllAuthors",
            async: true,
        }).done(function (json) {
            //parse string to JSON                
            var newarr = JSON.parse(JSON.stringify(json));
            console.log(newarr);
            $("#tbl_authors").DataTable().column(0).visible(false)
            for (var i = 0; i < newarr.length; i++) {
                l.fnAddData([
                    newarr[i].id,
                    newarr[i].authorName,
                    '<a class="nav-link danger text-dark delete_author" href="javascript:;">Delete</a>'
                ]);
            }
        });

        tl.on("click",
            ".delete_author",
            function (tl) {
                tl.preventDefault();
                var i = $(this).parents("tr")[0];
                var currentRow = $(this).closest("tr");
                var data = $('#tbl_authors').DataTable().row(currentRow).data();
                var id = data[0];             

                //global loader spinner;
                $.ajaxSetup({
                    global: false,
                    type: "POST",
                    url: "/Home/DeleteAuthor",
                    beforeSend: function () {
                        $(".modalspinner").show();
                    },
                    complete: function () {
                        $(".modalspinner").hide();
                    }
                });
               
                //async call delete:
                Swal.fire({
                    title: "Are you sure?",
                    text: "Proceed to delete " + i.cells[0].innerHTML + " database?",
                    type: "warning",
                    showCancelButton: true,
                    closeOnConfirm: true,
                    confirmButtonText: "Yes, delete author!",
                    confirmButtonClass: "btn-success",
                    confirmButtonColor: "rgb(197, 28, 36)",
                    position: "center"
                }).then((result) => {
                    if (result.value) {
                        //start ajax call
                        $.ajax({
                            data: { "Id": id.trim() },
                            async: true,
                            success: function (response) {
                                switch (response) {
                                    case "success":
                                        //alert("deleted");
                                        Swal.fire
                                            ({
                                                title: "Author Deleted!",
                                                text: "Author successfully Deleted!",
                                                type: "success"
                                            }).then(() => {
                                                row.remove();
                                                window.location.reload();
                                                App.alert({
                                                    container: ".feedbackMsg",
                                                    place: "append",
                                                    type: "success",
                                                    message: "Author Deleted!",
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
                                                title: "Delete Fail!",
                                                text: "Author Not Deleted!",
                                                type: "warning"
                                            }).then(() => {
                                                App.alert({
                                                    container: ".feedbackMsg",
                                                    place: "append",
                                                    type: "error",
                                                    message: "Author Not Deleted!",
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
                                                title: "Delete Fail!",
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
                            },
                            failure: function (response) {
                            Swal.fire
                                ({
                                    title: "Author Not Deleted!",
                                    text: "Author Delete Failed!",
                                    type: "warning"
                                }).then(() => {                                    
                                    window.location.reload();
                                    App.alert({
                                        container: ".feedbackMsg",
                                        place: "append",
                                        type: "danger",
                                        message: "Author Delete Failed!",
                                        close: true,
                                        reset: true,
                                        focus: true,
                                        closeInSeconds: 10,
                                        icon: "check"
                                    });
                                });
                            },
                            error: function (response) {
                            Swal.fire
                                ({
                                    title: "Error Occured!",
                                    text: "Error while deleting!",
                                    type: "warning"
                                }).then(() => {
                                    // row.remove();
                                    window.location.reload();
                                    App.alert({
                                        container: ".feedbackMsg",
                                        place: "append",
                                        type: "danger",
                                        message: "Author Delete Failed, due to error!",
                                        close: true,
                                        reset: true,
                                        focus: true,
                                        closeInSeconds: 10,
                                        icon: "check"
                                    });
                                });
                            }
                        });                     
                    }
                    else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire(
                            'Cancelled',
                            'You cancelled the action!',
                            'error'
                        );
                    }
                })
            });
    }

    return {
        init: function () {
            b(), s_w_b(), a_auths();
        }
    }
}();