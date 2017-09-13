//前台调用
function R(args){
	return new Get(args);
}


//基础库
function Get(args){
	//创建保存获取来节点的数组
	this.elements=[];
	//如果args为字符串执行选择器，为对象返回对象，为函数执行addDomLoaded(args)
	if(typeof args=='string'){
		//模拟<CSS></CSS>
		if(args.indexOf(' ')!=-1){           				//空格首次出现的位置
			var splits=args.split(' ');      				//将实参字符串分割成数组
			var childElements=[];
			var node=[];					 				//存放父节点
			for (var i = 0; i < splits.length; i++) {
				if (node.length==0)node.push(document);     //第一次获取父节点为空
				switch(splits[i].charAt(0)){
					case'#':
						childElements=[];
						childElements.push(this.getid(splits[i].substring(1)));
						node=childElements;
						break;
					case'.':
						childElements=[];
						for (var j = 0; j < node.length; j++) {
							var temps=this.getclass(splits[i].substring(1),node[j]);
							for (var k = 0; k < temps.length; k++) {
								childElements.push(temps[k]); 
							}
						}
						node=childElements;
						break;
					default:
						childElements=[];
						for (var j = 0; j < node.length; j++) {
							var temps=this.gettag(splits[i],node[j]);
							for (var k = 0; k < temps.length; k++) {
								childElements.push(temps[k]); 
							}
						}
						node=childElements;
				}
			}
			this.elements=childElements;
		}else{
		//父节点已存在，从父节点中再获取节点            	
		//模拟find
			switch(args.charAt(0)){         //charAt() 方法可返回指定位置的字符
				case'#':
					this.elements[0]=this.getid(args.substring(1))
					break;
				case'.':
					this.elements=this.getclass(args.substring(1))
					break;
				default:
					this.elements=this.gettag(args); 
			}
		}	
	}else if(typeof args=='object'){
		this.elements[0]=args;
	}else if(typeof args=='function'){
		addDomLoaded(args);
	}
}

//调试
function t(a){
	if(a==undefined){
		alert('ok');
	}else{
		console.log(a);
	}
}






//方法-动画变化

