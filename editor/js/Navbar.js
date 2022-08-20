var Navbar={};

(function() {

var canvas=document.getElementById("canvas-nav");
var ctx = canvas.getContext("2d");
var height, width;
var animID;
var selL=0, span=64; selR= selL+span, len=Work.global.seqIJ.length;

function drawNotes(){
	var Ymax=-999, Ymin=999;
	for (var i=0; i<Work.global.seqIJ.length; i++)
	for (var j=0; j<Work.global.seqIJ[i].notes.length; j++)
	{
		if (Ymax<Work.global.seqIJ[i].notes[j].note) Ymax=Work.global.seqIJ[i].notes[j].note;
		if (Ymin>Work.global.seqIJ[i].notes[j].note) Ymin=Work.global.seqIJ[i].notes[j].note;
	};
	var viewportH = Ymax - Ymin + 1 + 10;
	var viewportB = Ymin - 5;

	var tickL=width/len;
	var noteH=height/viewportH;

	for (var i=0; i<Work.global.seqIJ.length; i++)	
	for (var j=0; j<Work.global.seqIJ[i].notes.length; j++){
		ctx.save();
// 		if (i>=selL && i+pianoroll.seq[i].notes[j].len<=selR)
// 			ctx.fillStyle="rgba(100,255,100,1)";
// 		else
// 			ctx.fillStyle="rgba(100,255,100,0.3)";
	
		ctx.fillStyle="rgba(200,255,200,0.5)";
		ctx.fillRect(
			i * tickL, 
			height-(Work.global.seqIJ[i].notes[j].note-viewportB) * noteH,
			Work.global.seqIJ[i].notes[j].len*tickL, noteH);
		ctx.restore();
	};
}

function drawMeasures(){
	var tickL=width/len;
	for (var i=0; i<len; i++)
	if (i % 16 == 0)
	{
		ctx.save();
		ctx.beginPath();
		ctx.lineWidth=1;
		ctx.strokeStyle = "rgba(255,255,255,0.5)";
		ctx.moveTo(tickL*i, 0);
		ctx.lineTo(tickL*i, height);
		ctx.stroke();	
		ctx.restore();
	}	
}

function drawPlayhead(){
	var tickL=width/len;

	ctx.save();

	ctx.strokeStyle = "rgba(255,255,255,0.8)";

	ctx.beginPath();
	ctx.lineWidth=3;
	ctx.moveTo(pianoroll.playhead * tickL, 0);
	ctx.lineTo(pianoroll.playhead * tickL, height);
	ctx.stroke();	
	
	ctx.restore();
}

function drawSelection(){
	var tickL=width/len;

	ctx.save(); 
	ctx.globalCompositeOperation="overlay";
	ctx.fillStyle="rgba(100,200,100,1)";
	ctx.fillRect(
		selL * tickL, 0,
		(selR-selL) * tickL, height);
	ctx.restore();
	
	ctx.save();

	ctx.strokeStyle = "rgba(255,255,150,0.8)";

	ctx.beginPath();
	ctx.lineWidth=3;
	ctx.moveTo(selL * tickL, 0);
	ctx.lineTo(selR * tickL, 0);
	ctx.stroke();	

	ctx.beginPath();
	ctx.lineWidth=12;
	ctx.moveTo(selR * tickL, 0);
	ctx.lineTo(selR * tickL, height);
	ctx.stroke();	

	ctx.beginPath();
	ctx.lineWidth=3;
	ctx.moveTo(selR * tickL, height);
	ctx.lineTo(selL * tickL, height);
	ctx.stroke();	

	ctx.beginPath();
	ctx.lineWidth=12;
	ctx.moveTo(selL * tickL, height);
	ctx.lineTo(selL * tickL, 0);
	ctx.stroke();	
	
	ctx.restore();

}

function anim(){
	ctx.fillStyle="#111111";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	drawMeasures();
	drawNotes();
	drawSelection();
	drawPlayhead();
	animID=requestAnimationFrame(anim);
}

function resize(){
	width = window.innerWidth;
	height = 40;
	canvas.width = width;
	canvas.height = height;
}

resize();

animID=requestAnimationFrame(anim);

function updatePianorollViewport(){
	pianoroll.viewportL=selL;
	pianoroll.viewportW=selR-selL;
}

Navbar.resize=resize;
Navbar.selL=selL;
Navbar.selR=selR;
Navbar.updateLR=updateLR;

var nobW=10, offset=0;

canvas.onmousedown=(e)=>{
	span=selR-selL;
	var tickL=width/len;
	if (e.x > selL*tickL+nobW && e.x < selR*tickL-nobW ) {
		Navbar.dragType="move";
		offset = Math.floor(e.x/tickL)-selL;
	}
	else if (e.x > selL*tickL-nobW && e.x < selL*tickL+nobW) Navbar.dragType="panL";
	else if (e.x > selR*tickL-nobW && e.x < selR*tickL+nobW) Navbar.dragType="panR";
}

function updateLR(){
	selL=pianoroll.viewportL;
	selR=selL+pianoroll.viewportW;
	len=Work.global.seqIJ.length > pianoroll.viewportL+pianoroll.viewportW
		? Work.global.seqIJ.length : pianoroll.viewportL+pianoroll.viewportW;
}

Navbar.dragType="";

window.onmousemove=(e)=>{
	if (Navbar.dragType=="") return;

	var tickL=width/len;
	if (Navbar.dragType=="move") {
//		if (selR<len){
			var l=Math.floor(e.x/tickL)- offset;
			if (l<0) l=0;
			selL = l;
//		};
//		if (selL>0){
// 			var l=Math.floor(e.x/tickL)- offset;
// 			if (l<0) l=0;
			var r= l+span;
			selR = r;
//		};	
	} 
	else if (Navbar.dragType=="panL") {
		var l=Math.floor(e.x/tickL);
		if (l<0) l=0;
		if (l>selR-32) l=selR-32;
		selL = l;
	} 
	else if (Navbar.dragType=="panR") {
		var r=Math.ceil(e.x/tickL);
//		if (r>pianoroll.seq.length) r=pianoroll.seq.length;
		if (r<selL+32) r=selL+32;
		selR = r;
	} 
	
	updatePianorollViewport();
	
	len=Work.global.seqIJ.length > pianoroll.viewportL+pianoroll.viewportW
		? Work.global.seqIJ.length : pianoroll.viewportL+pianoroll.viewportW;	
}

Navbar.updateLR=updateLR;

}())