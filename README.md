# Swiper Button

## Introduction
This project has the goal to make possible to any developer to add a simple sign-in/up swipe animation for webpages and web applications.
<br><br>
## Installation guide
Follow this simple step to add the animation script to your project
1. Add the script file in the "head" section of your page
```HTML
    <script type="text/javascript" src="<your path>/swipe.js"></script>
```
2. Add the animation elements to the page body of your page or application
```HTML
<div class="swiper-box flex" id="swiper-container">
    <div id="swipe" class="swiper bg-blue flex">
        <div class="swiper-info" id="swiper-text">
            Swipe to continue
        </div>
        <div id="button" class="swiper-button">
            Swipe
        </div>
    </div>
</div>
```
3. Add animation using the javascript library added in step 1
```js
swiper({
    idParent: "swipe",
    idButton: "button",
    idTextSwiper: "swiper-text",
    swiperContainerID: "swiper-container",
    delta: 60,
    defaultWidth: 90,
    onComplete: () => {
        //when the swipe is completed return true or false
        return true;
    },
    onChange: (percent, time) => {
        //do something each time the user move the swipebar 
    },
    onSuccess: () => {
        //if the sign process succeed do something
    },
    onFail: () => {
        //if the sign process fail do something else
    }
});
```
<br>

## Tips
It is possible to add one or more swipe elements to a single page but remember to change the ids tag of each component.
<br>
It is possible to create an array of components each of them with a specific function
```js
var swipeArray=[];
swipeArray[0] = swiper({
    //properties goes here
})
```
It is also possible to show or hide a component.
The best way is to associate the swipe component to a variable first.
```js
swipeArray[0].enabled(false);
```