Get.prototype.animate=function(obj){

	//说明：  输入attr会产生形状大小变化，输入opacity产生透明度变化，可以实现从指定位置移动到指定位置，可匀速或减速
	//        其中速度代表每次变化1/speed ，数值越大变化速度越慢;同时可以改变透明度,使用attr前必须对元素
	//   	  进行绝对定位
	// attr 			//方向x,y   或者	大小w,h		        默认left	
	// step				//步长	    							默认10
	// start 			//开始位置 								默认当前位置
	// time				//间隔时间  							默认100ms
	// target			//必填，目标位置=开始位置+移动距离		默认当前位置
	// alter			//移动距离
	// speed 			//速度      							默认10
	// type       	    //0表示匀速，1表示减速              	默认减速
	// opacity :'10-90'	//透明度 10变到90   
	// oSpeed           //透明度变化速度      					默认10	
	// oTime           	//透明度间隔时间						默认100ms
    // fn				//队列动画,动画结束执行   							 
	//trform 			//旋转动画
						// trform:{
						// 			axis:'z',                   旋转轴
						// 			origin:'50-50',				旋转中心
						// 			deg:'270-720',				旋转角度
						// 			sTime:20,					时间间隔
						// 			sSpeed:10                   速度
						// 		}
	for (var i = 0; i < this.elements.length; i++){
		var element=this.elements[i];
		var attr=obj['attr']=='x'?('left'):obj['attr']=='y'?'top':  				//方向x，y   或者	大小w,h		
				 obj['attr']=='w'?'width':obj['attr']=='h'?'height':
				 obj['attr']!=undefined?obj['attr']:0;

		var step=obj['step']!=undefined?obj['step']:10;								//步长	
		var start=(obj['start']!=undefined)?obj['start']:getStyle(element,attr);	//开始位置
		var time=obj['time']!=undefined?obj['time']:'100';							//间隔时间
		var target=obj['target']!=undefined?obj['target']:  					  //必填，目标位置=开始位置+移动距离
				   obj['alter']!=undefined?obj['alter']+start:start; 
		
		var speed=obj['speed']!=undefined?obj['speed']:10;   						//速度
		var type=obj['type']==0?0:obj['type']==1?1:1           						//0表示运输，1表示减速
		
		var o=obj['opacity']!=undefined?obj['opacity']:undefined;				//透明度
		var oSpeed=obj['oSpeed']!=undefined?obj['oSpeed']:10;				//透明度变化速度
		var oTime=obj['oTime']!=undefined?obj['oTime']:100;					//透明度变化间隔时间
	
		var trform=obj['trform'];   										 //旋转

		var mul=obj['mul'] 													//同步动画
		
		if(mul==undefined){
			mul={};             //fuck
			mul[attr]=target;
		}
		//同步动画
		if(mul!=null){

				//移动,大小动画
				element.style[mul[attr]]=start+'px';
				if(start>mul[target])step=-step;
				clearInterval(element.timer); //防止重复调用timer,速度越来越快
				element.timer=setInterval(function(){                        				  // 循环调用函数
					  //element.style[attr]=getStyle(element,attr)+step+'px';   //放在if前面在大于target时，同时变为target				
					var bool=true;                //判断是否所有动画执行完
					for(var i in mul){
						attr=(i=='x'?'left':i=='y'?'top':
						i=='w'?'width':i=='h'?'height':i)
						target=mul[i];
						
						var clearT=function (){
							element.style[attr]=target+'px';
							
							if(bool){
								clearInterval(element.timer);
								if(obj.fn)obj.fn();
							}							
						}
						if(type==1){
							step=(target-getStyle(element,attr))/speed;
							step=step>0?Math.ceil(step):Math.floor(step);
						}else{
							step=start>mul[target]?-10:10;
						}
						if(step==0){
							clearT();
						}
						if(step>0&&getStyle(element,attr)+step>=target){
							clearT();
						} 
						else if(step<0&&getStyle(element,attr)+step<=target){
							clearT();
						}else{
							element.style[attr]=getStyle(element,attr)+step+'px';
						} 
						if(parseInt(getStyle(element,attr))!=parseInt(target))bool=false;

						//document.getElementById('hjk').innerHTML+=getStyle(element,attr)+'<br>'	
					}      
				},time)
			}		
			
		//透明度
		if(o!=undefined){
			var temp=o.split('-')
			//如果第一位是空格，则取当前值
			if(temp[0]!=' '){
				temp[0]=parseFloat(temp[0]);
			}
			temp[1]=parseFloat(temp[1]);
			var oStep=10;
			if(obj['oType']==0)type=0;
			if(typeof temp[0]=='number')element.style.opacity=temp[0]/100;
			//alert(getStyle(element,'opacity','toStr'))
			var clearT2=function (){          //清理函数
					element.style['opacity']=temp[1]/100;
					clearInterval(element.opy);
					if(obj.fn)obj.fn();	

				}
			clearInterval(element.opy);            //intersting
			element.opy=setInterval(function(){
				
				//如果采用减速模式
				if(type==1){
					oStep=(temp[1]-parseFloat(getStyle(element,'opacity','toStr'))*100)/oSpeed;
					oStep=oStep>0?Math.ceil(oStep):Math.floor(oStep);  //取整
					
				}else{
					oStep=(temp[1]-parseFloat(getStyle(element,'opacity','toStr'))*100)>0?5:-5

				}
				if(oStep==0){
					clearT2();
				}
				if(oStep>0&&(parseFloat(getStyle(element,'opacity','toStr'))+oStep/100>=temp[1]/100)){
					clearT2();
				} 
				else if(oStep<0&&(parseFloat(getStyle(element,'opacity','toStr'))+oStep/100<=temp[1]/100)){
					clearT2();
				}else{
					element.style['opacity']=parseFloat(getStyle(element,'opacity','toStr'))+(oStep/100)
				} 
				//document.getElementById('asd').innerHTML+=getStyle(element,'opacity','toStr')+'<br>'

				
				
			},oTime)
		}

		//旋转
		if(trform!=undefined){
			var axis=trform['axis'];
			var origin=trform['origin'].split('-');
			var deg=trform['deg'].split('-');
			var sTime=trform['sTime']?trform['sTime']:100;
			var sSpeed=trform['sSpeed']!=undefined?trform['sSpeed']:10;
			var sStep=trform['sStep']?trform['sStep']:10;
			if(trform['sType']==0)type=0;
			if(deg[0]!=' '){
				deg[0]=parseFloat(deg[0]);
			}
			deg[1]=parseFloat(deg[1]);
			// t(origin[0]+'%'+' '+origin[1]+'%')
			element.style['transform-origin']=origin[0]+'%'+' '+origin[1]+'%';
			if(typeof deg[0]=='number')element.style.transform='rotate'+axis+'('+deg[0]+'deg)';
			// t(+element.style.transform.match(/\d+/)[0])
			
			var clearT3=function (){          //清理函数
					element.style['transform']='rotate'+axis+'('+deg[1]+'deg)';
					clearInterval(element.trf);
					if(obj.fn)obj.fn();	  //队列动画	
					 
				}
			clearInterval(element.trf);
			
			element.trf=setInterval(function(){
				var n_deg=+element.style.transform.match(/\d+/)[0];
				if(type==1){

					sStep=(deg[1]-n_deg)/sSpeed;
					sStep=sStep>0?Math.ceil(sStep):Math.floor(sStep);  //取整
					
				}else{
					sStep=(deg[1]-n_deg)>0?sStep:-sStep

				}
				if(sStep==0){
					clearT3();
				}
				if(sStep>0&&(n_deg+sStep>=deg[1])) {
					clearT3();
				} 
				else if(oStep<0&&(n_deg+oStep<=deg[1])){
					clearT3();
				}else{
					element.style['transform']='rotate'+axis+'('+(n_deg+sStep)+'deg)' 
				} 
				//document.getElementById('asd').innerHTML+=+element.style.transform.match(/\d+/)[0]+'<br>'
			},sTime)



		}
		
	}//for	
	
}
//方法-DOM加载完毕
Get.prototype.ready=function(fn){
	addDomLoaded(fn);
}
//方法-定时器
Get.prototype.timing=function(fn){
	for (var i = 0; i < this.elements.length; i++){
		var element=this.elements[i];
		element.timing=setInterval(fn)
			
	}
	return this;
}
//方法-触发窗口改变事件
Get.prototype.resize=function(fn){
	for (var i = 0; i < this.elements.length; i++){
		var element=this.elements[i];
		window.onresize=function(){
			fn();
			if(document.documentElement.clientWidth-element.offsetLeft<element.offsetWidth){
				element.style.left=document.documentElement.clientWidth-element.offsetWidth+'px';
			}
			if(document.documentElement.clientHeight-element.offsetTop<element.offsetHeight){
				element.style.top=document.documentElement.clientHeight-element.offsetHeight+'px';
			}
		}
		
	}
	return this;
}
//方法-物体居中
Get.prototype.center=function(width,height){
	if((typeof width=='number') && (typeof height=='number')){
		var top=(document.documentElement.clientHeight-height)/2;
		var left=(document.documentElement.clientWidth-width)/2;
		if(top<70)top=70;
		if(left<0)left=0;
		for (var i = 0; i < this.elements.length; i++){
		 	this.elements[i].style.top=top+'px';
		 	this.elements[i].style.left=left+'px';
		}			
 	}else t('输入有误');
	return this;
}
//方法-显示方法
Get.prototype.show=function(){
	for (var i = 0; i < this.elements.length; i++){
		this.elements[i].style.display='block';
	}
	return this;
}
//方法-隐藏方法
Get.prototype.hide=function(){
	for (var i = 0; i < this.elements.length; i++){
		this.elements[i].style.display='none';

	}
	return this;
}
//方法-鼠标移入移出方法
Get.prototype.hover=function(over,out){
	for (var i = 0; i < this.elements.length; i++){
		this.elements[i].onmouseover=over;
		this.elements[i].onmouseout=out;
	};
	return this;
}
//方法-鼠标点击切换
Get.prototype.toggle=function(){
	for (var i = 0; i < this.elements.length; i++){
			// (function (element,args){
			// 	var count=0;
			// 	addEvent(element,'click',function(){
			// 		args[count++%args.length].call(this);
			// 	})
			// })(this.elements[i],arguments)

     //定义这个函数的目的是为了使每次点击不同对象都生成一个新的计数器count
			var fun = function(element,args){          
				var count=0;
				addEvent(element,'click',function(e){
					args[count++%args.length].call(this,e);//e传递触发事件
				})			
		}
		fun(this.elements[i],arguments)	
	};
	return this;
}
//方法-删除link或style的CSS规则
Get.prototype.removerule=function(num,index){
	var sheet=document.styleSheets[num];
	if(typeof sheet.deleteRule!='undefined'){
		sheet.deleteRule(index)
	}else if(typeof sheet.removeRule!='undefined'){
		sheet.removeRule(index)
	}
	return this;
}
//方法-添加link或style的CSS规则
Get.prototype.addrule=function(num,selectText,cssText,position){
	var sheet=document.styleSheets[num];
	if(typeof sheet.insertRule!='undefined'){
		sheet.insertRule(selectText+'{'+cssText+'}',position)
	}else if(typeof sheet.addRule!='undefined'){
		sheet.addRule(selectText,cssText,position)
	}
	return this;
}
//方法-删除class
Get.prototype.removeclass=function(classname){
	for (var i = 0; i < this.elements.length; i++){
		if(this.elements[i].className.match(new RegExp('(\\s|^)'+classname+'(\\s|$)'))){
			this.elements[i].className= this.elements[i].className.replace(new RegExp('(\\s|^)'+classname+'(\\s|$)'),'')
		}
	};
	return this;
}
//方法-添加class
Get.prototype.addclass=function(classname){
	for (var i = 0; i < this.elements.length; i++){
		if(!this.elements[i].className.match(new RegExp('(\\s|^)'+classname+'(\\s|$)'))){
			this.elements[i].className+=' '+classname
		}
	};
	return this;
} 
//方法-CSS
Get.prototype.css=function(se,vl){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==1){
			if(typeof this.elements[i].currentStyle!='undefined'){          //IE
				return this.elements[i].currentStyle[se];	
			}else if(typeof window.getComputedStyle!='undefined'){          //W3C
				return window.getComputedStyle(this.elements[i],null)[se];
			}
		}
		this.elements[i].style[se]=vl;
	}
	return this; 
	}
