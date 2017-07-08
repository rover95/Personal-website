"use strict";
//获取所有节点
var allNode=R('.up-box').child().elements[0];

//行数列数
var rr=4;
var cc=4;

//分数
var score=0;


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

}
// newNode()

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



//游戏结束
function isGame(){
	if(allNode.length==16){
		R('.cover').css('display','block')
	}
	
}
//游戏开始
function begin(){
	R('.cover').css('display','none');
	R('.up-box').html('');
	newNode();
	newNode();
}//分数
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
	for(let i=0;i<rr;i++){
		var theC=col(allNode,i);
		var bd=0;					//移动位置
		var last=null;
		for(let j=0;j<cc;j++){
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
					last=theC[0];
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


R(document).bind('keydown',function(e){
	if(e.keyCode==37){
		moveL();
		newNode()		
	}
	if(e.keyCode==39){
		moveR();
		newNode()
	}
	if(e.keyCode==38){
		moveT();
		console.log(allNode.length)
		newNode()
	}
	if(e.keyCode==40){
		moveB();
		newNode()
	}
})
R(document).click(function(){
	moveL();
	setTimeout(function(){
		newNode()
		console.log(allNode.length)
	},210)
})











//更新视图
function upData(){
	for(let r=0;r<rr;r++){
		for(let c=0;c<cc;c++){
			if(stt[r][c]!=0){

			}
		}
	}
}

//获取当前节点位置

//左移一格
// function tl(){
// 	var a=game.allNode[0];
// 	console.log(a)

// }
// tl()