/*雪花*/


//wp-snow-effect-public.js

(function ($) {
    'use strict';

    $(window).load(function () {

        if(!snoweffect.show) return;
        jQuery().jSnow({
            followScroll: true,
            flakes: snoweffect.flakes_num,
            fallingSpeedMin: parseInt(snoweffect.falling_speed_min),
            fallingSpeedMax:  parseInt(snoweffect.falling_speed_max),
            flakeMaxSize:  parseInt(snoweffect.flake_max_size),
            flakeMinSize: parseInt(snoweffect.flake_min_size),
            flakeColor: [ snoweffect.flake_color ],
            vSize: snoweffect.vertical_size,
            fadeAway: snoweffect.fade_away,
            zIndex: snoweffect.flake_zindex,
            flakeCode: ["&" + snoweffect.flake_type + ";"]
        });
    });

})(jQuery);


//jsnow.js

(function ($) {
    $.fn.jSnow = function (h) {
        var j = $.extend({}, $.fn.jSnow.defaults, h);
        var k, WIN_HEIGHT;
        var l = j.flakes;
        var m = j.flakeCode;
        var n = j.flakeColor;
        var o = j.flakeMinSize;
        var p = j.flakeMaxSize;
        var q = j.fallingSpeedMin;
        var r = j.fallingSpeedMax;
        var s = j.interval;
        var t = j.zIndex;
        var vs = j.vSize;
        var fa = j.fadeAway;
        var fs = j.followScroll;
        setWaH();
        var useGif = false;
        //if ($.browser.msie && (parseFloat($.browser.version) < 8))useGif = true;
        if ($('body').is('.lt-ie8 *')) {
            useGif = true;
        }
        //if ($.browser.msie && (parseFloat($.browser.version) < 8) && t == "auto")t = 0;
        if ($('body').is('.lt-ie8 *') && t == "auto")t = 0;

        var u = $("<div \/>");
        u.css({
            width: k + "px",
            height: 1,
            display: "block",
            overflow: "visible",
            position: "fixed",
            left: "1px",
            zIndex: t
        });
        if (fs) {
            u.css('top', $("html").scrollTop() + 1 + "px");
        } else {
            u.css = '1px';
        }
        $("body").prepend(u).css({height: "100%"});
        $("html").css({"overflow-y": "scroll", "overflow-x": "hidden"});
        var v = Array();
        generateFlake(l, false);
        setInterval(animateFlakes, s);
        window.onresize = setWaH;
        function setWaH() {
            k = $('body').width();
            var def_h = window.innerHeight || document.documentElement.clientHeight;
            def_h -= 50;
            if (!vs || vs > def_h ) {
                WIN_HEIGHT = window.innerHeight || document.documentElement.clientHeight
                WIN_HEIGHT -= 50;
            } else WIN_HEIGHT = vs;
        };
        if (fs) {
            window.onscroll = function () {
                u.css({top: $("html").scrollTop() + "px"})
            };
        }
        function generateFlake(a, b) {
            a = a || 1;
            b = b || false;
            var i = 0;
            for (i = 0; i < a; i++) {
                var c = $("<span \/>");
                var d = o + Math.floor(Math.random() * p);
                var e = m[Math.floor(Math.random() * m.length)];
                if (e.indexOf(".gif") != -1 || e.indexOf(".png") != -1) {
                    var f = new Image();
                    if (useGif)e = e.replace("png", "gif");
                    f.src = e;
                    e = "<img src='" + e + "' alt='jSnowFlake'>"
                }
                c.html(e).css({
                    color: n[Math.floor(Math.random() * n.length)],
                    fontSize: d + "px",
                    display: "block",
                    position: "fixed",
                    cursor: "default",
                    "pointer-events": "none",
                    "z-index": t
                });
                $(u).append(c);
                f_left = Math.floor(Math.random() * (k - c.width() - 50)) + 25;
                f_top = (b) ? -1 * c.height() : Math.floor(Math.random() * (WIN_HEIGHT - 50));
                var g = Math.floor(Math.random() * 90);
                jQuery.data(c, "posData", {
                    top: f_top,
                    left: f_left,
                    rad: Math.random() * 50,
                    i: Math.ceil(q + Math.random() * (r - q)),
                    swingRange: g
                });
                c.css({top: f_top + "px", left: f_left + "px"});
                v.push(c)
            }
        };
        function animateFlakes() {
            var i = 0;
            for (i = v.length - 1; i >= 0; i--) {
                var f = v[i];
                var a = jQuery.data(f, "posData");
                a.top += a.i;
                var b = Number();
                b = Math.cos((a.rad / 180) * Math.PI);
                a.rad += 2;
                var X = a.left - b * a.swingRange;
                if (fa) {
                    op = (WIN_HEIGHT - a.top < 100) ? ((WIN_HEIGHT - a.top) / 100) : 1;
                    f.css('opacity', op);
                }
                f.css({top: a.top + "px", left: X + "px"});
                if (a.top > WIN_HEIGHT) {
                    jQuery.removeData(f);
                    f.remove();
                    v.splice(i, 1);
                    generateFlake(1, true)
                }
            }
        };
        return this
    };
    $.fn.jSnow.defaults = {
        flakes: 30,
        fallingSpeedMin: 1,
        fallingSpeedMax: 3,
        flakeMaxSize: 20,
        flakeMinSize: 10,
        flakeCode: ["&bull;"],
        flakeColor: ["#fff"],
        zIndex: "auto",
        interval: 50,
        fadeAway: true,
    }
})(jQuery);





