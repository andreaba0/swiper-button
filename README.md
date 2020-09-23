# Swiper Button

## Introduction
This project has the goal to make possible to any developer to add a simple sign-in/up swipe animation for webpages and web applications.
<br><br>

## Installation guide
Follow this simple step to add the animation script to your project
1. Add the script file and the CSS file in the "head" section of your page
```HTML
    <script type="text/javascript" src="<your path>/swipe.js"></script>
    <link rel="stylesheet" type="text/css" href="<your path>/style.css" />
```
2. Add the animation elements to the body of your page or application
```HTML
<div id="swipe" class="swiper bg-blue">
    <div class="swiper-button">
        Swipe
    </div>
    <div class="swiper-info">
        Scorri per continuare
    </div>
</div>
```
3. Add animation using the javascript library added in step 1
```JAVASCRIPT
swiper({
    id: "swipe",
    delta: 60,
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

### Other useful properties
1.
```JAVASCRIPT
onFailReset: true //default is false
```
if this property is set to true, when the user swipe to the end, the swiperbar will be resetted after the onSuccess function.
<br>

2.
```JAVASCRIPT
visible: false //default is true
```
if this property is set to true, the swipebar will be shown to the user. The default CSS property hide the swipebar, but a specific Javascript function display it.
<br>

## Tips
It is possible to add one or more swipe elements to a single page but remember to change the ids tag of each component.
<br>
It is possible to create an array of components each of them with a specific function

```JAVASCRIPT
var swipeArray=[];
swipeArray[0] = swiper({
    //properties goes here
})
```
It is also possible to show or hide a component.
The best way is to associate the swipe component to a variable first.

```JAVASCRIPT
swipeArray[0].visible(false); //to hide the component
```
It is possible to reset the status of the swipebar by calling a specific function

```JAVASCRIPT
swipeArray[0].reset(); //to reset the status of the component
```