//跨浏览器绑定事件
	addEvent.ID=1;
	function addEvent(obj,type,fn){          

	//obj-执行的对象  type-事件名  fn-要执行的函数
		if(typeof obj.addEventListener!='undefined'){
			obj.addEventListener(type,fn,false);
		}else{
			if(!obj.events)obj.events={};     //哈希表
			if(!obj.events[type]){
				obj.events[type]=[];
					if(obj['on'+type]){        //有何用？
						obj.events[type][0]=fn;
					}else {
						if(addEvent.eq(obj.events[type],fn))return false;  //删除相同事件函数
					};	  
			};
			obj.events[type][addEvent.ID++]=fn;
			obj['on'+type]=addEvent.exec
		};
	};
	//循环执行事件函数
	addEvent.exec=function(event){
		var e=event||window.event;
		var es=this.events[e.type];
		for(var i in es){
			es[i].call(this,e)          //????
		}
	}
	//删除相同事件函数
	addEvent.eq=function(es,fn){
		for(var i in es){
			if(es[i]==fn)return true;
		}
	}

//跨浏览器删除事件
function removeEvent(obj,type,fn){
	if(typeof obj.removeEventListener!='undefined'){
		obj.removeEventListener(type,fn,false);
	}else{
		for(var i in obj.events[type]){
			if(obj.events[type][i]==fn)delete obj.events[type][i];
		}
	}
}
//浏览器检测
	function Testing(){
		window.sys={};         //使外部可以访问
		var userA=navigator.userAgent.toLowerCase();   //获取浏览器信息
		if((/firefox\/([\d\.]+)/).test(userA)){
			s=userA.match(/firefox\/([\d\.]+)/);
			sys.firefox=s[1];
		}
		if((/msie ([\d\.]+)/).test(userA)){
			s=userA.match(/msie ([\d\.]+)/);
			sys.ie=s[1];
		}
		if((/chrome\/([\d\.]+)/).test(userA)){
			s=userA.match(/chrome\/([\d\.]+)/);
			sys.chrome=s[1];
		}
	};
	Testing();
//DOM加载
function addDomLoaded(fn){
	var timer=null;
	var isReady=false;
	function readygo(){
		if(isReady) return;
		isReady=true;+
		fn();
	}
	if(sys.firefox&&sys.firefox<3){
		timer=setInterval(function(){
			//if(document&&document.getElementById&&document.getElementsByTagName&&document.body)
			if(/loaded|complete/.test(document.readyState))
			readygo();
		},1)
	}else if(document.addEventListener){
		addEvent(document,'DOMContentLoaded',function(){
			fn();
			removeEvent(document,'DOMContentLoaded',arguments.callee)  //arguments.callee返回匿名函数function
		});
	} else{
		timer=setInterval(function(){
			try{
				document.documentElement.doScroll('left');
				fn();
			}catch(e){};
		});
	}
}
//跨浏览器获取style,返回数值
function getStyle(element,attr,toStr){
	if(typeof window.getComputedStyle!='undefined'){
		if(toStr!='toStr')
			return parseInt(window.getComputedStyle(element,null)[attr]);
		else 
			return window.getComputedStyle(element,null)[attr];
	}
	else if(typeof element.currentStyle!='undefined'){
		if(toStr!='toStr')
			return parseInt(element.currentStyle[attr]);
		else 
			return element.currentStyle[attr];
	}
}
//跨浏览器添加link规则
function insertRule(sheet,selectorText,cssTexs,position){
	if(typeof sheet.insertRule!='undefined'){
		sheet.insertRule(selectorText+'{'+cssTexs+'}',position);
	}else if(typeof sheet.addRule!='undefined'){
		sheet.addRule(selectorText,cssTexs,position);
	}	
}
//切换点击事件 
function tog(element,fn1,fn2){
	var count=[];   //用于来回切换点击事件,单击不同对象生成不同计数器
	$(element).click(function(){
		var index = $(element).index($(this))
		if(count[index]==undefined){
			count[index]=0;
		}
		if(count[index]==0){
			fn1();	
			count[index]=1;
		}else {
			fn2();
			count[index]=0;
		}	
		
	})
}



//ajax序列化函数
function addparam(param,name,value){
	if(typeof param=='string'){
		var url=param;
		url+=(url.indexOf('?')==-1?"?":"&");
		url+=encodeURIComponent(name)+ "=" + encodeURIComponent(value);
		return url;
	}else if(typeof param=='object'){
		var data=''
		for(var i in param){
			data=addparam(data,i,param[i])
		}
		data=data.substring(1,data.length);
		return data
	}
		
}
//ajax提交
function ajax(obj){
	var xhr=new XMLHttpRequest();
	var time = new Date().getTime();
	if(obj.type=='post'){
		var data=addparam(obj.data)
		xhr.open("post",obj.url+"?_="+time,true);
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xhr.send(data);
		
	}else{
		var url=obj.url;
		url=addparam(url,'name','god');
		xhr.open("get",url,true);
		xhr.send(null);
	}
	xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				obj.success(xhr.responseText)	
			}
	}
	
}