/*模板*/



//functions
(function(){
    'use strict';
    var shareMenu = function(){
        $(document).on('click','.Share',function(){
            $('.share-wrap').fadeToggle('slow');
        });
    }
    var sidebaraffix = function(){
        if($('#sidebar').height()&&xb.site_sh){
            if($('#main').height()>$('#sidebar').height()){
                var footerHeight = 0;
                if($('#page-footer').length>0){
                    footerHeight = $('#page-footer').outerHeight(true);
                }
                $('#sidebar').affix({
                    offset:{
                        top:$('#sidebar').offset().top-xb.site_sh,
                        bottom:$('#footer').outerHeight(true)+footerHeight+6
                    }
                });
            }
        }
    }
    var toSearch = function(){
        $('.search-box').on('click',function(e){
            $('#searchform').animate({width:'200px'},200),
            $('#searchform input').css('display','block');
            $(document).one('click', function(){
                $('#searchform').animate({width:'0'},100),
                $('#searchform input').hide();
            });
            e.stopPropagation();
        });
        $('#searchform').on('click',function(e){e.stopPropagation();})
    }
    var showlove = function(){
        $.fn.postLike = function(){
            if($(this).hasClass('done')){
                layer.msg('您已经支持过了',function(){});
                return false;
            }else{
                $(this).addClass('done');
                layer.msg('感谢您的支持');
                var id = $(this).data('id'),
                    action = $(this).data('action'),
                    rateHolder = $(this).children('.count');
                var ajax_data = {
                    action:'love',
                    um_id:id,
                    um_action:action
                };
                $.post(xb.ajax_url,ajax_data,function(data){
                    $(rateHolder).html(data);
                });
                return false;
            }
        };
        $(document).on('click','.Love',function(){$(this).postLike();});
    }
    var gotop = function(){
        $('.gotop-box').on('click',function(event){
            event.preventDefault();
            $('html, body').animate({
                scrollTop:$('html').offset().top
            },500);
            return false;
        });
        $(window).scroll(function(){
            var $win = $(window);
            if ($win.scrollTop()>200){
                $('.gotop-box').addClass('active');
            }else{
                $('.gotop-box').removeClass('active');
            }
        });
    }
    var wechatpic = function(){
        $('#wechat-img').mouseout(function(){
            $('#wechat-pic')[0].style.display = 'none';
        })
        $('#wechat-img').mouseover(function(){
            $('#wechat-pic')[0].style.display = 'block';
        })
    }
    var showPhotos = function(){
        layer.photos({
          photos:'.kratos-post-content p,.kratos-status-post p',
          anim: 0
        });
    }
    var offcanvas = function(){
        var $clone = $('#kratos-menu-wrap').clone();
        $clone.attr({
            'id':'offcanvas-menu'
        });
        $clone.find('> ul').attr({
            'class':'ul-me',
            'id':''
        });
        $('#kratos-page').prepend($clone);
        $('.js-kratos-nav-toggle').on('click',function(){
            if($('.nav-toggle').hasClass('toon')){
                $('.nav-toggle').removeClass('toon');
                $('#offcanvas-menu').css('right','-240px');
            }else{
                $('.nav-toggle').addClass('toon');
                $('#offcanvas-menu').css('right','0px');
            }
        });
        $('#offcanvas-menu a').on('click',function(){
            $('.nav-toggle').removeClass('toon');
            $('#offcanvas-menu').css('right','-240px');
        });
        $('#offcanvas-menu').css('height',$(window).height());
        $('#offcanvas-menu').css('right','-240px');
        $(window).resize(function(){
            var w = $(window);
            $('#offcanvas-menu').css('height',w.height());
            if(w.width()>769){
                if($('.nav-toggle').hasClass('toon')){
                    $('.nav-toggle').removeClass('toon');
                    $('#offcanvas-menu').css('right','-240px');
                }
            }
        });
    }
    var menu = function(){
        $(document).click(function(e){
            var container = $('#offcanvas-menu,.js-kratos-nav-toggle');
            if(!container.is(e.target)&&container.has(e.target).length===0){
                if($('.nav-toggle').hasClass('toon')){
                    $('.nav-toggle').removeClass('toon');
                    $('#offcanvas-menu').css('right','-240px');
                }
            }
        });
        $('#kratos-header-section:not(.color-banner) ul>li').hover(function(){
            $(this).children('ul').slideDown(150)
        },function(){$(this).children('ul').stop(true,false).slideUp(200)});
    }
    var xControl = function(){
        $(document).on('click','.xHeading',function(event){
            var $this = $(this);
            $this.closest('.xControl').find('.xContent').slideToggle(300);
            if ($this.closest('.xControl').hasClass('active')){
                $this.closest('.xControl').removeClass('active');
            }else{
                $this.closest('.xControl').addClass('active');
            }
            event.preventDefault();
        });
    }
    var donateConfig = function(){
        $(document).on('click','.Donate',function(){
            layer.open({
                type:1,
                area:['300px', '370px'],
                title:'打赏作者',
                resize:false,
                scrollbar:false,
                content:'<div class="donate-box"><div class="meta-pay text-center"><strong>扫一扫支付</strong></div><div class="qr-pay text-center"><img class="pay-img" id="alipay_qr" src="'+xb.alipay+'"><img class="pay-img d-none" id="wechat_qr" src="'+xb.wechat+'"></div><div class="choose-pay text-center mt-2"><input id="alipay" type="radio" name="pay-method" checked><label for="alipay" class="pay-button"><img src="'+xb.thome+'/static/images/alipay.png"></label><input id="wechatpay" type="radio" name="pay-method"><label for="wechatpay" class="pay-button"><img src="'+xb.thome+'/static/images/wechat.png"></label></div></div>'
            });
            $('.choose-pay input[type="radio"]').click(function(){
                var id= $(this).attr('id');
                if(id=='alipay'){$('.qr-pay #alipay_qr').removeClass('d-none');$('.qr-pay #wechat_qr').addClass('d-none')};
                if(id=='wechatpay'){$('.qr-pay #alipay_qr').addClass('d-none');$('.qr-pay #wechat_qr').removeClass('d-none')};
            });
        });
    }
    var OwOcfg = function(){
        if($('#commentform').height()){
            var OwO_demo = new OwO({
                logo:'OωO表情',
                container:document.getElementsByClassName('OwO')[0],
                target:document.getElementsByClassName('OwO')[0],
                api:xb.thome+'/inc/OwO.json',
                position:'down',
                width:'90%',
                maxHeight:'250px'
            });
        }
    }
    var APF = function(){
        var $this = $('#ap-footer');
        $.ajax({
            url:$this.attr('data-json'),
            success:function(e){
                var a = new APlayer({
                    element:document.getElementById('ap-footer'),
                    autoplay:$this.attr('data-autoplay'),
                    fixed:true,
                    loop:$this.attr('data-loop'),
                    order:$this.attr('data-order'),
                    listFolded:true,
                    showlrc:3,
                    theme:'#e6d0b2',
                    listmaxheight:'200px',
                    music:eval(e)
                });
                window.aplayers || (window.aplayers = []),
                window.aplayers.push(a)
            }
        })
    }
    var SnowF = function(){
        var requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){window.setTimeout(callback,1000/60);};
        window.requestAnimationFrame=requestAnimationFrame;
        var flakes=[],canvas=document.getElementById("Snow"),ctx=canvas.getContext("2d"),flakeCount=parseInt($('#Snow').attr('data-count')),mX=-100,mY=-100;
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;
        function snow(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            for(var i=0;i<flakeCount;i++){
                var flake=flakes[i],x=mX,y=mY,minDist=parseInt($('#Snow').attr('data-dist')),x2=flake.x,y2=flake.y;
                var dist=Math.sqrt((x2-x)*(x2-x)+(y2-y)*(y2-y)),dx=x2-x,dy=y2-y;
                if(dist<minDist){
                    var force=minDist/(dist*dist),xcomp=(x-x2)/dist,ycomp=(y-y2)/dist,deltaV=force/2;
                    flake.velX-=deltaV*xcomp;
                    flake.velY-=deltaV*ycomp;
                }else{
                    flake.velX*=0.98;
                    if(flake.velY<=flake.speed){flake.velY = flake.speed;}
                    flake.velX+=Math.cos(flake.step+=.05)*flake.stepSize;
                }
                ctx.fillStyle="rgba("+$('#Snow').attr('data-color')+","+flake.opacity+")";
                flake.y+=flake.velY;
                flake.x+=flake.velX;
                if(flake.y>=canvas.height||flake.y<=0){reset(flake);}
                if(flake.x>=canvas.width||flake.x<=0){reset(flake);}
                ctx.beginPath();
                ctx.arc(flake.x,flake.y,flake.size,0,Math.PI*2);
                ctx.fill();
            }
            requestAnimationFrame(snow);
        };
        function reset(flake){
            flake.x=Math.floor(Math.random()*canvas.width);
            flake.y=0;
            flake.size=(Math.random()*3)+parseInt($('#Snow').attr('data-size'));
            flake.speed=(Math.random()*1)+parseInt($('#Snow').attr('data-speed'));
            flake.velY=flake.speed;
            flake.velX=0;
            flake.opacity=(Math.random()*0.5)+parseInt($('#Snow').attr('data-opacity'));
        }
        function init(){
            for(var i=0;i<flakeCount;i++){
                var x=Math.floor(Math.random()*canvas.width),y=Math.floor(Math.random()*canvas.height),size=(Math.random()*3)+parseInt($('#Snow').attr('data-size')),speed=(Math.random()*1)+parseInt($('#Snow').attr('data-speed')),opacity=(Math.random()*0.5)+parseInt($('#Snow').attr('data-opacity'));
                flakes.push({speed:speed,velY:speed,velX:0,x:x,y:y,size:size,stepSize:(Math.random())/30*parseInt($('#Snow').attr('data-step')),step:0,angle:180,opacity:opacity});
            }
            snow();
        };
        document.addEventListener('mousemove',function(e){mX=e.clientX,mY=e.clientY});
        window.addEventListener('resize',function(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;});
        init();
    }
    //pjax reload
    $.fn.kratos_pjax_reload = function(){
        sidebaraffix();
        showPhotos();
        OwOcfg();
    }
    $(function(){
        gotop();
        sidebaraffix();
        offcanvas();
        menu();
        toSearch();
        xControl();
        showPhotos();
        donateConfig();
        showlove();
        shareMenu();
        OwOcfg();
        wechatpic();
        if($('div').hasClass('aplayer-footer')) APF();
        if($('div').hasClass('xb-snow')) SnowF();
    });
}());
//comment ajax
$('body').on('click','.comment-reply-link',function(){
    if($(this).attr('onclick')) return;
    addComment.moveForm($(this).attr('data-belowelement'),$(this).attr('data-commentid'),$(this).attr('data-respondelement'),$(this).attr('data-postid'));
    return false;
});
jQuery(document).ready(function(jQuery) {
    var __cancel = jQuery('#cancel-comment-reply-link'),
    __cancel_text = __cancel.text(),
    __list = 'comment-list';
    jQuery(document).on('submit','#commentform',function(){
        jQuery.ajax({
            url:xb.ajax_url,
            data:jQuery(this).serialize()+'&action=ajax_comment',
            type:jQuery(this).attr('method'),
            beforeSend:addComment.createButterbar('正在提交'),
            error:function(request){
                var t = addComment;
                t.createButterbar(request.responseText)
            },
            success:function(data){
                jQuery('textarea').each(function(){this.value = ''});
                var t = addComment,cancel = t.I('cancel-comment-reply-link'),temp = t.I('wp-temp-form-div'),respond = t.I(t.respondId),post = t.I('comment_post_ID').value,parent = t.I('comment_parent').value;
                if(parent!='0'){
                    jQuery('#respond').before('<ol class="children">'+data+'</ol>')
                }else if(!jQuery('.'+__list).length){
                    jQuery('#comments-nav').before('<ol class="'+__list+'">'+data+'</ol>')
                }else{
                    if(xb.order=='asc'){
                        jQuery('.'+__list).append(data)
                    }else{
                        jQuery('.'+__list).prepend(data)
                    }
                }
                t.createButterbar('评论成功，如果魔力值未增加说明达到上限');
                cancel.style.display = 'none';
                cancel.onclick = null;
                t.I('comment_parent').value = '0';
                if(temp&&respond){
                    temp.parentNode.insertBefore(respond,temp);
                    temp.parentNode.removeChild(temp)
                }
            }
        });
        return false
    });
    addComment = {
        moveForm:function(commId,parentId,respondId){
            var t = this,div,comm = t.I(commId),respond = t.I(respondId),cancel = t.I('cancel-comment-reply-link'),parent = t.I('comment_parent'),post = t.I('comment_post_ID');
            __cancel.text(__cancel_text);
            t.respondId = respondId;
            if(!t.I('wp-temp-form-div')){
                div = document.createElement('div');
                div.id = 'wp-temp-form-div';
                div.style.display = 'none';
                respond.parentNode.insertBefore(div,respond)
            }!comm?(temp = t.I('wp-temp-form-div'),t.I('comment_parent').value = '0',temp.parentNode.insertBefore(respond,temp),temp.parentNode.removeChild(temp)):comm.parentNode.insertBefore(respond,comm.nextSibling);
            jQuery('body').animate({
                scrollTop:jQuery('#respond').offset().top-180
            },400);
            parent.value = parentId;
            cancel.style.display = '';
            cancel.onclick = function(){
                var t = addComment,temp = t.I('wp-temp-form-div'),respond = t.I(t.respondId);
                t.I('comment_parent').value = '0';
                if(temp&&respond){
                    temp.parentNode.insertBefore(respond,temp);
                    temp.parentNode.removeChild(temp)
                }
                this.style.display = 'none';
                this.onclick = null;
                return false
            };
            try{t.I('comment').focus()}catch(e){}
            return false
        },
        I:function(e){
            return document.getElementById(e)
        },
        createButterbar:function(message){
            var t = this;
            layer.msg(message)
        }
    };

    // 用户信息弹窗
    let infoCss = {
        backgroundColor : "transparent",
        boxShadow : "none"
    }

    let userInfoE = $("aside.widget.widget_cp_pointswidget.clearfix").css(infoCss);
    let userInfoE_new = userInfoE.clone(true);

    let userInfoTopE = $("aside.widget.widget_cp_topuserswidget.clearfix").css(infoCss);
    let userInfoTopE_new = userInfoTopE.clone(true);

    let userInfoWarp = $("<div class='user-info-warp'></div>").append(userInfoE_new).append(userInfoTopE_new).css({
        // backgroundColor: "rgba(100, 178, 255, .9)",
        backgroundColor: "rgba(155, 205, 247, 0.7)",
        position: "absolute",
        top : "50%",
        left : "50%",
        transform : "translate(-50%, -50%)",
        // border: "1px solid skyblue",
        // width : 300,
        width : userInfoE.css("width"),
        height : "auto",
        borderRadius : 10,

    }).click(function (event) {
        event = event || window.event;
        event.stopPropagation();
        return false;
    });

    let contentUserInfoE = $("<div class='user-info-background'></div>").append(userInfoWarp).css({
        backgroundColor : "rgba(80, 80, 80, 0.8)",
        // opacity : 0.7,
        position: "fixed",
        top : 0,
        left : 0,
        width : "100%",
        height : "100%",
        zIndex : 99991,
        
    });
    contentUserInfoE.hide().click(() => {
        console.log("测试页码");
        contentUserInfoE.hide();
    });

    $(document.body).append(contentUserInfoE);

    let userInfoBtn = $("#userInfoBtn").css({
        position: "fixed",
        // top : 0,
        // left : 0,
        right : 20,
        bottom: 130,
        display: "table-cell",
        verticalAlign: "middle",
        backgroundColor : "#848484",
        visibility: "visible",
        opacity: .7,
        color: "#fff",
        width: 40,
        height: 40,
        fontSize: 18
    }).click(() => {
        console.log("测试页码");
        contentUserInfoE.show();
    });


});
//highlight
hljs.initHighlightingOnLoad();
//time
var now = new Date();
function createtime(){
    var grt = new Date(xb.ctime);
    now.setTime(now.getTime()+250);
    days = (now-grt)/1000/60/60/24;dnum = Math.floor(days);
    hours = (now-grt)/1000/60/60-(24*dnum);hnum = Math.floor(hours);
    if(String(hnum).length==1){hnum = '0'+hnum;}
    minutes = (now-grt)/1000/60-(24*60*dnum)-(60*hnum);mnum = Math.floor(minutes);
    if(String(mnum).length==1){mnum = '0'+mnum;}
    seconds = (now-grt)/1000-(24*60*60*dnum)-(60*60*hnum)-(60*mnum);snum = Math.round(seconds);
    if(String(snum).length==1){snum = '0'+snum;}
    document.getElementById('span_dt_dt').innerHTML = dnum+'天'+hnum+'小时'+mnum+'分'+snum+'秒';
}
setInterval('createtime()',250);
//copy
if(xb.copy) document.body.oncopy=function(){alert('复制成功，请遵守本站条约！');}
//console
window.onload = function(){
    var now = new Date().getTime();
    var page_load_time = now-performance.timing.navigationStart;

    // console.clear();
    console.log('项目托管:https://github.com/xb2016/kratos-pjax');
    console.log('%cwww.fczbl.vip','font-size:2em');
    console.log('%c页面加载完毕消耗了'+Math.round(performance.now()*100)/100+'ms','background:#fff;color:#333;text-shadow:0 0 2px #eee,0 0 3px #eee,0 0 3px #eee,0 0 2px #eee,0 0 3px #eee;');
};




