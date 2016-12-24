
	var initLeftPos = 0;
	var stopClick = 0;
	
	$(function(){
		$('.sslider').addClass('loading');
		var i = 0;
		$('.sslider .img_viewport ul li img').each(function() {
			var img = $(this)[0];
			$(this).attr("src", $(img).attr("src")).load(function() {
				i++;
				if(i >= $('.sslider .img_viewport ul li').length){
					cloneSliderImg();
					initSider();	
				}
			});
		});	
	});
	
	function cloneSliderImg(){
		var a = $('.sslider .img_viewport ul li:first-child');
		
		var a1 = $('.sslider .img_viewport ul li:first-child').next();
		
		var b = $('.sslider .img_viewport ul li:last-child');
		
		var b1 = $('.sslider .img_viewport ul li:last-child').prev();
		
		a.clone().appendTo(".img_viewport ul").addClass('cloneStart');;
		a1.clone().appendTo(".img_viewport ul");
		
		b.clone().prependTo(".img_viewport ul").addClass('cloneEnd');;
		b1.clone().prependTo(".img_viewport ul");
		
	};
	
	function initSider(){
		//$('.sslider .img_viewport ul').css({'width': 0});
		$('.sslider .img_viewport ul li img').each(function() {
			$(this).closest('li').width($(this).width());
			$(this).closest('ul').width($(this).closest('ul').width()+$(this).width());
			//alert($(this).closest('ul').width()+" :::: "+$(this).width());
		});	
		
		$('.sslider .thumb_viewport ul li').each(function() {
			$(this).closest('ul').width($(this).closest('ul').width()+$(this).width());
		});	
		
		$('.sslider .img_viewport ul li').eq(2).addClass('_current');
		$('.thumb_viewport ul li:first-child').addClass('_current');
		
		initLeftPos = (($('.sslider .img_viewport').width() - $('.sslider .img_viewport ul li').eq(2).width())*0.5) - ($('.sslider .img_viewport ul li').eq(0).width() + $('.sslider .img_viewport ul li').eq(1).width());
		finalRightPos = 
		($('.sslider .img_viewport ul').width()- 
		($('.sslider .img_viewport ul li:last-child').width() + 
		$('.sslider .img_viewport ul li:last-child').prev().width() +
		$('.sslider .img_viewport').width())) + 
		(($('.sslider .img_viewport').width() - $('.sslider .img_viewport ul li.cloneStart').prev().width())*0.5);
		
		
		$('.sslider .img_viewport ul').css({'left' :  initLeftPos});
		
		$('.slider_nav').width((($('.sslider .img_viewport').width() - $('.sslider .img_viewport ul li._current').width())*0.5));
		
		
		
		$('.sslider_go_next').click(function() {
			if(stopClick == 0){	
				stopClick = 1;		
				slideNext();
				var ci = $('.sslider .img_viewport ul li._current').index()-2;
				$('.thumb_viewport ul li._current').removeClass('_current');
				$('.thumb_viewport ul li:eq('+ci+')').addClass('_current');
				
				if($('.thumb_viewport ul li:eq('+ci+')').hasClass('_rightmost_thumb') && 
				$('.thumb_viewport ul li._rightmost_thumb').index() != $('.thumb_viewport ul li:last-child').index()){			
					var reqWidth = 0;
						var c2 = 0;
						$('.thumb_viewport ul li').each(function() {
							if($(this).hasClass('_rightmost_thumb'))
								c2 = 1;
							if(c2 == 0)	
								reqWidth += $(this).width();
						});
					
					$('.thumb_viewport ul').animate({'left' : reqWidth*-1});
					reSetRightMostThumb();
				}
				if($('.thumb_viewport ul li._current').index() <= 0){
					$('.thumb_viewport ul').animate({'left' : 0});
					$('.thumb_viewport ul li._rightmost_thumb').removeClass('_rightmost_thumb');
					$('.thumb_viewport ul li._leftmost_thumb').removeClass('_leftmost_thumb');
					 
					setTerminalThumbs();
				}
			}
		});
		
		$('.sslider_go_prev').click(function() {
			var goToEnd = 0;
			if(stopClick == 0){
				stopClick = 1;
				slidePrev();
				var ci = $('.sslider .img_viewport ul li._current').index() - 2;
			
				if(!$('.thumb_viewport ul li._current').prev().length){
					goToEnd = 1;
				}
			
				$('.thumb_viewport ul li._current').removeClass('_current');
				$('.thumb_viewport ul li:eq('+ci+')').addClass('_current');
			}
			
			if($('.thumb_viewport ul li:eq('+ci+')').next().hasClass('_leftmost_thumb') && goToEnd == 0){
				//alert("as");
				var reqWidth = 0;
				var c2 = 0;
				$('.thumb_viewport ul li').each(function() {
					
					if(c2 == 0)	
						reqWidth += $(this).width();
					
					if($(this).hasClass('_leftmost_thumb'))
						c2 = 1;
						
				});
				reqWidth = reqWidth - $('.thumb_viewport').width();
				if(reqWidth < $('.thumb_viewport ul li').width() && reqWidth > 0)
					reqWidth = 0;
					
				$('.thumb_viewport ul').animate({'left' : reqWidth*-1},function(){reSetLeftMostThumb();});
				
				
			}
			if(goToEnd == 1){
				var c = 0;
				var totalWidth = 0;
				$('.thumb_viewport ul li').each(function() {
                	totalWidth  += $(this).width();
                });
				
				reqWidth = Math.floor(totalWidth / $('.thumb_viewport').width()) *  $('.thumb_viewport').width();
				//alert(totalWidth +"::"+ $('.thumb_viewport').width());
				totalWidth = 0;
				$('.thumb_viewport ul').animate({'left' : reqWidth*-1}, function(){
				
					$('.thumb_viewport ul li').each(function() {
						if(totalWidth < $('.thumb_viewport ul').position().left*-1)
							totalWidth  += $(this).width();
						else{
							if(c == 0){
								$('.thumb_viewport ul li._rightmost_thumb').removeClass('_rightmost_thumb');
								$('.thumb_viewport ul li._leftmost_thumb').removeClass('_leftmost_thumb');
								
								$(this).addClass('_leftmost_thumb');
								$('.thumb_viewport ul li:last-child').addClass('_rightmost_thumb');
								c = 1;
							}
							
						}
						//alert($(this).index());
					});	
				
				});
				
				
			}
			
			/*if($('.thumb_viewport ul li:eq('+ci+')').hasClass('_leftmost_thumb') && $('.thumb_viewport ul li:eq('+ci+')').prev().length){	
				var posLeft = $('.thumb_viewport ul').position().left + $('.thumb_viewport').width() - $('.thumb_viewport ul li').width();
				$('.thumb_viewport ul').animate({'left' : posLeft}, 500, function(){reSetLeftMostThumb()});
			}*/
			
		});
		
		$('.thumb_viewport ul li').click(function() {
			slideSpecfic($(this).index());
			$('.thumb_viewport ul li._current').removeClass('_current');
			$(this).addClass('_current');
		});
		
		$('body').on('click', ".thumb_viewport ul li._rightmost_thumb", function() {
		   var reqWidth = 0;
		   var c2 = 0;
			$('.thumb_viewport ul li').each(function() {
				if($(this).hasClass('_rightmost_thumb'))
					c2 = 1;
				if(c2 == 0)	
					reqWidth += $(this).width();
			});
			$('.thumb_viewport ul').animate({'left' : reqWidth*-1}, 500, function(){
			
				reSetRightMostThumb();
			
			});
		});
		
		$('body').on('click', ".thumb_viewport ul li._leftmost_thumb", function() {
			if($(this).prev().length){
				var posLeft = $('.thumb_viewport ul').position().left + $('.thumb_viewport').width() - $('.thumb_viewport ul li').width();
				$('.thumb_viewport ul').animate({'left' : posLeft}, 500, function(){reSetLeftMostThumb()});
			}
		});
		setTerminalThumbs();
		$('.sslider').css({'height' : 'auto'});
		$('.sslider').removeClass('loading');
	}
	
	function setTerminalThumbs(){
		var calWidThumbs = 0;
		var c1 = 0;
		$('.sslider .thumb_viewport ul li:first-child').addClass('_leftmost_thumb');
		$('.sslider .thumb_viewport ul li').each(function(){
			if(calWidThumbs < $('.sslider .thumb_viewport').width())
				calWidThumbs += $(this).width();
			
			if(calWidThumbs >= $('.sslider .thumb_viewport').width() && c1 == 0){
				c1 = 1
				$(this).addClass('_rightmost_thumb');
			}
		});
	}
	
	function reSetRightMostThumb(){
		var calWidThumbs = 0;
		var c1 = 0;
		
		$('.sslider .thumb_viewport ul li').each(function(){
			if($(this).hasClass('_rightmost_thumb')){
				c1 = 1;
				$('.sslider .thumb_viewport ul li._leftmost_thumb').removeClass('_leftmost_thumb');
				$(this).removeClass('_rightmost_thumb').addClass('_leftmost_thumb');
			}
			
			if(c1 == 1){
				if(calWidThumbs < $('.sslider .thumb_viewport').width())
					calWidThumbs += $(this).width();
				
				if(calWidThumbs >= $('.sslider .thumb_viewport').width() && c1 == 1){
					c1 = 0
					$(this).addClass('_rightmost_thumb');
				}
				if($(this).index() == $('.sslider .thumb_viewport ul li:last-child').index()){
					c1 = 0
					$(this).addClass('_rightmost_thumb');
				}
			}
			
		});
	}
	
	function reSetLeftMostThumb(){
		var calWidThumbs = 0;
		var c1 = 0;
		
		$('.sslider .thumb_viewport ul li').each(function(){
			if($(this).hasClass('_leftmost_thumb')){
				c1 = 1;
				$('.sslider .thumb_viewport ul li._rightmost_thumb').removeClass('_rightmost_thumb');
				$(this).removeClass('_leftmost_thumb').addClass('_rightmost_thumb');
			}
			
			//alert(calWidThumbs);
			if(c1 == 0){
				//alert($(this).index());
				if(calWidThumbs <= $('.sslider .thumb_viewport ul').position().left){
					c1 = 1
					$(this).addClass('_leftmost_thumb');
				}
				
				
				if(calWidThumbs > $('.sslider .thumb_viewport ul').position().left){
					calWidThumbs -= $(this).width();
				}
			}
			
			
			
		});
	}
	
	function slideNext(){
		if($('.sslider .img_viewport ul li._current').next().length){
			var c1 = 0;
			var reqWidth = 0;
			$('.sslider .img_viewport ul li').each(function() {
				if(c1 == 0){
					reqWidth += $(this).width();	
				}	
				if($(this).hasClass('_current'))c1 = 1;
			});
			$('.sslider .img_viewport ul li._current').removeClass('_current').next('li').addClass('_current');
			reqWidth -= (($('.sslider .img_viewport').width() - $('.sslider .img_viewport ul li._current').width())*0.5);
			$('.slider_nav').width((($('.sslider .img_viewport').width() - $('.sslider .img_viewport ul li._current').width())*0.5));
			$('.sslider .img_viewport ul').animate({'left' : reqWidth*-1},
				function(){
					if($('.sslider .img_viewport ul li._current').hasClass("cloneStart")){
						$('.sslider .img_viewport ul').css({'left' : initLeftPos});
						$('.sslider .img_viewport ul li._current').removeClass('_current');
						$('.sslider .img_viewport ul li').eq(2).addClass('_current');
						$('.sslider .thumb_viewport ul li').eq(0).addClass('_current');
					}
					stopClick = 0;
				});
			$('.slider_nav.sslider_go_prev').fadeIn();
		}
		if(!$('.sslider .img_viewport ul li._current').next().length){
			$('.slider_nav.sslider_go_next').fadeOut();
		}
		
		
	};
	
	function slidePrev(){
		if($('.sslider .img_viewport ul li._current').prev().length){
			var c1 = 0;
			var reqWidth = 0;
			$('.sslider .img_viewport ul li').each(function() {
				if($(this).next('li').hasClass('_current'))c1 = 1;
				if(c1 == 0){
					reqWidth += $(this).width();	
				}	
			});
			
			$('.sslider .img_viewport ul li._current').removeClass('_current').prev('li').addClass('_current');
			reqWidth -= (($('.sslider .img_viewport').width() - $('.sslider .img_viewport ul li._current').width())*0.5);
			$('.slider_nav').width((($('.sslider .img_viewport').width() - $('.sslider .img_viewport ul li._current').width())*0.5));
			$('.sslider .img_viewport ul').animate({'left' : reqWidth*-1}, 
				function(){
					if($('.sslider .img_viewport ul li._current').hasClass("cloneEnd")){
						$('.sslider .img_viewport ul').css({'left' : finalRightPos*-1});
						$('.sslider .img_viewport ul li._current').removeClass('_current');
						$('.sslider .img_viewport ul li.cloneStart').prev().addClass('_current');
						
					}
					stopClick = 0;
				});
			
			$('.slider_nav.sslider_go_next').fadeIn();
		}
		if(!$('.sslider .img_viewport ul li._current').prev().length){
			$('.slider_nav.sslider_go_prev').fadeOut();
		}
	};
	
	function slideSpecfic(rIndex){
		var reqIndex = rIndex+2;
		var reqWidth = 0;
		var c1 = 0;
		
		$('.sslider .img_viewport ul li').each(function() {
			
			if(reqIndex != 0){
				reqIndex --;
				reqWidth += $(this).width();
			}else{
				if(c1 == 0){
					c1 = 1;
					$('.sslider .img_viewport ul li._current').removeClass('_current')
					$(this).addClass('_current');
				}
			}
		});
		
		reqWidth -= (($('.sslider .img_viewport').width() - $('.sslider .img_viewport ul li._current').width())*0.5);
		$('.slider_nav').width((($('.sslider .img_viewport').width() - $('.sslider .img_viewport ul li._current').width())*0.5));
		$('.sslider .img_viewport ul').animate({'left' : reqWidth*-1});
		
		if($('.sslider .img_viewport ul li._current').next().length)
			$('.slider_nav.sslider_go_next').fadeIn();
		else
			$('.slider_nav.sslider_go_next').fadeOut();
		
		if($('.sslider .img_viewport ul li._current').prev().length)
			$('.slider_nav.sslider_go_prev').fadeIn();
		else
			$('.slider_nav.sslider_go_prev').fadeOut();
			
	};
