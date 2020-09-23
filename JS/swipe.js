var swiper = function (config) {
    var currentX;
    var delta = config.delta;
    var isSwiping = false;
    var defPoint;

    var getconfigContainerWidth = () => getElement(config.id).offsetWidth;
    var getSwiperBarWidth = () => getElement(config.idButton).offsetWidth;
    var getSwiperBarWidthInPercentage = (fingerPos) => parseInt((fingerPos - defPoint) / getconfigContainerWidth() * 100);
    var getElement = (id) => document.getElementById(id);
    var getElStyle = (id) => getElement(id).style;
    var calculateTextOpacity = (pos) => 1 - getSwiperBarWidthInPercentage(pos) / 100;
    var paddingFormula = () => Math.pow(1.0230, getSwiperBarWidth() - config.defaultWidth);

    if(document.readyState === 'complete') {
        init();
    } else {
        window.addEventListener("load", init);
    }

    function init() {
        window.addEventListener("resize", () => onLoadOrOnResize())
        getElement(config.id).addEventListener("touchstart", touchStart, false)
        getElement(config.id).addEventListener("mousedown", touchStart, false)
        getElement(config.id).addEventListener("touchmove", fingerIsMoving, false)
        getElement(config.id).addEventListener("mousemove", fingerIsMoving, false)
        getElement(config.id).addEventListener("touchend", endSwiping, false)
        getElement(config.id).addEventListener("mouseup", endSwiping, false)
        getElement(config.id).addEventListener("mouseleave", () => { if (isSwiping) endSwiping() })
        onLoadOrOnResize();
        if(typeof config.onFailReset==="undefined") config.onFailReset=false;
        if(typeof config.visible==="undefined") config.visible=true;
        config.defaultWidth=parseInt(getComputedStyle(document.querySelector(".swiper-button")).width.slice(0, -2));
        config.delta=parseInt(config.delta);
        config.idButton=config.id+"-button";
        config.idTextSwiper=config.id+"-text";
        var childs = document.getElementById(config.id).children;
        childs[0].id=config.idButton;
        childs[1].id=config.idTextSwiper;
        visible(config.visible);
    }

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
        if(config.onFailReset==true) resetValue();
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

    function changeSwiperBarButtonWidth(newWidth, unit, fromTheEnd = false) {
        if (!swiperButtonReachMaxWidth() || fromTheEnd) setSwiperButtonWidth(newWidth, unit);
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
        defPoint = getElement(config.id).getBoundingClientRect().left;
        isSwiping = false;
    }

    function changeSwiperBarContainerOpacity(opacity) {
        getElStyle(config.idTextSwiper).opacity = `${opacity}`;
    }

    function visible(state) {
        if (state) showHideSwiperBar('flex');
        else showHideSwiperBar('none');
    }

    function resetValue() {
        isSwiping=false;
        swipeFailed();
    }

    function showHideSwiperBar(display) {
        getElStyle(config.id).display = `${display}`;
    }

    function changePaddingSwiperText() {
        changeSwiperBarContainerTextLeftPadding(paddingFormula());
    }

    return {
        visible: visible,
        reset: resetValue
    }
};