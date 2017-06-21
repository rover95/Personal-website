//相应菜单按钮
	R('.min-nav').toggle(function(){
		R('.head-menu').css('display','block')
	},function(){
		R('.head-menu').css('display','none')
	})


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


	//登录框
	// $('.all-cover img').center(400,250).resize(function(){   
	// 	//$().getid('login').center(400,250);		
	// })
	R('.all-cover .close').click(function(){                	//登录框关闭·
		R('.all-cover').css('display','none');
		// document.documentElement.style.overflow="auto";
	})
	
	R('.photo-cell').click(function(){				    		//登录框显示
		var src=R(this).find('img').first().src;
		R('.all-cover img').first().src=src;
		var w=R('.all-cover img').first().width;
		var h=R('.all-cover img').first().height;
		var vw=document.body.clientWidth;
		var vh=document.body.clientHeight;
		console.log((vw/w)*0.8*h+'---'+0.9*vh)
		R('.all-cover img').css('width',85+'vw')
		R('.all-cover img').css('height','auto')
		// if(h*vw<vh*w){
		// 	R('.all-cover img').css('width',85+'vw')
		// 	R('.all-cover img').css('height','auto')
		// }else{
		// 	R('.all-cover img').css('height',90+'vh')
		// 	R('.all-cover img').css('width','auto')
		// }
		R('.all-cover').css('display','flex');		
			R('.all-cover img').animate({
				opacity:'0-100',
				oSpeed:100,
				oTime:20,
				oType:0,
				
			})	

		// document.documentElement.style.overflow="hidden";
		R('.all-cover').first().style.overflow="scroll"
	})