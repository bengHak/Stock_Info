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
            name:'팍스넷',
            url:'http://www.paxnet.co.kr/'
        },{
            name:'키움증권',
            url:'http://openstock.kiwoom.com/'
        },{
            name:'MK 경제지표',
            url:'http://graph.mk.co.kr/'
        }
        );
    localStorage.sites = JSON.stringify(temp);
    console.log(localStorage.sites);
} else {
    console.log('[] 아님');
}

let timerId = null;
function createNoti(obj) {
    console.log(obj);
    let id = obj.id;

    if(obj.type === 'marketEnd30m'){
        whale.notifications.create(
            id,
            {
                type:'basic',
                iconUrl: '/icons/mainIcon.png',
                title : "스톡인포 알림",
                message: "주식 장 마감 시간 30분 전입니다."
            },
            ()=>{}
        );
    }
    else if(obj.type === 'marketEnd1h'){
        whale.notifications.create(
            id,
            {
                type:'basic',
                iconUrl: '/icons/mainIcon.png',
                title : "스톡인포 알림",
                message: "주식 장 마감 시간 1시간 전입니다."
            },
            ()=>{}
        );
    }
    else if(obj.type === 'marketEnd2h'){
        whale.notifications.create(
            id,
            {
                type:'basic',
                iconUrl: '/icons/mainIcon.png',
                title : "스톡인포 알림",
                message: "주식 장 마감 시간 2시간 전입니다."
            },
            ()=>{}
        );
    }
    else if(obj.type === 'marketStart'){
        whale.notifications.create(
            id,
            {
                type:'basic',
                iconUrl: '/icons/mainIcon.png',
                title : "스톡인포 알림",
                message: "주식 장 시작 시간입니다."
            },
            ()=>{}
        );
    }
    else if(obj.type === 'nov'){
        let stockName = obj.stockName;
        let price = obj.price;
        whale.notifications.create(
            id,
            {
                type:'basic',
                iconUrl: '/icons/mainIcon.png',
                title : "스톡인포 알림",
                message: stockName + ' ' + price +'원 (시가)'
            },
            ()=>{}
        );
    }
    else if(obj.type === 'ncv'){
        let stockName = obj.stockName;
        let price = obj.price;
        whale.notifications.create(
            id,
            {
                type:'basic',
                iconUrl: '/icons/mainIcon.png',
                title : "스톡인포 알림",
                message: stockName + ' ' + price +'원 (종가)'
            },
            ()=>{}
        );
    }
    else if(obj.type === 'ntv1'){
        let stockName = obj.stockName;
        let price = obj.price;
        whale.notifications.create(
            id,
            {
                type:'basic',
                iconUrl: '/icons/up.png',
                title : "스톡인포 알림",
                message: stockName + ' ' + price +'원 (목표가 도달)'
            },
            ()=>{}
        );
    }
    else if(obj.type === 'ntv2'){
        let stockName = obj.stockName;
        let price = obj.price;
        whale.notifications.create(
            id,
            {
                type:'basic',
                iconUrl: '/icons/down.png',
                title : "스톡인포 알림",
                message: stockName + ' ' + price +'원 (목표가 도달)'
            },
            ()=>{}
        );
    }
}

let myStockList;
function setStockList(obj){
    myStockList = JSON.parse(obj);
    console.log(myStockList);
}

function StartClock(){
    timerId = setInterval(()=>{
        httpGetAsync('https://m.stock.naver.com/api/json/noti/getNotiOverall.nhn', setStockList);
        console.log('interval');
        let today = new Date();
        let hh = today.getHours();
        let mi = today.getMinutes();
        let ss = today.getSeconds();
        let obj = {};

        let stockList = myStockList.result.list;
        if (stockList !== null && (today.getDay() !== 5 || today.getDay() !== 6)){
            for(let i=0; i<stockList.length; i++){
                //시가 알림
                 if(hh===9 && mi===0 && ss===10 && stockList[i].nov==='Y'){
                     obj.id = today.toString();
                     obj.stockName = stockList[i].nm;
                     obj.type = 'nov';
                     obj.price = stockList[i].nv;
                     createNoti(obj);
                 }
                 //종가 알림
                 if(hh===15 && mi===30 && ss===0 && stockList[i].ncv==='Y'){
                     obj.id = today.toString();
                     obj.stockName = stockList[i].nm;
                     obj.type = 'ncv';
                     obj.price = stockList[i].nv;
                     createNoti(obj);
                 }
                 console.log(stockList[i].ntv.length + '배열 길이');
                 //목표가 알림
                 for(let j=0; j<stockList[i].ntv.length; j++){
                     if(stockList[i].ntv[j].en ==='Y'){
                         if(stockList[i].ntv[j].vt === '1' && stockList[i].nv === stockList[i].ntv[j].tv){
                             obj.id = today.toString();
                             obj.stockName = stockList[i].nm;
                             obj.type = 'ntv1';
                             obj.price = stockList[i].nv;
                             console.log(obj.price);
                             console.log(sessionStorage.getItem(obj.stockName));
                             if(obj.price != sessionStorage.getItem(obj.stockName)){
                                 createNoti(obj);
                             }
                             sessionStorage.setItem(obj.stockName,obj.price);
                         }
                         else if(stockList[i].ntv[j].vt === '2' && stockList[i].nv === stockList[i].ntv[j].tv){
                             obj.id = today.toString();
                             obj.stockName = stockList[i].nm;
                             obj.type = 'ntv2';
                             obj.price = stockList[i].nv;
                             console.log(obj.price);
                             console.log(sessionStorage.getItem(obj.stockName));
                             if(obj.price != sessionStorage.getItem(obj.stockName)){
                                 createNoti(obj);
                             }
                             sessionStorage.setItem(obj.stockName,obj.price);
                         }
                     }
                     obj={};
                 }
                 obj={};
            }
        }

        if(hh===14 && mi===30 && ss===0){
            obj.type = 'marketEnd1h';
            createNoti(obj);
        } else if(hh===15 && mi===0 && ss===0){
            obj.type = 'marketEnd30m';
            createNoti(obj);
        } else if(hh===13 && mi===30 && ss===0){
            obj.type = 'marketEnd2h';
            createNoti(obj);
        } else if(hh===9 && mi===0 && ss===0){
            obj.type = 'marketStart';
            createNoti(obj);
        }
    }, 1000);
}

StartClock();

//테스트용
// let obj1={
//     id:'',
//     stockName:'',
//     type:'',
//     price:''
// };
// obj1.id = '벨렐';
// obj1.stockName = '병학전자';
// obj1.type = 'nov';
// obj1.price = 3000000;
// createNoti(obj1);

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
            // console.log(xmlHttp.responseText);
            callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}


whale.runtime.onMessage.addListener((msg, sender, sendResponse)=>{
    var ws = whale.sidebarAction;
    if(typeof msg === 'string'){
        switch (msg) {
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