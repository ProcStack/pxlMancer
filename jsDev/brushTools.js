// Normal Brush Tools //
// Find the Color Sphere blending in - js/colorSphere.js
function blurTool(inputCanvas,outputCanvas,dist,levels){
	var cW=sW;
	var cH=sH;
	var canvas=document.getElementById(inputCanvas);
	var input=canvas.getContext("2d");
	fader=input.getImageData(0,0,cW,cH);
	pix = fader.data;
	var putCanvas=document.getElementById(outputCanvas);
	var output=putCanvas.getContext("2d");
	faderTo=output.getImageData(0,0,cW,cH);
	pixTo = faderTo.data;
	var rx,ry,rpix,px,py,mather ;
	var checker,rCalc,gCalc,bCalc,aCalc,stageX,stageY,mather,distCheck;
	var startPix=cW*4*(refreshWindowTool[1]-2);
	var endPix=(cW*4*(refreshWindowTool[3]+2));
	var percer=$("#be"+diaVal+"_effectPercent_val").val();
	var percMult;
	var blendcount=0;
	if(dist>0){
		for (var i=startPix; i<endPix; i+=4) {
			if((i/4)%cW>refreshWindowTool[0]-2 && (i/4)%cW<refreshWindowTool[2]+1){
				if(pix[i+3]>0){
					layerCheck=0;
					blendcount=Math.max(1,levels/2);
					px=(i/4)%cW;
					py=Math.floor((i/4)/cW);
					rCalc=pix[i]*blendcount;
					gCalc=pix[i+1]*blendcount;
					bCalc=pix[i+2]*blendcount;
					aCalc=pix[i+3]*blendcount;
					for (var v=0; v<levels; ++v) {
						rx=Math.round(Math.random()*dist-(dist/2)+px);
						rx=Math.max(0,Math.min(rx,cW))-Math.max(0, rx-cW);
						
						ry=Math.round(Math.random()*dist-(dist/2)+py);
						ry=Math.max(0,Math.min(ry,cH-1))-Math.max(0, ry-cH-1);
						rpix=(ry*cW+rx)*4;
							rCalc+=pix[rpix];
							gCalc+=pix[rpix+1];
							bCalc+=pix[rpix+2];
							aCalc+=pix[rpix+3];
						blendcount++;
					}
					if(percer==1){
						rCalc=(rCalc/blendcount);
						gCalc=(gCalc/blendcount);
						bCalc=(bCalc/blendcount);
						aCalc=(aCalc/blendcount);
					}else{
						rCalc=pix[i]*(1-percer)+(rCalc/blendcount)*percer;
						gCalc=pix[i+1]*(1-percer)+(gCalc/blendcount)*percer;
						bCalc=pix[i+2]*(1-percer)+(bCalc/blendcount)*percer;
						aCalc=pix[i+3]*(1-percer)+(aCalc/blendcount)*percer;
					}
					pix[rpix]=rCalc;
					pix[rpix+1]=gCalc;
					pix[rpix+2]=bCalc;
					pix[rpix+3]=aCalc;
				}
			}
		}
		for (var i=startPix; i<endPix; i+=4) {
			if((i/4)%cW>refreshWindowTool[0]-2 && (i/4)%cW<refreshWindowTool[2]+1){
				if(pix[i+3]>0){
					layerCheck=0;
					blendcount=2;
					py=Math.floor((i/4)/cW);
					rCalc=pixTo[i]*2;
					gCalc=pixTo[i+1]*2;
					bCalc=pixTo[i+2]*2;
					aCalc=pixTo[i+3]*2;
					if(py>1){
						rCalc+=pixTo[i-cW*4];
						gCalc+=pixTo[i+1-cW*4];
						bCalc+=pixTo[i+2-cW*4];
						aCalc+=pixTo[i+3-cW*4];
						blendcount+=1;
					}
					if(py<(cH-1)){
						rCalc+=pixTo[i+cW*4];
						gCalc+=pixTo[i+1+cW*4];
						bCalc+=pixTo[i+2+cW*4];
						aCalc+=pixTo[i+3+cW*4];
						blendcount+=1;
					}
					if(px>1){
						rCalc+=pixTo[i-4];
						gCalc+=pixTo[i+1-4];
						bCalc+=pixTo[i+2-4];
						aCalc+=pixTo[i+3-4];
						blendcount+=1;
					}
					
					if(px<cW){
						rCalc+=pixTo[i+4];
						gCalc+=pixTo[i+1+4];
						bCalc+=pixTo[i+2+4];
						aCalc+=pixTo[i+3+4];
						blendcount+=1;
					}
					percMult=percer*(pix[i+3]/255);
					if(percMult==1){
						rCalc=(rCalc/blendcount);
						gCalc=(gCalc/blendcount);
						bCalc=(bCalc/blendcount);
						aCalc=(aCalc/blendcount);
					}else{
						rCalc=pixTo[i]*(1-percMult)+(rCalc/blendcount)*percMult;
						gCalc=pixTo[i+1]*(1-percMult)+(gCalc/blendcount)*percMult;
						bCalc=pixTo[i+2]*(1-percMult)+(bCalc/blendcount)*percMult;
						aCalc=pixTo[i+3]*(1-percMult)+(aCalc/blendcount)*percMult;
					}
					pixTo[i]=rCalc;
					pixTo[i+1]=gCalc;
					pixTo[i+2]=bCalc;
					pixTo[i+3]=aCalc;
					
				}
			}
		}
	}
	output.putImageData(faderTo, 0, 0);
}
function scatterTool(inputCanvas,outputCanvas,dist,levels){
	var cW=sW;
	var cH=sH;
	var canvas=document.getElementById(inputCanvas);
	var input=canvas.getContext("2d");
	fader=input.getImageData(0,0,cW,cH);
	pix = fader.data;
	var putCanvas=document.getElementById(outputCanvas);
	var output=putCanvas.getContext("2d");
	faderTo=output.getImageData(0,0,cW,cH);
	pixTo = faderTo.data;
	var rx,ry,rpix,px,py,mather ;
	var checker,rCalc,gCalc,bCalc,aCalc,stageX,stageY,mather,distCheck;
	var startPix=cW*4*(refreshWindowTool[1]-2);
	var endPix=(cW*4*(refreshWindowTool[3]+2));
	var percer=$("#be"+diaVal+"_effectPercent_val").val();
	var percMult,tmpAlpha;
	var blendcount=0;
	
	if(dist>0){
		for (var i=startPix; i<endPix; i+=4) {
			if((i/4)%cW>refreshWindowTool[0]-2 && (i/4)%cW<refreshWindowTool[2]+1){
				if(pix[i+3]>0){
					layerCheck=0;
					blendcount=1;
					px=(i/4)%cW;
					py=Math.floor((i/4)/cW);
					rx=Math.round(Math.random()*dist-(dist/2)+px);
					ry=Math.round(Math.random()*dist-(dist/2)+py);
					rCalc=pixTo[i];
					gCalc=pixTo[i+1];
					bCalc=pixTo[i+2];
					aCalc=pixTo[i+3];
					if(ry>1){
						tmpAlpha=pixTo[i+3-cW*4];
						if(tmpAlpha>0){
							rCalc+=pixTo[i-cW*4];
							gCalc+=pixTo[i+1-cW*4];
							bCalc+=pixTo[i+2-cW*4];
							aCalc+=tmpAlpha;
							blendcount+=1;
						}
					}
					if(ry<cH){
						tmpAlpha=pixTo[i+3+cW*4];
						if(tmpAlpha>0){
							rCalc+=pixTo[i+cW*4];
							gCalc+=pixTo[i+1+cW*4];
							bCalc+=pixTo[i+2+cW*4];
							aCalc+=tmpAlpha;
							blendcount+=1;
						}
					}
					if(rx>1){
						tmpAlpha=pixTo[i+3-4];
						if(tmpAlpha>0){
							rCalc+=pixTo[i-4];
							gCalc+=pixTo[i+1-4];
							bCalc+=pixTo[i+2-4];
							aCalc+=tmpAlpha;
							blendcount+=1;
						}
					}
					
					if(rx<cW){
						tmpAlpha=pixTo[i+3+4];
						if(tmpAlpha>0){
							rCalc+=pixTo[i+4];
							gCalc+=pixTo[i+1+4];
							bCalc+=pixTo[i+2+4];
							aCalc+=tmpAlpha;
							blendcount+=1;
						}
					}
					if(blendcount>1){
						rpix=(ry*cW+rx)*4;
						percMult=percer*(pix[rpix+3]/255);
						if(percMult==1){
							rCalc=(rCalc/blendcount);
							gCalc=(gCalc/blendcount);
							bCalc=(bCalc/blendcount);
							aCalc=(aCalc/blendcount);
						}else{
							rCalc=pixTo[rpix]*(1-percMult)+(rCalc/blendcount)*percMult;
							gCalc=pixTo[rpix+1]*(1-percMult)+(gCalc/blendcount)*percMult;
							bCalc=pixTo[rpix+2]*(1-percMult)+(bCalc/blendcount)*percMult;
							aCalc=pixTo[rpix+3]*(1-percMult)+(aCalc/blendcount)*percMult;
						}
						pixTo[rpix]=rCalc;
						pixTo[rpix+1]=gCalc;
						pixTo[rpix+2]=bCalc;
						pixTo[rpix+3]=aCalc;
					}
				}
			}
		}
	}
	output.putImageData(faderTo, 0, 0);
}
function beblurTool(inputCanvas,outputCanvas){
	var cW=sW;
	var cH=sH;
	var canvas=document.getElementById(inputCanvas);
	var input=canvas.getContext("2d");
	fader=input.getImageData(0,0,cW,cH);
	pix = fader.data;
	var putCanvas=document.getElementById(outputCanvas);
	var output=putCanvas.getContext("2d");
	faderTo=output.getImageData(0,0,cW,cH);
	pixTo = faderTo.data;
	var rx,ry,rpix,px,py,mather ;
	var checker,rCalc,gCalc,bCalc,aCalc,stageX,stageY,mather,distCheck;
	var startPix=cW*4*(refreshWindowTool[1]-2);
	var endPix=(cW*4*(refreshWindowTool[3]+2));
	var percer=$("#be"+diaVal+"_effectPercent_val").val()/10;
	var percMult;
	var desat=0;
	if(dist>0){
		for (var i=startPix; i<endPix; i+=4) {
			if((i/4)%cW>refreshWindowTool[0]-2 && (i/4)%cW<refreshWindowTool[2]+1){
				if(pix[i+3]>0){
					layerCheck=0;
					percMult=(percer);
					mather=(pixTo[i+3]/255);
					if(mather<.15){
						pixTo[i+3]=0;
						pixTo[i+3]=pixTo[i+3]*(1-percMult);
					}else{
						if(mather<.6){
							mather=.6;
						}else{
							mather=1.4;
						}
						pixTo[i+3]=pixTo[i+3]*(1-percMult)+( pixTo[i+3]*mather*percMult );
					}
				}
			}
		}
	}
	output.putImageData(faderTo, 0, 0);
	layerCheck=0;
}
function desaturateTool(inputCanvas,outputCanvas){
	var cW=sW;
	var cH=sH;
	var canvas=document.getElementById(inputCanvas);
	var input=canvas.getContext("2d");
	fader=input.getImageData(0,0,cW,cH);
	pix = fader.data;
	var putCanvas=document.getElementById(outputCanvas);
	var output=putCanvas.getContext("2d");
	faderTo=output.getImageData(0,0,cW,cH);
	pixTo = faderTo.data;
	var rx,ry,rpix,px,py,mather ;
	var checker,rCalc,gCalc,bCalc,aCalc,stageX,stageY,mather,distCheck;
	var startPix=cW*4*(refreshWindowTool[1]-2);
	var endPix=(cW*4*(refreshWindowTool[3]+2));
	var percer=$("#be"+diaVal+"_effectPercent_val").val();
	var percMult;
	var desat=0;
	if(dist>0){
		for (var i=startPix; i<endPix; i+=4) {
			if((i/4)%cW>refreshWindowTool[0]-2 && (i/4)%cW<refreshWindowTool[2]+1){
				if(pix[i+3]>0){
					layerCheck=0;
					desat=(pixTo[i]+pixTo[i+1]+pixTo[i+2])/3;
					percMult=percer*(pix[i+3]/255);
					if(percMult==1){
						rCalc=desat;
						gCalc=desat;
						bCalc=desat;
					}else{
						rCalc=pixTo[i]*(1-percMult)+desat*percMult;
						gCalc=pixTo[i+1]*(1-percMult)+desat*percMult;
						bCalc=pixTo[i+2]*(1-percMult)+desat*percMult;
					}
					aCalc=pixTo[i+3];
					pixTo[i]=rCalc;
					pixTo[i+1]=gCalc;
					pixTo[i+2]=bCalc;
					pixTo[i+3]=aCalc;
				}
			}
		}
	}
	output.putImageData(faderTo, 0, 0);
	layerCheck=0;
}
function shiftHueTool(inputCanvas,outputCanvas,dir){
	var cW=sW;
	var cH=sH;
	var canvas=document.getElementById(inputCanvas);
	var input=canvas.getContext("2d");
	fader=input.getImageData(0,0,cW,cH);
	pix = fader.data;
	var putCanvas=document.getElementById(outputCanvas);
	var output=putCanvas.getContext("2d");
	faderTo=output.getImageData(0,0,cW,cH);
	pixTo = faderTo.data;
	var checker,rCalc,gCalc,bCalc,aCalc,stageX,stageY,mather,distCheck;
	var startPix=cW*4*(refreshWindowTool[1]-2);
	var endPix=(cW*4*(refreshWindowTool[3]+2));
	var percer=$("#be"+diaVal+"_effectPercent_val").val()/10;
	var percMult;
	var desat=0;
	if(dist>0){
		for (var i=startPix; i<endPix; i+=4) {
			if((i/4)%cW>refreshWindowTool[0]-2 && (i/4)%cW<refreshWindowTool[2]+1){
				if(pix[i+3]>0){
					HSV=toHSV([pixTo[i],pixTo[i+1],pixTo[i+2]]);
					HSV[0]=((HSV[0])+dir*percer)%255;
					RGB=toRGB(HSV);
					pixTo[i]=RGB[0];
					pixTo[i+1]=RGB[1];
					pixTo[i+2]=RGB[2];
				}
			}
		}
	}
	output.putImageData(faderTo, 0, 0);
	layerCheck=0;
}
function eraseTool(inputCanvas,outputCanvas){
	var canvas=document.getElementById(inputCanvas);
	var pastCan=document.getElementById(outputCanvas);
	var pastDraw=pastCan.getContext("2d");
	var percer=$("#be"+diaVal+"_effectPercent_val").val();
	pastDraw.globalAlpha = percer;
	pastDraw.globalCompositeOperation="destination-out";
	pastDraw.drawImage(canvas,0,0);
	layerCheck=0;
}

