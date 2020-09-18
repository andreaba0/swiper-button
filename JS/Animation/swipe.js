var swiper = function (config) {
    var x;
    var currentX;
    var delta = config.delta;
    var isSwiping = false;
    var defPoint;
    var configIsTouched;

    var getconfigContainerWidth = () => getElement(config.idParent).offsetWidth;
    var getSwiperBarWidth = () => getElement(config.idButton).offsetWidth;
    var getSwiperBarWidthInPercentage = (fingerPos) => parseInt((fingerPos - defPoint) / getconfigContainerWidth() * 100);
    var getElement = (id) => document.getElementById(id);

    window.addEventListener("load", () => {
        window.addEventListener("resize", () => onLoadOrOnResize())
        getElement(config.idParent).addEventListener("touchstart", (e) => touchStart(e.touches[0].clientX))
        getElement(config.idParent).addEventListener("mousedown", (e) => touchStart(e.clientX))
        getElement(config.idParent).addEventListener("touchmove", (e) => fingerIsMoving(e.touches[0].clientX))
        getElement(config.idParent).addEventListener("mousemove", (e) => fingerIsMoving(e.clientX))
        getElement(config.idParent).addEventListener("touchend", endSwiping)
        getElement(config.idParent).addEventListener("mouseup", endSwiping)
        getElement(config.idParent).addEventListener("mouseleave", () => { if (isSwiping) endSwiping() })
        onLoadOrOnResize();
        enabled(true);
    });

    function changeSwiperBarButtonWidth(newWidth) {
        if (getSwiperBarWidth() <= getconfigContainerWidth()) getElement(config.idButton).style.width = `${newWidth}`;
        else getElement(config.idButton).style.width = `100%`;
    }

    function isFingerInCorrectStartPos() {
        if (x >= defPoint && x <= defPoint + config.defaultWidth) return true;
        return false;
    }

    function changeSwiperBarContainerTextLeftPadding(newPaddingLeft) {
        getElement(config.idTextSwiper).style.paddingLeft = `${newPaddingLeft}px`;
    }

    function isSwiperBarButtonTouched(pos) {
        if (pos > defPoint + config.defaultWidth) return true;
        return false;
    }

    function swipeIsFinished() {
        if (currentX - defPoint >= getconfigContainerWidth() - delta) return true;
        return false;
    }

    function onLoadOrOnResize() {
        defPoint = getElement(config.idParent).getBoundingClientRect().left;
        isSwiping = false;
    }

    function fingerIsMoving(pos) {
        if (!isSwiping||!configIsTouched) return;
        if (isSwiperBarButtonTouched(pos)) changeSwiperBarButtonWidth(pos - defPoint+"px")
        currentX = pos;
        changePaddingSwiperText();
        config.onChange(getSwiperBarWidthInPercentage(pos), new Date().getTime());
    }

    function changeSwiperBarContainerOpacity(opacity) {
        //TODO: change text swiper div opacity in function of swiper percentage
        getElement(config.idTextSwiper).style.opacity = `${opacity}`;
    }

    function touchStart(pos) {
        currentX = 0;
        x = pos;
        if (isFingerInCorrectStartPos(pos)) {
            isSwiping = true;
            configIsTouched = true;
        }
    }

    function endSwiping() {
        if (swipeIsFinished()) successfullComplete();
        else swipeFailed();
        isSwiping = false;
        configIsTouched = false;
    }

    function successfullComplete() {
        changeSwiperBarContainerOpacity(0);
        changeSwiperBarButtonWidth("100%");
        if(config.onComplete()) config.onSuccess();
        else config.onFail();
    }

    function swipeFailed() {
        changeSwiperBarButtonWidth(config.defaultWidth)
        changeSwiperBarContainerTextLeftPadding(0);
    }

    function enabled(state) {
        if (state) showHideSwiperBar('flex');
        else showHideSwiperBar('none');
    }

    function showHideSwiperBar(display) {
        getElement(config.swiperContainerID).style.display = `${display}`;
    }

    function changePaddingSwiperText() {
        changeSwiperBarContainerTextLeftPadding(Math.pow(1.0230, getSwiperBarWidth() - config.defaultWidth));
    }



    return {
        enabled: enabled
    }
};