var swiper = (function () {
    var x;
    var currentX;
    var swipeBar = swiperLoader.swipeBar();
    var delta = swipeBar.delta;
    var isSwiping = false;
    var defPoint = document.getElementById(swipeBar.idParent).getBoundingClientRect().left;
    var textBlinkClk;
    var isEnabled;
    enabled(false);

    function fingerIsMoving(pos) {
        if (isSwiping) currentX = pos;
        if (pos > defPoint + swipeBar.defaultWidth && (x >= defPoint && x <= defPoint + swipeBar.defaultWidth) && isSwiping)
            document.getElementById(swipeBar.idButton).style.width = (pos - defPoint) + "px";
        changePaddingSwiperText();
    }

    function touchStart(pos) {
        currentX = 0;
        isSwiping = true;
        x = pos;
    }

    window.addEventListener("load", () => {
        defPoint = document.getElementById(swipeBar.idParent).getBoundingClientRect().left;
        isSwiping = false;
    })

    window.addEventListener("resize", () => {
        defPoint = document.getElementById(swipeBar.idParent).getBoundingClientRect().left;
        isSwiping = false;
    })

    document.getElementById(swipeBar.idParent).addEventListener("touchstart", (e) => touchStart(e.touches[0].clientX))
    document.getElementById(swipeBar.idParent).addEventListener("mousedown", (e) => touchStart(e.clientX))
    document.getElementById(swipeBar.idParent).addEventListener("touchmove", (e) => fingerIsMoving(e.touches[0].clientX))
    document.getElementById(swipeBar.idParent).addEventListener("mousemove", (e) => fingerIsMoving(e.clientX))


    document.getElementById(swipeBar.idParent).addEventListener("touchend", endSwiping)
    document.getElementById(swipeBar.idParent).addEventListener("mouseup", endSwiping)
    document.getElementById(swipeBar.idParent).addEventListener("mouseleave", () => { if (isSwiping) endSwiping() })

    function endSwiping() {
        var complete = false;
        if (currentX - defPoint >= document.getElementById(swipeBar.idParent).offsetWidth - delta) {
            complete = true;
        }
        if (complete == true) {
            document.getElementById(swipeBar.idButton).style.width = "100%";
            manageBlink(false);
            swipeBar.onComplete();
        } else {
            document.getElementById(swipeBar.idButton).style.width = swipeBar.defaultWidth + "px";
            document.getElementById(swipeBar.idTextSwiper).style.paddingLeft = `0px`;
        }
        isSwiping = false;
    }

    function enabled(state) {
        isEnabled = state;
        if (state) document.getElementById(swipeBar.swiperContainerID).style.display = "flex";
        else document.getElementById(swipeBar.swiperContainerID).style.display = "none";
        if (isEnabled) manageBlink();
        else clearInterval(textBlinkClk);
    }

    function changeRGBSwiperText(opacity) {
        document.getElementById(swipeBar.idParent).style.color = `rgba(255, 255, 255, ${opacity})`;
    }

    function manageBlink(status=true) {
        opacity = 0;
        var deltaT;
        if(!status) {
            clearInterval(textBlinkClk);
            return;
        }
        textBlinkClk = setInterval(() => {
            changeRGBSwiperText(opacity);
            if (opacity >= 1) deltaT = -0.05;
            if (opacity <= 0) deltaT = 0.05;
            opacity = opacity + deltaT;
        }, 50)
    }

    function changePaddingSwiperText() {
        var temp = document.getElementById(swipeBar.idButton).offsetWidth;
        document.getElementById(swipeBar.idTextSwiper).style.paddingLeft = `${temp - swipeBar.defaultWidth+(temp*-0.1)}px`;
    }



    return {
        enabled: enabled

    }
})()