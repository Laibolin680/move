// 变宽、变高、字体大小、边框属性、透明度
//元素，属性，目标，回调函数
// startMove(obj,{attr1:iTarget1,attr2:iTarget2},fn)
function startMove(obj,json,fn){
	var flag = true; //假设
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		for(var attr in json){
			//1、取当前值
			var icur = 0;
			if (attr == 'opacity') {
				icur = parseFloat(getStyle(obj,attr))*100;
				// Math.round();实现四舍五入
			}
			else{
				icur = parseInt(getStyle(obj,attr));
			}
			//2、计算速度
			var speed = (json[attr]-icur)/10;
			speed = speed > 0?Math.ceil(speed):Math.floor(speed);
			//3、检测停止
			if (icur != json[attr]) {
				flag = false;
			}
			if (attr == 'opacity') {
				//IE
				obj.style.filter = 'alpha(opacity:'+(icur + speed)+')';
				//火狐、chrome
				obj.style.opacity = (icur + speed)/100;
			}
			else{
				obj.style[attr] = icur+speed+'px';
			}
			if (flag) {
				clearInterval(obj.timer);
				if (fn) {
					fn();
				}
			}
			
		}
	},30)
}

// 获取样式的封装函数
function getStyle(obj,attr){
	if (obj.currentStyle) {
		//ie
		return obj.currentStyle[attr];
	}
	else{
		//firefox
		return getComputedStyle(obj,false)[attr];
	}
}