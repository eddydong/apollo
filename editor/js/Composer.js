var Composer={};

(function() {

const palette=[
	"rgba(235,80,130",
	"rgba(245,160,70",
	"rgba(100,205,20",
	"rgba(10,185,160",
	"rgba(10,120,235",
	"rgba(180,100,225",
];

Composer.palette=palette;

for (var i=0; i<palette.length; i++){
	document.getElementById("btn_max_"+i).style.background=palette[i]+",0.8)";
	document.getElementById("btn_min_"+i).style.background=palette[i]+",0.8)";
};

//var canvas=document.getElementById("canvas-sub");
//var ctx = canvas.getContext("2d");
var height = Global.footerH, width=window.innerWidth;
//var anim;

// function anim(){
// 	ctx.fillStyle="#222222";
// 	ctx.fillRect(0,0,canvas.width,canvas.height);
// 	animID=requestAnimationFrame(anim);
// }

//animID=requestAnimationFrame(anim);
//var animID=requestAnimationFrame(anim);

var scaleMode;

function updateScale(){
	scaleMode = {
      Ionian:     "W W H W W W H",
      Dorian:     "W H W W W H W",
      Phrygian:   "H W W W H W W",
      Lydian:     "W W W H W W H",
      Mixolydian: "W W H W W H W",
      Aeolian:    "W H W W H W W",
      Locrian:    "H W W H W W W",
      Major:      "W W H W W W H",
      Minor:      "W H W W H W W",
      Chinese:    "W W T W T",
      Jazz:       "T W H H T W",
      Japanese:   "H Q W T W",
      Hungarian:  "T H W H W H W",
      Persian:	  "H T H H W T H",
      Ukrainian:  "W H T H W H W",
      Neapolian:  "H W W W W W H",
      Arabic:	  "H T H W H T H",
      Egyptian:	  "W T W T W"
	}[Work.global.scale].split(" ");
} 

updateScale();

var chord= (Work.global.scale=="Chinese" ? [{k:0,w:0.35},{k:2,w:0.2},{k:3,w:0.45}] 
							  : [{k:0,w:0.35},{k:2,w:0.2},{k:4,w:0.45}]);

Composer.chord=chord;

const search_dirs=[
	[ // for melody
		{d:0, p:0.2},
		{d:1, p:1},
		{d:-1, p:0.8},
		{d:2, p:0.2},
		{d:-2, p:0.2},
		{d:3, p:0.1},
		{d:-3, p:0.3},
		{d:4, p:0.05},
		{d:-4, p:0.02},
		{d:scaleMode.length, p:0.0},
		{d:-scaleMode.length, p:0.0}	
	],
	[ // for arpeggio
		{d:0, p:0.1},
		{d:1, p:1},
		{d:-1, p:0.4},
		{d:2, p:0.2},
		{d:-2, p:0.1},
		{d:3, p:0.1},
		{d:-3, p:0.1},
		{d:4, p:0.1},
		{d:-4, p:0.1},
		{d:scaleMode.length, p:0.0},
		{d:-scaleMode.length, p:0.0}	
	]
]; // offset in diatonic scale. first 2 must be 1 & -1! for other scales need to be reset

//const search_dir=[1, -2, 3, -3, -scaleMode.length]; // offset in diatonic scale. first 2 must be 1 & -1! for other scales need to be reset

const 
	iparams =[
	[// all
		[0.0, 1.0], // up_n_down: how zig-zag the progression is 
		[0.0, 1.0], // key_span: max pitch minus min pitch
		[0.0, 1.0], // granularity: number of notes
		[0.0, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
 		[0.0, 1.0], // leading_to_dest: is last but one note adjacent to the destiny?
 		[0.0, 1.0]  // repeating: how many notes is on the Y with its previous one?
	],

	[// root
		[0.0, 1.0], // up_n_down: how zig-zag the progression is 
		[0.0, 0.8], // key_span: max pitch minus min pitch
		[1.0, 1.0], // granularity: number of notes
		[0.7, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
 		[0.0, 1.0], // leading_to_dest: is last but one note adjacent to the destiny?
 		[0.0, 0.0]  // repeating: how many notes is on the Y with its previous one?
	],
	
	[// melody 
		[0.0, 1.0], // up_n_down: how zig-zag the progression is 
		[0.0, 0.7], // key_span: max pitch minus min pitch
		[0.0, 0.6], // granularity: number of notes
		[0.0, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
 		[0.0, 1.0], // leading_to_dest: is last but one note adjacent to the destiny?
 		[0.0, 1.0]  // repeating: how many notes is on the Y with its previous one?
	],
	
	[// arpeggios 
		[0.0, 0.7], // up_n_down: how zig-zag the progression is 
		[0.0, 1.0], // key_span: max pitch minus min pitch
		[1.0, 1.0], // granularity: number of notes
		[0.0, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
 		[1.0, 1.0], // leading_to_dest: is last but one note adjacent to the destiny?
 		[0.0, 0.0]  // repeating: how many notes is on the Y with its previous one?
	]
	];
	
const rythms=[ // split a note into its 1/8's
	[], // random
	[1],
	[2,1,1,2,1,1],
	[3,1,3,1],
	[6,1,1],
	[1,2,1,2,1,1]
];

var styles=[
	{ // root
		rythm: rythms[1], 
		suggester: search_dirs[0],
		iparam: iparams[0],
		tempo: 1
	},
	{ // base
		rythm: rythms[1], 
		suggester: search_dirs[1],
		iparam: iparams[0],
		tempo: 1
	},
	{ // melody
		rythm: rythms[0], 
		suggester: search_dirs[1],
		iparam: iparams[2],
		tempo: 1
	},
	{ // arpeggio
		rythm: rythms[0], 
		suggester: search_dirs[1],
		iparam: iparams[3],
		tempo: 1
	}
];

var meas=[2,2,3,2]; // of styles

var measures=[
	{
		rythm : [], // empty for randoms
		suggester : [
			{d:0, p:0.2},
			{d:1, p:1},
			{d:-1, p:0.8},
			{d:2, p:0.2},
			{d:-2, p:0.2},
			{d:3, p:0.1},
			{d:-3, p:0.3},
			{d:4, p:0.05},
			{d:-4, p:0.02},
			{d:7, p:0.0},
			{d:-7, p:0.0}	
		],
		iparams : [
			[0.0, 1.0], // up_n_down: how zig-zag the progression is 
			[0.0, 1.0], // key_span: max pitch minus min pitch
			[0.0, 1.0], // granularity: number of notes
			[0.0, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
 		[0.0, 1.0], // leading_to_dest: is last but one note adjacent to the destiny?
 		[0.0, 1.0]  // repeating: how many notes is on the Y with its previous one?
		]
	}
];


// composer automation, by layer by 1/2 measure
// E.g.: auto[0][1]: the second 1/2 measure of the first layer
// index aligned with pianoroll.seq
var auto=[
	{
	suggester : [
		{d:0, p:0.2},
		{d:1, p:1},
		{d:-1, p:0.8},
		{d:2, p:0.2},
		{d:-2, p:0.2},
		{d:3, p:0.1},
		{d:-3, p:0.3},
		{d:4, p:0.05},
		{d:-4, p:0.02},
		{d:scaleMode.length, p:0.0},
		{d:-scaleMode.length, p:0.0}	
	],
	iparam : [
		[0.0, 0.7], // up_n_down: how zig-zag the progression is 
		[0.0, 1.0], // key_span: max pitch minus min pitch
		[1.0, 1.0], // granularity: number of notes
		[0.0, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
 		[1.0, 1.0], // leading_to_dest: is last but one note adjacent to the destiny?
 		[0.0, 0.0]  // repeating: how many notes is on the Y with its previous one?
	]
	}
];

var rank=[];

// in Diatonic Scale

var draft= [];
var search_count=0;
var search_result= [];
var len_list=[];
var solutions=[];

var generate_diatonic_mask=()=>{
//output e.g.: [0, 2, 4, 5, 7, 9, 11, 12]

	updateScale();

    var steps = [0];
    for(var s = 0; s < scaleMode.length; s++) {
		var k = scaleMode[s];
		if(k == "W") {
			steps.push(steps[s] + 2);
		} else if(k == "T") {
			steps.push(steps[s] + 3);
		} else if(k == "Q") {
			steps.push(steps[s] + 4);
		} else {
			steps.push(steps[s] + 1);
		}
    };
	var m=[], c=0, rr=[];
	var mask=steps;
	for (var i=0; i<108; i++) m.push(0);
	for (var i=0; i<9; i++) 
		for (var j=0; j<mask.length; j++)
			m[i*12+((mask[j]+Work.global.key) % 12)]=1;
	for (var i=0; i<88; i++) rr.push(m[i+9]);

    return rr;
}

var rankRepeating=()=>{
	var data=[], max=-999, min=999;
	for (var i=0; i < search_result.length; i++) {
		
		var c=0;

// 		for (var j=1; j<search_result[i].length; j++)
// 			if (search_result[i][j].y==search_result[i][j-1].y)
// 				c++;

		for (var sampleL=2; sampleL<search_result[i].length/2; sampleL++){
			for (var j=0; j<search_result[i].length-sampleL; j++){
				var sample=[];
				for (var k=0; k<sampleL; k++) {
					sample.push(search_result[i][j+k].y);
				}
			
				for (var t=j+1; t<search_result[i].length-sampleL+1; t++)
					for (var p=-12; p<13; p++) {
						var rep=1;
						for (var k=0; k<sampleL; k++) 
							if (search_result[i][t+k].y+p != sample[k]){
								rep=0;
								break;
							};
						if (rep==1) {
							c+= sampleL*sampleL;
							break;
						}
					}
			};
		};

		var r=c/search_result[i].length;
		
		data.push(r);

		if (max < r) max = r;
		if (min > r) min = r;
	};

	return {min, min, max: max, data: data};
};

var rankLeadingToDest=(dest)=>{
	var data=[], max=-999, min=999;
	for (var i=0; i < search_result.length; i++) {

// 		var ltn= (getNoteByOffset(dest.y,1)==search_result[i][search_result[i].length-1].y
// 		 || getNoteByOffset(dest.y,-1)==search_result[i][search_result[i].length-1].y
// 		 || (dest.y % 12 ==search_result[i][search_result[i].length-1].y % 12
// 		 	&& dest.y != search_result[i][search_result[i].length-1].y)) ? 1:0;

		var ltn= (getNoteByOffset(dest.y,-1)==search_result[i][search_result[i].length-1].y
		|| getNoteByOffset(dest.y,+1)==search_result[i][search_result[i].length-1].y) ? 1:0;

		data.push(ltn);

		if (max < ltn) max = ltn;
		if (min > ltn) min = ltn;
	};

	return {min, min, max: max, data: data};
};
var rankInHarmony=(root)=>{
	var data=[], max=-999, min=999;
	for (var i=0; i<search_result.length; i++) {
		var tih=0; //total in harmony
		for (var j=0; j<search_result[i].length-1; j++){
			for (var k=0; k<chord.length; k++)
				if (getNoteByOffset(root.y,chord[k].k) % 12 
				== search_result[i][j].y % 12)
					tih+=search_result[i][j].l*chord[k].w;
		};
		data.push(tih);
		if (max < tih) max = tih;
		if (min > tih) min = tih;
	};
	return {min, min, max: max, data: data};
};
var rankGranularity=()=>{
	var data=[], max=-999, min=999;
	for (var i=0; i<search_result.length; i++) {
		var l=search_result[i].length-1;
		data.push(l);
		if (max < l) max = l;
		if (min > l) min = l;
	};
	return {min, min, max: max, data: data};
};
var rankKeySpan=()=>{
	var data=[], max=-999, min=999;
	for (var i=0; i<search_result.length; i++) {
		var ma=-999, mi=999;
		for (var j=0; j<search_result[i].length-1; j++){
			if (ma < search_result[i][j].y) ma = search_result[i][j].y;
			if (mi > search_result[i][j].y) mi = search_result[i][j].y;
		};
		data.push(ma-mi);
		if (max < ma-mi) max = ma-mi;
		if (min > ma-mi) min = ma-mi;
	};
	return {min, min, max: max, data: data};
};
var rankUpNDown=()=>{
	var data=[], max=-999, min=999;
	for (var i=0; i<search_result.length; i++) {
		data.push(0);
		var last_d=0;
		for (var j=1; j<search_result[i].length; j++){
			var d=0;
			if (search_result[i][j].y>search_result[i][j-1].y) d=1;
			if (search_result[i][j].y<search_result[i][j-1].y) d=-1;
			if (d!=last_d){
				data[i]++;
				last_d=d;
			};
		};
		if (max<data[i]) max=data[i];
		if (min>data[i]) min=data[i];
	};
	return {min, min, max: max, data: data};
};

var getNoteByOffset=(n, o)=>{
	if (Composer.diatonic_mask[n]==0) return null;
	var c=0;
	if (o>0) {
		for (var i=n; i<108; i++){
			if (Composer.diatonic_mask[i]==1){
				if (c==o) return i;
				c++;
			};
		};
	} else {
		for (var i=n; i>=0; i--){
			if (Composer.diatonic_mask[i]==1){
				if (c==o) return i;
				c--;
			};
		};
	};
	return null;
}
var findSolutions=(params)=>{
	var min, max, s=[];
	
	for (var p=0; p<params.length; p++){
	
		s.push(new Set());

		min= rank[p].min+(rank[p].max-rank[p].min)*params[p][0]
		max= rank[p].min+(rank[p].max-rank[p].min)*params[p][1]

		for (var i=0; i<search_result.length; i++) 
			if (rank[p].data[i]>=min && rank[p].data[i]<=max)
				s[p].add(i);
	};
	
	var res=[];
	
	for (var i=0; i<search_result.length; i++) {
		var goodone=1;
		for (var j=0; j<s.length; j++)
			if (!s[j].has(i)) { goodone=0; break; };
		if (goodone==1) res.push(i);
	};
	
	console.log(rank[5]);
	console.log(res.length+" / "+search_result.length+" / "
		+search_count);

	return res;
};
var suggest=()=>{
	return search_result[solutions[Math.floor(Math.random()*solutions.length)]];
}

var search=(root, dest)=>{

	if (root.x>=dest.x){
		if (root.y == dest.y) 
			search_result.push(copyObj(draft));
		search_count++;
		return;
	};
	
// 	if (draft.length==0){
// 		for (var l=0; l<len_list.length; l++)
// 		{	
// 			draft.push({x: root.x, y: root.y, l: len_list[l]});
// 			search({x: root.x + len_list[l], y: null, l: null}, 
// 				dest);
// 			draft.pop();
// 		};
// 	} else {

	for (var i=0; i<Controls.params.suggester.length; i++)
	if (Math.random() < Controls.params.suggester[i].p)
	for (var l=0; l<len_list.length; l++)
	if (root.x+len_list[l]-1 < dest.x)
	{	
		draft.push({x: root.x, y: root.y, l: len_list[l]});
		var yy=getNoteByOffset(root.y, Controls.params.suggester[i].d);		
		if (yy != null){
			search({x: root.x + len_list[l], y: yy, l: null}, 
				dest);
		};
		draft.pop();
	};
	
// 	};
};

// var search1=(root, dest, rythm, suggester, totalL, nIndex)=>{
// 	if (root.x>=dest.x){
// 		if (root.y == dest.y) 
// 			search_result.push(copyObj(draft));
// 		search_count++;
// 
// 		return;
// 	};
// 
// 	for (var i=0; i < suggester.length; i++) 
// 	if (Math.random() < suggester[i].p)
// 	{
// 		var len = (totalL/8) * rythm[draft.length % rythm.length];
// 
// 		if (root.x+len-1 < dest.x) {
// 				
// 			draft.push({x: root.x, y: root.y, l: len});
// 
// 			var yy=getNoteByOffset(root.y, suggester[i].d);
// 		
// 			if (yy != null){
// 				search1({x: root.x + len, y: yy, l: root.l}, 
// 					dest, rythm, suggester, totalL, nIndex);
// 			};
// 			
// 			draft.pop();
// 		};
// 	};
// };

var search1=(root, dest, rythm, suggester, totalL, nIndex)=>{
	if (root.x>=dest.x){
		if (root.y == dest.y) 
			search_result.push(copyObj(draft));
		search_count++;

		return;
	};

// 	if (draft.length==0){
// 		for (var i=0; i < suggester.length; i++) 
// 		if (Math.random() < suggester[i].p)
// 			draft.push({x: root.x, y: root.y, l: len});
// 	};
// 
	for (var i=0; i < suggester.length; i++) 
	if (Math.random() < suggester[i].p)
	{
		var len = (totalL/8) * rythm[draft.length % rythm.length];

		if (root.x+len-1 < dest.x) {
				
			draft.push({x: root.x, y: root.y, l: len});

			var yy=getNoteByOffset(root.y, suggester[i].d);
		
			if (yy != null){
				search1({x: root.x + len, y: yy, l: root.l}, 
					dest, rythm, suggester, totalL, nIndex);
			};
			
			draft.pop();
		};
	};
};


var getSolutionN=()=>{ return solutions.length; };

var octSplit=(mode, root, dest)=>{
	search_count=0;
	len_list=[];
	search_result=[];
	rank=[];
	draft=[];
	solutions=[];
	var noteL=root.l;
	
	for (var i=1; i<root.l; i++)
		if (root.l % Math.pow(2, i) == 0)
			if (root.l / Math.pow(2,i) >= root.l/8) 
				len_list.push(root.l / Math.pow(2,i));

	var imp = (mode=="preset") ? Controls.params : Work.layer[0].imp_a[root.x];
	
	if (imp.rhythm=="random")
		search(root, dest);
	else search1(
		root, dest, 
		imp.rhythm, 
		imp.suggester, 
		dest.x-root.x
	);

//	search(root, dest);
		
	rank.push(rankUpNDown());
	rank.push(rankKeySpan());
	rank.push(rankInHarmony(root));
	rank.push(rankGranularity());
	rank.push(rankLeadingToDest(dest));
	rank.push(rankRepeating());
	
	solutions=findSolutions(imp.iparams);
	
	if (solutions.length>0)
	return search_result[solutions[Math.floor(Math.random()*solutions.length)]];
	else return null;
}

Composer.search_result=search_result;
Composer.solutions=solutions;

// var octSplit=(root, dest)=>{
// 	search_count=0;
// 	len_list=[];
// 	search_result=[];
// 	rank=[];
// 	draft=[];
// 	solutions=[];
// 	var noteL=root.l;
// 	
// 	for (var i=1; i<root.l; i++)
// 		if (root.l % Math.pow(2, i) == 0)
// 			if (root.l / Math.pow(2,i) >= root.l/8) 
// 				len_list.push(root.l / Math.pow(2,i));
// 
// 	if (styles[meas[(root.x / noteL) % meas.length]].rythm.length==0){
// 		search(root, dest);
// 	} else
// 	search1(
// 		root, dest, 
// 		styles[meas[(root.x / noteL) % meas.length]].rythm, 
// 		styles[meas[(root.x / noteL) % meas.length]].suggester, 
// 		dest.x-root.x
// 	);
// 
// //	search(root, dest);
// 		
// 	rank.push(rankUpNDown());
// 	rank.push(rankKeySpan());
// 	rank.push(rankGranularity());
// 	rank.push(rankInHarmony(root));
// 	rank.push(rankLeadingToDest(dest));
// 	rank.push(rankRepeating());
// 	
// 	solutions=findSolutions(styles[meas[(root.x / noteL) % meas.length]].iparam);
// 	
// 	if (solutions.length>0)
// 	return search_result[solutions[Math.floor(Math.random()*solutions.length)]];
// 	else return null;
// }

var init=()=>{
	Composer.diatonic_mask=generate_diatonic_mask();
};

init();

// exposing public properties (read only)
Composer.height		=	height;
// exposing public methods
Composer.octSplit	=	octSplit;
Composer.measures = measures;
Composer.getNoteByOffset = getNoteByOffset;
Composer.init=init;

}());
