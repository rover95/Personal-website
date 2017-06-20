//轮播器
	var crs_num=1;  //图片位置
	var d=1;   	//运动方向
	var w=R('#carousel img').css().first().width
	function interval(){
		carousel=setInterval(function(){
			
			num2=crs_num*-w
			R('.crs_img').animate({
				attr:'x',
				target:num2,
				time:10,
				speed:30,				
			})
			if(d>0){
				crs_num++;
			}else{
				crs_num--;
			}
			if(crs_num==3||crs_num==0){
				d=-d;
			}
		},4000)
	}
	interval();
	// $('#carousel li').hover(function(){
	// 	var num=$(this).childNum()*-800
	// 	clearInterval(carousel)
	// 	$('.crs_img').animate({
	// 		attr:'x',
	// 		target:num,
	// 		time:50,
	// 		speed:5,
			
	// 	})

	// 	$('.crs_words p').html($('.crs_img img').getnum($(this).childNum()).attr('alt'))
	// 	$('#carousel li').css('color','#999')
	// 	$(this).css('color','#333')
		
	// },function(){
	// 	interval()
	// })