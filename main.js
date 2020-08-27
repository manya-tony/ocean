$(function(){

  // メインタイトル表示
  $(window).load(function(){
    var mainH1 = $('.main h1'),
        mainScroll = $('.main .scroll'),
        mainScrollI = $('.main .scroll > i'),
        mainScrollLine = $('.main .scroll .line');

    mainH1.animate({opacity:'0.8', marginTop:'200'});

    // スクロール矢印
    setTimeout(function(){
      mainScroll.animate({opacity:'1'});
      mainScrollI.animate({bottom:'-85px'});
      mainScrollLine.animate({height:'80px'});
    }, 5000);
  });


  // メインイメージ スライドショー
  var img = $('#slideshow').children('.mainImg'),
      num = img.length,
      count = 0,
      interval = 3000;

  img.eq(0).addClass('show');

  setTimeout(slideshow, interval);

  function slideshow(){
    img.eq(count).removeClass('show');
    count++;
    if(count >= num) {
      count = 0;
    }
    img.eq(count).addClass('show');
    setTimeout(slideshow, interval);
  }


  // ABOUT表示
  var setAbout = $('.about .container'),
      showHeightAbout = 0;

  $(window).on('load scroll resize', function(){
    setAbout.each(function(){
      var setThis = $(this),
          areaTop = setThis.offset().top;
      if($(window).scrollTop() > (areaTop + showHeightAbout) - $(window).height()){
        setThis.stop().animate({opacity:'1', margin:'0 auto'}, 700);
      }
    });
  });


  // PHOTO表示
  var setPhoto = $('.photo .container'),
      showHeightPhoto = 0;

  $(window).on('load scroll resize', function(){
    setPhoto.each(function(){
      var setThis = $(this),
          areaTop = setThis.offset().top;
      if($(window).scrollTop() > (areaTop + showHeightPhoto) - $(window).height()){
        setThis.stop().animate({opacity:'1', margin:'0 auto'}, 700);
      }
    });
  });


  // CONTACT表示
  var setCont = $('.contact .container'),
      showHeightCont = 0;

  $(window).on('load scroll resize', function(){
    setCont.each(function(){
      var setThis = $(this),
          areaTop = setThis.offset().top;
      if($(window).scrollTop() > (areaTop + showHeightCont) - $(window).height()){
        setThis.stop().animate({opacity:'1', margin:'0 auto'}, 700);
      }
    });
  });


  // 画像を表示
  var setArea = $('#imgLoad'),
      imgPass = 'img/photo',
      imgType = '.jpg',
      loadNum = 4,
      maxNum = 20,
      fadeSpeed = 1000,
      btnTxt = 'MORE';

  setArea.append('<div id="loadArea"></div><a href="javascript:void(0);" id="moreBtn">' + btnTxt + '</a>');

  var loadArea = setArea.find('#loadArea'),
      moreBtn = setArea.find('#moreBtn');

  moreBtn.click(function(){
    var loadImg = loadArea.find('img'),
        imgLength = loadImg.length,
        loopCont = imgLength + loadNum;

    if(loopCont < maxNum){
      $.each(new Array(loadNum), function(i){
        loadArea.append('<a href="'+ imgPass + (imgLength + (i+1)) + imgType + '" target="_blank" class="modalBtn"><img src="' + imgPass + (imgLength + (i+1)) + imgType +'"></a>');
      });
    } else if(loopCont >= maxNum){
      var overCont = maxNum - imgLength;

      $.each(new Array(overCont), function(i){
        loadArea.append('<a href="' + imgPass + (imgLength + (i+1)) + imgType + '" target="_blank" class="modalBtn"><img src="' + imgPass + (imgLength + (i+1)) + imgType + '"></a>');
      });
      moreBtn.remove();
    }

    loadArea.find('img').on('load', function(){
      $(this).animate({opacity:'1'}, fadeSpeed);
    });


    var mdwBtn = $('.modalBtn'),
        overlayOpacity = 0.7,
        fadeTime = 500;

    mdwBtn.on('click', function(e){
      e.preventDefault();

      var setMdw = $(this),
          setHref = setMdw.attr('href'),
          wdHeight = $(window).height();

      $('body').append('<div id="mdOverlay"></div><div id="mdWindow"><div class="mdClose">×</div><img src="' + setHref + '"></div>');

      $('#mdOverlay, #mdWindow').css({display:'block', opacity:'0'});
      $('#mdOverlay').css({height:wdHeight}).stop().animate({opacity:overlayOpacity}, fadeTime);
      $('#mdWindow').stop().animate({opacity:'1'}, fadeTime);

      $(window).on('resize', function(){
        var adjHeight = $(window).height();
        $('#mdOverlay').css({height:adjHeight});
      });

      $('#mdOverlay, .mdClose').on('click', function(){
        $('#mdWindow, #mdOverlay').stop().animate({opacity:'0'}, fadeTime, function(){
          $('#mdOverlay, #mdWindow').remove();
        });
      });
    });
  });

  $(window).load(function(){
    moreBtn.click();
  });


  // コンタクト バリデーション
  var name = $('.validName'),
      mail = $('.validMail'),
      comment = $('.validComment');

  const MAS_TEXT_MAX = '20文字以内で入力してください。',
        MSG_EMPTY = '入力必須です。',
        MSG_EMAIL_TYPE = 'emailの形式ではありません。',
        MSG_TEXTAREA_MAX = '1000文字以内で入力してください。';

  name.keyup(function(){
    var form_g = $(this).closest('.formGroup');

    if($(this).val().length > 20){
      form_g.removeClass('has-success').addClass('has-error');
      form_g.find('.errorText').text(MSG_TEXT_MAX);
    } else if($(this).val().length === 0) {
      form_g.removeClass('has-success').addClass('has-error');
      form_g.find('.errorText').text(MSG_EMPTY);
    } else {
      form_g.removeClass('has-error').addClass('has-success');
      form_g.find('.errorText').text('');
    }
  });

  mail.keyup(function(){
    var form_g = $(this).closest('.formGroup');

    if($(this).val().length > 50 || !$(this).val().match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)){
      form_g.removeClass('has-success').addClass('has-error');
      form_g.find('.errorText').text(MSG_EMAIL_TYPE);
    } else if($(this).val().length === 0) {
      form_g.removeClass('has-success').addClass('has-error');
      form_g.find('.errorText').text(MSG_EMPTY);
    } else {
      form_g.removeClass('has-error').addClass('has-success');
      form_g.find('.errorText').text('');
    }
  });

  comment.keyup(function(){
    var form_g = $(this).closest('.formGroup');

    if($(this).val().length > 1000){
      form_g.removeClass('has-success').addClass('has-error');
      form_g.find('.errorText').text(MSG_TEXTAREA_MAX);
    } else if($(this).val().length === 0) {
      form_g.removeClass('has-success').addClass('has-error');
      form_g.find('.errorText').text(MSG_EMPTY);
    } else {
      form_g.removeClass('has-error').addClass('has-success');
      form_g.find('.errorText').text('');
    }
  });


  // トップへ戻るボタンとスムーススクロール
  $('body').append('<a href="javascript:void(0);" id="fixedTop">▲</a>');

  var fixedTop = $('#fixedTop'),
      $about = $('#js-aboutLink'),
      aboutTOP = $('#about').position();
      $photo = $('#js-photoLink'),
      photoTOP = $('#photo').position();
      $contact = $('#js-contactLink'),
      contactTOP = $('#contact').position();
      $address = $('#js-addressLink'),
      addressTOP = $('#address').position();

  fixedTop.on('click', function(){
    $('html,body').animate({scrollTop:'0'}, 500);
  });

  $about.on('click', function(){
    $('html,body').animate({scrollTop:aboutTOP.top}, 500);
  });

  $photo.on('click', function(){
    $('html,body').animate({scrollTop:photoTOP.top}, 500);
  });

  $contact.on('click', function(){
    $('html,body').animate({scrollTop:contactTOP.top}, 500);
  });

  $address.on('click', function(){
    $('html,body').animate({scrollTop:addressTOP.top}, 500);
  });

  $(window).on('load scroll resize', function(){
    var showTop = 500;
    if($(window).scrollTop() > showTop){
      fixedTop.fadeIn('normal');
    } else {
      fixedTop.fadeOut('nomal');
    }
  });

});
