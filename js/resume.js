//跳转页面
function goOtherPage(){
	R('body').html("<p style='text-align:center;margin-top:50vh'>已有工作，暂不公开</p>")
	setTimeout(function(){
		window.location.href="../index.html"
	},2000)
}
//goOtherPage();	

//首页背景图自适应
if (document.body.clientWidth * 9 >= 16 * document.body.clientHeight){
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