 
//插件-拖拽
//当加载base_drag时，自动调用以下extend函数，在Get()中创建Get.prototype.drag()函数
$().extend('drag',function(){						//tags是一个文本节点,arguments是函数形参集合,既可拖动的区域
	var tags=arguments;									
	//for (var i = 0; i < this.elements.length; i++){     
		this.elements[0].onmousedown=function(e){
			var tof=false;							//tof，为true可以拖动，false不可拖动
			if(tags!=undefined){
				target=e.target||e.srcElement
				for (var i = 0; i < tags.length; i++) {
					if(target==tags[i]){              //判断被拖动区域中被点击点有没有与tags中相同的节点
						tof=true;

						break;
					};
				};
			}else tof=true;
			if(tof){          
			var logindiv=this;
			var mX=e.clientX-logindiv.offsetLeft;         //鼠标点击点在div中的距离
			var mY=e.clientY-logindiv.offsetTop;
				document.onmousemove=function(e){
					var left=e.clientX-mX;                
					var top=e.clientY-mY;
					if(left<0)left=0;
					if(top<0)top=0;
					if(left>document.documentElement.clientWidth-logindiv.offsetWidth)left=document.documentElement.clientWidth-logindiv.offsetWidth;
					if(top>document.documentElement.clientHeight-logindiv.offsetHeight)top=document.documentElement.clientHeight-logindiv.offsetHeight;
					logindiv.style.left=left+'px';
					logindiv.style.top=top+'px';
				};
				document.onmouseup=function(){
					document.onmousemove=null;
					document.onmouseup=null;
				};
			}
			
		}
	//}
	return this;
})
