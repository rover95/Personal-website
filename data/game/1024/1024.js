"use strict";
//获取所有节点
var allNode=R('.up-box').child().elements[0];

//行数列数
var rr=4;
var cc=4;

//分数
var score=0;

var isMove=0;

//节点位置数值
function getX(elements){
	return elements['offsetLeft'];
}
function getY(elements){
	return elements['offsetTop'];
}
//获得0-n的随机数
function random(n){
	var num=Math.random();
	return parseInt(num*n);
}
//随机生成节点
function newNode(){
	if(isMove) return;
	var n=Math.random();
	var a=random(rr);
	var b=random(cc);
	if(allNode.length>=16){return null;}
	for(let i=0,len=allNode.length;i<len;i++){		
		//判断位置是否已有方块，如果有递归
		if(allNode[i].offsetLeft==a*120+20&&allNode[i].offsetTop==b*120+20){			
			newNode()
			return;			
		}
	}	
	var newDiv=document.createElement("div");
	newDiv.className='cell';
	newDiv.style.left=a*120+10+'px';
	newDiv.style.top=b*120+10+'px';
	newDiv.innerHTML= n<0.5?2:4;
	R('.up-box').first().appendChild(newDiv);
	allNode=R('.up-box').child().elements[0];
	color();
	getScore();

	isMove=1;		

}

//获取第n行节点
function row(nodes,n){
	var r=[];
	var p=n*120+20;
	for(let i=0,len=nodes.length;i<len;i++){
		if(nodes[i].offsetTop==p){
			r.push(nodes[i]);
		}
	}
	return r;
}
//获取第n列节点
function col(nodes,n){
	var c=[];
	var p=n*120+20;
	for(let i=0,len=nodes.length;i<len;i++){
		if(nodes[i].offsetLeft==p){
			c.push(nodes[i]);
		}
	}
	return c;
}
//获取节点数值
function val(node){
	return node.innerText;
}


//游戏开始
function begin(){
	score=0;
	R('.cover').css('display','none');
	R('.up-box').html('');
	newNode();
	newNode();
	R('.score').html('分数：0');
}
begin();
//游戏结束
function GameOver(){
	var isOver=true;	

	// var theR=row(allNode,3);
	// var theC1=col(theR,0)
	// var theC2=col(theR,1)
	// console.log(theC1[0].innerText)
	// console.log(theC2[0].innerText)
	// console.log(theC1[0].innerText==theC2[0].innerText)
	if(allNode.length==16){
		//判断每行是否有相同节点
		for(let i=0;i<rr;i++){
			var theR=row(allNode,i);
			for(let j=1;j<cc;j++){
				if(col(theR,j)[0].innerText==col(theR,j-1)[0].innerText){
					isOver=false;
				}
			}
		}
		//判断每列是否有相同节点
		for(let i=0;i<cc;i++){
			var theC=col(allNode,i);
			for(let j=1;j<rr;j++){
				if(row(theC,j)[0].innerText==row(theC,j-1)[0].innerText){
					isOver=false;
				}
			}
		}
		if(isOver){
			R('.cover').css('display','block');
		}
	}
		
	
}
//分数
function getScore(){
	var s='分数：'+score;
	R('.score').html(s);
}
//更新颜色
function color(){
	var n=allNode.length;
	for(let i=0;i<n;i++){
		let a=parseInt(allNode[i].innerText)
		allNode[i].className='cell bg-'+a
	}
}
//左移
function moveL(){
	for(let i=0;i<rr;i++){
		var theR=row(allNode,i);
		var bd=0;					//移动位置
		var last=null;
		for(let j=0;j<cc;j++){
			var theC=col(theR,j);
			if(theC.length!=0){
				if(last){			//如果前面有节点
					if(last.innerText==theC[0].innerText){	//是否与前一个节点相同
						theC[0].style.left=(bd-1)*120+10+'px';
						theC[0].innerText*=2;
						score+=parseInt(last.innerText);
						theC[0].parentNode.removeChild(last);
						last=theC[0];
					}else{
						theC[0].style.left=bd*120+10+'px';
						last=theC[0];
						bd++;
					}
					
				}else{
					theC[0].style.left=bd*120+10+'px';
					last=theC[0];
					bd++;
				}
				
			}
		}
	}
}
//右移
function moveR(){
	for(let i=0;i<rr;i++){
		var theR=row(allNode,i);
		var bd=3;					//移动位置
		var last=null;
		for(let j=cc-1;j>=0;j--){
			var theC=col(theR,j);
			if(theC.length!=0){
				if(last){			//如果前面有节点
					if(last.innerText==theC[0].innerText){	//是否与前一个节点相同
						theC[0].style.left=(bd+1)*120+10+'px';
						theC[0].innerText*=2;
						score+=parseInt(last.innerText);
						theC[0].parentNode.removeChild(last);
						last=theC[0];
					}else{
						theC[0].style.left=bd*120+10+'px';
						last=theC[0];
						bd--;
					}
					
				}else{
					theC[0].style.left=bd*120+10+'px';
					last=theC[0];
					bd--;
				}
				
			}
		}
	}
}
//上移
function moveT(){
	for(let i=0;i<cc;i++){
		var theC=col(allNode,i);
		var bd=0;					//移动位置
		var last=null;
		for(let j=0;j<rr;j++){
			var theR=row(theC,j);
			if(theR.length!=0){
				if(last){			//如果前面有节点
					if(last.innerText==theR[0].innerText){	//是否与前一个节点相同
						theR[0].style.top=(bd-1)*120+10+'px';
						theR[0].innerText*=2;
						score+=parseInt(last.innerText);
						theR[0].parentNode.removeChild(last);
						last=theR[0];
					}else{
						theR[0].style.top=bd*120+10+'px';
						last=theR[0];
						bd++;
					}
					
				}else{
					theR[0].style.top=bd*120+10+'px';
					last=theR[0];
					bd++;
				}
				
			}
		}
	}
}
//下移
function moveB(){
	for(let i=0;i<rr;i++){
		var theC=col(allNode,i);
		var bd=3;					//移动位置
		var last=null;
		for(let j=cc-1;j>=0;j--){
			var theR=row(theC,j);
			if(theR.length!=0){
				if(last){			//如果前面有节点
					if(last.innerText==theR[0].innerText){	//是否与前一个节点相同
						theR[0].style.top=(bd+1)*120+10+'px';
						theR[0].innerText*=2;
						score+=parseInt(last.innerText);
						theR[0].parentNode.removeChild(last);
						last=theR[0];
					}else{
						theR[0].style.top=bd*120+10+'px';
						last=theR[0];
						bd--;
					}
					
				}else{
					theR[0].style.top=bd*120+10+'px';
					last=theR[0];
					bd--;
				}
				
			}
		}
	}
}

