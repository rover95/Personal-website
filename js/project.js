var desk=document.documentElement;


//全屏显示
// R(document).click(function(){
// 	if (desk.requestFullscreen) {   			//W3C
// 		desk.requestFullscreen(); 
// 	}else if(desk.mozRequestFullScreen){		//firefox
// 		desk.mozRequestFullScreen(); 
// 	}else if(desk.webkitRequestFullScreen){		//chrome
// 		desk.webkitRequestFullScreen(); 
// 	}else if(elem.msRequestFullscreen){			//IE11
// 		elem.msRequestFullscreen();
// 	}
// })

R('#exe1').drag(R('#exe1 .exe-cover').last());      //图标拖拽
R('#exe2').drag(R('#exe2 .exe-cover').last());
//R('.program').drag(R('.pgm-head').last(),R('.program').last());		 //程序框拖拽

var whlt=[];    //存储将要缩小的窗口的大小，位置
var z=10;
//双击事件打开窗口
R('.exe-box').bind('dblclick',function(e){
	//R('.program').css('display','block');
	//console.log(R(this).first().id);
	var exeId=R(this).first().id;
	var pgm=R('.pgm-box').html()
	//如果要生成的程序窗口不存在，则生成
	if(!R('#pgm'+exeId).elements[0]){
		pgm+=`<div id="pgm${exeId}" class="program">
				<div class="pgm-head">
					<div class="head-left">
						<img src="../icon/exe1.png" alt="">
						<p>应用程序${exeId}</p>
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
				<div class="pgm-body"></div>
				<div class="pgm-zoom"></div>
			</div><br/>`
		R('.pgm-box').html(pgm);
		//不同程序不同位置
		var num=exeId.match(/\d/)
		num=parseInt(num[0])
		R('#pgm'+exeId).css('left',100+num*20+'px').css('top',50+num*20+'px')
		//绑定拖拽事件
		var n=R('.program').elements;
		for(var i=0,len=n.length;i<len;i++){
			var id=n[i].id.match(/\d/)
			//拖拽
			R('#pgmexe'+id[0]).drag(R('#pgmexe'+id+' .pgm-head').last(),R('#pgmexe'+id+' .program').last());
			//提层
			R('.program').click(function(){R(this).css('z-index',z++)})
			//缩放功能
			R('#pgmexe'+id[0]).zoom('pgm-zoom',10,65);

			// console.log(R('#pgmexe'+id[0]))
		}
		//console.log(n)


		//生成任务栏图标
		var taskExe=R('.task-box').html();
		var taskimg=R(this).find('img').first().src;
		taskExe+=`<div id="task${exeId}" class="task-exe">
						<img src="${taskimg}" alt="">
					</div>`
		R('.task-box').html(taskExe);
		//点击任务栏最小化,还原事件
		R('.taskbar .task-exe').click(function(e){
			var parent=R(this).elements[0].id.match(/\d/);
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
			var tid=parent.id.match(/\d/);
			R('#taskexe'+tid).css('display','none')
		})

		//点击叉最小化窗口	
		R('.exemin').click(function(){
				var parent=R(this).elements[0].parentElement.parentElement.parentElement;
				min(parent)	
		})

		

		}else{
			R('#pgm'+exeId).css('z-index',z++);
			R('#pgm'+exeId).css('display','block');
			R('#task'+exeId).css('display','block');
		}

          
})//双击事件



//去掉默认的contextmenu事件，否则会和右键事件同时出现。
document.oncontextmenu = function(e){
    e.preventDefault();
};
// document.getElementById("exe1").onmousedown = function(e){
//     if(e.button ==2){
//          alert("你点了右键");
//     }else if(e.button ==0){
//           alert("你点了左键");
//       }else if(e.button ==1){
//          alert("你点了滚轮");
//       }
//   }










//窗口最小化
function min(parent){		//parent为要缩小的窗口节点
	var ol=parent.getBoundingClientRect().left;
	var ot=parent.getBoundingClientRect().top;
	var ow=parent.offsetWidth;
	var oh=parent.offsetHeight;
	var tid=parent.id.match(/\d/);
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
		time:5,
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
			alter:200,
			time:5,
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