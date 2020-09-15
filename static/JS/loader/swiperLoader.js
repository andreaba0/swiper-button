var swiperLoader = (function () {
    function onComplete() {
        //alert("ok")
    }


    function setup() {
        return {
            idParent: "swipe",
            idButton: "button",
            idTextSwiper: "swiper-text",
            delta: 60,
            defaultWidth: 90,
            onComplete: this.onComplete,
            swiperContainerID: "swiper-container"
        };
    }

    function showState() {

    }

    return {
        onComplete: onComplete,
        swipeBar: setup,
        showState: showState
    };
})();