/////////////////

function doGeoDraw(canvas, setPos){
	if(typeof canvas != 'null' && storeKeyHold==0){
		dragCount+=1;
		var color=getColor(dragTotal);
		R=color[0];
		G=color[1];
		B=color[2];
		A=color[3];
		var loc=[];
		
		var zoomMouse=mouseToCanvasSpace();
		zoomMouseX=zoomMouse[0];
		zoomMouseY=zoomMouse[1];
		
		var hit=0;
		if(setPos<2){
			if(geoToolStopDraw<2){
				if(dragging==1 && setPos!=1){
					//menuVis(0,1);
					if(setPos==0){
						loc=geoPos;
						if(loc.length==0){
							geoPos=[zoomMouseX,zoomMouseY];
							loc=[zoomMouseX,zoomMouseY];
							geoDrawEditVertex(1,'',[-1]);
							geoDrawCheck(2);
						//}else if(loc.length==2){
						//	loc.unshift(loc[0],loc[1]);
						}else{
							if(dragCount%2==0){
								geoPos.push(zoomMouseX);
								geoPos.push(zoomMouseY);
								geoDrawEditVertex(1,'',[-1]);
							}
						}
					}
				}else{
					hit=1;
					if(geoPos.length == 0){
						//if(geoTool!=2){
						//	drawGeo([zoomMouseX,zoomMouseY],1,7,[R,G,B],A,-1,-1,canvas);
						//}
						if(parseInt($("#mouseDraw").attr('geoDoubleClick'))==0){
							if(setPos==1){
								if(geoToolStopDraw==0){
									geoDrawCheck(2);
									geoPos.push(zoomMouseX);
									geoPos.push(zoomMouseY);
									geoDrawEditVertex(1,'',[-1]);
								}
							}
						}
					}else{
						if(setPos==1){
							if(geoToolStopDraw==0){
								if(geoPos.length==2){
									geoPos.push((geoPos[geoPos.length-2]*2+zoomMouseX)/3);
									geoPos.push((geoPos[geoPos.length-2]*2+zoomMouseY)/3);
									geoDrawEditVertex(1,'',[-1]);
									geoPos.push((geoPos[geoPos.length-2]+zoomMouseX*2)/3);
									geoPos.push((geoPos[geoPos.length-2]+zoomMouseY*2)/3);
									geoDrawEditVertex(1,'',[-1]);
								}else{
									geoPos.push((geoPos[geoPos.length-2]+zoomMouseX)/2);
									geoPos.push((geoPos[geoPos.length-2]+zoomMouseY)/2);
									geoDrawEditVertex(1,'',[-1]);
								}
								geoPos.push(zoomMouseX);
								geoPos.push(zoomMouseY);
								geoDrawEditVertex(1,'',[-1]);
							}
						}
						loc=geoPos;
					}
				}
			}else{
				loc=geoPos;
			}
		}else if(setPos==2){
			clearScreen(canvas);
			if(geoToolStopDraw==0){
				drawGeo([zoomMouseX,zoomMouseY],1,7,[R,G,B],A,-1,mirror,canvas);
			}
			return true;
		}else{
			loc=geoPos;
			loc.push( ((loc[x]+zoomMouseX)/2) );
			loc.push( ((loc[x+1]+zoomMouseY)/2) );
			loc.push(zoomMouseX);
			loc.push(zoomMouseY);
		}
			
		if(loc.length >=3){
			var temp=[loc[0],loc[1]];
			var tempMath=[];
			for(var x=2;x<loc.length;x+=2){
				temp.push(loc[x]);
				temp.push(loc[x+1]);
			}
			loc=temp;
				x=loc.length-2;
				if(geoTool<2){
					if(geoToolStopDraw<2){
						loc.push( ((loc[x]+zoomMouseX)/2) );
						loc.push( ((loc[x+1]+zoomMouseY)/2) );
						loc.push(zoomMouseX);
						loc.push(zoomMouseY);
					}
					loc.push(zoomMouseX);
					loc.push(zoomMouseY);
					loc.push(zoomMouseX);
					loc.push(zoomMouseY);
				}
			var maxCount=parseInt($('#geoDrawGuides').attr("curDisplay"));
			var verts=$('#geoDrawGuides').find('.vert');
			if((loc.length/2)>maxCount && maxCount!=-1){
				
				loc.splice((maxCount*2),(loc.length-(maxCount*2)));
				for(var x=maxCount-1;x<verts.length-1;x++){
					$(verts[x]).remove();
				}
			}
			clearScreen(canvas);
			var fill=geoDrawFillType==1?-1:$("#sl"+diaVal+"_setWidth_val").val();
			drawGeo(loc,(3+geoDrawLineType),geoDrawClosedType,[R,G,B],A,fill,mirror,canvas);
			if(geoTool!=2){ // Draw outline mid edits
				if(geoToolStopDraw==0 || geoToolStopDraw==3){
					drawGeo(loc,(3+geoDrawLineType),geoDrawClosedType,[180,180,180],1,0,-1,canvas);
				}else{
					drawGeo(loc,(3+geoDrawLineType),geoDrawClosedType,[120,160,240],.6,0,-1,canvas);
				}
			}
		}
	}
}
function geoDrawCheck(tgl){
	if(tgl==1){
		geoTool=1;
		geoPos=[];
		//$("#geoDrawGuides").css({"zIndex":12000});
	}else if(tgl==2){
		$("#geoDrawGuidesParent").css({"zIndex":1030,'visibility':'visible'});
		$("#geoDrawGuides").css({"zIndex":1020,'visibility':'visible'});
	}else if(tgl==3){
		geoTool=1;
		geoPos=[];
		$("#geoDrawGuidesParent").css({"zIndex":-510,'visibility':'hidden'});
		$("#geoDrawGuides").css({"zIndex":-510,'visibility':'hidden'});
	}else if(tgl==4){
		$("#geoDrawGuidesParent").css({"zIndex":-510,'visibility':'hidden'});
	}else{
		geoTool=0;
		geoToolStopDraw=0;
		clearScreen('curDraw');
		$("#geoDrawGuidesParent").css({"zIndex":-510,'visibility':'hidden'});
		$("#geoDrawGuides").css({"zIndex":-510,'visibility':'hidden'});
	}
}
// Clicking anywhere or double clicking -
function geoDrawMouseUp(){
	if(storeKeyHold==0){
		var geoDC=parseInt($("#mouseDraw").attr('geoDoubleClick'));
		if(geoDC==0){
			if(geoTool==1){
				geoPosUndo=geoPos;
				//menuVis(0,1);
				doGeoDraw("curDraw",1);
				var math=Math.sqrt(Math.pow( (geoPos[geoPos.length-4]-geoPos[geoPos.length-2]) ,2),Math.pow( (geoPos[geoPos.length-3]-geoPos[geoPos.length-1]) ,2));
				if(math<5){
					$("#mouseDraw").attr('geoDoubleClick',1);
					setTimeout(function(){
						if(parseInt($("#mouseDraw").attr('geoDoubleClick'))==1){
							$("#mouseDraw").attr('geoDoubleClick',0);
						}
					},400);
				}
			}
		}else{
			//menuVis(0,1);
			if(geoTool==1){
				geoPosUndo=geoPos;
				geoTool=3;
				doGeoDraw("curDraw",1);
				geoTool=2;
				doGeoDraw("curDraw",1);
				undoOption(1);
				movePast("curDraw",curCanvas,parseFloat($("#be"+diaVal+"_effectPercent_val").val()),compMethod,1);
				clearScreen("curDraw");
				updateLayerCanvas(curLayer);
				geoDrawUpdateRefreshWindow();
				geoPos=[];
				geoDrawCheck(3);
				$("#mouseDraw").attr('geoDoubleClick',0);
				//doGeoDraw("curDraw",2);
				$("#geoDrawGuides").html('');// Clear current control points for dev reasons
				$('#geoDrawGuides').attr("curDisplay",'-1');
				setTimeout(function(){
					geoTool=1;
					geoToolStopDraw=0;
					//menuVis(1,1);
					if(tileUpdate==1){
						toggleTiles();
					}
				},50);
			}
		}
	}
}
// Hitting enter -
function geoDrawCloseGeo(check){
	//menuVis(0,1);
	if(typingFocus==0){
		typingFocus=1;
		if(geoTool==1){
			geoPosUndo=geoPos;
			doGeoDraw("curDraw",1);
			geoToolStopDraw=0;
			if(geoDrawLineType==1){
				doGeoDraw("curDraw",1);
			}
			geoTool=3;
			geoToolStopDraw=1;
			doGeoDraw("curDraw",1);
			//geoDrawDelPoint();
			storeKeyHold=0;
			if(parseInt($('#geoDrawGuides').attr('curDisplay'))==-1){
				$('#geoDrawGuides').attr('curDisplay', geoPos.length-2);
			}
			setTimeout(function(){
				typingFocus=0;
			},200);
		}else if(geoTool>=2){
			check=0;
			//menuVis(1,1);
			geoTool=2;
			doGeoDraw("curDraw",0);
			undoOption(1);
				if(brushStyle==1){ // Blur
					blurTool("curDraw",curCanvas,2,2);
				}else if(brushStyle==2){ // Smudge - off
				}else if(brushStyle==3){ // Lighten
				}else if(brushStyle==4){ // Darken
				}else if(brushStyle==5){ // Desaturate
					desaturateTool("curDraw",curCanvas);
				}else if(brushStyle==6){ // Shift Hue Up - off
				}else if(brushStyle==7){ // Shift Hue Down - off
				}else if(brushStyle==8){ // Erase
					eraseTool("curDraw",curCanvas);
				}else if(brushStyle==9){ // Deblur
					beblurTool("curDraw",curCanvas);
				}else if(brushStyle==10){ // scatter
					scatterTool("curDraw",curCanvas,4,1);
				}else{
					movePast("curDraw",curCanvas,parseFloat($("#be"+diaVal+"_effectPercent_val").val()),compMethod,1);
				}
			clearScreen("curDraw");
			updateLayerCanvas(curLayer);
			geoDrawUpdateRefreshWindow();
			geoPos=[];
			geoPosUndo=geoPos;
			$("#mouseDraw").attr('geoDoubleClick',0);
			//doGeoDraw("curDraw",2);
			$("#geoDrawGuides").html('');// Clear current control points for dev reasons
			$('#geoDrawGuides').attr("curDisplay",'-1');
			geoDrawCheck(3);
			setTimeout(function(){
				geoTool=1;
				//menuVis(1,1);
				typingFocus=0;
				if(tileUpdate==1){
					toggleTiles();
				}
			},200);
		}
		if(check==2){
			var lastPoint="geoDrawSpline_"+(geoPos.length/2-1);
			var toPos=[( geoPos[geoPos.length-4]+geoPos[geoPos.length-2] ), ( geoPos[geoPos.length-3]+geoPos[geoPos.length-1] )];
			geoDrawEditVertex(0, lastPoint, toPos);
		}
		if(check>=1){
			setTimeout(function(){
				if(geoTool<2){
					geoTool=1;
					geoToolStopDraw=0;
					geoDrawCloseGeo(check);
				}
			},800);
		}
	}
}
function geoDrawClose(){ // Exit out of geo draw context
	geoPos=[];
	geoTool=2;
	geoToolStopDraw=0;
	$("#mouseDraw").attr('geoDoubleClick',0);
	$("#geoDrawGuides").html('');// Clear current control points for dev reasons
	$('#geoDrawGuides').attr("curDisplay",'-1');
	clearScreen("curDraw");
	$('#geoDraw_val').val($("#geoDrawGuides").find('.vert').length);

	geoDrawCheck(3);
	setTimeout(function(){
		geoTool=1;
		//menuVis(1,1);
	},50);
}
function geoDrawDelPoint(){
	$("#geoDrawSpline_"+(geoPos.length/2)).remove();
	geoPos.splice(geoPos.length-2,2);
	/*if(geoDrawRanDel==0){
		geoDrawRanDel=1;
		geoPos.splice(geoPos.length-2,2);
	}*/
	if(geoPos.length>0){
		if(geoPos.length==1){
			clearScreen("curDraw");
		}
		doGeoDraw('curDraw', 0);
	}else{
		geoPos=[];
		geoTool=2;
		geoToolStopDraw=0;
		clearScreen("curDraw");
		geoDrawCheck(3);
		setTimeout(function(){
			geoTool=1;
			//menuVis(1,1);
		},50);
	}
	$('#geoDraw_val').val($("#geoDrawGuides").find('.vert').length);
}
function geoDrawSplitPoint(sel){
	if(geoPos.length>0){
		var hitPoint=parseInt($("#"+sel).attr('modPoint'))-1;
		$("#geoDrawGuides").find('.vert').remove();
		var tmpRead=geoPos;
		var tmpGeoPos=[];
		geoPos=[];
		for(var x=0; x<tmpRead.length; x+=2){
			if(x/2 == hitPoint){
				var from=x-2<0?tmpRead.length-2:x-2
				var to=x+2>=tmpRead.length?0:x+2
				geoPos.push((tmpRead[from]+tmpRead[x])/2);
				geoPos.push((tmpRead[from+1]+tmpRead[x+1])/2);
				geoDrawEditVertex(1, 0, -1);
				geoPos.push(tmpRead[x]);
				geoPos.push(tmpRead[x+1]);
				geoDrawEditVertex(1, 0, -1);
				geoPos.push((tmpRead[to]+tmpRead[x])/2);
				geoPos.push((tmpRead[to+1]+tmpRead[x+1])/2);
				geoDrawEditVertex(1, 0, -1);
			}else{
				geoPos.push(tmpRead[x]);
				geoPos.push(tmpRead[x+1]);
			}
			geoDrawEditVertex(1, 0, -1);
		}
		$('#geoDrawGuides').attr('curDisplay', geoPos.length-1);
		doGeoDraw("curDraw",0);
	}
}
function geoDrawEditVertex(gen, sel, pos){
	if(gen==1){
		var size=6;
		var name="geoDrawSpline_"+(geoPos.length/2);
		var html="<canvas class='vert' id='"+name+"' modPoint='"+(geoPos.length/2)+"' mX='' mY='' origX='' origY='' height='"+size+"px' onMouseDown=\"geoToolStopDraw=1;geoDrawEditVertex(0, '"+name+"',[-1]);\" onMouseUp='geoToolStopDraw=3;' width='"+size+"px' style='z-index:"+(2000+(geoPos.length/2))+";position:absolute;top:0;left:0;cursor:pointer;'></canvas>"
		$("#geoDrawGuides").append(html);
		$("#"+name).css({ "left":geoPos[geoPos.length-2]-size/2,"top":geoPos[geoPos.length-1]-size/2 });
		$("#"+name).attr({ "mX":geoPos[geoPos.length-2]-size/2,"mY":geoPos[geoPos.length-1]-size/2, "origX":geoPos[geoPos.length-2]-size/2,"origY":geoPos[geoPos.length-1]-size/2 });
		$("#"+name).attr('onclick',  "if(geoTool>=2){cmdDoubleClick('"+name+"',15,\"geoDrawSplitPoint('"+name+"');\",0);}");
		
		$('#geoDraw_val').val($("#geoDrawGuides").find('.vert').length);
		
		if((geoPos.length/2)==1){
			var omd=$("#"+name).attr('onMouseUp');
			omd+= "if(geoTool!=3){geoDrawCloseGeo(2);geoToolStopDraw=3;};";
			$("#"+name).attr('onMouseUp',omd);
			drawGeoPrompt(1);
			geoDrawCheck(2);
		}
		drawGeo([3,3],1,6,[180,180,200],150,-1,-1,name);
	}else{
		var modPoint=parseInt($("#"+sel).attr("modPoint"))-1;
		var fromM,toM,offset;
		//if(pos[0]!=-1){
			if(geoToolStopDraw==1){
				geoToolStopDraw=2;
				$("#"+sel).attr("mX",mouseX);
				$("#"+sel).attr("mY",mouseY);
				$("#"+sel).attr("origX",geoPos[modPoint*2]);
				$("#"+sel).attr("origY",geoPos[modPoint*2+1]);
			}
			fromM=[parseInt($("#"+sel).attr("mX")),parseInt($("#"+sel).attr("mY"))];
			toM=[mouseX,mouseY];
			offset=[parseInt($("#"+sel).attr("origX")),parseInt($("#"+sel).attr("origY"))];
			offset=[ ( offset[0]-(fromM[0]-toM[0])/curScale ), ( offset[1]-(fromM[1]-toM[1])/curScale ) ];
		/*}else{
			geoToolStopDraw=1;
			fromM=[geoPos[modPoint*2],geoPos[modPoint*2+1]];
			toM=pos;
			offset=fromM;
			offset=[ ( offset[0]-(fromM[0]-toM[0])/curScale ), ( offset[1]-(fromM[1]-toM[1])/curScale ) ];
		}*/
		$("#"+sel).css({"left":offset[0]-3,"top":offset[1]-3});
		geoPos[modPoint*2]=offset[0];
		geoPos[modPoint*2+1]=offset[1];
		if(Math.abs(offset[0])>3 || Math.abs(offset[1])>3){
			$("#"+sel).attr('doubleClick',0);
		}
		doGeoDraw("curDraw",0);
		if(geoToolStopDraw==2){
			setTimeout(function(){geoDrawEditVertex(0,sel,pos);},30);
		}else{
			/*if(geoDrawRanDel==0){
				geoDrawRanDel=1;
				setTimeout(function(){geoDrawDelPoint()},20);
			}else{
				geoDrawRanDel=0;
			}*/
		}
	}
}
function drawGeoPrompt(val){
	if(!$("#geoDrawPrompt").length){
		var addPad=5;
		var addPadButton=10;
		button="geoDrawGuidesParent";
		divHeight=28+addPad;
		divWidth=1052+addPad+addPadButton;
		
		var curLine=geoDrawLineType==1?'[ Curved ]':'[ Line ]';
		
		var html="<div id='geoDrawPrompt' style='position:relative;top:-2;left:-3;'; onMouseOver='geoToolStopDraw=1;' onMouseOut='geoToolStopDraw=0;'><table style='border:0px;width:900px;height:25px;'><tr valign='middle'>";
		html+="<td align='center' style='overflow:hidden;height:20px;width:30px;padding-left:5px;'><form id='geoDraw_form'><input type='text' value='0' id='geoDraw_val' style='position:relative;bottom:7px;width:30px;background-color:#155555;color:#cccccc;border:none;text-align:right;'></form></div></td>";
		html+="<td align='center' style='overflow:hidden;height:20px;width:40px;font-size:70%;overflow:hidden;'><div style='position:relative;bottom:10px;right:3px;'>#Points</div></td>";
		html+="<td align='center' style='overflow:hidden;height:20px;width:150px;'><div class='geoDrawPromptButton' id='geoDrawLineTypeDiv' onClick='geoDrawSwitchType(0);' style='letter-spacing:3px;height:20px;width:150px;font-size:90%;z-index:"+(2100+(geoPos.length/2))+";cursor:pointer;' >"+curLine+"</div></td>";
				
		var curFill=geoDrawFillType==1?'[ Filled ]':'[ Outline ]';
		html+="<td align='center' style='overflow:hidden;height:20px;width:150px;'><div class='geoDrawPromptButton' id='geoDrawFillTypeDiv' onClick='geoDrawSwitchType(1);' style='letter-spacing:3px;height:20px;width:150px;font-size:90%;z-index:"+(2200+(geoPos.length/2))+";cursor:pointer;' >"+curFill+"</div></td>";
		var curClose=geoDrawClosedType==1?'[ Closed ]':'[ Open ]';
		html+="<td align='center' style='overflow:hidden;height:20px;width:150px;'><div class='geoDrawPromptButton' id='geoDrawClosedTypeDiv'onClick='geoDrawSwitchType(2);' style='letter-spacing:3px;height:20px;width:150px;font-size:90%;z-index:"+(2300+(geoPos.length/2))+";cursor:pointer;' >"+curClose+"</div></td>";
		html+="<td align='center' style='overflow:hidden;height:20px;width:50px;'><div style='position:relative;top:-14px;opacity:.7;filter:alpha(opacity=70);color:#227788;'>|</div></td>";
		html+="<td align='center' style='overflow:hidden;height:20px;width:150px;'><div class='geoDrawPromptButton' id='geoDrawUndoDiv' onClick='var tmpGP=geoPos;geoPos=geoPosUndo;geoPosUndo=tmpGP;geoDrawSplitPoint(-1);' style='letter-spacing:3px;height:20px;width:150px;font-size:90%;z-index:"+(2000+(geoPos.length/2))+";cursor:pointer;' >[ Undo Edit ]</div></td>";
		html+="<td align='center' style='overflow:hidden;height:20px;width:50px;'><div style='position:relative;top:-14px;opacity:.7;filter:alpha(opacity=70);color:#227788;'>|</div></td>";
	if(devMode==1){	
		html+="<td align='center' style='overflow:hidden;height:20px;width:150px;'><div class='geoDrawPromptButton' id='geoDrawPrintArray' onClick=\"printArray('["+sW+","+sH+"]', geoPos);\" style='letter-spacing:3px;height:20px;width:150px;font-size:90%;z-index:"+(2000+(geoPos.length/2))+";cursor:pointer;' >[ Print Array ]</div></td>";
		html+="<td align='center' style='overflow:hidden;height:20px;width:50px;'><div style='position:relative;top:-14px;opacity:.7;filter:alpha(opacity=70);color:#227788;'>|</div></td>";
	}
		html+="<td align='center' style='overflow:hidden;height:20px;width:50px;'><div class='geoDrawPromptButton' id='geoDrawHelpDiv' onClick=\"dialogueOption(1, 'shapeToolShorts');\" style='letter-spacing:3px;height:20px;width:50px;font-size:90%;z-index:"+(2300+(geoPos.length/2))+";cursor:pointer;' >[ ? ]</div></td>";
		html+="<td align='center' style='overflow:hidden;height:20px;width:50px;'><div style='position:relative;top:-14px;opacity:.7;filter:alpha(opacity=70);color:#227788;'>|</div></td>";
		html+="<td align='center' style='overflow:hidden;height:20px;width:100px;'><div class='geoDrawPromptButton' id='geoDrawAcceptDiv'onClick='geoTool=2;geoDrawCloseGeo(0);' style='letter-spacing:3px;height:20px;width:100px;font-size:90%;z-index:"+(2300+(geoPos.length/2))+";cursor:pointer;' >[ Accept ]</div></td>";
		html+="<td align='center' style='overflow:hidden;height:20px;width:50px;'><div class='geoDrawPromptButton' id='geoDrawExitDiv'onClick='geoDrawClose(0);' style='letter-spacing:3px;height:20px;width:50px;font-size:90%;z-index:"+(2300+(geoPos.length/2))+";cursor:pointer;' >[ X ]</div></td>";
		html+="</tr></table></div>";
		$("#"+button).width(divWidth);
		$("#"+button).height(divHeight);
		$("#"+button).html(html);
		$("#"+button).css({'top':(origSH*.07),'right':(origSW*.055)});
		
		controlText=$("#"+button).html();
		
		html="<canvas style='z-index:"+(1900)+";position:relative;cursor:default;' id='"+button+"_Canvas' height='"+divHeight+"' width='"+divWidth+"'></canvas>\n";
		html+="<div style='color:#ffffff;cursor:default;position:relative;bottom:"+divHeight+";padding-top:"+(addPad/2)+"px;padding-left:"+(addPad/2)+"px;z-index:"+(1900+1)+";width:"+(divWidth)+";height:"+(divHeight)+";text-shadow:2px 2px 3px black;' id='"+button+"_Div'>"+controlText+"</div>";
		$("#"+button).html(html);
		$("#"+button).width(divWidth);
		$("#"+button).height(divHeight);
		$("#"+button).attr('onMouseOver','geoToolStopDraw=1;');
		$("#"+button).attr('onMouseOut','geoToolStopDraw=0;');
		height=bevelShape((button+"_Div"),0,0,(button+"_Canvas"),.90,7,2,1,1,1,1,1,0,0);
		
		var buttons=$("#geoDrawPrompt").find('.geoDrawPromptButton');
		for(var x=0;x<buttons.length; x++){
			button=$(buttons[x]).attr('id');
			divHeight=$("#"+button).height()+addPad;
			divWidth=$("#"+button).width()+addPad+addPadButton;
			$("#"+button).width(divWidth);
			$("#"+button).height(divHeight);
			$("#"+button).parent().width(divWidth);
			$("#"+button).parent().height(divHeight);
			controlText=$("#"+button).parent().html();
			
			html="<canvas style='z-index:"+(2000+x)+";position:relative;cursor:default;' id='"+button+"_Canvas' onClick='"+$('#'+button).attr('onClick')+"' height='"+divHeight+"' width='"+divWidth+"'></canvas>\n";
			html+="<div style='color:#ffffff;cursor:pointer;position:relative;bottom:"+(divHeight)+";padding-top:"+(addPad/2)+"px;padding-left:"+(addPad/2)+"px;z-index:"+(2000+1+x)+";width:"+(divWidth)+";height:"+(divHeight)+";text-shadow:2px 2px 3px black;' id='"+button+"_Div'>"+controlText+"</div>";
			$("#"+button).parent().html(html);
			$("#"+button).css({'height':divHeight+addPad,'width':divWidth});
			$("#"+button).attr("onMouseOver","geoToolStopDraw=1;bevelShape(('"+button+"_Div'),0,0,('"+button+"_Canvas'),.9,5,3,1,1,1,1,1,1,0);");
			$("#"+button).attr("onMouseDown","bevelShape(('"+button+"_Div'),0,0,('"+button+"_Canvas'),.9,5,3,1,1,1,1,1,2,0);");
			$("#"+button).attr("onMouseUp","bevelShape(('"+button+"_Div'),0,0,('"+button+"_Canvas'),.9,5,3,1,1,1,1,1,1,0);");
			$("#"+button).attr("onMouseOut", "geoToolStopDraw=0;bevelShape(('"+button+"_Div'),0,0,('"+button+"_Canvas'),.9,5,3,1,1,1,1,1,0,0);");
			eval($("#"+button).attr("onMouseOut"));
		}
			
	}
}
function geoDrawSwitchType(mod){
	var type,text;
	if(mod==0){
		geoDrawLineType=(geoDrawLineType+1) % 2;
		text=geoDrawLineType==1?'[ Curved ]':'[ Line ]';
		$("#geoDrawLineTypeDiv").text(text);
		doGeoDraw("curDraw",0);
	}else if(mod==1){
		geoDrawFillType=(geoDrawFillType+1) % 2;
		text=geoDrawFillType==1?'[ Filled ]':'[ Outline ]';
		$("#geoDrawFillTypeDiv").html(text);
		doGeoDraw("curDraw",0);
	}else{
		geoDrawClosedType=(geoDrawClosedType+1) % 2;
		text=geoDrawClosedType==1?'[ Closed ]':'[ Open ]';
		$("#geoDrawClosedTypeDiv").html(text);
		doGeoDraw("curDraw",0);
	}
}
function geoDrawUpdateRefreshWindow(){
	var checkMin=[refreshWindow[0],refreshWindow[1]];
	var checkMax=[refreshWindow[2],refreshWindow[3]];
	for(var x=0; x<geoPos.length/2;++x){
		checkMin=[ Math.min(checkMin[0],Math.max(0, geoPos[x]-10) ), Math.min(checkMin[1],Math.max(0, geoPos[x+1]-10) ) ];
		checkMax=[ Math.max(checkMax[0],Math.min(sW, geoPos[x]+10) ), Math.max(checkMax[1],Math.min(sH, geoPos[x+1]+10) ) ];
	}
	refreshWindow=[checkMin[0],checkMin[1],checkMax[0],checkMax[1]];
	refreshWindowStore=refreshWindow;
	return true;
}
/////////////////////////

