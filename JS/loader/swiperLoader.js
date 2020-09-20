(function () {
    swiper({
        idParent: "swipe1",
        idButton: "button1",
        idTextSwiper: "swiper-text1",
        swiperContainerID: "swiper-container1",
        delta: 60,
        defaultWidth: 90,
        onComplete: () => {
            return true;
        },
        onChange: (percent, time) => {
            console.log('Status: ' + percent + '% and time: ' + time);
        },
        onSuccess: () => {
            alert("Success");
        },
        onFail: () => { }
    });
})();

(function () {
    swiper({
        idParent: "swipe2",
        idButton: "button2",
        idTextSwiper: "swiper-text2",
        swiperContainerID: "swiper-container2",
        delta: 60,
        defaultWidth: 90,
        onComplete: () => {
            return false;
        },
        onChange: (percent, time) => {
            console.log('Status: ' + percent + '% and time: ' + time);
        },
        onSuccess: () => { },
        onFail: () => {
            alert("Failed");
        }
    });
})();