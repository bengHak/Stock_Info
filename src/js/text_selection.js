document.body.addEventListener('mouseup', function (e) {
    var selected = getSelection();// call getSelectionText() to see what was selected
    console.log(selected.toString().trim().length);
    if (selected.toString().trim().length > 0) { // if selected text length is greater than 0
        var copysuccess = copySelectionText();// copy user selected text to clipboard
        showtooltip(selected, 1);
    }
}, false)

//드래그 취소 했을 경우 버튼 사라지는 함수
document.addEventListener("click", function () {
    var selected = getSelection();
    if (selected.toString().trim().length === 0) {
        tooltip.style.opacity = 0;
    }
});

//드래그 하면 버튼 추가
function appendBtn() {
    var btn = document.createElement("버튼");
    var t = document.createTextNode("hello");
    btn.appendChild(t);
    //Appending to DOM
    document.body.appendChild(btn);
}

//드래그 한 부분 콘솔에 띄우기
function getSelectionText() {
    var selectedText = "";
    if (window.getSelection) { // all modern browsers and IE9+
        selectedText = window.getSelection().toString();
        console.log(window.getSelection().getRangeAt(0));
        console.log(window.getSelection().anchorOffset);
        console.log(window.getSelection().getRangeAt(0).startOffset);
        console.log(window.getSelection().getRangeAt(0).endOffset);
        console.log(window.getSelection().getRangeAt(0).getClientRects());
    }
    return selectedText;
}

//드래그 한 부분 복사해서 클립보드에 추가하는 함수
function copySelectionText() {
    var copysuccess; // var to check whether execCommand successfully executed
    try {
        copysuccess = document.execCommand("copy") // run command to copy selected text to clipboard
    } catch (e) {
        copysuccess = false
    }
    return copysuccess
}

//드래그 후 버튼 생성 함수
function createtooltip() { // call this function ONCE at the end of page to create tool tip object
    tooltip = document.createElement('a')
    tooltip.style.cssText =
        'position:absolute; padding:4px;z-index:2147483645; border-radius:50%;'
        + ''
        + 'opacity:0;transition:opacity 0.4s';
    tooltip.innerHTML = '<img style="width:30px; height:30px; border-radius:50%; " src="https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c07d4f7af1d2f0d552cca75/e973b05aa5416907a7b3646e559f3e2a/searchicon.png">';
    document.body.appendChild(tooltip);
}

let tooltip;
let copied;
createtooltip() // create tooltip by calling it ONCE per page. See "Note" below

//드래그 후 생성되는 버튼 위치 정의
function showtooltip(selected, block) {
    let sel = selected.getRangeAt(0).cloneRange().getBoundingClientRect()
    let relative = document.body.parentNode.getBoundingClientRect();
    copied = selected.toString();
    tooltip.style.left = sel['left'] + "px";
    tooltip.style.top = (sel['bottom'] - relative.top) + "px";
    tooltip.style.opacity = 1;
}

tooltip.addEventListener('click',()=>{
    console.log('Clicked');
    console.log(copied);
    whale.runtime.sendMessage({
        'keyword':'qucikSearch',
        'stock': copied
    }, res=>{
        console.log(res);
    });
    console.log(location.href);
});
