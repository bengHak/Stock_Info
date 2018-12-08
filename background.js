let id;
let IsPCClicked = 0;

console.log(localStorage.sites);
console.log(typeof localStorage.sites);
let temp;

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
            url: 'http://www.krx.co.kr/'
        }, {
            name: 'KIND',
            url: 'http://kind.krx.co.kr/'
        },{
            name:'NICE 신용평가',
            url: 'http://www.nicerating.com/'
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
            case 'getItems':{
                console.log(localStorage.sites);
                sendResponse(localStorage.sites);
                break;
            }
            case 'checkPCVer':{
                sendResponse(IsPCClicked);
                break;
            }
            case 'IsPCClicked':{
                IsPCClicked=0;
                break;
            }
        }
    }
    else if(typeof msg === 'object') {
        if(msg.keyword === 'sites'){
            localStorage.sites = msg.sites;
        }
        else if(msg.keyword === 'qucikSearch'){
            console.log(msg.stock);
            ws.show({
                'url': 'https://m.stock.naver.com/searchItem.nhn?keyword_input=&keyword='
                    + msg.stock
            });
        } else if (msg.tagName === 'clickPCVerBtn'){
            IsPCClicked=1;
            whale.tabs.create({
                url: msg.nowUrl
            });
        } else if (msg.tagName === 'sendurl') {
            console.log(msg.nowUrl);
            whale.tabs.create({
                url: msg.nowUrl
            });

        }
    }
});