//方法-HTML
Get.prototype.html=function(str){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){
			return this.elements[i].innerHTML
		}
		this.elements[i].innerHTML=str;
	}
	return this;
}
//方法-事件绑定
Get.prototype.bind=function(ev,fn){
	 for(var i=0;i<this.elements.length;i++){
		addEvent(this.elements[i],ev,fn)
	}
	return this;
}
//方法-事件删除
Get.prototype.removeEvent=function(ev,fn){
	 for(var i=0;i<this.elements.length;i++){
		removeEvent(this.elements[i],ev,fn)
	}
	return this;
}
//方法-获取焦点事件
Get.prototype.focus=function(fn){
	 for(var i=0;i<this.elements.length;i++){
		this.elements[i].onfocus=fn;
	}
	return this;
}
//方法-失去焦点事件
Get.prototype.blur=function(fn){
	 for(var i=0;i<this.elements.length;i++){
		this.elements[i].onblur=fn;
	}
	return this;
}
//方法-键盘按下事件
Get.prototype.keydown=function(fn){
	for(var i=0;i<this.elements.length;i++){
		document.onkeydown=fn;
	}
	return this;
}
//方法-键盘松开事件
Get.prototype.keyup=function(fn){
	for(var i=0;i<this.elements.length;i++){
		document.onkeyup=fn;
	}
	return this;
}
//方法-点击事件
Get.prototype.click=function(fn){
	for(var i=0;i<this.elements.length;i++){
		addEvent(this.elements[i],'click',fn)
	}	
	return this;
}
//方法自由缩放
Get.prototype.zoom=function(classN,marginX,marginY){//classN为点击可缩放的元素节点，marginX，Y为容器的边距
	for(var i=0,len=this.elements.length;i<len;i++){
		addEvent(this.elements[i],'mousedown',function(e){
			target=e.target||e.srcElement;
			if(classN==target.className){
				var pgm=this;
				var pb=R(pgm).find('.pgm-body').first();
				var ox=pgm.offsetLeft + marginX;         //鼠标点击点坐标	
				var oy=pb.offsetTop+ pgm.offsetTop + marginY;
				// console.log(pb.offsetTop)
				document.onmousemove=function(e){
					var nx=e.clientX;
					var ny=e.clientY;
					var x=nx-ox;
					var y=ny-oy;
					if(x<240){x=240;}
					pgm.style.width=x+'px'; 	
					pb.style.height=y+'px';
				}
				document.onmouseup=function(){
					document.onmousemove=null;
					document.onmouseup=null;
				}
			}else{
				//console.log(target.className)
			}
		})
	}
}





