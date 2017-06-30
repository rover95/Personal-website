

       //BOM
// var a=prompt('in 5',0);
// if(a>7){
// 	if(confirm('sure>5'))alert('out 5')
// 		else close()
// }else alert('ok')

// var a=prompt('num',0)
// // if(a>4)open();
// for (var i = 0; i < a; i++) {
// 	open()
// }

// alert(window.length)

// open('http://www.tudou.com/','tudou','width=100,height=100,top=100,left=50,toolbar=yes,menubar=yes')

// setTimeout('alert(123)',3000)

// location.search='?id=5'	

// alert(navigator.userAgent)

// for (var i = 0; i < navigator.plugins.length; i++) {                   //显示插件
// 	document.write('插件:' + navigator.plugins[i].name + '<br/>') 
// 	document.write('说明:' + navigator.plugins[i].description + '<br/>') 
// 	document.write('<br>')
// };



// function Box(a){                                 //私有变量通过接口访问
// 	var a=a;
// 	this.__proto__.get=function (){
// 		return a;
// 	}
// 	Box.prototype.set=function (b){
// 		a=b;

// 	}

// }
// var box=new Box(5);
// alert(box.get())
// box.set(6)
// alert(box.get())

// var box=function (){                                //自我执行
// 	return 5;
// }();
// alert(box)

// function box(){                                    //匿名函数 闭包 ！！！！
// var arr=[];
// for(var i=0;i<5;i++){
// 	arr[i]=(function (i) {
// 		return function (){
// 			return i;
// 		}
// 	})(i);
// }
// 	return arr;
// }
// var b=box();
// for(var i=0;i<5;i++){
// alert(b[i]())
// }

// function box(){                                    //匿名函数在循环中的值！！！！
// var arr=[];
// for(var i=0;i<5;i++){
// 	arr[i]=(function () {
// 		return i;
// 	})();
// }
// 	return arr;
// }
// var b=box();
// for(var i=0;i<5;i++){
// alert(b[i])
// }

// function Box(a,b){                                        //构造函数 + 原型
// 	this.a=a;
// 	this.b=b;
// 	// this.run=function run(){
// 	// 	return a+b;
// 	// }
// 	Box.prototype.c=44;
// 	if(typeof this.run!='function'){
// 		alert('bg')
// 	this.__proto__.run=function run(){
// 		return a+b;
// 	}
// }
// alert('end')

// }
// var box1=new Box(2,3)

// var box2=new Box(4,8)
// alert(typeof box1.constructor)
// alert(box1.run())
// alert(box2.run())

// function Box(a,b){                                      构造函数
// 	this.user=a;
// 	this.age=b;
// 	this.run=function(){
// 		return this.age;
// 	};
// }
// var box= new Box('hhh',999);
// // alert(box.run); 
// var b=new Object();
// Box.call(b,'www',111);                                对象冒充
// alert(b.run())


// var box='asdHASdhlasdAKSD';
// alert(String.toLowerCase('asdHASdhlasdAKSD'))

// var box='sdfsdrdfhgdfrdasdasrgxcaras';
// var b=' ';
// var s=0;
// for (var i = 0; i < box.length; i++) {
// 	if(i<=s)continue;
// 	s=box.indexOf('r',i);
// 	if(s>0)b=b+'\n'+s;

// };
//  alert(b);


// indexOf('r',i)
// alert(box.substr(2,5));

// function box(a,b){
// 	s=a+b;
// 	return s;
// }
// alert(box(1,2))
// d=8;
// alert(d)

// function s1(){
// 	function s2(){                           作用域
// 		return 1;
// 	}
// 	return 2;
// }
// alert(s1());


// var box=new String('aaa');
// var box=new Object();
// box.name='aaa';
// alert(box.arguments)



// function box(obj){                          不能按引用传参，只能按值
// 	obj.name='aaa';
// 	alert(obj.name);
// 	sum.name='ccc';
// 	sum2.name='fff'
// }

