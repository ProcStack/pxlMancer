//////// Desktop Movements
function imbixBotMove() {
	imbixTimer+=1;
	if(active<=0){
		percW=Math.abs(((mouseX)/sW)-.5)*2;
		percH=Math.abs(mouseY-sH*.25)/(sH*.75);
		totalPercBase=Math.max(percW,percH)*.5;
		totalPerc=totalPercBase*.7;//totalPercBase;

		startX=sW*.5;
		startY=sH*.25;
		noiseX=(Math.sin(imbixTimer/100+456)+Math.sin(imbixTimer/70+342)+Math.sin(imbixTimer/200+658))*(20-15*totalPerc);
		noiseY=(Math.cos(imbixTimer/90+10)+Math.cos(imbixTimer/130+212)+Math.cos(imbixTimer/300+84))*(20-15*totalPerc);
		
		if(touchCheck==0){
			xAnim=((startX*(1-totalPerc))+(mouseX*(totalPerc)))+noiseX;
			yAnim=((startY*(1-totalPerc))+(mouseY*(totalPerc)))+noiseY;
		}else{
			xAnim=startX+noiseX;
			yAnim=startY+noiseY;
		}
		outX=xAnim+offX;
		outY=yAnim+offY;
		imbix.style.left=outX;
		imbix.style.top=outY;
		
		posArray=imbixNetGen();
		
		if(mobile==0){
			imbixFieldMove(posArray);
		}
		setTimeout(imbixBotMove,50);
	}else{
		clearScreen(curCanvas);
	}
}

function imbixNetGen(){
		var xDiff=200;
		var yDiff=30;
		var yAdd=.3;
		var noiseMult=10;
		var noiseSpeed=.04;
		var noiseOffset=imbixTimer*noiseSpeed;
		var noiseYMult;
		var x,y,xPos,yPos,xTo,yTo,xNoise,yNoise,lineMult;
		var lineCount=[1,2,3,4,5,6,5,2];
		var gridColor=[120,200,160];
		var pointColor=[140,225,200];
		clearScreen(curCanvas);
		var pId=-1;
		var pPos=[];
		var pScale=[];
		var rowMult=[];
		var connectArray={
			0 : [1,2],
			1 : [3,4],
			2 : [4,5],
			3 : [6,7],
			4 : [7,8],
			5 : [8,9],
			6 : [10,11],
			7 : [11,12],
			8 : [12,13],
			9 : [13,14],
			10 : [15,16],
			11 : [16,17],
			12 : [17,18],
			13 : [18,19],
			14 : [19,20],
			15 : [21],
			16 : [21,22],
			17 : [22,23],
			18 : [23,24],
			19 : [24,25],
			20 : [25],
			21 : [22],
			22 : [26],
			23 : [26,27],
			24 : [27,25],
			25 : [],
			26 : [27]
			};
		
		for(y=0; y<lineCount.length;++y){
			for(x=0; x<lineCount[y];++x){
				pId+=1;
				rowMult.push(y);
				xPos=(x/lineCount[y])*(xDiff*lineCount[y]) + (sW-xDiff*(lineCount[y]-1))/2;
				yPos=y*yDiff + (sH-(lineCount.length+2)*yDiff)/2 + yAdd*y*y*y + sH/5;
				noiseYMult=(y+3)/(lineCount.length+3);
				xNoise=Math.sin(noiseOffset + x*31 + y*42 + pId + Math.cos( noiseOffset*1.5 - x*14 + y*51 - pId)*Math.cos(-noiseOffset*.8+x*56+y*26+pId)*3) * noiseMult*noiseYMult;
				yNoise=Math.cos(-noiseOffset + x*20 + y*32 - pId + Math.sin( -noiseOffset*.9 - x*45 + y*22 + pId)*Math.sin(noiseOffset*1.2+x*25+y*62+pId)*3) * noiseMult*1.5*noiseYMult;
				xPos+=xNoise;
				yPos+=yNoise;
				
				if(y == 0){
					yPos+=15;
				}else if(y == 1){
					yPos+=5;
				}else if(y==6 || y==7){
					if(lineCount[y]>2){
						if(x == 0 || x == lineCount[y]-1){
							yPos-=10;
						}
						if(x == 1 || x == lineCount[y]-2){
							yPos+=10;
						}
					}else{
						yPos-=5;
					}
				}else if(y==5){
					if(x==2){
						xPos-=5;
					}else if(x==3){
						xPos+=5;
					}
				}
				
				pPos.push(xPos);
				pPos.push(yPos);
				pScale.push((1+7*noiseYMult));
			}
		}
		for(y=0; y<Object.keys(connectArray).length;++y){
			for(x=0; x<connectArray[y].length;++x){
				xPos=pPos[y*2];
				yPos=pPos[y*2+1];
				xTo=pPos[connectArray[y][x]*2];
				yTo=pPos[connectArray[y][x]*2+1];
				lineMult=((rowMult[y]+3)/(lineCount.length+3));
				drawLine([xPos,yPos,xTo,yTo],3*lineMult,gridColor,1,0,curCanvas,[-1]);
			}
		}
		for(y=0; y<(pPos.length/2);++y){
			xPos=pPos[y*2];
			yPos=pPos[y*2+1];
			drawGeo([xPos,yPos],1,pScale[y],pointColor,1,-1,-1,curCanvas);
		}
		return pPos;
}