//获取

//获取-元素某一个属性
Get.prototype.attr=function(attr){
	return this.elements[0][attr]
}
//获取-返回节点在父节点中的位置
Get.prototype.childNum=function(){
	for(var i=0;i<this.elements.length;i++){
		var parent=this.elements[i].parentNode
		for(var j=0;j<parent.children.length;j++){
			if(parent.children[j]==this.elements[i]){
				return j;
			}
		} 
	}	
}
//获取节点find方法
Get.prototype.find=function(str){
	var childElements=[];
	for(var i = 0; i < this.elements.length; i++){
		switch(str.charAt(0)){
			case'#':
				childElements.push(document.getElementById(str.substring(1)))
				break;
			case'.':
				// var alli=this.elements[i].getElementsByTagName('*');
				// for(var j= 0; j < alli.length; j++){
				// 	if(alli[j].className==str.substring(1)){
				// 		childElements.push(alli[j]);
				// 	};				
				// };
				var allc=this.getclass(str.substring(1),this.elements[i])
				for(var j=0;j<allc.length;j++){
					childElements.push(allc[j]); 
				}
				break;
			default:
				// var alli=this.elements[i].getElementsByTagName(str);
				// for(var j= 0; j < alli.length; j++){
				// 		childElements.push(alli[j]);				
				// };
				var allt=this.gettag(str,this.elements[i])
				for(var j=0;j<allt.length;j++){
					childElements.push(allt[j]);
				}
		};
	};
	this.elements=childElements;
	return this;	
}
//获取ID节点
Get.prototype.getid=function(id,parentNode){
	if(parentNode!=undefined){
		node=parentNode;
	}else{
		node=document;
	};
	return node.getElementById(id);
} 
//获取标签节点
Get.prototype.gettag=function(tag,parentNode){
	var temps=[];
	if(parentNode!=undefined){
		node=parentNode;
	}else{
		node=document;
	};
	var allt=node.getElementsByTagName(tag);
	for(var i=0;i<allt.length;i++){
		temps.push(allt[i]);   	
	}
	return temps;
}

