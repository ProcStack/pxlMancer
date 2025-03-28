<!--
// Neurous Project - 2014-2019
// By Kevin Edzenga
// Kevin@pxlmancer.com
// [: Bootstrapped from the Pxlmancer.com code base :]
//
// --
// Wanted to push this sucker to the next level with 
//   a custom build particle simulator in 3d.
// Three.js backbone, but a cummulative particle vertex shader
//   and custom data management.
//   VBOs, or more like VAOs
-->
<!DOCUMENT>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"> 
<meta name='viewport' content="width=device-width, user-scalable=no">
<meta name='theme-color' content='#002832'>
</head>
<style>
BODY{
	font-family:Tahoma,Verdana !important;
	background-color:rgb(0,100,130);
}
.introCards{
	z-index:4;
	text-align:center;
	color:#aaaaaa; 
	font-size:90%;
	line-height:1.45;
	position:fixed;
	top:50%;
	left:50%;
	transform:translate(-50%,-50%);
	
	user-selection:none;
	-moz-user-select: none;
	-webkit-user-select: none;
	-ms-user-select: none;
	-o-user-select:none;
	visibility:hidden;
	filter:alpha(opacity=100);
	opacity:1.;
}
.introCards.fadeOut{
	filter:alpha(opacity=0);
	opacity:.0;
	top:55%;
	
}
.introCards.fadeOutMobile{
	filter:alpha(opacity=0);
	opacity:.0;
	left:45%;
	
}
.introBolds{
	font-size:140%;
	color:#cccccc;
}
.introSpacer{
	height:1px;
	width:300px;
	background-color:#004488;
	filter:alpha(opacity=65);
	opacity:.65;
	margin: 10px ;
	position:fixed;
	left:50%;
	transform:translateX(-50%);
	overflow:hidden;
}
.introClickText{
	font-size:130%;
	letter-spacing:2;
	color:#a4aab0;
}
.introCardsInner{
	transform:rotate(0deg);
	transform-origin:50% 50%;
}
.introCardsInner.mobile{
	transform:rotate(90deg);
}
#dg{
	position:absolute;
	top:0px;
	left:0px;
	z-index:10;
}
</style>
<script type="text/javascript" src="jquery-3.2.1.min.js"></script>
<?php /* <script src="js/map_three.min.js"></script> */ ?>
 <script src="js/three.min.js"></script> 
<script src="js/EffectComposer.js"></script>
<script src="js/CopyShader.js"></script>
<script src="js/RenderPass.js"></script>
<script src="js/ShaderPass.js"></script>
<script src="js/dat.gui.min.js"></script>
<script src="js/stats.min.js"></script>

<script type="text/javascript" src="js/variables.js?q=<?php echo time(); ?>"></script>
<script type="text/javascript" src="js/boot.js?q=<?php echo time(); ?>"></script>
<script type="text/javascript" src="js/engine.js?q=<?php echo time(); ?>"></script>
<script type="text/javascript" src="js/math.js?q=<?php echo time(); ?>"></script>
<script type="text/javascript" src="js/interface.js?q=<?php echo time(); ?>"></script>



<script type="x-shader/x-vertex" id="bgGlowVert">
	varying vec2 vUv;
	void main(){
		vUv=uv;
		//vec4 modelViewPosition=modelViewMatrix * vec4(position, 1.0);
		vec4 modelViewPosition=modelMatrix * vec4(position, 1.0);
		//gl_Position = projectionMatrix*modelViewPosition;
		gl_Position = modelViewPosition;
	}
</script>