function maximizeImbix(){
	document.getElementById("activatedImbix").style.zIndex="1000";
	document.getElementById("activatedBG").style.zIndex="100";
	document.getElementById("activatedBG").style.visibility="visible";
	document.getElementById("clickField").style.zIndex="950";
	document.getElementById("clickField").style.visibility="visible";
	document.getElementById("activatedImbix").style.visibility="visible";
	document.getElementById("activatedImbix").style.height="100%";
	document.getElementById("activatedImbix").style.width="100%";
	imbix.style.zIndex="940";
}
function minimizeImbix(){
	document.getElementById("activatedImbix").style.zIndex="-1000";
	document.getElementById("activatedBG").style.zIndex="-900";
	document.getElementById("activatedBG").style.visibility="hidden";
	document.getElementById("clickField").style.zIndex="-950";
	document.getElementById("clickField").style.visibility="hidden";
	document.getElementById("activatedImbix").style.visibility="hidden";
	document.getElementById("activatedImbix").style.height="0%";
	document.getElementById("activatedImbix").style.width="0%";
	imbix.style.zIndex="-940";
}

//////// Activate Movements
function imbixBotActivate(){
	if(imbixClick == 1){
		imbixTimer+=1;
		noiseX=(Math.sin(imbixTimer/100+456)+Math.sin(imbixTimer/70+342)+Math.sin(imbixTimer/200+658))/20;
		noiseY=(Math.cos(imbixTimer/90+10)+Math.cos(imbixTimer/130+212)+Math.cos(imbixTimer/300+84))/20;
		noiseBlend=(Math.sin(imbixTimer/40+500)+Math.sin(imbixTimer/100+254)+Math.sin(imbixTimer/50+87))/6+.5;
		
		if(touchCheck==0){
			imbix.style.left=(mouseX*(noiseBlend/100)+(sW/2))+offX+noiseX;
			imbix.style.top=(mouseY*(noiseBlend/100)+(sH/2))+offY+noiseY;
		}else{
			imbix.style.left=(sW/2)+offX+noiseX;
			imbix.style.top=(sH/2)+offY+noiseY;
		}
		
		imbixFieldMove();
	}
}



//////// Imbix User Actions
function imbixMouseReact(){
	if(imbixClick == 1){
		
//var imbixPosX=0;
//var imbixPosY=0;
		if(touchCheck==0){
			imbix.style.left=(mouseX*(noiseBlend/50)+(sW/2)*(1-noiseBlend/50))+offX+noiseX/10;
			imbix.style.top=(mouseY*(noiseBlend/50)+(sH/2)*(1-noiseBlend/50))+offY+noiseY/10;
		}else{
			imbix.style.left=(sW/2)+offX+noiseX;
			imbix.style.top=(sH/2)+offY+noiseY;
		}
	}
}

//////// Field Movements
function imbixFieldMove(posArray){
	closest=9999;
	curClosest=curCommand;
	for(x=0; x<fieldCount;x++){
		curFielder="fielder"+x;
		objX= posArray[x*2];
		objY= posArray[x*2+1];
		objY=objY-20/(Math.sin(imbixTimer/50+x*20)*.5+.6)+20;
		alpha=objY/posArray[x*2+1];
		curObj=document.getElementById(curFielder);

		scaler=10*((Math.sin(imbixTimer/50+x*20)*.5+.6)*8+.001);
		drawGeo([objX,objY],1,scaler,[20,190,190,0,0,0],(.66*alpha),-1,-1,curCanvas);

		if(imbixOver==0){
			dist=Math.sqrt(Math.pow((objX+100)-mouseX,2)+Math.pow((objY+10)-mouseY,2));
			if(dist<closest){
				closest=dist;
				curClosest=curFielder;
			}
		}
	}
	if(imbixOver==0){
		if(curCommand != curClosest){
			curCounter=0;
		}else{
			curCounter+=1;
		}
		curCommand=curClosest;
		/* curObj=document.getElementById(curCommand);
		curObj.style.color="#008080"; */
	}
}

function imbixFieldClick(){
	if(curCounter<=(13+(3*doubleClick)) && lastCommand==curCommand){
		doubleClick+=1;
	}else{
		doubleClick=0;
	}
	curCounter=-5;

	fielder=document.getElementById(curCommand);
	divClicked=fielder.getAttribute('fieldObj');
	if(doubleClick){
		fielderClicked=divClicked+" _ "+doubleClick+" Clicked";
		fielderStyle=window.getComputedStyle(fielder);
		x=fielderStyle.getPropertyValue("left");
		y=fielderStyle.getPropertyValue("top");
		if(dispStats==1){
			$("#responce").html(fielderClicked + "-" + x +" - " + y + "br");	
		}
	}else{
		if(dispStats==1){
			$("#responce").html(divClicked);
		}
	}
	lastCommand=curCommand;
}


//////// Initiate Imbix
function initImbix() {

	var canvas=document.getElementById(curCanvas);
	var draw=canvas.getContext("2d");
	canvas.style.position = "fixed";
	canvas.setAttribute("width", sW);
	canvas.setAttribute("height", sH);

	if(dispStats==1){
		$("#devModeDisplay").text(devMode);
		$("#sWDisplay").text(sW);
		$("#sHDisplay").text(sH);
	}

	imbixOver=0;
	imbix = document.getElementById('imbixBot');
	imbixBotMove();
	
}
