//首页背景图自适应
if(window.screen.height*16<9*window.screen.width){
	R('.p1').css('background-size','100% auto')
}

//相应菜单按钮
R('.min-nav').toggle(function(){
	R('.head-menu').css('display','block');
	R('.min-nav').first().src='../icon/menu.png';
},function(){
	R('.head-menu').css('display','none');
	R('.min-nav').first().src='../icon/menu-h.png';
})

