$(document).ready(function(){
	/* 搜索开关 */
	var contentWrapper = $('body');
	$('.search-button').click(function(event){
		event.preventDefault();
		toggleSearch();
	});
	function toggleSearch(){
		$('.search-input-text').addClass('dropdown-active');
		$('.search-button').addClass('button-replace');
		$('.question').addClass('questionMove');
		$('.top-nav').addClass('hidden-nav');

	};
	contentWrapper.click(function(event){
		if($(event.target).is(contentWrapper)){
			$('.search-input-text').removeClass('dropdown-active');
			$('.search-button').removeClass('button-replace');
			$('.question').removeClass('questionMove');
			$('.top-nav').removeClass('hidden-nav');
		}
	});
	/* 提问开关 */
	$('.question').click(function(){
		$('.modal-bg').css('display','block');
		$('.modal-wrapper').addClass('modal-display');
		$('.modal-dialog').addClass('modal-dialog-animation');

	});
    $('.modal-dialog-title-close').click(function(){
    	$('.modal-bg').css('display','none');
		$('.modal-wrapper').removeClass('modal-display');
		$('.modal-dialog').removeClass('modal-dialog-animation');
	});

	
	/* 消息 */
	$('.tab-message').click(function(event){
		event.preventDefault();
		$('.top-nav-message-drop-menu').toggleClass('animation-message-sild-down');
	});
	contentWrapper.click(function(event){
		if($(event.target).is(contentWrapper)){
			$('.top-nav-message-drop-menu').removeClass('animation-message-sild-down');
		}
	});
	var i = 0;
	$('.dropdown-conversation-title').children('button').eq(i).click(function(){
		$('.conversation-frame').children('div').eq(i).css('display','block');
	});
	

});