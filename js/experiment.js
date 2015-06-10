$(document).ready(function(){
	$('.search-button').click(function(event){
		event.preventDefault();
		toggleSearch();
	});

	function toggleSearch(){
		$('.search-input-text').toggleClass('dropdown-active');
		$('.search-button').toggleClass('button-replace');
		$('.question').toggleClass('questionMove');
		$('.top-nav').toggleClass('hidden-nav');

	};


	var searchIsVisible = $('search-input-text').hasClass('dropdown-active');
	if(searchIsVisible === true){
		$(html).click(function(){
			$('.search-input-text').removeClass('dropdown-active');
			$('.search-button').removeClass('button-replace');
		});
		}

});