// console.log(window.innerWidth);
if(window.innerWidth < 590) {

    var last_known_scroll_position = 0;
    var ticking = false;

    var topNav = {
        'd0': "https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c024a006d535e6b4df3b54d/bd1c858b3be4f81cfc9057860054845d/tnd1.png",
        'd1': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c024a006d535e6b4df3b54d/197fe28ef2e0b8013a2ceb85e406cd88/tnd2.png',
        'd2': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c024a006d535e6b4df3b54d/56f0f4c72765c3228ea77019fbff8b4a/tnd3.png',
        'd3': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c024a006d535e6b4df3b54d/b338d81d39f70bd56f3c083f11561b23/tnd4.png',
        'd4': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c024a006d535e6b4df3b54d/9522064c3e0a6de0afb9390508e93ec2/tnd5.png',
        'h0': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c0249f31e19688fcf22284e/3b46a9ade36769e83b59472e94300717/tnh1.png',
        'h1': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c0249f31e19688fcf22284e/9c9ba0439c0fa39396f70c4e663ae0e7/tnh2.png',
        'h2': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c0249f31e19688fcf22284e/fb5b27e8969d49a0429c3cbd592c9fa1/tnh3.png',
        'h3': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c0249f31e19688fcf22284e/a782f06b3d9453a73c9d49352a975df1/tnh4.png',
        'h4': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c0249f31e19688fcf22284e/f70948640a6f6d408b9bec378f41413e/tnh5.png',
        'c0': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c0249ecd9ed955561de79b2/e04c17a9ecc2e8f1b9da6a235f8adbe8/tnc1.png',
        'c1': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c0249ecd9ed955561de79b2/5feb53c1ba801286e28ca8464c255ebc/tnc2.png',
        'c2': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c0249ecd9ed955561de79b2/7b076c5131dcab524cd257349402bf2f/tnc3.png',
        'c3': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c0249ecd9ed955561de79b2/5085ae4d2cae9092f421f31e3462f556/tnc4.png',
        'c4': 'https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c0249ecd9ed955561de79b2/d552f0b5659d0bc653b7e26b11892558/tnc5.png'
    };

    var navBar = document.createElement('div');
    navBar.setAttribute("id", "stock_info_nav");
//navBar 스타일
    navBar.style.position = "fixed";
    navBar.style.top = 0;
    navBar.style.right = 0;
    navBar.style.left = 0;
    navBar.style.backgroundColor = '#e5e5e5';
    navBar.style.zIndex = 5000;
    navBar.style.display = 'block';
    navBar.style.padding = '6px 6px 2px 6px';
    navBar.style.textAlign = 'center';

    console.log(sessionStorage.getItem('clicked'));

    var tn0 = document.createElement('img');
    tn0.setAttribute('id','tn0');
    tn0.setAttribute('width', '40px');
    //tn0.setAttribute('onclick', 'javascript: hello();');
    tn0.onclick = ()=>{
        console.log('onclick');
        location.href = "https://m.stock.naver.com";
    };
    tn0.style.margin = '0 10px 0 10px';

    var tn1 = document.createElement('img');
    tn1.setAttribute('id','tn1');
    // tn1.setAttribute('src', topNav['d1']);
    tn1.setAttribute('width', '40px');
    tn1.onclick = ()=>{
        location.href = "https://kr.tradingview.com/";
        sessionStorage.setItem("clicked", 1);
    };
    tn1.style.margin = '0 10px 0 10px';

    var tn2 = document.createElement('img');
    tn2.setAttribute('id','tn2');
    // tn2.setAttribute('src', topNav['d2']);
    tn2.setAttribute('width', '40px');
    tn2.setAttribute('onclick', 'javascript:location.href="https://news.naver.com/main/main.nhn?mode=LSD&mid=shm&sid1=101"');
    tn2.style.margin = '0 10px 0 10px';

    var tn3 = document.createElement('img');
    tn3.setAttribute('id','tn3');
    // tn3.setAttribute('src', topNav['d3']);
    tn3.setAttribute('width', '40px');
    tn3.setAttribute('onclick', 'javascript:location.href="https://m.stock.naver.com"');
    tn3.style.margin = '0 10px 0 10px';

    var tn4 = document.createElement('img');
    tn4.setAttribute('id','tn4');
    // tn4.setAttribute('src', topNav['d4']);
    tn4.setAttribute('width', '40px');
    tn4.onclick=()=>{
        localStorage.setItem('mypage',1);
        location.href = "https://m.stock.naver.com/#";
        // console.log("onclick tn4");
        // document.getElementsByClassName("Ntool_button _btn_my")[0].click();
        // setTimeout(()=>{
        //     document.getElementsByClassName("Ntool_button _btn_my")[0].click();
        //     console.log("onclick tn4");
        //     console.log(document.getElementsByClassName("Ntool_button _btn_my")[0]);
        // },1000);
    };
    tn4.style.margin = '0 10px 0 10px';

    window.onload = ()=>{
        if(location.href == "https://m.stock.naver.com/#"){
            console.log("onloaded");
            var mypage = localStorage.getItem('mypage');
            console.log(mypage);
            if(mypage == 1){
                document.getElementsByClassName("Ntool_button _btn_my")[0].click();
                // setTimeout(()=>{
                //     document.getElementsByClassName("Ntool_button _btn_my")[0].click();
                // },1000);
                console.log("must be clicked");
                localStorage.setItem('mypage', 0);
            }
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
        case 'm.stock.naver.com':{
            tn0.setAttribute('src', topNav['d0']);
            tn1.setAttribute('src', topNav['d1']);
            tn2.setAttribute('src', topNav['d2']);
            tn3.setAttribute('src', topNav['c3']);
            tn4.setAttribute('src', topNav['d4']);
            break;
        }
        case 'm.stock.naver.com':{
            tn0.setAttribute('src', topNav['d0']);
            tn1.setAttribute('src', topNav['c1']);
            tn2.setAttribute('src', topNav['d2']);
            tn3.setAttribute('src', topNav['d3']);
            tn4.setAttribute('src', topNav['d4']);
            break;
        }
    }

//Floating Button 0~2
    var floatBtn = document.createElement('div');
    floatBtn.setAttribute("id", "floating-button-0");
    floatBtn.style.cssText = 'position:fixed;\n' +
        '\twidth:60px;\n' +
        '\theight:60px;\n' +
        '\tbottom:10px;\n' +
        '\tright:5px;\n' +
        //'\tbackground-color:#0C9;\n' +
        '\tcolor:#FFF;\n' +
        '\tborder-radius:50px;\n' +
        '\ttext-align:center;\n' +
        'z-index:5000;';
    //'\tbox-shadow: 2px 2px 3px #999;'
    var floatBtnImgSrc = "https://trello-attachments.s3.amazonaws.com/5bf679a4a458e1518702c7a6/5c0258b29901902416b02492/6ca650313b59736591f7ec0d613b4d46/floatingBtn0.png";
    var floatBtnImg = document.createElement('img');
    floatBtnImg.setAttribute('src', floatBtnImgSrc);
    floatBtnImg.setAttribute('width', '60px');
//floatBtnImg.style.opacity = 1;

    var floatBtn1 = document.createElement('div');
    floatBtn1.setAttribute("id", "floating-button-1");
    floatBtn1.style.cssText =
        'position:fixed;\n' +
        '\twidth:60px;\n' +
        '\theight:60px;\n' +
        '\tbottom:80px;\n' +
        '\tright:5px;\n' +
        '\tbackground-color:#0C9;\n' +
        '\tcolor:#FFF;\n' +
        '\tborder-radius:50px;\n' +
        '\ttext-align:center;\n' +
        '\tbox-shadow: 2px 2px 3px #999;' +
        'z-index:5000;' +
        'opacity:0;transition:opacity 0.4s';

    var floatBtn2 = document.createElement('div');
    floatBtn2.setAttribute("id", "floating-button-2");
    floatBtn2.style.cssText =
        'position:fixed;\n' +
        '\twidth:60px;\n' +
        '\theight:60px;\n' +
        '\tbottom:150px;\n' +
        '\tright:5px;\n' +
        '\tbackground-color:#0C9;\n' +
        '\tcolor:#FFF;\n' +
        '\tborder-radius:50px;\n' +
        '\ttext-align:center;\n' +
        '\tbox-shadow: 2px 2px 3px #999;' +
        'z-index:5000;' +
        'opacity:0;transition:opacity 0.4s';

    document.body.style.marginTop = '60px';
    document.body.appendChild(navBar);
    document.body.appendChild(floatBtn);
    document.body.appendChild(floatBtn1);
    document.body.appendChild(floatBtn2);
    document.getElementById('stock_info_nav').appendChild(tn0);
    document.getElementById('stock_info_nav').appendChild(tn1);
    document.getElementById('stock_info_nav').appendChild(tn2);
    document.getElementById('stock_info_nav').appendChild(tn3);
    document.getElementById('stock_info_nav').appendChild(tn4);
    document.getElementById('floating-button-0').appendChild(floatBtnImg);

    //네이버 주식
    tn0.addEventListener('mouseover', () => {
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

    var isOpened = false;
    floatBtn.addEventListener('click', () => {
        if(isOpened){
            document.getElementById('floating-button-1').style.opacity = 0;
            document.getElementById('floating-button-2').style.opacity = 0;
            isOpened = false;
        }
        else{
            document.getElementById('floating-button-1').style.opacity = 1;
            document.getElementById('floating-button-2').style.opacity = 1;
            isOpened = true;
        }
        whale.runtime.sendMessage('badge4');
    });

    if (document.title.indexOf('네이버 증권') != -1) {
        document.body.removeChild(document.getElementsByClassName("btn_top _btn_floating_top")[0]);
    }
}