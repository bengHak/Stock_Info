let id;
let tempPort = null;


//localstorage 테스트
//cookie 지우면 다 지워짐
console.log(localStorage.sites);
console.log(typeof localStorage.sites);
let temp;
// let temp = JSON.parse(storageJson.sites);
// console.log(typeof temp);
// console.log(temp);
// storageJson.sites = JSON.stringify(temp);

if(localStorage.sites === undefined){
    localStorage.sites = '[]';
    console.log(localStorage.sites);
}
if (localStorage.sites === '[]') {
    temp = JSON.parse(localStorage.sites);
    console.log(temp);
    temp.push(
        {
            name: '전자공시시스템',
            url: 'http://dart.fss.or.kr/'
        }, {
            name: '한국거래소',
            url: 'http://www.krx.co.kr/main/main.jsp'
        }, {
            name: 'KIND',
            url: 'http://kind.krx.co.kr/main.do?method=loadInitPage&scrnmode=1'
        },{
            name:'NICE 신용평가',
            url: 'http://www.nicerating.com/main.do'
        },{
            name:'연합인포맥스',
            url:'http://news.einfomax.co.kr/'
        },{
            name:'매일경제',
            url:'http://www.mk.co.kr/'
        },{
            name:'한국경제',
            url:'http://www.hankyung.com/'
        },{
            name:'MK 경제지표',
            url:'http://graph.mk.co.kr/'
        },{
            name:'키움증권',
            url:'http://openstock.kiwoom.com/'
        },{
            name:'팍스넷',
            url:'http://www.paxnet.co.kr/'
        }
        );
    localStorage.sites = JSON.stringify(temp);
    console.log(localStorage.sites);
} else {
    console.log('[] 아님');
}

//확장 앱 열렸을 때 실행되는 함수
whale.sidebarAction.onClicked.addListener(res=>{
    console.log(res);
    sidebarOpened = res.opened;
    id = res.windowId;
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
                console.log(localStorage.sites);
                sendResponse(localStorage.sites);
                break;
            }
            case 'closed':{
                if(tempPort != null){
                    tempPort.postMessage('close');
                }
                break;
            }
            case 'open':{
                console.log('open');
                console.log(id);
                if(tempPort != null){
                    tempPort.postMessage('open');
                }
                // whale.tabs.sendMessage(
                //     id, {'isOpened':sidebarOpened}
                // );
                break;
            }
        }
    }
    else if(typeof msg === 'object') {
        // storageJson.sites = JSON.parse(storageJson)
        if(msg.keyword === 'sites'){
            console.log(localStorage.sites);
            console.log(msg);
            localStorage.sites = msg.sites;
            console.log(localStorage.sites);
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