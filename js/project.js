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
			</div><br/>`
		R('.pgm-box').html(pgm);
		//不同程序不同位置
		var num=exeId.match(/\d/)
		num=parseInt(num[0])
		R('#pgm'+exeId).css('left',100+num*20+'px').css('top',50+num*20+'px')
		//绑定拖拽事件
		var n=R('.program').elements;
		for(let i=0,len=n.length;i<len;i++){
			var id=n[i].id.match(/\d/)
			
			R('#pgmexe'+id[0]).drag(R('#pgmexe'+id+' .pgm-head').last(),R('#pgmexe'+id+' .program').last());
			R('.program').click(function(){
				R(this).css('z-index',z++)
			})

			// console.log(R('#pgmexe'+id[0]))
		}
		//console.log(n)


		//生成任务栏图标
		var taskExe=R('.task-box').html();
		var taskimg=R(this).find('img').first().src;
		taskExe+=`<div id="task${exeId}" class="task-exe hover">
						<img src="${taskimg}" alt="">
					</div>`
		R('.task-box').html(taskExe);
		var taskhtml=R('.task-box').html();

		//关闭窗口	
		R('.execlose').click(function(){	
			//获取最外层父节点
			var parent=R(this).elements[0].parentElement.parentElement.parentElement;	
			parent.style['display']='none';
			//关闭任务栏图标
			var tid=parent.id.match(/\d/);
			R('#taskexe'+tid).css('display','none')
		})
		//最小化窗口
		R('.exemin').click(function(){
			var parent=R(this).elements[0].parentElement.parentElement.parentElement;
			var ol=parent.getBoundingClientRect().left;
			var ot=parent.getBoundingClientRect().top;
			var ow=parent.offsetWidth;
			var oh=parent.offsetHeight;
			var tid=parent.id.match(/\d/);
			var l=R('#taskexe'+tid).elements[0].getBoundingClientRect().left;
			var t=R('#taskexe'+tid).elements[0].getBoundingClientRect().top;
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
					R(parent).css('left',ol+'px').css('top',ot+'px').css('width',ow+'px').css('height',oh+'px');
					console.log(ol)
				}
			})
			
		})

	}else{
		R('#pgm'+exeId).css('z-index',z++);
		R('#pgm'+exeId).css('display','block');
		R('#task'+exeId).css('display','block');
	}
			
})

