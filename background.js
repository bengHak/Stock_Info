whale.runtime.onMessage.addListener((msg, sender, sendResponse)=>{
    var ws = whale.sidebarAction;
    switch (msg) {
        case 'showNaverFinance':{
            whale.tabs.create({
                url:'https:/finance.naver.com'
            });
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
        case 'badge4': {
            ws.setBadgeText({
                text: `4`
            });
            setTimeout(()=>{
                ws.setTitle({title: "변경 후2"});
            }, 2000);
            ws.setTitle({title: "변경 후"});
            break;
        }
        case 'hide':{
            ws.hide();
            break;
        }
        case 'docking':{
            //ws.dock(sender.tab.windowId);
            sendResponse(sender);
        }
    }
});

//
// var title = whale.sidebarAction.getTitle();
// console.log(title);
// console.log("hello~");
// title.then((text)=>{
//     console.log(text);
// });