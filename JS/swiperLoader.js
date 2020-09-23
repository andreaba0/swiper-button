(function () {
    var x = swiper({
        id: "swipe1",
        delta: 60,
        onFailReset: true,
        onComplete: () => {
            return true;
        },
        onChange: (percent, time) => {
            console.log('Status: ' + percent + '% and time: ' + time);
        },
        onSuccess: () => {
            alert("Success");
            x.visible(false);
        },
        onFail: () => { }
    });
})();

(function () {
    var y = swiper({
        id: "swipe2",
        visible: true,
        delta: 60,
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