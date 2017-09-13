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
			//console.log((vw/w)*0.8*h+'---'+0.9*vh)
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

	//存储图片的代码的全局变量
	var imghtml={
		l:'',
		c:'',
		r:''
	}
	function img(node,src,name,date){
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

		imghtml[node]+=html;
	}
//微信二维码显示
	function wei(){
		R('.weixin').css('display','flex')
	}
	R('.weixin').bind('mousedown',function(){
		R('.weixin').css('display','none')
	})

//添加图片
	img('l','../img/xy003.jpg','夕阳','2017.4');
	img('c','../img/rw001.jpg','THE FOUR','2017.6');
	img('c','../img/rw002.jpg','THE FOUR','2017.6');
	img('r','../img/xy001.jpg','夕阳','2016.9');
	img('l','../img/xy002.jpg','夕阳','2016.9');
	img('r','../img/xy004.jpg','夕阳','2017.3');
	img('l','../img/xy005.jpg','夕阳','2016.12');
	img('c','../img/xy006.jpg','夕阳','2016.6');
	img('r','../img/jw001.jpg','静物','2016.12');
	img('l','../img/fg001.jpg','黄山银河','2016.8');
	img('c','../img/fg002.jpg','焦山','2017.5');
	img('r','../img/fg003.jpg','焦山','2017.5');
	img('l','../img/fg004.jpg','金山','2016.12');
	img('c','../img/fg005.jpg','科大秋','2016.10');
	img('r','../img/fg006.jpg','科大四季','2015-2016');
	img('l','../img/fg007.jpg','四川宝兴','2016.2');
	img('c','../img/fg008.jpg','焦山','2017.3');
	img('r','../img/fg009.jpg','苏州常熟','2016.7');
	img('l','../img/xy007.jpg','金山湖','2016.6');
	img('c','../img/xy008.jpg','金山湖','2016.6');
	img('r','../img/xy009.jpg','金山湖','2016.6');
	img('l','../img/xy010.jpg','金山湖','2016.6');
	img('c','../img/xy011.jpg','金山湖','2016.6');
	img('r','../img/jw002.jpg','光绘','2016.2');
	img('r','../img/jw003.jpg','光绘','2016.2');
	img('l','../img/fg010.jpg','黄山鲫鱼背','2016.8');
	img('c','../img/fg011.jpg','黄山迎客松','2016.8');
	img('r','../img/fg012.jpg','黄山','2016.8');
	img('l','../img/fg013.jpg','芦山思延乡','2016.2');
	img('c','../img/fg014.jpg','芦山思延乡','2016.2');
	img('r','../img/fg015.jpg','科大春','2016.4');
	img('l','../img/rw003.jpg','RX','2016.1');
	img('l','../img/rw004.jpg','THE FOUR','2017.6');
	img('c','../img/rw005.jpg','THE FOUR','2017.6');
	img('l','../img/rw006.jpg','THE FOUR','2017.6');
	img('l','../img/rw007.jpg','THE FOUR','2017.6');
	img('c','../img/rw008.jpg','THE FOUR','2017.6');
	img('c','../img/rw009.jpg','THE FOUR','2017.6');
	img('r','../img/jw004.jpg','桌面','2017.2');
	img('r','../img/jw005.jpg','夜景','2016.9');
	img('r','../img/jw006.jpg','dog','2017.2');
	img('l','../img/xy012.jpg','苏州常熟','2016.7');
	img('c','../img/xy013.jpg','苏州常熟','2016.7');
	img('r','../img/xy014.jpg','金山湖','2016.7');
	img('l','../img/xy015.jpg','金山公园','2015.12');
	img('c','../img/xy016.jpg','苏州常熟','2016.7');
	img('r','../img/xy017.jpg','金山公园','2016.4');
	img('r','../img/xy018.jpg','金山公园','2016.4');
	img('c','../img/xy019.jpg','苏州常熟','2016.7');
	img('c','../img/xy020.jpg','芦山','2016.7');
	img('c','../img/xy021.jpg','金山公园','2016.4');
	img('c','../img/xy022.jpg','金山公园','2016.4');
	img('l','../img/xy023.jpg','长江日落','2015.12');
	img('l','../img/xy024.jpg','江科大','2015.12');
	img('l','../img/xy025.jpg','金山公园','2015.12');
	img('l','../img/xy026.jpg','金山湖','2015.12');
	img('c','../img/rw010.jpg','牌桌','2016.3');
	img('c','../img/rw011.jpg','RX','2016.5');
	img('c','../img/rw012.jpg','RX','2016.5');
	img('l','../img/rw013.jpg','RX','2016.6');
	img('l','../img/rw014.jpg','RX','2017.6');
	img('l','../img/rw015.jpg','夜景','2016.5');
	img('l','../img/rw016.jpg','西津渡','2016.5');
	img('r','../img/fg016.jpg','黄山光明顶','2016.8');
	img('r','../img/fg017.jpg','上海外白渡桥','2016.9');
	img('r','../img/fg018.jpg','金山','2016.10');
	img('r','../img/fg019.jpg','黄山银河','2016.8');
	img('r','../img/fg020.jpg','苏州常熟','2016.7');
	img('r','../img/fg021.jpg','苏州常熟','2016.7');
	img('c','../img/fg022.jpg','镇江','2016.5');
	img('c','../img/fg023.jpg','镇江润州区','2016.5');
	

	function showAll(){
		R('#column-left').html(imghtml.l);
		R('#column-center').html(imghtml.c);
		R('#column-right').html(imghtml.r);
		imgHover();   //为自动生成的图片添加hover事件
		imgClick();	  //为自动生成的图片添加click事件
	}
	showAll()