// function box2(obj){
// 	var sum2=new Object();
// 	sum2.name='ddd';
// }
// var sum=new Object();
// sum.name='bbb';
// box2(sum);
// box(sum);

// alert(sum.name)
// alert(sum2.name)

// var box1=new Object();
// box1.name='abc';
// var box2=new Object();
// box2.name='ccc';
// box2=box1;
// alert(box2.name);
// box1.name='aaa';
// alert(box2.name);
// box2.name='fff';
// alert(box1.name);

// function sum(a,b){
// 	return a+b;
// }
// function box(a,b){
// 	return sum(a,b);
// }
// alert(box(7,3));



// function sum(a,b){
// 	return a(b);
// }
// function box(a){
// 	return a+10;
// }
// var result=sum(box,10);
// alert(result);

// var pattern=/^\w+\.zip$|gz/g;
// var str='sadf.zip';
// alert(pattern.test(str));

// var str='this is box,and a box'
// alert(str.split(/ b/ig));

// var pattern=/^\w+\.zip|gz/g;
// var str='safds.zip';
// alert(str.replace(pattern,'<123>'));
// document.write(str.replace(pattern,'<123>'));

// alert(/box/i.test('Box'));

// var pattern=new RegExp('Box','i');                   正则表达式
// var str='box';
// alert(pattern.test(str));

// var box =new Date('6/32/2015');
// alert(box)

// function cpm(a,b){
// 	if(a<b){
// 		return -1;
// 	}else if(a>b){
// 		return 1;                  //sort函数对数值排序有问题，需先定义一个函数
// 	}else{
// 	 return 0;
// 	}
// }
// var box=[1,10,15,5];
// alert(box.sort(cpm));


// var box=['a','b','cdef'];
// box.push('end');
// alert(box.push());
// box.pop();
// alert(box.pop());


// var box =new Array(5,5,7,9);
// box.length=1;
// alert(box);     //printe   5

// var num='05'
// var a='bbBsd'>'abBc';
// alert('ok');


// for (var i = 0; i < 100; i++) {
// 	document.write(i);
// };
// for (var i = 20; i >= 10; i--) {
// 	document.write(666+'\r');
// };

// var box = {
// 	name:'abc',
// 	age:99,
// 	hhh:'aaa'
// }
// alert(box.name);
// alert('con');
// alert(typeof box);
// document.write(box.name);
// alert('end');

// function box(){
// 	return arguments[0] +'!'+ arguments[1] +'!'+ arguments[2];
// }
// alert(box(1,2));

// var box=new Object();
// alert(typeof box);


//
//     嗅探器
//
// var client =function (){
// 	var engine={
// 		ie:false,
// 		opera:false,
// 		chrome:false,
// 		firefox:false,
// 		ver:'',
// 		name:''
// 	};
// 	var browser={
// 		ie:false,
// 		opera:false,
// 		chrome:false,
// 		firefox:false,
// 		ver:'',
// 		name:''
// 	};
// 	//引擎判断
// 	var agent=navigator.userAgent;
// 	document.write(agent)
// 	if (/Gecko\/(\S+)/.test(agent)) {
// 		engine.firefox=true;
// 		engine.ver=RegExp['$1'];
// 		engine.name='firefox';
// 		alert(engine.name+' 版本号'+engine.v)
// 	}else if(/AppleWebKit\/(\S+)/.test(agent)){
// 		engine.chrome=true;
// 		engine.ver=RegExp['$1'];
// 		engine.name='chrome';
// 		alert(engine.name+' 版本号'+engine.v)
// 	}else if(/MSIE\s(\S+)/.test(agent)){
// 		engine.ie=true;
// 		engine.ver=RegExp['$1'];
// 		engine.name='Internet Explorer';
// 		alert(engine.name+' 版本号'+engine.v);
// 	};
// 	//系统判断
// 	if(/Window/.test(agent)){
// 		browser.ie=true;
// 		browser.name='Window'
// 		alert(browser.name)
// 	}

// 	return {
// 		engine:engine,
// 		browser:browser

// 	}

// }();



//DOM

