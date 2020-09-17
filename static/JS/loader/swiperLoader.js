var swiperLoader1 = function () {
    function onComplete() {
        alert("ok1")
    }


    function setup() {
        return {
            idParent: "swipe1",
            idButton: "button1",
            idTextSwiper: "swiper-text1",
            delta: 60,
            defaultWidth: 90,
            onComplete: this.onComplete,
            swiperContainerID: "swiper-container1",
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
};

var swiperLoader2 = function () {
    function onComplete() {
        alert("ok2")
    }


    function setup() {
        return {
            idParent: "swipe2",
            idButton: "button2",
            idTextSwiper: "swiper-text2",
            delta: 60,
            defaultWidth: 90,
            onComplete: this.onComplete,
            swiperContainerID: "swiper-container2",
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
};