//显示不同类别图片
	R('.photo-nav li').click(function(e){
		switch(this.innerHTML){
			case "人物":
				showAll()
				showPhoto("rw");
				break;
			case "风光":
				showAll()
				showPhoto("fg");
				break;
			case "静物":
				showAll()
				showPhoto("jw");
				break;
			case "夕阳":
				showAll()
				showPhoto("xy");
				break;
		}
		
	})

	function showPhoto(type){
		var img=R('.photo-cell').elements;
		var iType=[];
		var p=0;	//位置左中右
		//显示所有
		R('#column-left').html(imghtml.l);
		R('#column-center').html(imghtml.c);
		R('#column-right').html(imghtml.r);
		imgHover();   //为自动生成的图片添加hover事件
		imgClick();	  //为自动生成的图片添加click事件
		// //隐藏其他分类
		// for(var i=0,len=img.length;i<len;i++){
		// 	if(!getSrc(img[i]).match(type)){
		// 		R(img[i]).css("display","none")
		// 	}
		// }
		for(var i=0,len=img.length;i<len;i++){
			if(getSrc(img[i]).match(type)){
				iType.push(img[i])
			}
		}
		//console.log(R('#column-left').elements[0].childNodes)
		R('#column-left').html('')
		R('#column-center').html('')
		R('#column-right').html('')
		//R('#column-left').elements[0].appendChild(iType[3])
		for (var i = 0; i < iType.length; i++) {
			p= i%3==0?'#column-left':i%3==1?'#column-center':i%3==2?'#column-right':'#column-left'
			addImg(p,iType[i])
		};

	}
	//获取SRC
	function getSrc(ele){
		return ele.getElementsByTagName('img')[0].src
	}
	function addImg(p,img){
		R(p).elements[0].appendChild(img)
	}


	
		//设备信息
		var device=navigator.userAgent.toLowerCase();
		//当前页面
		var page = "photo";
		//搜狐ip接口
		var ipBySohu=returnCitySN["cip"];
		var res={};
		ajax({
			url:'http://freegeoip.net/json/',
			success:function(data){
				//res= eval('('+data+')');
				//data=data+'';
				//console.log(data);
				ajax({
					url:'http://139.196.85.218/data-pw/index.php',
					type:'post',
					data:{
						"json":data,
						"sohu":ipBySohu,
						"device":device,
						"page":page
					},
					success:function(res){
						console.log(res);
						//R('body').html(res);
					}
				})
			}
		})