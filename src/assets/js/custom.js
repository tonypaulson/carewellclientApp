
var setSideNavActive = function (menuName) {
    var _li = $('.nav-primary').find('ul>li');
    _li.each(function (e) {
        $(this).removeClass('active');
        if ($(this).attr('menu') === menuName.trim()) {
            $(this).addClass('active');
        }
    });
}

var removeContentSideBar = function () {
    $('#content').css('background', 'white');
    $('#content').removeClass('content-sidebar');
}

var addContentSideBar = function () {
    if (!$("#content").hasClass("content-sidebar")) {
        $('#content').css('background', 'transparent');
        $("#content").addClass("content-sidebar");
    }
}

var goToContent = function () {

    $('.nav-links a:first').addClass('active');
    $(".nav-links").find("a").click(function (e) {
        $('#nav-check').prop("checked", false);
        if (!$(this).hasClass("active")) {
            $('.nav-links a').each(function (e) {
                $(this).removeClass('active');
            });

            e.preventDefault();
            $(this).addClass('active');
            var section = $(this).attr("href").replace('#', '');
            var _section = document.getElementById(section);
            _section.scrollIntoView({
                behavior: "smooth",
                block: 'start',
            });
        }
    });

    // $('.nav-links a:first').addClass('active');
    // $(".nav-links a").click(function () {
    //     $('#nav-check').prop("checked", false);

    //     if (!$(this).hasClass("active")) {
    //         $('.nav-links a').each(function (e) {
    //             $(this).removeClass('active');
    //         });

    //         console.log($(this).data('value'));
    //         console.log($("#" + $(this).data('value')));
    //         $(this).addClass('active');
    //         // $("body:eq(1),html:eq(1)").animate({
    //         //     scrollTop: $("#" + $(this).data('value')).position().top - 80
    //         // }, 1000)
    //         // $("#div_main_enduser").animate({
    //         //     scrollTop: $("#" + $(this).data('value')).position().top - 80
    //         // }, 1000)
    //     }
    // });
}