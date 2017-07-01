//相应菜单按钮
	R('.min-nav').toggle(function(){
		R('.head-menu').css('display','block')
	},function(){
		R('.head-menu').css('display','none')
	})


//轮播器
	var crs_num=1;  //图片位置
	var d=1;   	//运动方向
	var w=getStyle(R('#carousel img').first(),'width')
	//console.log(getStyle(R('#carousel img').first(),'width'))
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
		},2000)
	}
	interval();
	
//图片hover事件
	function imgHover(){
		R('.photo-cell').hover(function(){
			var imgH=R(this).find('img').css().first().height	//获取img高度，修复cover层的一个bug
			R(this).find('p').css('display','block');
			R(this).find('.img-cover').css('height',imgH+'px');
			R(this).find('.img-cover').css('display','block');
		},function(){
			R(this).find('p').css('display','none');
			R(this).find('.img-cover').css('display','none');
		})
	}
		


//图片点击放大
	function imgClick(){
		R('.photo-cell').click(function(){				    		//放大图显示
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
		R('.all-cover .close').click(function(){                	//放大图关闭·
			R('.all-cover').css('display','none');
			// document.documentElement.style.overflow="auto";
		})
	}
		


//动态生成图片
	
	// var imgHtml=`<div class="photo-cell">
	// 			<figure>
	// 				<div class="img-cover"></div>
	// 				<img src="${imgSrc}" alt="">
	// 				<figcaption>
	// 					<p>${imgName}</p>
	// 					<p>${imgDate}</p>
	// 				</figcaption>
	// 			</figure>
	// 		</div>`

	function img(node,src,name,date){
		node= node=='c'?'#column-center':node=='r'?'#column-right':node=='l'?'#column-left':'#column-left';
		var html= `<div class="photo-cell">
				<figure>
					<div class="img-cover"></div>
					<img src="${src}" alt="">
					<figcaption>
						<p>${name}</p>
						<p>${date}</p>
					</figcaption>
				</figure>
			</div>`

		html=html+R(node).html();
		R(node).html(html);
		imgHover();   //为自动生成的图片添加hover事件
		imgClick();	  //为自动生成的图片添加click事件
	}
	//img('l',imgSrc,imgName,imgDate);
	img('l','../img/rw001.jpg','the four','2017.6');
	img('c','../img/rw002.jpg','the four','2017.6');
	img('r','../img/xy001.jpg','夕阳','2016.9');
	img('l','../img/xy002.jpg','夕阳','2016.9');
	img('c','../img/xy003.jpg','夕阳','2017.4');
	img('r','../img/xy004.jpg','夕阳','2017.3');
	img('l','../img/xy005.jpg','夕阳','2016.12');
	img('c','../img/xy006.jpg','夕阳','2016.6');
	img('r','../img/jw001.jpg','静物','2016.12');
	img('l','../img/fg001.jpg','黄山银河','2016.8');
	img('c','../img/fg002.jpg','焦山','2017.5');
	img('r','../img/fg003.jpg','焦山','2017.5');



//微信二维码显示
	function wei(){
		R('.weixin').css('display','flex')
	}
	R('.weixin').bind('mousedown',function(){
		R('.weixin').css('display','none')
	})