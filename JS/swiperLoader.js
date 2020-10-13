(function () {
    var x = swiper({
        id: "swipe1",
        delta: 60,
        onFailReset: true,
        onValidate: () => {
            return false;
        },
        onValidationFail: () => {
            console.log("Validation failed");
        },
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
        onValidate: () => {
            return true;
        },
        onValidationFail: () => {

        },
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