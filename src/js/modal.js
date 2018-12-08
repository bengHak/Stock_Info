let storage = window.localStorage;
let tmpArr;
console.log(storage.sites);

//storage 초기설정
whale.runtime.sendMessage('getItems', (response) => {
    console.log(response);
    storage.sites = response;
});

if (window.innerWidth < 590) {
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

    window.onclick = function (event) {
        if (event.target === modalWin) {
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
    mdClose.style.cssText = 'color:#aaa; float:center; font-size: 28px; font-weight: bold;';
    mdClose.innerHTML = '&times;';
    mdClose.onclick = () => {
        modalWin.style.display = 'none';
    };

    var mdText = document.createElement('p');
    mdText.innerHTML += '<br><h1>Hello</h1><br>';

    //init storage
    let setObj = (obj) => {
        storage.sites = JSON.stringify(obj);
        console.log(obj);
        console.log(storage.sites);
        whale.runtime.sendMessage({
            keyword: 'sites',
            sites: storage.sites
        });
    };

    let getObj = () => {
        console.log(storage.sites);
        return JSON.parse(storage.sites);
    };

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

    var mdList = document.createElement('table');

    // function deleteByUrl(array, value) {
    //     console.log(array);
    //     console.log(value);
    //     for (let i = array.length - 1; i >= 0; i--) {
    //         console.log(array[i]['url']);
    //         if (array[i]['url'] === value) {
    //             array = array.splice(i, 1);
    //             console.log(array.length);
    //             console.log('deleted');
    //         }
    //     }
    //     console.log('spliced array');
    //     console.log(array);
    //     return array;
    // }

    function drawList2() {
        // if(document.getElementById('0removeRow') !== null){
        //     tmp_cnt++;
        //     return;
        // }

        let tmp;
        let tmp2;
        // let tmp3;

        try {
            tmpArr = getObj();
        }
        catch (e) {
            console.log('getObj() ERROR')
            return;
        }

        console.log(tmpArr);
        for (let i = 0; i < tmpArr.length; i++) {
            tmp = document.createElement('tr');
            tmp2 = document.createElement('a');
            tmp2.innerText = tmpArr[i].name;
            tmp2.href = tmpArr[i].url;
            // tmp3 = document.createElement('a');
            // tmp3.id = i + 'removeRow';
            // tmp3.innerText = 'x';
            // tmp3.style.float = 'right';
            // tmp3.style.fontWeight = 'bold';
            // tmp3.onclick = (evt) => {
            //     let url_ = evt.target.parentNode.children[0].href;
            //     console.log(url_.slice(0, -1));
            //     tmpArr = deleteByUrl(tmpArr, url_.slice(0, -1));
            //     setObj(tmpArr);
            //     evt.target.parentNode.remove();
            // };
            tmp.appendChild(tmp2);
            // tmp.appendChild(tmp3);
            mdList.appendChild(tmp);
        }
    }

    setTimeout(drawList2(), 600);

    // function findObjectByKey(array, value) {
    //     if (value === '') {
    //         console.log('공백');
    //         return '';
    //     }
    //     for (var i = 0; i < array.length; i++) {
    //         if (array[i]['url'] === value) {
    //             return array[i];
    //         }
    //     }
    //     return null;
    // }

    // function saveSite(siteName, siteUrl) {
    //     console.log('saveSite');
    //     console.log(tmpArr);
    //
    //     let dupl = findObjectByKey(tmpArr, siteUrl);
    //     console.log(dupl);
    //     if (dupl != null) {
    //         alert('이미 등록된 사이트입니다.');
    //         return;
    //     }
    //
    //     modalWin.removeChild(mdContent);
    //     tmpArr.push({
    //         'name': siteName,
    //         'url': siteUrl
    //     });
    //     console.log('push 끝');
    //     setObj(tmpArr);
    //
    //     setTimeout(()=>{
    //         drawList2();
    //         modalWin.appendChild(mdContent);
    //     },500);
    // }

    // var mdForm = document.createElement('form');
    // mdForm.onsubmit = () => {
    //     saveSite(
    //         mdInputName.value,
    //         mdInputUrl.value
    //     );
    //
    //     mdInputName.value = '';
    //     mdInputUrl.value = '';
    //
    //     return false;
    // };
    //
    // var mdInputName = document.createElement('input');
    // mdInputName.type = 'text';
    // mdInputName.name = 'name';
    // mdInputName.placeholder = '사이트 이름';
    //
    // var mdInputUrl = document.createElement('input');
    // mdInputUrl.type = 'url';
    // mdInputUrl.name = 'url';
    // mdInputUrl.placeholder = '사이트 주소';
    //
    // var mdInputSubmit = document.createElement('input');
    // mdInputSubmit.type = 'submit';
    // mdInputSubmit.value = '등록';
    //
    // mdForm.appendChild(mdClose);
    // mdForm.appendChild(mdInputName);
    // mdForm.appendChild(mdInputUrl);
    // mdForm.appendChild(mdInputSubmit);
    mdContent.appendChild(mdText);
    mdContent.appendChild(mdList);
    mdContent.appendChild(mdClose);
    // mdContent.appendChild(mdForm);
    modalWin.appendChild(mdContent);
    document.body.appendChild(modalWin);
}

