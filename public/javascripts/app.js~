$(document).ready(function() {
    $("#get_all").submit(function(e){
        e.preventDefault();
        $.getJSON("/api/wikis", function(data) {
            $("#result").text(JSON.stringify(data));
        });
    });
    $("#get_id").submit(function(e){
        e.preventDefault();
        $.getJSON("/api/wiki/id/" + $("#id").val(), function(data) {
            $("#result").text(JSON.stringify(data));
        });
    });
    $("#get_title").submit(function(e){
        e.preventDefault();
        $.getJSON("/api/wiki/title/" + $("#title").val(), function(data) {
            $("#result").text(JSON.stringify(data));
        });
    });
    $("#new").submit(function(e){
        e.preventDefault();
        $.post('/api/wiki/', $("#new_wiki").val(), function(data) {
            $("#result").text(JSON.stringify(data));
        });
    });
    $("#edit").submit(function(e) {
        e.preventDefault();

        $.ajax({
            type: "PUT",
            url: "/api/wiki/" + $("#edit_id").val(),
            dataType: "json",
            data: $("#edit_wiki").val(),
            success: function (data) {
                $("#result").text(JSON.stringify(data));
            }
        });
    });
    $("#delete").submit(function(e) {
        e.preventDefault();

        $.ajax({
            type: "DELETE",
            url: "/api/wiki/" + $("#rm_id").val(),
            dataType: "json",
            success: function (data) {
                $("#result").text(JSON.stringify(data));
            }
        });
    });

});
