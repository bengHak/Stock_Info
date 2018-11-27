document.body.addEventListener('mouseup', function(e){
    var selected = getSelection() // call getSelectionText() to see what was selected
    console.log(selected.toString())
    if (selected.toString().length > 0){ // if selected text length is greater than 0
        var copysuccess = copySelectionText() // copy user selected text to clipboard
        showtooltip(selected)
    }
}, false)

//드래그 하면 버튼 추가
function appendBtn() {
    var btn = document.createElement("버튼");
    var t = document.createTextNode("hello");
    btn.appendChild(t);
    //Appending to DOM
    document.body.appendChild(btn);
}

//드래그 한 부분 콘솔에 띄우기
function getSelectionText(){
    var selectedText = ""
    if (window.getSelection){ // all modern browsers and IE9+
        selectedText = window.getSelection().toString()
        console.log(window.getSelection().getRangeAt(0))
        console.log(window.getSelection().anchorOffset)
        console.log(window.getSelection().getRangeAt(0).startOffset)
        console.log(window.getSelection().getRangeAt(0).endOffset)
        console.log(window.getSelection().getRangeAt(0).getClientRects())
    }
    return selectedText
}

/*document.addEventListener('mouseup', function(){
    var thetext = getSelectionText()
    if (thetext.length > 0){ // check there's some text selected
        console.log(thetext) // logs whatever textual content the user has selected on the page
        appendBtn()
    }
}, false)*/

function copySelectionText(){
    var copysuccess // var to check whether execCommand successfully executed
    try{
        copysuccess = document.execCommand("copy") // run command to copy selected text to clipboard
    } catch(e){
        copysuccess = false
    }
    return copysuccess
}

function createtooltip(){ // call this function ONCE at the end of page to create tool tip object
    tooltip = document.createElement('div')
    tooltip.style.cssText =
        'position:absolute; background:black; color:white; padding:4px;z-index:10000;'
        + 'border-radius:2px; font-size:12px;box-shadow:3px 3px 3px rgba(0,0,0,.4);'
        + 'opacity:0;transition:opacity 0.3s'
    tooltip.innerHTML = '여기에 버튼'
    document.body.appendChild(tooltip)
}

let tooltip, hidetooltiptimer
createtooltip() // create tooltip by calling it ONCE per page. See "Note" below

function showtooltip(selected){
    let sel = selected.getRangeAt(0).cloneRange().getBoundingClientRect()
    let relative = document.body.parentNode.getBoundingClientRect();
    console.log(sel)
    clearTimeout(hidetooltiptimer)
    tooltip.style.left = sel['left'] + "px"
    tooltip.style.top = (sel['bottom'] - relative.top) + "px"
    tooltip.style.opacity = 1
    hidetooltiptimer = setTimeout(function(){
        tooltip.style.opacity = 1
    }, 2000)
}