var Global={};
(function(){

var chromatic_scale=[]; // from A0 up to C8

const roots = "C Db D Eb E F Gb G Ab A Bb B".split(" ");

// Global.key=0; // "C" - ref: roots, in Chromatic Scale offset
// 
// Global.scale="Major";

var generate_chromatic_scale=()=>{
	var notes = [];
	for(var i = 0; i < 9; i++) {
	  for(var x = 0; x < roots.length; x++) notes.push(roots[x] + i);
	};
	for (var i=0; i<88; i++) chromatic_scale.push(notes[i+9]);
}

var footerH, headerH;

function resize(){
	footerH = document.getElementById("bottom-bar-group").offsetHeight;
	headerH = document.getElementById("top-bar-group").offsetHeight
		+document.getElementById("canvas-nav").offsetHeight;
}

// to be broken down to Scale-specific
Global.default_params= {

	rhythm: "random",
	
	suggester: [
		{d:0, p:0.3},
		{d:1, p:1},
		{d:-1, p:1},
		{d:2, p:0.5},
		{d:-2, p:0.5},
		{d:3, p:0.7},
		{d:-3, p:0.7},
		{d:4, p:0.3},
		{d:-4, p:0.1},
		{d:7, p:0.0},
		{d:-7, p:0.0}						
	],
	
	iparams: [// all
		[0.2, 0.8], // up_n_down: how zig-zag the progression is 
		[0.1, 0.7], // key_span: max pitch minus min pitch
		[0.3, 0.9], // granularity: number of notes
		[0.4, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
		[0.0, 1.0],  // leading_to_dest: is last but one note adjacent to the destiny?
		[0.0, 1.0]  // self_ref: TBD
	]
};

resize();

generate_chromatic_scale();

Global.generate_chromatic_scale=generate_chromatic_scale;
Global.chromatic_scale = chromatic_scale;
Global.bpm_range = [30, 300];
Global.triplet=0;
Global.dotted=0;

// now in Work.global
//Global.bpm = 108;
//Global.key = 0;  // offset from C, in chromatic scale
//Global.scale = "Major";

Global.imp_a = 0;

Global.footerH = footerH;
Global.headerH = headerH;
Global.resize = resize;

// Global.XYtoIJ=()=>{
// 	var res=[];
// 
// 	var seqL=0;
// 	for (var i=0; i<Work.global.seqXY.length; i++)
// 	if ((Work.global.seqXY[i].x+Work.global.seqXY[i].len) > seqL)
// 		seqL = Work.global.seqXY[i].x+Work.global.seqXY[i].len;
// 
// 	for (var i=0; i<seqL; i++)
// 		res.push({notes:[], sel:0});
// 
// 	for (var i=0; i<Work.global.seqXY.length; i++)
// 	res[Work.global.seqXY[i].x].notes.push({
// 		note: Work.global.seqXY[i].y,
// 		len: Work.global.seqXY[i].len,
// 		vel: Work.global.seqXY[i].vel,
// 		layer: Work.global.seqXY[i].layer,
// 		sel: Work.global.seqXY[i].sel
// 	});
// 
// 	return res;	
// }
// 
// Global.IJtoXY=()=>{
// 	var res=[];
// 	for (var i=0; i<Work.global.seqIJ.length; i++)
// 	for (var j=0; j<Work.global.seqIJ[i].notes.length; j++)
// 	res.push({
// 		x: i,
// 		y: Work.global.seqIJ[i].notes[j].note,
// 		len: Work.global.seqIJ[i].notes[j].len,
// 		vel: Work.global.seqIJ[i].notes[j].vel,
// 		layer: Work.global.seqIJ[i].notes[j].layer,
// 		sel: Work.global.seqIJ[i].notes[j].sel
// 	});
// 	return res;
// }


}())