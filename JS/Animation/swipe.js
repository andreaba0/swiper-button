var swiper = async function (config) {
    var currentX;
    var delta = config.delta;
    var isSwiping = false;
    var defPoint;

    var getconfigContainerWidth = () => getElement(config.idParent).offsetWidth;
    var getSwiperBarWidth = () => getElement(config.idButton).offsetWidth;
    var getSwiperBarWidthInPercentage = (fingerPos) => parseInt((fingerPos - defPoint) / getconfigContainerWidth() * 100);
    var getElement = (id) => document.getElementById(id);
    var getElStyle = (id) => getElement(id).style;
    var calculateTextOpacity = (pos) => 1 - getSwiperBarWidthInPercentage(pos) / 100;
    var paddingFormula = () => Math.pow(1.0230, getSwiperBarWidth() - config.defaultWidth);

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
        currentX = 0;
        if (e.type == 'mousedown') onCorrectStartPos(e.clientX);
        else onCorrectStartPos(e.touches[0].clientX);
    }

    function fingerIsMoving(e) {
        e.stopPropagation();
        e.preventDefault();
        if (!isSwiping) return;
        var pos;
        if (e.type == 'mousemove') pos = e.clientX;
        else pos = e.touches[0].clientX;
        if (swiperButtonCanChangeWidth(pos)) changeSwiperBarButtonWidth(pos - defPoint, "px");
        changeSwiperBarContainerOpacity(calculateTextOpacity(pos));
        currentX = pos;
        changePaddingSwiperText();
        config.onChange(getSwiperBarWidthInPercentage(pos), new Date().getTime());
    }

    function endSwiping() {
        if (!isSwiping) return;
        isSwiping = false;
        if (swipeIsFinished()) successfullComplete();
        else swipeFailed();
    }

    function onCorrectStartPos(pos) {
        if (isFingerInCorrectStartPos(pos)) isSwiping = true;
    }

    function successfullComplete() {
        changeSwiperBarContainerOpacity(0);
        changeSwiperBarButtonWidth("100", "%");
        getElStyle(config.idTextSwiper)
        if (config.onComplete()) config.onSuccess();
        else config.onFail();
    }

    function swipeFailed() {
        changeSwiperBarButtonWidth(config.defaultWidth, "px", true);
        changeSwiperBarContainerOpacity(1);
        changeSwiperBarContainerTextLeftPadding(0);
    }

    function swiperButtonCanChangeWidth(pos) {
        if (isSwiperBarButtonTouched(pos) && pos - defPoint <= getconfigContainerWidth()) return true;
        return false;
    }

    function changeSwiperBarButtonWidth(newWidth, unit, fromTheEnd=false) {
        if (!swiperButtonReachMaxWidth()||fromTheEnd) setSwiperButtonWidth(newWidth, unit);
        else setSwiperButtonWidth("100", "%");
    }

    function setSwiperButtonWidth(newWidth, unit) {
        getElStyle(config.idButton).width = `${newWidth}${unit}`;
    }

    function swiperButtonReachMaxWidth() {
        if (getSwiperBarWidth() < getconfigContainerWidth()) return false;
        return true;
    }

    function isFingerInCorrectStartPos(pos) {
        if (pos >= defPoint && pos <= defPoint + config.defaultWidth) return true;
        return false;
    }

    function changeSwiperBarContainerTextLeftPadding(newPaddingLeft) {
        getElStyle(config.idTextSwiper).paddingLeft = `${newPaddingLeft}px`;
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
        getElStyle(config.idTextSwiper).opacity = `${opacity}`;
    }

    function enabled(state) {
        if (state) showHideSwiperBar('flex');
        else showHideSwiperBar('none');
    }

    function showHideSwiperBar(display) {
        getElStyle(config.swiperContainerID).display = `${display}`;
    }

    function changePaddingSwiperText() {
        changeSwiperBarContainerTextLeftPadding(paddingFormula());
    }

    return {
        enabled: enabled
    }
};