window.onload=function (){ 
	// alert(document.getElementById('abc'));
	// alert(document.getElementsByTagName('abc'));
	// alert(document.getElementById('abc').getAttribute('style'));
	// alert(document.getElementById('abc').style);
	// alert(document.getElementsByTagName('li'));
	// var l=document.getElementsByTagName('li');
	// alert(l[4].innerHTML)
    // var box=document.getElementById('aaa')
    // alert(box.childNodes[0].nextSibling.nodeName)

    // var box=document.getElementById('abc');
    // var p=document.createElement('p')
    // var text=document.createTextNode('this p')
    // p.appendChild(text)
    // box.appendChild(p)
    // var aaa=document.getElementById('aaa')
    // var run=function (){
    // 	box.insertBefore(p,aaa)
    // }
    // setTimeout(run,2000)
    // alert(document.childNodes.length)


    //字符串反转
    // var aaa=bbb=new Array;
    // aaa='?abcdefg!'
    // for (var i = 0; i < aaa.length; i++) {
    //     bbb[aaa.length-i]=aaa[i]
    // };
    // alert(bbb.join(''));

    // var box=document.getElementById('abc');
    // var an=box.innerText;
    // alert(an)

    //DOM创建表格
   //  var body=document.getElementsByTagName('body')[0];
   //  var table=document.createElement('table');
   //  table.width=500;
   //  table.border=1;
   //  table.setAttribute('colro','red');
   //  var caption=document.createElement('caption');
   // // caption.innerHTML='表格名';

   //  var text=document.createTextNode('表格名字');
   //  caption.appendChild(text);

   // var tr=document.createElement('tr');
   // table.appendChild(tr);

   // var td=document.createElement('td');
   // tr.appendChild(td);
   // var td2=document.createElement('td');
   // tr.appendChild(td2);

   // td.innerHTML='the one';
   // td2.innerHTML='the two';

   //  table.appendChild(caption);
   //  body.appendChild(table);

   //HTML DOM 创建表格
    // var body=document.getElementsByTagName('body')[0];
    // var table=document.createElement('table');
    // table.width=500;
    // table.border=1;
    // table.setAttribute('colro','red');
    // table.createCaption().innerHTML='标题';
    // var thead=table.createTHead();
    // var tr=table.insertRow(0);
    // tr.insertCell(0).innerHTML='1';
    // tr.insertCell(1).innerHTML='2';
    // tr.insertCell(2).innerHTML='3';
    // body.appendChild(table);

    // alert(document.implementation.hasFeature('CSS5 ','5.0'));




    /////////////////////////////////DOM操作样式表////////////////////////////

    // //检查是否存在某个class
    // var box=document.getElementById('abc');
    // function hasC(box,cName){
    //   return box.className.match(new RegExp('(^|\\b)'+cName+'(\\b|$)'));
    // }
    // //添加一个class
    // function addC(box,cName){
    //   if(!hasC(box,cName)){
    //     box.className+=' '+cName;
    //   }
    // }
    // //删除一个class
    // function removeC(box,cName){
    //   if(hasC(box,cName)){
    //     box.className=box.className.replace(new RegExp('(^|\\b)'+cName+'(\\b|$)'),' ');
    //   }
    // }

    // addC(box,'ccc')
    // removeC(box,'aaa')
    //var box=document.getElementById('abc');
    // alert(box.scrollWidth+','+box.scrollHeight);
    // alert(box.clientWidth+','+box.clientHeight);
    //alert(box.offsetParent.tagName)
    //box.scrollLeft=1000;
    
    //动态加载JS
    // if(1){
    //   var script=document.createElement('script');
    //   script.type='text/javascript';
    //   // script.appendChild(document.createTextNode("alert('ok')"));
    //   script.text="alert('ok')"
    //   document.getElementsByTagName('head')[0].appendChild(script);
    // }

    //动态加载CSS
    // if(1){
    //   var style=document.createElement('style');
    //   style.type='text/javascript';
    //   style.appendChild(document.createTextNode(".bbb{color:blue}"));
    //   // style.text="alert('ok')"
    //   document.getElementsByTagName('head')[0].appendChild(style);
    // }

    //事件
    // var box=document.getElementById('abc');
    // alert(box )
    // box.onkeydown=run;
    // function run(){
    //   alert('ok');
    // }

    //按键ASCII码
    // document.onkeypress =function (evt){
    //   var e=evt||window.event;
    //   alert(e.charCode);  
    // }


    //事件切换函数
      // var box=document.getElementById('abc');
      // box.onclick=a;

      // function a(){
      //   box.className='aa';
      //   box.onclick=b

      // }
      // function b(){
      //   box.className='bb';
      //   box.onclick=a;
      // }


      //添加时间函数
      //  var box=document.getElementById('abc');
      // add(box,'click',c);
      // add(box,'click',a);

      // function a(){
      //   this.className='aa';
      //  this.onclick=b

      // }
      // function b(){
      //   this.className='bb';
      //   this.onclick=a;
      // }
      // function c(){
      //   alert('this is C')
      // }
      // function add(obj,type,fn){
      //   var save=null;
      //   if(typeof obj['on'+type]=='function'){
      //     save=obj['on'+type];
      //   };
      //   obj['on'+type]=function(){
      //     if(save)save();
      //     fn.call(this);
      //   }
      // };


      //现代事件绑定切换器
      // var box=document.getElementById('abc');
      // // box.addEventListener('click',c)
      // box.addEventListener('click',a,false);
      // function a(){
      //   this.className='aa';
      //   this.removeEventListener('click',a,false)
      //   this.addEventListener('click',b,false)

      // }
      // function b(){
      //   this.className='bb';
      //   this.removeEventListener('click',b,false)
      //  this.addEventListener('click',a,false)
      // }
      // function c(){
      //   alert('this is C')
      // }


      //屏蔽默认事件
      // var box=document.getElementById('abc');
      // box.oncontextmenu=function(evt){
      //   evt.preventDefault();
      //   var menu=document.getElementById('sp');
      //   menu.style.display='block'
      //   menu.style.top=(evt.clientY+'px');
      //   menu.style.left=(evt.clientX+'px')
      //   document.addEventListener('contextmenu',function(e){
      //     if(e.target+'a'!='[object HTMLDivElement]a')
      //     menu.style.display='none';
      //   },false)
      // }


      // addEventListener('beforeunload',function(evt){
      //   evt.preventDefault();
      // },false)


      // addEventListener('mousewheel',function(evt){
      //   alert(evt.wheelDelta)
      // })
      //  addEventListener('DOMMouseScroll',function(evt){
      //   alert(evt.detail)
      // })
      

      //键盘提交表单
      // var fm=document.getElementById('fm');
      // var bu=document.getElementById('bt');
      // bu.addEventListener('click',function(evt){
      //   evt.preventDefault();
      //   if (evt.ctrlKey && evt.keyCode==13)fm.submit();
      // },false)
      
      //选定文本
      // var fm=document.getElementById('fm');
      // var user=fm.elements['user'];
      // var but=document.getElementById('bt');
      // but.onclick=function(){
      //   fm.submit();
      // }
      // user.select()
      // user.focus()

      //过滤输入
      // var fm=document.getElementById('fm');
      // var user=fm.elements['user'];
      // user.style.imeMode='disabled';                              //禁用输入法
      // user.addEventListener('keypress',function(evt){
      //   if(!/\d/.test(String.fromCharCode(evt.charCode))&& evt.charCode>8)evt.preventDefault()
      // },false)
      // user.addEventListener('paste',function(evt){
      //   evt.preventDefault(); 
      // })

      // user.addEventListener('keyup',function(evt){             //删除输入法输入的非法字符
      //   this.value=this.value.replace(/[^\d]/g,'');
      // })

      
      var json='[{"aaa":"a","num":1},{"bbb":"b","num":2}]'
      // var box=eval(json)
      a=JSON.parse(json);
      b=JSON.stringify(a);
      alert(b)

}