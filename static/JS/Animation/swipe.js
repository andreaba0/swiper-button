var swiper = (function () {
    var x;
    var currentX;
    var swipeBar = swiperLoader.swipeBar();
    var delta = swipeBar.delta;
    var isSwiping = false;
    var defPoint = document.getElementById(swipeBar.idParent).getBoundingClientRect().left;
    var textBlinkClk;
    var isEnabled;
    enabled(true);

    var getSwipeBarContainerWidth = () => document.getElementById(swipeBar.idParent).offsetWidth;
    var getSwiperBarWidth = () => document.getElementById(swipeBar.idButton).offsetWidth;
    var getSwiperBarWidthInPercentage = (fingerPos) => (fingerPos - defPoint) / getSwipeBarContainerWidth() * 100;

    function changeSwiperBarButtonWidth(newWidth) {
        document.getElementById(swipeBar.idButton).style.width = `${newWidth}px`;
    }

    function changeSwiperBarContainerTextLeftPadding(newPaddingLeft) {
        document.getElementById(swipeBar.idTextSwiper).style.paddingLeft = `${newPaddingLeft}px`;
    }

    function isSwiperBarButtonTouched(pos) {
        if (pos > defPoint + swipeBar.defaultWidth && (x >= defPoint && x <= defPoint + swipeBar.defaultWidth) && isSwiping) return true;
        return false;
    }

    function swipeIsFinished() {
        if (currentX - defPoint >= getSwipeBarContainerWidth() - delta) return true;
        return false;
    }

    function onLoadOrOnResize() {
        defPoint = document.getElementById(swipeBar.idParent).getBoundingClientRect().left;
        isSwiping = false;
    }

    window.addEventListener("load", () => onLoadOrOnResize())
    window.addEventListener("resize", () => onLoadOrOnResize())

    document.getElementById(swipeBar.idParent).addEventListener("touchstart", (e) => touchStart(e.touches[0].clientX))
    document.getElementById(swipeBar.idParent).addEventListener("mousedown", (e) => touchStart(e.clientX))
    document.getElementById(swipeBar.idParent).addEventListener("touchmove", (e) => fingerIsMoving(e.touches[0].clientX))
    document.getElementById(swipeBar.idParent).addEventListener("mousemove", (e) => fingerIsMoving(e.clientX))


    document.getElementById(swipeBar.idParent).addEventListener("touchend", endSwiping)
    document.getElementById(swipeBar.idParent).addEventListener("mouseup", endSwiping)
    document.getElementById(swipeBar.idParent).addEventListener("mouseleave", () => { if (isSwiping) endSwiping() })

    function fingerIsMoving(pos) {
        if (!isSwiping) return;
        if (isSwiperBarButtonTouched(pos)) changeSwiperBarButtonWidth(pos - defPoint)
        currentX = pos;
        changePaddingSwiperText();
        swipeBar.onChange(getSwiperBarWidthInPercentage(), new Date().getTime());
    }

    function touchStart(pos) {
        currentX = 0;
        isSwiping = true;
        x = pos;
    }

    function endSwiping() {
        var complete = false;
        if (swipeIsFinished()) successfullComplete();
        else swipeFailed();
        isSwiping = false;
    }

    function successfullComplete() {
        document.getElementById(swipeBar.idButton).style.width = "100%";
        manageBlink(false);
        swipeBar.onComplete();
    }

    function swipeFailed() {
        changeSwiperBarButtonWidth(swipeBar.defaultWidth)
        changeSwiperBarContainerTextLeftPadding(0);
    }

    function enabled(state) {
        isEnabled = state;
        if (state) showHideSwiperBar('flex');
        else showHideSwiperBar('none');
        if (isEnabled) manageBlink();
        else clearInterval(textBlinkClk);
    }

    function showHideSwiperBar(display) {
        document.getElementById(swipeBar.swiperContainerID).style.display = `${display}`;
    }

    function changeRGBSwiperText(opacity) {
        document.getElementById(swipeBar.idParent).style.color = `rgba(255, 255, 255, ${opacity})`;
    }

    function manageBlink(status = true) {
        opacity = 0;
        var deltaT;
        if (!status) {
            clearInterval(textBlinkClk);
            return;
        }
        textBlinkClk = setInterval(() => {
            changeRGBSwiperText(opacity);
            if (opacity >= 1) deltaT = -0.05;
            if (opacity <= 0) deltaT = 0.05;
            opacity = opacity + deltaT;
        }, 50);
    }

    function changePaddingSwiperText() {
        var temp = getSwiperBarWidth();
        changeSwiperBarContainerTextLeftPadding(temp - swipeBar.defaultWidth + (temp * -0.1));
    }



    return {
        enabled: enabled
    }
})()