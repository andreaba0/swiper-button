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
            swiperContainerID: "swiper-container",
            onChange: onSwiperStateChange
        };
    }

    function onSwiperStateChange(percent, time) {
        console.log('Status: '+ percent+'% and time: '+time);
    }

    return {
        onComplete: onComplete,
        swipeBar: setup
    };
})();