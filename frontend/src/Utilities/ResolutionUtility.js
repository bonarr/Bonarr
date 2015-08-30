var $ = require('jquery');

module.exports = {
    resolutions: {
        desktopLarge :  1200,
        desktop      :  992,
        tablet       :  768,
        mobile       :  480
    },

    isDesktopLarge : function () {
        return $(window).width() < this.resolutions.desktopLarge;
    },

    isDesktop : function () {
        return $(window).width() < this.resolutions.desktop;
    },

    isTablet : function () {
        return $(window).width() < this.resolutions.tablet;
    },

    isMobile : function () {
        return $(window).width() < this.resolutions.mobile;
    }
};
