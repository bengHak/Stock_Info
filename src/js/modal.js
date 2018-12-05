//12: 31 전까지는 멀쩡

if(window.innerWidth < 590){

    var modalWin = document.createElement('div');
    modalWin.id = 'modalWin';
    modalWin.style.cssText = '' +
        'display: none; /* Hidden by default */\n' +
        '    position: fixed; /* Stay in place */\n' +
        '    z-index: 5001; /* Sit on top */\n' +
        '    left: 0;\n' +
        '    top: 0;\n' +
        '    width: 100%; /* Full width */\n' +
        '    height: 100%; /* Full height */\n' +
        '    overflow: auto; /* Enable scroll if needed */\n' +
        '    background-color: rgb(0,0,0); /* Fallback color */\n' +
        '    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */';

    window.onclick = function(event) {
        if (event.target == modalWin) {
            modalWin.style.display = "none";
        }
    };

    var mdContent = document.createElement('div');
    mdContent.setAttribute('class', 'modal-content');
    mdContent.style.cssText = 'background-color: #fefefe;\n' +
        '    margin: 15% auto; /* 15% from the top and centered */\n' +
        '    padding: 20px;\n' +
        '    border: 1px solid #888;\n' +
        '    width: 80%; /* Could be more or less, depending on screen size */';

    var mdClose = document.createElement('span');
    mdClose.style.cssText = 'color:#aaa; float:right; font-size: 28px; font-weight: bold;';
    mdClose.innerHTML = '&times;';
    mdClose.onclick = ()=>{
      modalWin.style.display = 'none';
    };

    var mdText = document.createElement('p');
    mdText.innerHTML += '<br><h1>Hello</h1><br>';


    //init storage
    var setObj = (key, obj)=>{
      return window.localStorage.setItem( key, JSON.stringify(obj));
    };

    var getObj = (key)=>{
        return JSON.parse(window.localStorage.getItem(key));
    };

    var setGlobalObj = ()=>{
        whale.runtime.sendMessage('setItems');
    };

    var getGlobalObj =()=>{
        return new Promise((resolve)=>{
            whale.runtime.sendMessage('getItems',(res)=>{
                resolve(JSON.parse(res));
            });
        });
    };

    var initialArr = getGlobalObj().then((res) => {
        console.log(res);
        return res;
    });

    console.log(initialArr);

    // var wSetObj = (key, obj)=>{
    //     return whale.storage.local.set({
    //         key: JSON.stringify(obj)
    //     });
    // };
    //
    // var wGetObj = (key)=>{
    //     whale.storage.local.get(key, (res)=>{
    //         return JSON.parse(res);
    //     });
    // };

    if(window.localStorage.getItem('sites') == null){
        window.localStorage.setItem('sites','[]');
    }


    // function isEmpty(myObject) {
    //     for(var key in myObject) {
    //         if (myObject.hasOwnProperty(key)) {
    //             return false;
    //         }
    //     }
    //     return true;
    // }

    // var initialSiteList = wGetObj('sites');
    //
    // if(initialSiteList.toString() == '{}'){
    //     wSetObj('sites','[]');
    // }
    // console.log(initialSiteList);


    var mdList = document.createElement('table');

    function drawList() {
        mdList.innerHTML = '<tr>';
        var listObj = getObj('sites');
        for (var i = 0; i < listObj.length; i++) {
            mdList.innerHTML += '<br>' +
                listObj[i].siteName +
                '<br> <a href="' +
                listObj[i].siteUrl +
                '">' +
                listObj[i].siteUrl +
                '</a>' +
                '<span onclick="" id="deleteRow" style="font-weight: bold; font-size: 13px;"> X</span>' +
                ' <br></tr>';
        }
        // document.getElementById('deleteRow').onclick = ()=>{
        //     console.log(this);
        // };
    }

    drawList();



    function findObjectByKey(array, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i]['siteUrl'] === value) {
                return array[i];
            }
        }
        return null;
    }

    function saveSite(siteName, siteUrl) {
        var tempObj = getObj('sites');
        // var wObj = wGetObj('sites');

        console.log('saveSite');
        console.log(tempObj);

        var dupl = findObjectByKey(tempObj, siteUrl);
        console.log(dupl);
        if(dupl != null) {
            alert('이미 등록된 사이트입니다.');
            return;
        }

        modalWin.removeChild(mdContent);
        tempObj.push({
            'siteName': siteName,
            'siteUrl': siteUrl
        });

        setObj('sites',tempObj);
        // wSetObj('sites',wObj);

        console.log(tempObj);
        // console.log(wObj);

        setTimeout(()=>{
            drawList();
            modalWin.appendChild(mdContent);
        },100);

        printStorage();
    }

    var mdForm = document.createElement('form');
    mdForm.onsubmit = () => {
        saveSite(
            mdInputName.value,
            mdInputUrl.value
        );

        mdInputName.value = '';
        mdInputUrl.value = '';

        return false;
    };

    var mdInputName = document.createElement('input');
    mdInputName.type = 'text';
    mdInputName.name = 'name';
    mdInputName.placeholder = '사이트 이름';

    var mdInputUrl = document.createElement('input');
    mdInputUrl.type = 'url';
    mdInputUrl.name = 'url';
    mdInputUrl.placeholder = '사이트 주소';

    // setObj('sites',{
    //     'siteName': '매일경제',
    //     'siteUrl': 'http://mk.co.kr/'
    // });

    function printStorage() {
        for (var i = 0; i < window.localStorage.length; i++) {
            console.log(window.localStorage.key(i) + "=[" + window.localStorage.getItem(window.localStorage.key(i)) + "]");
        }
    }

    if(window.localStorage.getItem('sites') == null){
        window.localStorage.setItem('sites','[]');
    }

    var mdInputSubmit = document.createElement('input');
    mdInputSubmit.type = 'submit';
    mdInputSubmit.value='등록';

    mdForm.appendChild(mdClose);
    mdForm.appendChild(mdInputName);
    mdForm.appendChild(mdInputUrl);
    mdForm.appendChild(mdInputSubmit);
    mdContent.appendChild(mdText);
    mdContent.appendChild(mdClose);
    mdContent.appendChild(mdList);
    mdContent.appendChild(mdForm);
    modalWin.appendChild(mdContent);
    document.body.appendChild(modalWin);
}