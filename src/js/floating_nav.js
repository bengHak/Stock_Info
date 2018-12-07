// console.log(window.innerWidth);
let sidebarOpened = false;

const port = whale.runtime.connect({name: `greetings`});

port.onMessage.addListener(message => {
    console.log(message.sidebar);
    appendBtn();
});

document.addEventListener(`visibilitychange`, function () {
    if (document.visibilityState === `visible`) {
        // 사이드바가 열렸을 때
        sidebarOpened = true;
        console.log(sidebarOpened);
    } else {
        // 사이드바가 닫혔을 때
        sidebarOpened = false;
        console.log(sidebarOpened);
        whale.runtime.sendMessage('closed');
    }
});

//window.innerWidth < 590
function appendBtn(){
    var last_known_scroll_position = 0;
    var ticking = false;

    var topNav = {
        'd0': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c050b5b1e9bd17d49642548/b8a43bf52a9b31281e6b6eaeb986fb1f/tnd1.png',
        'd1': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c050b5b1e9bd17d49642548/64ce9c61eb3fedde3935b93b44cf142e/tnd2.png',
        'd2': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c050b5b1e9bd17d49642548/3503d1993dd32daf3ebdc21affeba3e5/tnd3.png',
        'd3': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c050b5b1e9bd17d49642548/8af00676c736af05af20cf5bfb7fbe73/tnd4.png',
        'd4': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c050b5b1e9bd17d49642548/ea8880b02eaff4dbdbca2799b36f17b1/tnd5.png',
        'h0': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c051989163ada58556fc4d0/a17f1a2269a6c995a2436da18d952acf/tnh1.png',
        'h1': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c051989163ada58556fc4d0/cf15a0cbddb1112a0ee23e2fe7cfd124/tnh2.png',
        'h2': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c051989163ada58556fc4d0/77b5938ee770564e442e53f927af7745/tnh3.png',
        'h3': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c051989163ada58556fc4d0/04ffb34345fa52367454274e0bdf09ff/tnh4.png',
        'h4': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c051989163ada58556fc4d0/05745dca15961c54f8ec9eeedc8edbab/tnh5.png',
        'c0': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c0249ecd9ed955561de79b2/e04c17a9ecc2e8f1b9da6a235f8adbe8/tnc1.png',
        'c1': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c0249ecd9ed955561de79b2/5feb53c1ba801286e28ca8464c255ebc/tnc2.png',
        'c2': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c0249ecd9ed955561de79b2/7b076c5131dcab524cd257349402bf2f/tnc3.png',
        'c3': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c0249ecd9ed955561de79b2/5085ae4d2cae9092f421f31e3462f556/tnc4.png',
        'c4': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c0249ecd9ed955561de79b2/d552f0b5659d0bc653b7e26b11892558/tnc5.png'
    };

    //착시현상 찾았따 신난다~~!!!
    var fltBtn = {
        "bd0":"https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c07c6b29831bb5cf83e26ce/6de38f316559de9483a5a469897cf39d/floatingBtn0.png",
        // "bc0":"https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c07c6b29831bb5cf83e26ce/da26ddeb4a5a3d52f5ec4893ad334c21/floatingBtn0-1.png",
        // 'bc0':'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c07c6b29831bb5cf83e26ce/3db060853126ca9e5a0fcde0b860eb43/floatingBtn0-2.png',
        'bc0':'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c07c6b29831bb5cf83e26ce/351219cf15bdb25c3974a0dddd09ddb9/floatingBtn0-3.png',
        'b1':'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c07c6b29831bb5cf83e26ce/1a5a590c88effa5bb4ef0542c058d5f1/floatingBtn1.png',
        'b2':'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c07c6b29831bb5cf83e26ce/2aabd074df503acc1d753bf644485695/floatingBtn3.png'
    };

    var navBar = document.createElement('div');
    navBar.setAttribute("id", "stock_info_nav");
//navBar 스타일
    navBar.style.position = "fixed";
    navBar.style.top = 0;
    navBar.style.right = 0;
    navBar.style.left = 0;
    navBar.style.backgroundColor = '#081245';
    navBar.style.zIndex = 20000;
    navBar.style.display = 'block';
    navBar.style.padding = '6px 6px 2px 6px';
    navBar.style.textAlign = 'center';

    var tn0 = document.createElement('img');
    tn0.setAttribute('id','tn0');
    tn0.setAttribute('width', '40px');
    //tn0.setAttribute('onclick', 'javascript: hello();');
    tn0.onclick = ()=>{
        console.log('onclick');
        location.href = "https://m.stock.naver.com";
    };
    tn0.style.margin = '0 15px 0 15px';

    var tn1 = document.createElement('img');
    tn1.setAttribute('id','tn1');
    // tn1.setAttribute('src', topNav['d1']);
    tn1.setAttribute('width', '40px');
    tn1.onclick = ()=>{
        location.href = "https://kr.tradingview.com/";
        sessionStorage.setItem("clicked", 1);
    };
    tn1.style.margin = '0 15px 0 15px';

    var tn2 = document.createElement('img');
    tn2.setAttribute('id','tn2');
    // tn2.setAttribute('src', topNav['d2']);
    tn2.setAttribute('width', '40px');
    tn2.setAttribute('onclick', 'javascript:location.href="https://news.naver.com/main/main.nhn?mode=LSD&mid=shm&sid1=101"');
    tn2.style.margin = '0 15px 0 15px';

    var tn3 = document.createElement('img');
    tn3.setAttribute('id','tn3');
    // tn3.setAttribute('src', topNav['d3']);
    tn3.setAttribute('width', '40px');
    tn3.style.margin = '0 15px 0 15px';
    tn3.onclick = ()=>{
        document.getElementById('modalWin').style.display = 'block';
    };

    var tn4 = document.createElement('img');
    tn4.setAttribute('id','tn4');
    // tn4.setAttribute('src', topNav['d4']);
    tn4.setAttribute('width', '40px');
    tn4.onclick=()=>{
        if(window.location.host != 'm.stock.naver.com'){
            location.href = "https://m.stock.naver.com/#";
        }
        else{
            document.getElementsByClassName("Ntool_button _btn_my")[0].click();
        }
    };
    tn4.style.margin = '0 15px 0 15px';

    window.onload = () => {
        if (window.location.href == "https://m.stock.naver.com/#") {
            console.log("onloaded");
            setTimeout(()=>{
                document.getElementsByClassName("Ntool_button _btn_my")[0].click();
            }, 500);
        }
    };

    switch (window.location.host) {
        case 'm.stock.naver.com':{
            tn0.setAttribute('src', topNav['c0']);
            tn1.setAttribute('src', topNav['d1']);
            tn2.setAttribute('src', topNav['d2']);
            tn3.setAttribute('src', topNav['d3']);
            tn4.setAttribute('src', topNav['d4']);
            break;
        }
        case 'kr.tradingview.com':{
            tn0.setAttribute('src', topNav['d0']);
            tn1.setAttribute('src', topNav['c1']);
            tn2.setAttribute('src', topNav['d2']);
            tn3.setAttribute('src', topNav['d3']);
            tn4.setAttribute('src', topNav['d4']);
            break;
        }
        case 'm.news.naver.com':{
            tn0.setAttribute('src', topNav['d0']);
            tn1.setAttribute('src', topNav['d1']);
            tn2.setAttribute('src', topNav['c2']);
            tn3.setAttribute('src', topNav['d3']);
            tn4.setAttribute('src', topNav['d4']);
            break;
        }
        case 'daum.net':{
            tn0.setAttribute('src', topNav['d0']);
            tn1.setAttribute('src', topNav['d1']);
            tn2.setAttribute('src', topNav['d2']);
            tn3.setAttribute('src', topNav['c3']);
            tn4.setAttribute('src', topNav['d4']);
            break;
        }
        default:{
            tn0.setAttribute('src', topNav['d0']);
            tn1.setAttribute('src', topNav['d1']);
            tn2.setAttribute('src', topNav['d2']);
            tn3.setAttribute('src', topNav['d3']);
            tn4.setAttribute('src', topNav['d4']);
        }
    }

//Floating Button 0~2
    var floatBtn = document.createElement('div');
    floatBtn.setAttribute("id", "floating-button-0");
    floatBtn.style.cssText = 'position:fixed;\n' +
        '\twidth:45px;\n' +
        '\theight:45px;\n' +
        '\tbottom:10px;\n' +
        '\tright:10px;\n' +
        '\tcolor:#FFF;\n' +
        '\tborder-radius:50%;\n' +
        '\ttext-align:center;\n' +
        'z-index:5000;';
    //'\tbox-shadow: 2px 2px 3px #999;'
    var fltImg0 = document.createElement('img');
    fltImg0.setAttribute('id','fltBtn0');
    fltImg0.setAttribute('src', fltBtn.bd0);
    fltImg0.setAttribute('width', '45px');
    fltImg0.setAttribute('height', '45px');

    var floatBtn1 = document.createElement('div');
    floatBtn1.setAttribute("id", "floating-button-1");
    floatBtn1.style.cssText =
        'position:fixed;\n' +
        '\twidth:45px;\n' +
        '\theight:45px;\n' +
        '\tbottom:65px;\n' +
        '\tright:10px;\n' +
        '\tcolor:#FFF;\n' +
        '\tborder-radius:50%;\n' +
        '\ttext-align:center;\n' +
        '\tbox-shadow: 2px 2px 3px #999;' +
        'z-index:5000;' +
        'display:none;'+
        'opacity:0;transition:opacity 0.4s';
    var fltImg1 = document.createElement('img');
    fltImg1.setAttribute('id', 'fltBtn1');
    fltImg1.setAttribute('src', fltBtn.b1);
    fltImg1.setAttribute('width', '45px');
    fltImg1.setAttribute('height', '45px');
    fltImg1.onclick = () => {
        whale.runtime.sendMessage('showNaverFinance');
    };

    var floatBtn2 = document.createElement('div');
    floatBtn2.setAttribute("id", "floating-button-2");
    floatBtn2.style.cssText =
        'position:fixed;\n' +
        '\twidth:45px;\n' +
        '\theight:45px;\n' +
        '\tbottom:120px;\n' +
        '\tright:10px;\n' +
        '\tcolor:#FFF;\n' +
        '\tborder-radius:50%;\n' +
        '\ttext-align:center;\n' +
        '\tbox-shadow: 2px 2px 3px #999;' +
        'z-index:5000;' +
        'display:none;'+
        'opacity:0;transition:opacity 0.4s';
    var fltImg2 = document.createElement('img');
    fltImg2.setAttribute('id', 'fltBtn2');
    fltImg2.setAttribute('src', fltBtn.b2);
    fltImg2.setAttribute('width', '45px');
    fltImg2.setAttribute('height', '45px');
    fltImg2.onclick = ()=>{
        whale.runtime.sendMessage('showTV');
    };

    if(location.host != 'm.news.naver.com'){
        document.body.style.marginTop = '60px';
    }

    document.body.appendChild(navBar);
    document.body.appendChild(floatBtn);
    document.body.appendChild(floatBtn1);
    document.body.appendChild(floatBtn2);
    document.getElementById('stock_info_nav').appendChild(tn0);
    document.getElementById('stock_info_nav').appendChild(tn1);
    document.getElementById('stock_info_nav').appendChild(tn2);
    document.getElementById('stock_info_nav').appendChild(tn3);
    document.getElementById('stock_info_nav').appendChild(tn4);
    document.getElementById('floating-button-0').appendChild(fltImg0);
    document.getElementById('floating-button-1').appendChild(fltImg1);
    document.getElementById('floating-button-2').appendChild(fltImg2);

    //네이버 주식
    tn0.addEventListener('mouseover', () => {
        console.log(window.location.pathname);
        localStorage.setItem("before", document.getElementById('tn0').src);
        document.getElementById('tn0').src = topNav['h0'];
    });
    tn0.addEventListener('mouseout', () => {
        console.log(window.location.host);
        document.getElementById('tn0').src = localStorage.getItem('before');
    });

    //트레이딩뷰
    tn1.addEventListener('mouseover', () => {
        localStorage.setItem("before", document.getElementById('tn1').src);
        document.getElementById('tn1').src = topNav['h1'];
    });
    tn1.addEventListener('mouseout', () => {
        document.getElementById('tn1').src = localStorage.getItem('before');
    });

    //네이버 경제 뉴스
    tn2.addEventListener('mouseover', () => {
        localStorage.setItem("before", document.getElementById('tn2').src);
        document.getElementById('tn2').src = topNav['h2'];
    });
    tn2.addEventListener('mouseout', () => {
        document.getElementById('tn2').src = localStorage.getItem('before');
    });

    //즐겨찾기
    tn3.addEventListener('mouseover', () => {
        localStorage.setItem("before", document.getElementById('tn3').src);
        document.getElementById('tn3').src = topNav['h3'];
    });
    tn3.addEventListener('mouseout', () => {
        document.getElementById('tn3').src = localStorage.getItem('before');
    });

    //관심종목
    tn4.addEventListener('mouseover', () => {
        localStorage.setItem("before", document.getElementById('tn4').src);
        document.getElementById('tn4').src = topNav['h4'];
    });
    tn4.addEventListener('mouseout', () => {
        document.getElementById('tn4').src = localStorage.getItem('before');
    });

    //Floating Button 클릭 처리
    var isOpened = false;
    floatBtn.addEventListener('click', () => {
        if(isOpened){
            document.getElementById('fltBtn0').src = fltBtn.bd0;
            document.getElementById('floating-button-1').style.opacity = 0;
            document.getElementById('floating-button-2').style.opacity = 0;
            setTimeout(()=>{
                document.getElementById('floating-button-1').style.display = 'none';
                document.getElementById('floating-button-2').style.display = 'none';
            }, 300);
            isOpened = false;
        }
        else{
            document.getElementById('fltBtn0').src = fltBtn.bc0;
            document.getElementById('floating-button-1').style.display = 'block';
            document.getElementById('floating-button-2').style.display = 'block';
            setTimeout(()=>{
                document.getElementById('floating-button-1').style.opacity = 1;
                document.getElementById('floating-button-2').style.opacity = 1;
            },300);

            isOpened = true;
        }
    });

    if (document.title.indexOf('네이버 증권') != -1) {
        document.body.removeChild(document.getElementsByClassName("btn_top _btn_floating_top")[0]);
    }
}