R(document).bind('transitionend',newNode);
//方向键移动
R(document).bind('keydown',function(e){
	//console.log(e.keyCode)
	if(e.keyCode==37 || e.keyCode==65){
		moveL();
		isMove=0;
	}
	if(e.keyCode==39 || e.keyCode==68){
		moveR();	
		isMove=0;	
	}
	if(e.keyCode==38 || e.keyCode==87){
		moveT();
		isMove=0;			
	}
	if(e.keyCode==40 || e.keyCode==83){
		moveB();
		isMove=0;			
	}
	GameOver();
})

//滑动
var X0=0;
var Y0=0;
document.ontouchstart=function(e){
	X0=e.touches[0].screenX;
	Y0=e.touches[0].screenY;	
}
document.ontouchmove=function(e){
	e.preventDefault()
}
document.ontouchend=function(e){
	//判断滑动方向
	var x=e.changedTouches[0].screenX;
	var y=e.changedTouches[0].screenY;
	var a=x-X0;
	var b=y-Y0;
	//alert(a+ '\n'+b)
	if(a<0 && Math.abs(a)>Math.abs(b)){   //left
		moveL();
		newNode()
	}else if(a>0 && Math.abs(a)>Math.abs(b)){   //right
		moveR();
		newNode()
	}else if(b<0 && Math.abs(a)<Math.abs(b)){   //top
		moveT();
		newNode()
	}else if(b>0 && Math.abs(a)<Math.abs(b)){   //bottom
		moveB();
		newNode()
	}
	GameOver(); 
}

R('#r-start').click(function(){
	begin();
})












//function moveT(){
// 	for(let i=0;i<rr;i++){
// 		let theC=col(allNode,i);
// 		let bd=0;					//移动位置
// 		let last=null;
// 		for(let j=0;j<cc;j++){
// 			let theR=row(theC,j);
// 			if(theR.length!=0){
// 				if(last){			//如果前面有节点
// 					if(last.innerText==theR[0].innerText){	//是否与前一个节点相同
// 						console.log(last.innerText+'  '+theR[0].innerText)
// 						theR[0].style.top=(bd-1)*120+10+'px';
// 						theR[0].innerText*=2;
// 						score+=parseInt(last.innerText);
// 						theR[0].parentNode.removeChild(last);
// 						last=theR[0];
// 					}else{
// 						theR[0].style.top=bd*120+10+'px';
// 						last=theR[0];
// 						bd++;
// 					}					
// 				}else{
// 					theR[0].style.top=bd*120+10+'px';
// 					last=theR[0];
// 					bd++;
// 				}
				
// 			}
// 		}
// 	}
// }