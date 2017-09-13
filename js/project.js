//浏览器检测
Testing();
//chrome  text-shadow  渲染有问题
if(sys.chrome){
	R('.exe-box p').css('text-shadow','none')
}





//全屏显示
var desk=document.documentElement;
function fullscreen(){
	if (desk.requestFullscreen) {   			//W3C
		desk.requestFullscreen(); 
	}else if(desk.mozRequestFullScreen){		//firefox
		desk.mozRequestFullScreen(); 
	}else if(desk.webkitRequestFullScreen){		//chrome
		desk.webkitRequestFullScreen(); 
	}else if(elem.msRequestFullscreen){			//IE11
		elem.msRequestFullscreen();
	}
}


R('#exe1').drag(R('#exe1 .exe-cover').last());      //图标拖拽
R('#exe2').drag(R('#exe2 .exe-cover').last());
R('#exe3').drag(R('#exe3 .exe-cover').last());
R('#exe4').drag(R('#exe4 .exe-cover').last());
R('#exe5').drag(R('#exe5 .exe-cover').last());
R('#exe6').drag(R('#exe6 .exe-cover').last());
R('#exe7').drag(R('#exe7 .exe-cover').last());
R('#exe9').drag(R('#exe9 .exe-cover').last());
R('#exe11').drag(R('#exe11 .exe-cover').last());
//R('.program').drag(R('.pgm-head').last(),R('.program').last());		 //程序框拖拽

var whlt=[];    //存储将要缩小的窗口的大小，位置
var z=10;
//双击事件打开窗口
R('.exe-box').bind('dblclick',function(e){
	var exeId=R(this).first().id;
	var _this=this;
	// console.log(_this.attributes["target"]);
	//是否在当前页面打开
	if(_this.attributes["target"]&&_this.attributes["target"].value=='_blank'){
		window.open(_this.attributes["pageurl"].value);

	}else{

		openPgm(exeId,_this);
	}
	
})

//创建程序窗口
function openPgm(exeId,_this){	
	var pgm=R('.pgm-box').html()
	var pageurl=_this.attributes["pageurl"].value;
	var pgmName=R(_this).find('p').html();
	//console.log(R(_this).find('p').html())
	//如果要生成的程序窗口不存在，则生成
	if(!R('#pgm'+exeId).elements[0]){
		pgm+=`<div id="pgm${exeId}" class="program">
				<div class="pgm-head">
					<div class="head-left">
						<img src="../icon/exe1.png" alt="">
						<p>${pgmName}</p>
					</div>
					<div class="head-right">
						<p class="execlose"></p>
						<p class="exemax"></p>
						<p class="exemin"></p>
					</div>
				</div>
				<div class="pgm-menu">
					<ul>
						<li>文件</li>
						<li>编辑</li>
						<li>查找</li>
						<li>帮助</li>
					</ul>
				</div>
				<div class="pgm-body">
					<iframe src="${pageurl}" frameborder="0"></iframe>
				</div>
				<div class="pgm-zoom"></div>
			</div><br/>`
		R('.pgm-box').html(pgm);
		//不同程序不同位置
		var num=exeId.match(/\d?$/)
		num=parseInt(num[0])
		var sw=100;
		var sh=10;
		if(document.body.clientWidth<480){
			sw=10;
			sh=10;
		}
		R('#pgm'+exeId).css('left',sw+num*20+'px').css('top',sh+num*20+'px')
		//绑定拖拽事件
		var n=R('.program').elements;
		for(var i=0,len=n.length;i<len;i++){
			var id=n[i].id.match(/\d+/)
			//拖拽
			R('#pgmexe'+id[0]).drag(R('#pgmexe'+id+' .pgm-head').last(),R('#pgmexe'+id+' .program').last());
			//提层
			R('.program').click(function(){R(this).css('z-index',z++)})
			//缩放功能
			R('#pgmexe'+id[0]).zoom('pgm-zoom',10,0);

			// console.log(R('#pgmexe'+id[0]))
		}
		//console.log(n)


		//生成任务栏图标
		var taskExe=R('.task-box').html();
		var taskimg=R(_this).find('img').first().src;
		taskExe+=`<div id="task${exeId}" class="task-exe">
						<img src="${taskimg}" alt="">
					</div>`
		R('.task-box').html(taskExe);
		//点击任务栏最小化,还原事件
		R('.taskbar .task-exe').click(function(e){
			var parent=R(this).elements[0].id.match(/\d+/);
			var num=parseInt(parent);
			parent=R('#pgmexe'+parent).elements[0];
			taskMinMax(parent,num)
		})
		

		//关闭窗口	
		R('.execlose').click(function(){	
			//获取最外层父节点
			var parent=R(this).elements[0].parentElement.parentElement.parentElement;	
			parent.style['display']='none';
			//关闭任务栏图标
			var tid=parent.id.match(/\d+/);
			R('#taskexe'+tid).css('display','none')
		})

		//点击叉最小化窗口	
		R('.exemin').click(function(){
			var parent=R(this).elements[0].parentElement.parentElement.parentElement;
			min(parent);
		})

		//点击最大化跳转新窗口
		R('.exemax').click(function(){
			window.open(pageurl);
		})
		

	}else{	
		R('#pgm'+exeId).css('z-index',z++);
		R('#pgm'+exeId).css('display','block');
		R('#task'+exeId).css('display','block');
	}	
}
	



