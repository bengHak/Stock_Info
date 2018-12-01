var last_known_scroll_position = 0;
var ticking = false;

var navImage = "https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c02152dd25407712e96b503/a3f255591842ce0996174d767f0c3cbe/image.png";

//떠다니는 div
var navBar = document.createElement('div');
navBar.setAttribute("id", "stock_info_nav");
var navImg = document.createElement('img');
navImg.setAttribute("src", navImage);
navImg.setAttribute("width", "100%");

navBar.style.position = "fixed";
navBar.style.top = 0;
navBar.style.right = 0;
navBar.style.left = 0;
navBar.style.zIndex = 5000;
navBar.style.display = 'block';

var floatBtn = document.createElement('div');
floatBtn.setAttribute("id", "floating-button-0");
floatBtn.style.cssText = 'position:fixed;\n' +
    '\twidth:60px;\n' +
    '\theight:60px;\n' +
    '\tbottom:10px;\n' +
    '\tright:5px;\n' +
    '\tbackground-color:#0C9;\n' +
    '\tcolor:#FFF;\n' +
    '\tborder-radius:50px;\n' +
    '\ttext-align:center;\n' +
    'z-index:5000;' +
    '\tbox-shadow: 2px 2px 3px #999;'

var floatBtn1 = document.createElement('div');
floatBtn1.setAttribute("id", "floating-button-1");
floatBtn1.style.cssText =
    'position:fixed;\n' +
    '\twidth:60px;\n' +
    '\theight:60px;\n' +
    '\tbottom:120px;\n' +
    '\tright:20px;\n' +
    '\tbackground-color:#0C9;\n' +
    '\tcolor:#FFF;\n' +
    '\tborder-radius:50px;\n' +
    '\ttext-align:center;\n' +
    '\tbox-shadow: 2px 2px 3px #999;' +
    'z-index:5000;' +
    'opacity:0;transition:opacity 0.4s';

document.body.style.marginTop = '60px';
document.body.appendChild(floatBtn);
document.body.appendChild(floatBtn1);
document.body.appendChild(navBar);
document.getElementById("stock_info_nav").appendChild(navImg);

floatBtn.addEventListener('mouseover',()=>{
    document.getElementById('floating-button-1').style.opacity = 1;
})

floatBtn.addEventListener('mouseout', ()=>{
    document.getElementById('floating-button-1').style.opacity = 0;
})

document.addEventListener('scroll', function (e) {
    last_known_scroll_position = window.scrollY;
    if(!ticking){
        window.requestAnimationFrame(function () {
            doSomething(last_known_scroll_position);
            ticking = false;
        });
        ticking = true;
    }
    //if(last_known_scroll_position === 120){
        //margin 2% height 100px, 픽셀 되도록 짝수, 2의 배수승
    // }

    // if (last_known_scroll_position > 120) {
    //     navBar.style.position = "fixed";
    //     navBar.style.top = 0;
    //     navBar.style.right = 0;
    //     navBar.style.left = 0;
    //     navBar.style.zIndex = 5000;
    //     navBar.style.display = 'block';
    // } else {
    //     navBar.style.display = 'none';
    //     navBar.style.position = "relative";
    // }

});

function doSomething(scroll_pos) {
    // do something with the scroll position
    console.log(scroll_pos);
}

if(document.title.indexOf('네이버 증권') != -1){
    document.body.removeChild(document.getElementsByClassName("btn_top _btn_floating_top")[0]);
}