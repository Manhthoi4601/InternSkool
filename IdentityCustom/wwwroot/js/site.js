function addActiveClass(element) {
    var sidebar = $('.sidebar');
    var href = element.attr('href');
    if (current === "") {
        //for root url
        if (element.attr('href').indexOf("index.html") !== -1) {
            element.parents('.nav-item').last().addClass('active');
            if (element.parents('.sub-menu').length) {
                element.closest('.collapse').addClass('show');
                element.addClass('active');
            }
        }
    } else {
        //for other url
        if (element.attr('href').indexOf(current) !== -1) {
            element.parents('.nav-item').last().addClass('active');
            if (element.parents('.sub-menu').length) {
                element.closest('.collapse').addClass('show');
                element.addClass('active');
            }
            if (element.parents('.submenu-item').length) {
                element.addClass('active');
            }
        }
    }
}
var current = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');

$('.sidebar-menu li a').each(function () {
    addActiveClass($(this));
});