function sampleCanvasStack(sampleCan){
	var layerList=$("#lwin_layerList");
	var children=$(layerList).children();
	var counts=$(layerList).find('.lwin_layer');
	var pos=$("#documentLayers").offset();
	var canW=origSW/curScale;
	var canH=origSH/curScale;
	var sampleX,sampleY,color;
	var sampleX=Math.min(sW, Math.max(0, Math.floor((mouseX/origSW)*canW-(pos.left)/curScale) ));
	var sampleY=Math.min(sH, Math.max(0, Math.floor((mouseY/origSH)*canH-(pos.top)/curScale) ));
	var canvas,color;
	for(var i=0;i<counts.length;++i){
		canvas=$(counts[i]).attr("canvasName");
		if((parseFloat($(counts[i]).attr("opacity"))>0 && parseInt($(counts[i]).attr("vis"))==1) || canvas=='gradientBG'){
			color=sampleCanvas(canvas,[sampleX,sampleY]);
			if(color[3]>0){
				break;
			}
		}
	}
	$("#cs_red_val").val(color[0]);
	$("#cs_green_val").val(color[1]);
	$("#cs_blue_val").val(color[2]);
	setSlideControl('cs_red','');
	setSlideControl('cs_green','');
	setSlideControl('cs_blue','');
	colorSphereRun+=1;
	var a=$("#be"+diaVal+"_effectPercent_val").val();
	updateColorSplash(sampleCan,color,a,1,0,colorSphereRun);
}


