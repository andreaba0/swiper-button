(function () {
    function onComplete() {
        return true;
    }

    function onSuccess() {
        alert("Success");
    }

    function onFail() { }

    function setup() {
        return {
            idParent: "swipe1",
            idButton: "button1",
            idTextSwiper: "swiper-text1",
            swiperContainerID: "swiper-container1",
            delta: 60,
            defaultWidth: 90,
            onComplete: onComplete,
            onChange: onSwiperStateChange,
            onSuccess: onSuccess,
            onFail: onFail
        };
    }

    function onSwiperStateChange(percent, time) {
        console.log('Status: ' + percent + '% and time: ' + time);
    }

    swiper(setup());
})();

(function () {
    function onComplete() {
        return false;
    }

    function onSuccess() { }

    function onFail() {
        alert("Failed");
    }


    function setup() {
        return {
            idParent: "swipe2",
            idButton: "button2",
            idTextSwiper: "swiper-text2",
            swiperContainerID: "swiper-container2",
            delta: 60,
            defaultWidth: 90,
            onComplete: onComplete,
            onChange: onSwiperStateChange,
            onSuccess: onSuccess,
            onFail: onFail
        };
    }

    function onSwiperStateChange(percent, time) {
        console.log('Status: ' + percent + '% and time: ' + time);
    }

    swiper(setup());
})();