//首页背景图自适应
if(window.screen.height*16<9*window.screen.width){
	R('.p1').css('background-size','100% auto')
}

//相应菜单按钮
R('.min-nav').toggle(function(){
	R('.head-menu').css('display','block');
	R('.min-nav').first().src='../icon/menu.png';
},function(){
	R('.head-menu').css('display','none');
	R('.min-nav').first().src='../icon/menu-h.png';
})
//微信二维码显示
function wei(){
	R('.weixin').css('display','flex')
}
R('.weixin').bind('mousedown',function(){
	R('.weixin').css('display','none')
})



//设备信息
var device=navigator.userAgent.toLowerCase();
//当前页面
var page = "resume";
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
			url:'http://rover95.date/php/index.php',
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