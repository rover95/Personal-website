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
						<p>应用程序1</p>
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
		
		var n=R('.program').elements;
		for(let i=1,len=n.length;i<=len;i++){
			R('#pgmexe'+i).drag(R('#pgmexe'+i+' .pgm-head').last(),R('#pgmexe'+i+' .program').last());
		}
		console.log(n)


		//生产任务栏图标
		var taskExe=R('.task-box').html();
		var taskimg=R(this).find('img').first().src;
		taskExe+=`<div id="task${exeId}" class="task-exe hover">
						<img src="${taskimg}" alt="">
					</div>`
		R('.task-box').html(taskExe);
		pgm=R('.task-box').html();
	}else{
		R('#pgm'+exeId).css('z-index',99);
	}
		
	
})
R('.execlose').click(function(){			//关闭窗口
	console.log(R(this))
})