var storageJson = window.localStorage;
let sidebarOpened = false;

try{
    storageJson.sites = '[]';
}
catch (e) {
    window.location.href = "http://stackoverflow.com/search?q=[js]+"
    + e.message;
}

//localstorage 테스트
//cookie 지우면 다 지워짐
console.log(storageJson.sites);
console.log(typeof storageJson.sites);
var temp = JSON.parse(storageJson.sites);
console.log(typeof temp);
console.log(temp);
temp.push({'다음': 'https://daum.net'});
storageJson.sites = JSON.stringify(temp);

//port
whale.runtime.onConnect.addListener(port => {
    console.log('send by connect');
    if(sidebarOpened === true){
        console.log(sidebarOpened + ' sidebar is opened');
        port.postMessage({'sidebar':true});
    }
    else
        console.log('closed');

});

//확장 앱 열렸을 때 실행되는 함수
whale.sidebarAction.onClicked.addListener(res=>{
    console.log(res);
    sidebarOpened = res.opened;
    return res;
});

whale.runtime.onMessage.addListener((msg, sender, sendResponse)=>{
    var ws = whale.sidebarAction;
    if(typeof msg === 'string'){
        switch (msg) {
            case 'getOpened':{
                sendResponse(sidebarOpened);
                break;
            }
            case 'showNaverFinance':{
                try{
                    console.log(whale.sidebarAction);
                    whale.sidebarAction.isDocked(3,(res)=>{
                        console.log(res);
                    });
                    // whale.sidebarAction.getDocked(0,(res)=> {
                    //     console.log(res);
                    // });
                    console.log(storageJson);
                    break;
                }
                catch (e) {
                    console.log(e);
                    whale.tabs.create({
                        url: "https://instagram.com"
                    });
                    break;
                }
            }
            case 'showTV':{
                whale.tabs.create({
                    url:'https://kr.tradingview.com/'
                });
                break;
            }
            case 'showIndex': {
                ws.show({
                    url:'https://m.stock.naver.com',
                    reload : false
                });

                break;
            }
            case 'badge5': {
                ws.setBadgeText({
                    text: `5`
                });
                ws.setTitle({title: "변경 전"});
                break;
            }
            // case 'badge4': {
            //     ws.setBadgeText({
            //         text: `4`
            //     });
            //     setTimeout(()=>{
            //         ws.setTitle({title: "변경 후2"});
            //     }, 2000);
            //     ws.setTitle({title: "변경 후"});
            //     break;
            // }
            case 'hide': {
                ws.hide();
                break;
            }
            case 'getItems':{
                sendResponse(storageJson);
                break;
            }
            case 'closed':{
                sidebarOpened = false;
                break;
            }
        }
    }
    else if(typeof msg === 'object') {
        // storageJson.sites = JSON.parse(storageJson)
        if(msg.keyword === 'sites'){
            console.log(storageJson);
            storageJson.setItem(msg.siteUrl);
        }
        else if(msg.keyword === 'url'){
            console.log(msg.siteUrl);
            whale.tabs.create({
                url: msg.siteUrl
            });
        }
        else if(msg.keyword === 'qucikSearch'){
            console.log(msg.stock);
            ws.show({
                'url': 'https://m.stock.naver.com/searchItem.nhn?keyword_input=&keyword='
                    + msg.stock
            });
        }
    }
});