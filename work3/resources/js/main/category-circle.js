$(function () {
    var circle_radius = 130;
    $(".btn-circle").on("click", function () {
        circle_category_container = $(this).parent();
        $('.circle-category-container').not(circle_category_container).removeClass('opened').addClass('closed');
        $links = circle_category_container.find('.list-circle li');
        total_links = $links.length;
        scale = 0;
        if ($(this).parent().hasClass('opened')) {
            is_visible = false;
            scale = 0;
            $(this).parent().removeClass('opened').addClass('closed');
        } else if ($(this).parent().hasClass('closed')) {
            is_visible = true;
            scale = 1;
            $(this).parent().removeClass('closed').addClass('opened');
        }
        $links.each(function (index) {
            $(this).attr('data-index', index);
            animate_circle($(this), scale, is_visible);
        });
    });
    function animate_circle($link, expansion_scale, is_visible) {
        index = $link.attr('data-index');
        radians = 2 * Math.PI * (index / total_links);
        switch (get_fourth(radians)) {
            case 1:
                $current_a = $link.find('a');
                $current_a.css('left', $current_a.outerWidth() * -1 - 10).css('top', -25).css('text-align', 'right');
                break;
            case 2:
                $current_a = $link.find('a');
                $current_a.css('left', 25).css('text-align', 'left');
                break;
            case 3:
                $current_a = $link.find('a');
                $current_a.css('left', 25).css('top', 10).css('text-align', 'left');
                break;
            case 4:
                $current_a = $link.find('a');
                $current_a.css('left', $current_a.outerWidth() * -1 - 10).css('top', 10).css('text-align', 'right');
                break;
            case 41:
                $current_a = $link.find('a');
                $current_a.css('left', $current_a.outerWidth() * -1 - 10).css('text-align', 'right');
                break;
            case 12:
                $current_a = $link.find('a');
                $current_a.css('top', $current_a.outerHeight() * -1 - 5).css('text-align', 'left');
                break;
            case 23:
                $current_a = $link.find('a');
                 $current_a.css('left', 25).css('text-align', 'left');
                break;
            case 34:
                $current_a = $link.find('a');
                $current_a.css('top', 20).css('text-align', 'left');
                break;
            default:
                break;
        }
        x = -(Math.sin(radians) * circle_radius * expansion_scale);
        y = -(Math.cos(radians) * circle_radius * expansion_scale);
        $link.css('top', x + 'px').css('left', y + 'px');
        if (is_visible) {
            $link.fadeTo("fast", 1);
        } else {
            $link.fadeTo(0, 0);
        }
    }
    $(document).on('click', function (event) {
        if (!$(event.target).closest('.circle-category-container').length) {
            $('.circle-category-container').removeClass('opened').addClass('closed');
        }
    });
    function get_fourth(radians) {
        result = -1;
        if (radians === 0) {
            result = 41;
        }
        if (radians === Math.PI / 2) {
            result = 12;
        }
        if (radians === Math.PI) {
            result = 23;
        }
        if (radians === (3 * Math.PI) / 2) {
            result = 34;
        }
        if (radians > 0 && radians < Math.PI / 2) {
            result = 1;
        }
        if (radians > Math.PI / 2 && radians < Math.PI) {
            result = 2;
        }
        if (radians > Math.PI && radians < (3 * Math.PI) / 2) {
            result = 3;
        }
        if (radians > (3 * Math.PI) / 2 && radians < 2 * Math.PI) {
            result = 4;
        }
        return result;
    }
});