//去掉默认的contextmenu事件，否则会和右键事件同时出现。
document.oncontextmenu = function(e){
    e.preventDefault();
};


//右键菜单
R('.pgm-box').bind('mouseup',function(e){
	if(e.button ==2){//右键
		var x=e.clientX;
		var y=e.clientY;
		R('#Pmenu').elements[0].style.left=x + 'px';
		R('#Pmenu').elements[0].style.top=y + 'px';
        R('#Pmenu').css('display','block');
        R('#Emenu').css('display','none');

        

    }else if(e.button ==0){//左键
        R('#Pmenu').css('display','none');
    }else if(e.button ==1){//滚轮    
    }
})
//程序右键菜单
R('.exe-box').bind('mousedown',function(e){
	if(e.button==2){
		var x=e.clientX;
		var y=e.clientY;
		var _this=this;
		R('#Pmenu').css('display','none')
		R('#Emenu').elements[0].style.left=x + 'px';
		R('#Emenu').elements[0].style.top=y + 'px';
        R('#Emenu').css('display','block');
        R('.pgm-box').click(function(){
			R('#Emenu').css('display','none');
        })
        //打开按钮
        R('#E-open').click(function(){
			var exeId=R(_this).first().id;
			console.log('a')
			openPgm(exeId,_this);
        })
        //刷新按钮
        R('.f5').click(function(){
        	location.reload(true);   
        })
	}else {		
		R('#Emenu').css('display','none');
	}
})
//右键刷新
// R('.f5').click(function(){
// 	window.location.reload();  
// })
//右键全屏
R('#fullP').click(function(){
	if (desk.requestFullscreen) {   			//W3C
		desk.requestFullscreen(); 
	}else if(desk.mozRequestFullScreen){		//firefox
		desk.mozRequestFullScreen(); 
	}else if(desk.webkitRequestFullScreen){		//chrome
		desk.webkitRequestFullScreen(); 
	}else if(elem.msRequestFullscreen){			//IE11
		elem.msRequestFullscreen();
	}
})
//开始菜单
R('begin-box img').click(function(){
	if(R('.begin-menu').css('display')=='none'){
		R('.begin-menu').css('display','flex');
	}else{
		R('.begin-menu').css('display','none');
	}
		
})
R(document).click(function(e){
	if(e.target==R('.pgm-box').first()){
		R('.begin-menu').css('display','none');
	}
})


//任务栏时间
var date=new Date();
var ymd=date.getFullYear()+'年'+date.getMonth()+'月'+date.getDate()+'日';
var timeStr=date.toTimeString().substring(0,5);
R('.task-date p').html(timeStr);
R('.task-date').first().title=ymd;	
setInterval(function(){
	date=new Date();
	timeStr=date.toTimeString().substring(0,5);
	R('.task-date p').html(timeStr);
},10000)

//read me
R('#exe9').click(function(){
	R(this).find('img').removeclass('shake-constant');
})
R('#exe9').bind('dblclick',function(){
	R(this).css('top','20px');
})
//ajax刷新页面
// ajax({
// 	type:'get',
// 	url:'photo.html',
// 	success:function(data){
// 		R('.ifr-box').html(data)
// 	}
// })










//窗口最小化
function min(parent){		//parent为要缩小的窗口节点
	var ol=parent.getBoundingClientRect().left;
	var ot=parent.getBoundingClientRect().top;
	var ow=parent.offsetWidth;
	var oh=parent.offsetHeight;
	var tid=parent.id.match(/\d+/);
	var l=R('#taskexe'+tid).elements[0].getBoundingClientRect().left;
	var t=R('#taskexe'+tid).elements[0].getBoundingClientRect().top;
	whlt[tid]={
		w:ow,
		h:oh,
		l:ol,
		t:ot
	}
	R(parent).animate({
		alter:150,
		time:1,
		mul:{
			w:25,
			h:10,
			x:l,
			y:t
		},
		fn:function(){
			R(parent).css('display','none');
		}
	})

}
//窗口放大还原
function max(parent,num){
	R(parent).css('display','block')
		R(parent).animate({
			alter:300,
			time:1,
			mul:{
				w:whlt[num].w,
				h:whlt[num].h-20,//不知道哪里多出20px来
				x:whlt[num].l,
				y:whlt[num].t
			}
		})
}
//任务栏图标控制放大缩小
function taskMinMax(parent,num){
	//console.log(getStyle(R(parent).elements[0],'display','toStr'))
	if(getStyle(R(parent).elements[0],'display','toStr')=='block'){
		min(parent)
	}else{
		max(parent,num)
	}		
		
	
}	



//设备信息
var device=navigator.userAgent.toLowerCase();
//当前页面
var page = "project";
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