function sampleBrush(toggle,hitButton){
	sampleColor=toggle;
	if(toggle==1){
		$("#mouseDraw").css({"cursor":"help"});
	}else{
		$("#mouseDraw").css({"cursor":"default"});
		if(hitButton==1){
			if(brushDraw==0){
				eval($("#barMenu_line").attr('onclick'));
				eval($("#barMenu_line").attr('onmouseup'));
			}else{
				eval($("#barMenu_sweep").attr('onclick'));
				eval($("#barMenu_sweep").attr('onmouseup'));
			}
		}
	}
}


function paintTool(inputCanvas,outputCanvas,color,magDist){
	var cW=$("#"+outputCanvas).width();
	var cH=$("#"+outputCanvas).height();
	var canvas=document.getElementById(inputCanvas);
	var input=canvas.getContext("2d");
	fader=input.getImageData(0,0,cW,cH);
	pix = fader.data;
	var putCanvas=document.getElementById(outputCanvas);
	var output=putCanvas.getContext("2d");
	faderTo=output.getImageData(0,0,cW,cH);
	pixTo = faderTo.data;
	var rx,ry,rpix,px,py,mather ;
	var checker,rCalc,gCalc,bCalc,aCalc,stageX,stageY,mather,distCheck;
	//var distCheck=4+4*Math.abs((Math.floor(runner/55)*55)%3+(dragTotal%touchChecker));
	var startPix=0;
	var endPix=pixTo.length;
	var startPix=cW*4*(refreshWindowTool[1]-magDist);
	var endPix=cW*4*(refreshWindowTool[3]+magDist);
	var percer=parseFloat($("#be"+diaVal+"_effectPercent_val").val());
	var percMult;
	var blendcount=0;

	var alpha=parseFloat($("#be"+diaVal+"_effectPercent_val").val());
	var percMult,mather, pxMag,pxM,pxVal, pxHit,pxY,pxX,pxY2,pxX2;
	var hitPos=[];
	var mag=Math.sqrt( Math.pow(Math.abs((dragPos[2]-dragPos[0])),2) + Math.pow(Math.abs((dragPos[3]-dragPos[1])),2) );
	var levels=Math.max(1, Math.ceil(mag/Math.max(1,magDist/15)/3));

	var falloff=(mag/7)+10;
	var origBlend=4;
	var hit=0;
	
	//Stamping-
	for(var x=0;x<=levels;++x){
		pxX=(dragPos[2]-dragPos[0])*(1-x/(levels+1))+dragPos[0];
		pxY=(dragPos[3]-dragPos[1])*(1-x/(levels+1))+dragPos[1];
		//Push this to a new canvas and then merge the canvas onto the existing one
		drawGeo([pxX,pxY],1,Math.min(100,magDist),color,alpha,-1,-1,curCanvas,1);
		if(mirror==1){
			drawGeo([sW/2-(pxX-sW/2),pxY],1,Math.min(100,magDist),color,alpha,-1,-1,curCanvas,1);
		}else if(mirror==2){
			drawGeo([pxX,sH/2-(pxY-sH/2)],1,Math.min(100,magDist),color,alpha,-1,-1,curCanvas,1);
		}else if(mirror==3){
			drawGeo([sW/2-(pxX-sW/2),pxY],1,Math.min(100,magDist),color,alpha,-1,-1,curCanvas,1);
			drawGeo([pxX,sH/2-(pxY-sH/2)],1,Math.min(100,magDist),color,alpha,-1,-1,curCanvas,1);
			drawGeo([sW/2-(pxX-sW/2),sH/2-(pxY-sH/2)],1,Math.min(100,magDist),color,alpha,-1,-1,curCanvas,1);
		}else if(mirror==4){
			drawGeo([sW/2-(pxX-sW/2),sH/2-(pxY-sH/2)],1,Math.min(100,magDist),color,alpha,-1,-1,curCanvas,1);
		}
	}
	//Painting- Super slow, stamping is way faster, look into worker or webGL for this in the future
	/* if(magDist>0){
		for (var i=startPix; i<endPix; i+=4) {
			if((i/4)%cW>(refreshWindowTool[0]-magDist) && (i/4)%cW<(refreshWindowTool[2]+magDist)){
				layerCheck=0;
				px=(i/4)%cW;
				py=Math.floor((i/4)/cW);
				pxMag=99;
				for(var x=0;x<=levels;++x){
					pxX=(dragPos[2]-dragPos[0])*(1-x/(levels))+dragPos[0];
					pxY=(dragPos[3]-dragPos[1])*(1-x/(levels))+dragPos[1];
					pxHit=Math.sqrt( Math.pow(Math.abs(px-pxX),2) + Math.pow(Math.abs(py-pxY),2));
					if(pxHit<pxMag){
						pxMag=pxHit;
						hitPos=[Math.floor(pxX),Math.floor(pxY)];
					}
				}
				pxVal=((cW*hitPos[1])+hitPos[0])*4;
				percer=Math.min(1,pxMag/falloff);
				//percer=Math.cos(percer*3.141592);
				if((percer)<1){
					mather=(Math.min(1,(Math.cos(percer*3.141592/2+px/15+py/12+Math.sin(px/20+py/70)+Math.cos(px/80+py/18))*.4+.6)+(1-Math.min(1,mag/20))/1.2))*Math.min(.4,magDist/2);
						rCalc=color[0];
						gCalc=color[1];
						bCalc=color[2];
						mather=(mather+(1-Math.min(1,(pxMag/magDist))) )* (1-Math.min(1,(pxMag/magDist)));
						mather=Math.min(1, Math.max(0, (1-Math.min(1,(pxMag/magDist))) ));
						aCalc=alpha*255;// * mather + pixTo[pxVal+3]*(1-mather);
						//rCalc=Math.min(255,color[0]+pixTo[pxVal]*pixTo[pxVal+3]);
						//gCalc=Math.min(255,color[1]+pixTo[pxVal+1]*pixTo[pxVal+3]);
						//bCalc=Math.min(255,color[2]+pixTo[pxVal+2]*pixTo[pxVal+3]);
					percer=Math.min(1, Math.max(0,(1-percer*percer)*alpha));
					//aCalc=pixTo[i+3];
					if(percer!=0){
						rCalc=pixTo[i]*(1-percer)+rCalc*(percer);
						gCalc=pixTo[i+1]*(1-percer)+gCalc*(percer);
						bCalc=pixTo[i+2]*(1-percer)+bCalc*(percer);
					}
					pixTo[i]=rCalc;
					pixTo[i+1]=gCalc;
					pixTo[i+2]=bCalc;
					pixTo[i+3]=aCalc;
				}
			}
		}
	} */
	output.putImageData(faderTo, 0, 0);
}
