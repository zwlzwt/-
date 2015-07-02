$(document).ready(function(){
  var $contentWrapper = $('body'),
      $loginModal_container = $('.login-modal-container'),
      $formLogin = $loginModal_container.find('.login-form'),
      $formSignup = $loginModal_container.find('.signup-form'),
      $modalTitle_switcher = $('.modal-title-switcher'),
      $tabLogin = $modalTitle_switcher.children('li').eq(0).children('a'),
      $tabSignup = $modalTitle_switcher.children('li').eq(1).children('a'),
      $answerVotelist = $('.main-content-container').find('.content-innerblock-list'),
      $backTotop = $('.back-to-top');

  /* 搜索开关 */
  $('.search-button').on('click',function(event){
    event.preventDefault();
    toggleSearch();
  });
  function toggleSearch(){
    $('.search-input-text').addClass('dropdown-active');
    $('.search-button').addClass('button-replace');
    $('.question').addClass('questionMove');
    $('.top-nav').addClass('hidden-nav');

  };
  $contentWrapper.on('click',function(event){
    if(!$(event.target).is($('.search-button'))){
      $('.search-input-text').removeClass('dropdown-active');
      $('.search-button').removeClass('button-replace');
      $('.question').removeClass('questionMove');
      $('.top-nav').removeClass('hidden-nav');
    }
  });

  /* 提问开关 */
  $('.question').on('click',function(){
    $('.modal-bg').css('display','block');
    $('.modal-wrapper').addClass('modal-display');
    $('.modal-dialog').addClass('modal-dialog-animation');

  });
  $('.modal-wrapper').on('click',function(event){
    if($(event.target).is('.modal-wrapper') || $(event.target).is('.modal-dialog-title-close')){
      removeQuestion();
    }
  });
  $(this).keyup(function(){
    if(event.which == '27'){
      removeLogin();
      removeQuestion();
      $('.top-nav-message-drop-menu').removeClass('animation-message-sild-down');
    } 
  });
  function removeQuestion(){
    $('.modal-bg').css('display','none');
    $('.modal-wrapper').removeClass('modal-display');
    $('.modal-dialog').removeClass('modal-dialog-animation');
  } 
  
  /* 消息 */
  $('.tab-message').on('click',function(event){
    event.preventDefault();
    $('.top-nav-message-drop-menu').toggleClass('animation-message-sild-down');
  });
  /*$contentWrapper.on('click',function(event){
    if(!$(event.target).is($('.top-nav-message-drop-menu'))){
      $('.top-nav-message-drop-menu').removeClass('animation-message-sild-down');
    }
  });*/
  $('.dropdown-conversation-title').children('button').on('click',function(){
    var index = $('.dropdown-conversation-title').children('button').index(this);
    $('.conversation-frame').children('div').eq(index).css('display','block');
  });

  /* 用户登录注册界面 */
  $('.login-nav').on('click',function(event){
    event.preventDefault();
    $('.overlay-bg').css('display','block');
    $('.fullscreen-overlay').css('visibility','visible');
    $('.overlay-close').addClass('modal-dialog-animation');
    $loginModal_container.addClass('modal-dialog-animation');
    ($(event.target).is('.cd-signup')) ? login_selected() : signup_selected();
  });
  $('.fullscreen-overlay').on('click',function(event){
    if($(event.target).is('.fullscreen-overlay') || $(event.target).is('.overlay-close')){
      removeLogin();
    }
  });

  $modalTitle_switcher.on('click',function(){
    ($(event.target).is($tabLogin)) ? login_selected() : signup_selected();
  });
 /* 移动端登录注册界面 */
 $('.menu-top-bar').find('.main-nav').on('click',function(){
    $('.login-nav').toggleClass('is-visible');
 });




/* 登录界面显示与隐藏 */

  function removeLogin(){
    $('.overlay-bg').css('display','none');
    $('.fullscreen-overlay').css('visibility','hidden');
    $('.overlay-close').removeClass('modal-dialog-animation');
    $loginModal_container.removeClass('modal-dialog-animation');
  }
  function login_selected(){
    $formLogin.addClass('is-selected');
    $formSignup.removeClass('is-selected');
    $tabLogin.addClass('selected');
    $tabSignup.removeClass('selected');
  }
  function signup_selected(){
    $formLogin.removeClass('is-selected');
    $formSignup.addClass('is-selected');
    $tabLogin.removeClass('selected');
    $tabSignup.addClass('selected');
  }

/* 文字浮动效果 */
  if($('.floating-labels').length > 0) floatLabels();
  function floatLabels(){
    var $inputFields = $loginModal_container.find('.cd-label').next();
    $inputFields.each(function(){
      var singleInput = $(this); 
      checkVal(singleInput);
      singleInput.on('change keyup', function(){
        checkVal(singleInput);
      });
    })
  }
  function checkVal(inputField){
    (inputField.val() == '') ? inputField.prev('.cd-label').removeClass('float') : inputField.prev('.cd-label').addClass('float');
  }
/* 显示活着隐藏密码 */
  $('.hide-password').on('click', function(){
    var $this= $(this),
        $password_field = $this.prev('input');
    
    ( 'password' == $password_field.attr('type') ) ? $password_field.attr('type', 'text') : $password_field.attr('type', 'password');
    ( 'Hide' == $this.text() ) ? $this.text('Show') : $this.text('Hide');
  });

/* 主页内容显示 */
  function visibleContent(e){
    $answerVotelist.eq(e).find('.content-summary').css('display','none');
    $answerVotelist.eq(e).find('.editable-content').fadeIn(800);
    $answerVotelist.eq(e).children('.feedback-footer').children('span').css('visibility','visible');
  }
  function hideContenclose(e){
    $answerVotelist.eq(e).find('.content-summary').css('display','block');
    $answerVotelist.eq(e).children('.feedback-footer').children('span').css('visibility','hidden');
    $answerVotelist.eq(e).find('.editable-content').css('display','none');
  } 
  $('.content-summary').children('span').on('click',function(){
    var lisNum = $(this).parent().parent().parent().index();
    visibleContent(lisNum);
  });
  $('.feedback-footer').children('span').on('click',function(){
    var lisNum = $(this).parent().parent().index();
    hideContenclose(lisNum);
  });
/* 点赞 */
  function addVotenumber(e){
    $answerVotelist.eq(e).find('.vote-button-count').text(function(){
      return Number($(this).text()) + 1;
    });
  }
  $('.answer-vote').find('.up').on('click',function(){
     var lisNum = $(this).parent().parent().parent().index();
     addVotenumber(lisNum);
    });

/* 回到顶部 */
  var offset = 300,
      offset_opacity = 1200,
      scroll_top_duration = 700;

  $(window).scroll(function(){
    ($(this).scrollTop() > offset) ? $backTotop.addClass('is-visible') : $backTotop.removeClass('is-visible');
    if($(this).scrollTop() > offset_opacity){
      $backTotop.addClass('fade-out');
    }
  });
  $backTotop.on('click', function(event){
    event.preventDefault();
    $('body,html').animate({
      scrollTop: 0 ,
      }, scroll_top_duration
    );
  });

});