<script type="x-shader/x-fragment" id="bgGlowFrag">
	uniform sampler2D tDiffuse;
	uniform sampler2D tBG;
	uniform vec2 uResolutionDiv;
	
	uniform vec2 uCurMouse;
	uniform vec3 uPrevMouseX;
	uniform vec3 uPrevMouseY;
	
	uniform float flicker;
	uniform float time;
	varying vec2 vUv;
	
	#define REACH_STEPS 5
	#define REACH_STEPS_DIV 1./5.
	
		
	vec4 antiAlias(sampler2D tex){
		vec2 areaArr[9];
		areaArr[0]=vec2(-1,-1);
		areaArr[1]=vec2(0,-1);
		areaArr[2]=vec2(1,-1);
		areaArr[3]=vec2(-1,0);
		areaArr[4]=vec2(0,0);
		areaArr[5]=vec2(1,0);
		areaArr[6]=vec2(-1,1);
		areaArr[7]=vec2(0,1);
		areaArr[8]=vec2(1,1);
	
		/*vec4 ret=vec4(0.);
		for(int x=0; x<9; ++x){
			ret+=texture2D(tDiffuse,vUv+areaArr[x]*uResolutionDiv*1.8);
			
		}
		return ret*.125;*/
		
		vec4 ret=vec4(0.);
		float perc=0.;
		for(int c=0; c<3; ++c){
			perc=float(3-c);
			for(int x=0; x<9; ++x){
				ret+=texture2D(tDiffuse,vUv+areaArr[x]*uResolutionDiv*2.8 );
			}
		}
		return ret*.083333333;
	}
	
	vec4 antiAliasMax(sampler2D tex){
		vec2 areaArr[9];
		areaArr[0]=vec2(-1,-1);
		areaArr[1]=vec2(0,-1);
		areaArr[2]=vec2(1,-1);
		areaArr[3]=vec2(-1,0);
		areaArr[4]=vec2(0,0);
		areaArr[5]=vec2(1,0);
		areaArr[6]=vec2(-1,1);
		areaArr[7]=vec2(0,1);
		areaArr[8]=vec2(1,1);
		
		vec4 ret=texture2D(tDiffuse,vUv);
		
		ret=max( ret, texture2D(tDiffuse,vUv+areaArr[0]*uResolutionDiv ) );
		ret=max( ret, texture2D(tDiffuse,vUv+areaArr[1]*uResolutionDiv ) );
		ret=max( ret, texture2D(tDiffuse,vUv+areaArr[2]*uResolutionDiv ) );
		ret=max( ret, texture2D(tDiffuse,vUv+areaArr[3]*uResolutionDiv ) );
		ret=max( ret, texture2D(tDiffuse,vUv+areaArr[4]*uResolutionDiv ) );
		ret=max( ret, texture2D(tDiffuse,vUv+areaArr[5]*uResolutionDiv ) );
		ret=max( ret, texture2D(tDiffuse,vUv+areaArr[6]*uResolutionDiv ) );
		ret=max( ret, texture2D(tDiffuse,vUv+areaArr[7]*uResolutionDiv ) );
		ret=max( ret, texture2D(tDiffuse,vUv+areaArr[8]*uResolutionDiv ) );
	
		return ret;
	}
	
	/*
	vec4 antiAlias(sampler2D tex){
		vec2 areaArr[9];
		areaArr[0]=vec2(-1,-1);
		areaArr[1]=vec2(0,-1);
		areaArr[2]=vec2(1,-1);
		areaArr[3]=vec2(-1,0);
		areaArr[4]=vec2(0,0);
		areaArr[5]=vec2(1,0);
		areaArr[6]=vec2(-1,1);
		areaArr[7]=vec2(0,1);
		areaArr[8]=vec2(1,1);
	
		vec4 ret=vec4(0.);
		float perc=0.;
		for(int c=0; c<3; ++c){
			perc=float(3-c);
			for(int x=0; x<9; ++x){
				ret+=texture2D(tDiffuse,vUv+areaArr[x]*(1.+perc)*1.2 );
			}
		}
		return ret*.083333333;
		
		ret=vec4(0.);
		vec2 curUV;
			for(int x=0; x<9; ++x){
				curUV=clamp( vec2(0.), vec2(1.), vUv+areaArr[x]);
				ret+=texture2D(tDiffuse,curUV );
			}
		return ret*.11111111111111111;
	}
	*/
	
	void main(){
		float timer=time/100.0;
		vec4 origCd=texture2D(tDiffuse, vUv);
		float alpha=origCd.a;
		vec4 aaDif=antiAliasMax(tDiffuse);
		vec4 bgCd=texture2D(tBG, vUv);
		//Cd.a=length(Cd.rgb)>.1?1.:0.;
		//Cd.rgb=mix(vec3(0.), bgCd.rgb, min(1.,Cd.a*.5+.5) );
		vec4 Cd=vec4(1.);
		Cd.rgb=mix(bgCd.rgb,origCd.rgb, ((1.-aaDif.a)*(1.-aaDif.a)) );
		Cd.rgb=bgCd.rgb*.3+Cd.rgb*(Cd.rgb*.3);//+aaDif.a*.5 + origCd.rgb*.5;
		//Cd.rgb+=texture2D(tBG, vUv).rgb, min(1.,Cd.a*.5+.5) );
		//alpha+=aaDif.a;
		Cd.a=mix(.35,1.,alpha);
		/*vec3 mouseX=vec3(
			abs(vUv.x-uPrevMouseX.x),
			abs(vUv.x-uPrevMouseX.y),
			abs(vUv.x-uPrevMouseX.z)
			);
		vec3 mouseY=vec3(
			abs(vUv.y-uPrevMouseY.x),
			abs(vUv.y-uPrevMouseY.y),
			abs(vUv.y-uPrevMouseY.z)
			);
		
		Cd+=vec4(  step( min(1., length(vUv-uCurMouse) )*.2, .002)  );
		Cd.r+=(  step( min(1., length(vec2(mouseX.x,mouseY.x)) )*.2, .002)  );
		Cd.g+=(  step( min(1., length(vec2(mouseX.y,mouseY.y)) )*.2, .002)  );
		Cd.b+=(  step( min(1., length(vec2(mouseX.z,mouseY.z)) )*.2, .002)  );
		*/
		gl_FragColor=aaDif;//texture2D(tDiffuse, vUv);
		//gl_FragColor=vec4(texture2D(tDiffuse, vUv).aaa,1.);
		//gl_FragColor=vec4(vec3(1.-(1.-aaDif.a)*(1.-aaDif.a)),.1);
	}
