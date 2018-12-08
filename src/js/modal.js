let storage = window.localStorage;
let tmpArr;

if (window.innerWidth < 590) {

    let modalWin = document.createElement('div');
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
        '    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */' +
        '    opacity:0;transition:opacity 0.3s;';

    window.onclick = function (event) {
        if (event.target === modalWin) {
            modalWin.style.opacity = 0;
            setTimeout(()=>{
                modalWin.style.display = 'none';
            },400);
        }
    };

    let mdContent = document.createElement('div');
    mdContent.setAttribute('class', 'modal-content');
    mdContent.style.cssText = 'background-color: #00d398;\n' +
        '    position: fixed;' +
        '    margin: 70px 40px; /* 15% from the top and centered */\n' +
        '    padding: 30px 0;\n' +
        '    border-radius: 2%;' +
        '    border: 1px solid #888;\n' +
        '    width: 80%; /* Could be more or less, depending on screen size */';

    let mdClose = document.createElement('span');
    mdClose.style.cssText = 'color:#081246; float:right; font-size: 20px; padding-top: 20px;' +
        'padding-right: 10px;';
    mdClose.innerHTML = '닫기';
    mdClose.onclick = () => {
        modalWin.style.opacity = 0;
        setTimeout(()=>{
            modalWin.style.display = 'none';
        },400);
    };

    let mdText = document.createElement('div');
    mdText.innerHTML += '추천 사이트 모음';
    mdText.style.cssText = 'text-align:center; ' +
        'color: #081246; ' +
        'font-size: 2.5em; ' +
        'font-weight: bold;' +
        'margin-bottom: 30px; ' +
        'margin-top: 10px;';

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

    let mdList = document.createElement('table');
    mdList.style.cssText = 'margin-left: 20px;' +
        'border-radius: 2%;' +
        'background-color: #081246;';

    let drawList2 = () => {
        let tableRow;
        let indexDiv;
        let nameDiv;
        let nameA;
        let urlDiv;
        let urlA;

        try {
            tmpArr = getObj();
        }
        catch (e) {
            console.log('getObj() ERROR');
            return;
        }

        for (let i = 0; i < tmpArr.length; i++) {
            tableRow = document.createElement('tr');

            tableRow.onmouseover = (evt)=>{
                console.log(evt.target.parentElement.parentNode);
                evt.target.style.backgroundColor = '#fff';
                evt.target.style.color = '#081246';
            };

            tableRow.onmouseout = (evt)=>{
                evt.target.style.backgroundColor = '#081246';
                evt.target.style.color = '#fff';
            };
            tableRow.style.color = '#fff';
            tableRow.innerHTML = "&nbsp;&nbsp;&nbsp;" + tmpArr[i].name + '<br>' +
                "&nbsp;&nbsp;&nbsp;&nbsp;-" + tmpArr[i].url;
            tableRow.onclick = ()=>{
                window.location.href = tmpArr[i].url;
            };
            mdList.appendChild(tableRow);
        }
    };

    let getData = (callback) => {
        whale.runtime.sendMessage('getItems', (res)=>{
            callback(res);
        });
    };

    let setLocal = (response) => {
        console.log(response);
        storage.sites = response;
        drawList2();
    };


    getData(setLocal);

    mdContent.appendChild(mdText);
    mdContent.appendChild(mdList);
    mdContent.appendChild(mdClose);
    modalWin.appendChild(mdContent);
    document.body.appendChild(modalWin);
}

