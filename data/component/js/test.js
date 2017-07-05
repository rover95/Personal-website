$(function (){ 

	//滑动导航条
	$('.about li').hover(function(){
		var target=$(this).first().offsetLeft;
		var p=(target-25)/110;
		$('#menu').css('z-index',5)
		$(this).animate({
			opacity:' -0',
			oSpeed:5
		}) 
		    //移动
		$('.above').animate({   
			attr:'x',
			speed:2,
			target:target+5,
			fn:function(){
				    //字体上下移动
				$('.above ul').animate({
					attr:'y',
					speed:1.5,
					target:-((target-25)/110*30),
				})
				     //变透明
				$('#menu li').getnum(p).animate({
					opacity:' -0',
					oSpeed:2
				})
			}
		})

	},function(){
		var p=($(this).first().offsetLeft-25)/110
		$('#menu li').getnum(p).css('z-index',1).animate({
			opacity:' -100',
			oSpeed:5
		})
		$('.above').animate({
			attr:'x',
			speed:2,
			target:30,
			fn:function(){
				$('#menu').css('z-index',1)
				$('.above ul').animate({
					attr:'y',
					speed:2,
					target:0,
					
				})
			}
		})
	})		
	



		























	








})