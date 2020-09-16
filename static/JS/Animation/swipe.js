var swiper = (function () {
    var x;
    var currentX;
    var swipeBar = swiperLoader.swipeBar();
    var delta = swipeBar.delta;
    var isSwiping = false;
    var defPoint = document.getElementById(swipeBar.idParent).getBoundingClientRect().left;
    var textBlinkClk;
    var isEnabled;

    var getSwipeBarContainerWidth = () => getElement(swipeBar.idParent).offsetWidth;
    var getSwiperBarWidth = () => getElement(swipeBar.idButton).offsetWidth;
    var getSwiperBarWidthInPercentage = (fingerPos) => parseInt((fingerPos - defPoint) / getSwipeBarContainerWidth() * 100);
    var getElement = (id) => document.getElementById(id);

    window.addEventListener("load", () => onLoadOrOnResize())
    window.addEventListener("resize", () => onLoadOrOnResize())
    getElement(swipeBar.idParent).addEventListener("touchstart", (e) => touchStart(e.touches[0].clientX))
    getElement(swipeBar.idParent).addEventListener("mousedown", (e) => touchStart(e.clientX))
    getElement(swipeBar.idParent).addEventListener("touchmove", (e) => fingerIsMoving(e.touches[0].clientX))
    getElement(swipeBar.idParent).addEventListener("mousemove", (e) => fingerIsMoving(e.clientX))
    getElement(swipeBar.idParent).addEventListener("touchend", endSwiping)
    getElement(swipeBar.idParent).addEventListener("mouseup", endSwiping)
    getElement(swipeBar.idParent).addEventListener("mouseleave", () => { if (isSwiping) endSwiping() })

    enabled(true);
    function changeSwiperBarButtonWidth(newWidth) {
        if (getSwiperBarWidth() <= getSwipeBarContainerWidth()) getElement(swipeBar.idButton).style.width = `${newWidth}px`;
    }

    function isFingerInCorrectStartPos(pos) {
        if (pos > defPoint + swipeBar.defaultWidth) return true;
        return false;
    }

    function changeSwiperBarContainerTextLeftPadding(newPaddingLeft) {
        getElement(swipeBar.idTextSwiper).style.paddingLeft = `${newPaddingLeft}px`;
    }

    function isSwiperBarButtonTouched(pos) {
        if (!isFingerInCorrectStartPos(pos)) return false;
        if (x >= defPoint && x <= defPoint + swipeBar.defaultWidth) return true;
        return false;
    }

    function swipeIsFinished() {
        if (currentX - defPoint >= getSwipeBarContainerWidth() - delta) return true;
        return false;
    }

    function onLoadOrOnResize() {
        defPoint = getElement(swipeBar.idParent).getBoundingClientRect().left;
        isSwiping = false;
    }

    function fingerIsMoving(pos) {
        if (!isSwiping) return;
        if (isSwiperBarButtonTouched(pos)) changeSwiperBarButtonWidth(pos - defPoint)
        currentX = pos;
        changePaddingSwiperText();
        swipeBar.onChange(getSwiperBarWidthInPercentage(pos), new Date().getTime());
    }

    function changeSwiperBarContainerOpacity(opacity) {
        //TODO: change text swiper div opacity in function of swiper percentage
    }

    function touchStart(pos) {
        currentX = 0;
        isSwiping = true;
        x = pos;
    }

    function endSwiping() {
        if (swipeIsFinished()) successfullComplete();
        else swipeFailed();
        isSwiping = false;
    }

    function successfullComplete() {
        getElement(swipeBar.idButton).style.width = "100%";
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
        getElement(swipeBar.swiperContainerID).style.display = `${display}`;
    }

    function changeRGBSwiperText(opacity) {
        getElement(swipeBar.idParent).style.color = `rgba(255, 255, 255, ${opacity})`;
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
        //changeSwiperBarContainerTextLeftPadding(temp - swipeBar.defaultWidth + (temp * -0.1));
        changeSwiperBarContainerTextLeftPadding(Math.pow(1.0230, temp - swipeBar.defaultWidth));
        console.log(Math.pow(1.025, temp - swipeBar.defaultWidth));
    }



    return {
        enabled: enabled
    }
})()