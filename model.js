$(document).ready(function() {
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