</script>


<script type="x-shader/x-vertex" id="cleanVert">
	varying vec2 vUv;
	void main(){
		vUv=uv;
		vec4 modelViewPosition=modelViewMatrix * vec4(position, 1.0);
		gl_Position = projectionMatrix*modelViewPosition;
	}
</script>

<script type="x-shader/x-fragment" id="cleanFrag">
	uniform sampler2D tDiffuse;
	varying vec2 vUv;
	void main(){
		vec4 Cd=texture2D(tDiffuse, vUv);
		//Cd.rgb=vec3(.1,.5,.7);
		//Cd.rg=vUv;
		gl_FragColor=Cd;
	}
</script>


<body onLoad='init(1);'>
<canvas id="markerCanvas" height='1' width='1' style='z-index:5;position:fixed;top:0px;left:0px;touch-action:none;visibility:hidden;' ></canvas>
<canvas id="bkCanvas" height='1' width='1' style='z-index:0;position:fixed;top:0px;left:0px;visibility:hidden;'></canvas>
<canvas id="map-core" height='1' width='1' style='z-index:1;position:fixed;top:0px;left:0px;'></canvas>

<div id="stats" style='z-index:100;position:fixed;top:0px;left:0px;color:#ffffff;'></div>
<div align='center' id="verbose" style='z-index:400;position:fixed;top:100px;left:10px;color:#cccccc;font-size:150%'> </div>
<div align='center' id="score" style='z-index:200;position:fixed;top:0px;left:300px;color:#555555;visibility:hidden;'><span style='cursor:pointer;' onClick="$('#score').css('visibility','hidden');">[X]</span> Score : <span id='score_val' style="color:#777777">0</span></div>
<div id="introCards" class="introCards">
	<div id="introCardsInner" class="introCardsInner">
		<img id="neurousTitle" src="NeurousNet.png" style="width:600px; max-width:600px; height:auto;user-selection:none;z-index:4;position:relative;top:0px;left:0px;">
		<div id="hitSpace"> - <span id='intro_pause'>Hit <span class='introBolds'>Space</span></span> to <span class='introBolds'>Pause</span> the Site -</div>
		<div id="leftClick">- <span  class='introBolds' id='intro_pull'>Left Click</span> to <span class='introBolds'>Pull In</span> nearby Points -</div>
		<div id="middleClick">- <span class='introBolds' id='intro_newton'>Middle Click</span> to Spawn a <span class='introBolds'>Newton Orb</span> -</div>
		<div id="rightClick" >- <span class='introBolds' id='intro_pullAll'>Right Click</span> to <span class='introBolds'>Pull In <span style='font-size:101%;font-weight:bold;'>All</span></span> Points -</div>
		<div id="introSpacer" class="introSpacer"></div>
		<div id="clickAnywhere" style="margin: 10px ;" >[ <span class='introClickText'><span id='intro_start'>Click</span> anywhere to mess with the site!</span> ]</div>
	</div>
</div>
</body>
</html>
