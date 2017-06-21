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
	

	R('.photo-cell').hover(function(){
		var imgH=R(this).find('img').css().first().height	//获取img高度，修复cover层的一个bug
		R(this).find('p').css('display','block');
		R(this).find('.img-cover').css('height',imgH+'px');
		R(this).find('.img-cover').css('display','block');
	},function(){
		R(this).find('p').css('display','none');
		R(this).find('.img-cover').css('display','none');
	})