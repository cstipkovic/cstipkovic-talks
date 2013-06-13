/* jshint strict: true, indent: 4, jquery: true */
(function() {
    var getFlickrContent;

    getFlickrContent = function (tags) {
        var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

        $.getJSON(flickerAPI, {
            tags: tags,
            tagmode: "any",
            format: "json"
        }).done(function(data) {
            $.each(data.items, function(i, item) {
                $("<img/>").attr("src", item.media.m ).appendTo("#images");
                if (i === 3) {
                    return false;
                }
            });
        });
    };

    $(document).ready(function () {
        $("#searchOnFlickr").keyup(function () {
            getFlickrContent($(this).val());
        });
    });
})();