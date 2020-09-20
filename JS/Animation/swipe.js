//Maximum call stack size exceeded on mobile devices
var swiper = function (config) {
    var x;
    var currentX;
    var delta = config.delta;
    var isSwiping = false;
    var defPoint;

    var getconfigContainerWidth = () => getElement(config.idParent).offsetWidth;
    var getSwiperBarWidth = () => getElement(config.idButton).offsetWidth;
    var getSwiperBarWidthInPercentage = (fingerPos) => parseInt((fingerPos - defPoint) / getconfigContainerWidth() * 100);
    var getElement = (id) => document.getElementById(id);
    var calculateTextOpacity = (pos) => 1 - getSwiperBarWidthInPercentage(pos) / 100;

    window.addEventListener("load", () => {
        window.addEventListener("resize", () => onLoadOrOnResize())
        getElement(config.idParent).addEventListener("touchstart", touchStart, false)
        getElement(config.idParent).addEventListener("mousedown", touchStart, false)
        getElement(config.idParent).addEventListener("touchmove", fingerIsMoving, false)
        getElement(config.idParent).addEventListener("mousemove", fingerIsMoving, false)
        getElement(config.idParent).addEventListener("touchend", endSwiping, false)
        getElement(config.idParent).addEventListener("mouseup", endSwiping, false)
        getElement(config.idParent).addEventListener("mouseleave", () => { if (isSwiping) endSwiping() })
        onLoadOrOnResize();
        enabled(true);
    });

    function touchStart(e) {
        e.stopPropagation();
        e.preventDefault();
        var pos;
        if (e.type == 'touchstart') pos = e.touches[0].clientX;
        else pos = e.clientX;

        currentX = 0;
        x = pos;
        if (isFingerInCorrectStartPos(pos)) isSwiping = true;
    }

    function fingerIsMoving(e) {
        e.stopPropagation();
        e.preventDefault();
        if (!isSwiping) return;
        var pos;
        if (e.type == 'touchmove') pos = e.touches[0].clientX;
        else pos = e.clientX;
        if (isSwiperBarButtonTouched(pos) && pos - defPoint <= getconfigContainerWidth()) changeSwiperBarButtonWidth(pos - defPoint, "px");
        changeSwiperBarContainerOpacity(calculateTextOpacity(pos));
        currentX = pos;
        changePaddingSwiperText();
        config.onChange(getSwiperBarWidthInPercentage(pos), new Date().getTime());
    }
    function changeSwiperBarButtonWidth(newWidth, unit) {
        if (getSwiperBarWidth() <= getconfigContainerWidth()) getElement(config.idButton).style.width = `${newWidth}${unit}`;
        else changeSwiperBarButtonWidth("100", "%");
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

    function changeSwiperBarContainerOpacity(opacity) {
        getElement(config.idTextSwiper).style.opacity = `${opacity}`;
    }

    function endSwiping() {
        if (!isSwiping) return;
        isSwiping = false;
        if (swipeIsFinished()) successfullComplete();
        else swipeFailed();
    }

    function successfullComplete() {
        changeSwiperBarContainerOpacity(0);
        changeSwiperBarButtonWidth("100", "%");
        if (config.onComplete()) config.onSuccess();
        else config.onFail();
    }

    function swipeFailed() {
        changeSwiperBarButtonWidth(config.defaultWidth, "px");
        changeSwiperBarContainerOpacity(1);
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