//waifu-tips.js

$(document).on('copy',function(){
    showMessage('你都复制了些什么呀，转载要记得加上出处哦',8000);
});
$('.waifu-tool .fa-home').click(function(){
    try{if(typeof(ajax)==="function") ajax(window.location.protocol+'//'+window.location.hostname+'/',"pagelink"); else window.location = window.location.protocol+'//'+window.location.hostname+'/';}catch(e){}
});
var model_p = 22;
$('.waifu-tool .fa-drivers-license-o').click(function(){
    loadlive2d('live2d',xb.thome+'/inc/model/api.php?p='+model_p+'&model=rand');
    if(model_p===22){
        model_p = 33;
        showMessage('33援交有点累了，现在该我上场了',4000);
    }else{
        model_p = 22;
        showMessage('我又回来了！',4000);
    }
});
$('.waifu-tool .fa-comments').click(function(){
    showHitokoto();
});
$('.waifu-tool .fa-street-view').click(function (){
    if(model_p===22) loadlive2d('live2d',xb.thome+'/inc/model/api.php?p=33&model=rand'); else loadlive2d('live2d',xb.thome+'/inc/model/api.php?p=22&model=rand');
    showMessage('我的新衣服好看嘛',4000);
});
$('.waifu-tool .fa-info-circle').click(function (){
    window.open('https://www.fczbl.vip/946.html');
});
$('.waifu-tool .fa-camera').click(function (){
    showMessage('照好了嘛，是不是很可爱呢？',5000);
    window.Live2D.captureName = model_p+'.png';
    window.Live2D.captureFrame = true;
});
$('.waifu-tool .fa-close').click(function(){
    sessionStorage.setItem('waifu-dsiplay','none');
    showMessage('愿你有一天能与重要的人重逢',2000);
    window.setTimeout(function(){$('.waifu').hide();},1000);
});
loadlive2d('live2d',xb.thome+'/inc/model/api.php?p=33&model=default');
function showHitokoto(){
    $.post("https://api.fczbl.vip/hitokoto/",function(result){
        showMessage(result);
    });
}
function showMessage(a,b){
    if(b==null) b = 10000;
    jQuery(".waifu-tips").hide().stop();
    jQuery(".waifu-tips").html(a);
    jQuery(".waifu-tips").fadeTo("10",1);
    jQuery(".waifu-tips").fadeOut(b);
}
(function(){
    var text;
    var SiteIndexUrl = window.location.protocol+'//'+window.location.hostname+'/';
    if(window.location.href == SiteIndexUrl){
        var now = (new Date()).getHours();
        if(now>23||now<=5){
            text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛';
        }else if(now>5&&now<=7){
            text = '早上好！一日之计在于晨，美好的一天就要开始了';
        }else if(now>7&&now<=11){
            text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
        }else if(now>11&&now<=14){
            text = '中午了，工作了一个上午，现在是午餐时间！';
        }else if(now>14&&now<=17){
            text = '午后很容易犯困呢，今天的运动目标完成了吗？';
        }else if(now>17&&now<=19){
            text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~';
        }else if(now>19&&now<=21){
            text = '晚上好，今天过得怎么样？';
        }else if(now>21&&now<=23){
            text = '已经这么晚了呀，早点休息吧，晚安~';
        }else{
            text = '嗨~ 快来逗我玩吧！';
        }
    }else{
        if(document.referrer!==''){
            var referrer = document.createElement('a');
            referrer.href = document.referrer;
            var domain = referrer.hostname.split('.')[1];
            if(window.location.hostname==referrer.hostname){
                text = '欢迎阅读<span style="color:#0099cc;">『'+document.title.split(' - ')[0]+'』</span>';
            }else if(domain=='baidu') {
                text = 'Hello! 来自 百度搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">'+referrer.search.split('&wd=')[1].split('&')[0]+'</span> 找到的我吗？';
            }else if(domain=='so') {
                text = 'Hello! 来自 360搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">'+referrer.search.split('&q=')[1].split('&')[0]+'</span> 找到的我吗？';
            }else if(domain=='google') {
                text = 'Hello! 来自 谷歌搜索 的朋友<br>欢迎阅读<span style="color:#0099cc;">『'+document.title.split(' - ')[0]+'』</span>';
            }else{
                text = 'Hello! 来自 <span style="color:#0099cc;">'+referrer.hostname+'</span> 的朋友';
            }
        }else{
            text = '欢迎阅读<span style="color:#0099cc;">『'+document.title.split(' - ')[0]+'』</span>';
        }
    }
    $(".waifu").animate({top:$(window).height()-250},800);
    showMessage(text,8000);
})();
$(window).resize(function(){
    $(".waifu").css('top',window.innerHeight-250);
});
$("#live2d").mouseover(function(){
    msgs = ["你要干嘛呀？","鼠…鼠标放错地方了！","大笨蛋有没有记住我们的域名？是acgxue.net哦！","你在羡慕我长的可爱？","坏人！怕怕","你看到我的小熊了吗"];
    var i = Math.floor(Math.random()*msgs.length);
    showMessage(msgs[i]);
});
jQuery(document).ready(function($){
    $('.search-box').mouseover(function(){
        showMessage('找不到想要的？试试搜索吧！');
    });
    $('#search').focus(function(){
        showMessage('输入你想搜索的关键词再按Enter键就可以搜索啦!');
    });
    $('.desc a h2,.desc a span,.color-logo a,.back-index,.waifu-tool .fa-home,#kratos-primary-menu .fa-home').mouseover(function(){
        showMessage('点它就可以回到首页啦！');
    });
    $('#footer p a i.fa-weibo').mouseover(function(){
        showMessage('微博？求关注喵！');
    });
    $('#footer p a i.fa-envelope').mouseover(function(){
        showMessage('邮件我会及时回复的！');
    });
    $('#footer p a i.fa-twitter').mouseover(function(){
        showMessage('Twitter?好像是不存在的东西?');
    });
    $('#footer p a i.fa-facebook-official').mouseover(function(){
        showMessage('emmm...FB已经好久没上了...');
    });
    $('#footer p a i.fa-github').mouseover(function(){
        showMessage('GayHub！我是新手！');
    });
    $('#wechat-img').mouseover(function(){
        showMessage('这是我的微信二维码~');
    });
    $('.gotop-box').mouseover(function(){
        showMessage('要回到开始的地方么？');
    });
    $('.waifu-tool .fa-comments').mouseover(function(){
        showMessage('猜猜我要说些什么？');
    });
    $('.waifu-tool .fa-drivers-license-o').mouseover(function(){
        if(model_p===22) showMessage('要见见我的姐姐嘛'); else showMessage('什么？我的服务不好，要33回来？');
    });
    $('.waifu-tool .fa-street-view').mouseover(function(){
        showMessage('喜欢换装play吗？');
    });
    $('.waifu-tool .fa-camera').mouseover(function(){
        showMessage('你要给我拍照呀？一二三～茄子～');
    });
    $('.waifu-tool .fa-info-circle').mouseover(function(){
        showMessage('想知道更多关于我的事么？');
    });
    $('.waifu-tool .fa-close').mouseover(function(){
        showMessage('到了要说再见的时候了吗');
    });
    $(document).on("click","h2 a",function(){
        showMessage('加载<span style="color:#0099cc;">'+$(this).text()+'</span>中...请稍候',600);
    });
    $(document).on("mouseover","h2 a",function(){
        showMessage('要看看<span style="color:#0099cc;">'+$(this).text()+'</span>么？');
    });
    $(document).on("mouseover",".prev",function(){
        showMessage('要翻到上一页吗?');
    });
    $(document).on("mouseover",".next",function(){
        showMessage('要翻到下一页吗?');
    });
    $(document).on("mouseover",".kratos-post-content a",function(){
        showMessage('去 <span style="color:#0099cc;">'+$(this).text()+'</span> 逛逛吧');
    });
    $(document).on("mouseover","#submit",function(){
        showMessage('呐 首次评论需要审核，请耐心等待哦~');
    });
    $(document).on("mouseover",".OwO-logo",function(){
        showMessage('要来一发表情吗？');
    });
    $(document).on("mouseover",".nav-previous",function(){
        showMessage('点它可以后退哦！');
    });
    $(document).on("mouseover",".nav-next",function(){
        showMessage('点它可以前进哦！');
    });
    $(document).on("mouseover",".comment-reply-link",function(){
        showMessage('要说点什么吗');
    });
    $(document).on("mouseover",".Donate",function(){
        showMessage('要打赏我嘛？好期待啊~');
    });
    $(document).on("mouseover",".Love",function(){
        showMessage('我是不是棒棒哒~快给我点赞吧！');
    });
    $(document).on("mouseover",".must-log-in",function(){
        showMessage('登录才可以继续哦~');
    });
    $(document).on("mouseover",".Share",function(){
        showMessage('好东西要让更多人知道才行哦');
    });
    $(document).on("click","#author",function(){
        showMessage("留下你的尊姓大名！");
    });
    $(document).on("click","#email",function(){
        showMessage("留下你的邮箱，不然就是无头像人士了！");
    });
    $(document).on("click","#url",function(){
        showMessage("快快告诉我你的家在哪里，好让我去参观参观！");
    });
    $(document).on("click","#comment",function(){
        showMessage("一定要认真填写喵~");
    });
});
jQuery(document).ready(function($){
    window.setInterval(function(){showMessage(showHitokoto());},25000);
    var stat_click = 0;
    $("#live2d").click(function(){
        if(!ismove){
            stat_click++;
            if(stat_click>6) {
                msgs = ["你有完没完呀？","你已经摸我"+stat_click+"次了","非礼呀！救命！","OH，My ladygaga","110吗，这里有个变态一直在摸我(ó﹏ò｡)"];
                var i = Math.floor(Math.random()*msgs.length);
            }else{
                msgs = ["是…是不小心碰到了吧","我跑呀跑呀跑！~~","再摸的话我可要报警了！⌇●﹏●⌇","别摸我，有什么好摸的！","惹不起你，我还躲不起你么？","不要摸我了，我会告诉老婆来打你的！","干嘛动我呀！小心我咬你！"];
                var i = Math.floor(Math.random()*msgs.length);
            }
        s = [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.75,-0.1,-0.2,-0.3,-0.4,-0.5,-0.6,-0.7,-0.75];
        var i1 = Math.floor(Math.random()*s.length);
        var i2 = Math.floor(Math.random()*s.length);
            $(".waifu").animate({
            left:(document.body.offsetWidth-210)/2*(1+s[i1]),
            top:(window.innerHeight-240)-(window.innerHeight-240)/2*(1-s[i2])
            },
            {
                duration:500,
                complete:showMessage(msgs[i])
            });
        }else{
            ismove = false;
        }
    });
});
var ismove = false;
jQuery(document).ready(function($){
    var box=$('.waifu')[0];
    var topCount = 20;
    box.onmousedown=function(e){
        var Ox=e.offsetX;   
        var Oy=e.offsetY;
        var Ch=document.documentElement.clientHeight;
        var Cw=document.documentElement.clientWidth;
        document.onmousemove=function(e){
            var Cx=e.clientX;
            var Cy=e.clientY;
            box.style.left=Cx-Ox+"px";
            box.style.top=Cy-Oy+"px";
            if(box.offsetLeft<0){
                box.style.left=0;
            }
            else if(box.offsetLeft+box.offsetWidth>Cw){
                box.style.left=Cw-box.offsetWidth+"px";
            }
            if(box.offsetTop-topCount<0){
                box.style.top=topCount+"px";
            }
            else if(box.offsetTop+box.offsetHeight-topCount>Ch){
                box.style.top=Ch-(box.offsetHeight-topCount)+"px";
            }
            ismove = true;
        };
        document.onmouseup=function(e){
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }
});