//获取class节点
Get.prototype.getclass=function(classname,parentNode){
	var node=null;
	var temps=[];        //临时节点
	if(parentNode!=undefined){
		node=parentNode;
	}else{
		node=document;
	};
	var all=node.getElementsByTagName('*');
	for(var i = 0; i < all.length; i++){
		if(new RegExp('(\\s|^)'+classname+'(\\s|$)').test(all[i].className)) {
			temps.push(all[i]);
		};
	};
	return temps;
}
//获取当前节点的同级下一个节点
Get.prototype.next=function(){
	for (var i = 0; i < this.elements.length; i++){
		this.elements[i]=this.elements[i].nextSibling;
		
		if(this.elements[i]==null)throw new Error('none node');
		if(this.elements[i].nodeType==3)this.next();
	}

	return this
}
//获取非文本子节点
Get.prototype.child=function(){
	for (var i = 0; i < this.elements.length; i++){
		var node=this.elements[i].childNodes;
		for(var j=0;j < node.length;j++){
			if(node[j].nodeType==3){
				node[j].parentNode.removeChild(node[j]);
			}	
		}
		this.elements[i]=node;	
	}
	return this
}
//获取父节点
Get.prototype.parent=function(){
	for (var i = 0; i < this.elements.length; i++){
		this.elements[i]=this.elements[i].parentNode;	
	}
	return this
}
//获取第n个节点
Get.prototype.getnum=function(num){
	var element=this.elements[num];
	this.elements=[];
	this.elements[0]=element;
	return this;
}
//获取第n个节点,并返回这个节点
Get.prototype.getnumOne=function(num){
	return this.elements[num];	
}
//获取第一个节点,并返回这个节点
Get.prototype.first=function(){
	return this.elements[0];
}
//获取最后一个节点,并返回这个节点
Get.prototype.last=function(){
	return this.elements[this.elements.length-1];
}
//调用函数
Get.prototype.do=function(fn){
	fn();
}




//调用插件
Get.prototype.extend=function(name,fn){
	Get.prototype[name]=fn;
}
























































// //获取class下的标签
// Get.prototype.gettagclass=function(classname,tag){
// 	var all=document.getElementsByTagName('*');
// 	var allclass=new  NodeList;
// 	for(var i = 0; i < all.length; i++){
// 		if(all[i].className==classname){
// 			allclass.push(all[i]);
// 		};
// 	};
// 	alert(typeof allclass)
// 	for(var i=0;i<allclass.getElementsByTagName(tag).length;i++){       //allclass不是节点集合
// 		this.elements.push(allclass.getElementsByTagName(tag)[i]);   	
// 	}
// 	return this;
// }