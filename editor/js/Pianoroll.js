function Pianoroll(){
 	this.resolution="16n";
	this.canvas=document.getElementById("canvas-main");
	this.ctx = this.canvas.getContext("2d");
	this.left = 0;
	this.top = 0;
	this.width = this.canvas.width;
	this.height = this.canvas.height;
	this.viewportL = 0;  // left most column position in timeline
	this.viewportW = 64; // number of columns / 8n's
	this.viewportH = 88; // height of viewport in rows (key's)
	this.viewportB = 0; // bottom row key on piano
	this.isMetronomeOn=1;
	this.playhead=-1;
	this.moved=0; 
	this.mouseDown=0;
	this.writingNoteLen=0;
 	this.isWriting=0;
 	this.selX1=-1; 
 	this.selX2=-1; 
 	this.selY1=-1;
 	this.selY2=-1;
 	this.selCol=-1;
 	this.curX=null;
 	this.isPlaying=0;
 	this.playingFromT=0;
 	this.autoScrolling=0;
 	this.curY=null;
 	this.clipboard=[];
	this.history=[];
 	this.historyPos=-1;
 	this.historyLastAction=null;
 	this.newNote=null;
 	this.endTick=0;
 	this.selEnd=-99999;
 	this.curNote;
 	this.dragType="pan";
 	this.panX;
 	this.panY;
 	this.layer=[];
 	this.master={};
 	
 	var self=this, ctx=this.ctx;
	var Yoffset=Global.headerH+4;

	this.canvas.onmousemove=function(e){
	if (Navbar.dragType!="") return;
	
		self.curX=e.clientX;
		self.curY=e.clientY-Yoffset; // 100: total height of toolbar 1 &2

		var w=self.width / self.viewportW;	
		var h=self.height / self.viewportH;			

		self.moved=1;
		
		if (self.mouseDown){
		
			if (e.metaKey) Controls.tempDrag="rect";
			if (e.shiftKey) Controls.tempDrag="zoom";
			if (e.altKey) Controls.tempDrag="meas";
			if (e.ctrlKey) Controls.tempDrag="span";
			if (e.keyCode==32) Controls.tempDrag="pan";
		
		 	var ins= Controls.tempDrag=="" ? self.dragType : Controls.tempDrag;
			if (ins=="span") {
				self.selX2=self.viewportL+Math.floor(self.curX/self.width*self.viewportW);
				//self.selY2=self.viewportB+Math.floor((1-self.curY/self.height)*self.viewportH);
				self.selectNotes(self.selX1, 0, self.selX2, 87, Work.global.through, e.metaKey);
			} else	
			if (ins=="rect"){
				self.selX2=self.viewportL+Math.floor(self.curX/self.width*self.viewportW);
				self.selY2=self.viewportB+Math.floor((1-self.curY/self.height)*self.viewportH);
				self.selectNotes(self.selX1, self.selY1, self.selX2, self.selY2, Work.global.through, e.metaKey);
			} else 
			if (ins=="pan"){
				self.selX2=self.panX+Math.floor(self.curX/self.width*self.viewportW);
				self.selY2=self.panY+Math.floor((1-self.curY/self.height)*self.viewportH);
				self.viewportL= -self.selX2+self.selX1+self.panX;
				if (self.viewportL<0) self.viewportL=0;
				self.viewportB= -self.selY2+self.selY1+self.panY;
				if (self.viewportB<0) self.viewportB=0;
				if (self.viewportB+self.viewportH>88) self.viewportB=88-self.viewportH;				
				Navbar.updateLR();
			} else
			if (ins=="zoom"){
				self.selX2=self.panX+Math.floor(self.curX/self.width*self.viewportW);
				self.selY2=self.panY+Math.floor((1-self.curY/self.height)*self.viewportH);
				self.viewportW= -self.selX2+self.selX1+self.viewportW;
				if (self.viewportW<32) self.viewportW=32;
				if (self.viewportW>1024) self.viewportW=1024;
				self.viewportH= -self.selY2+self.selY1+self.viewportH;
				if (self.viewportH<24) self.viewportH=24;
				if (self.viewportB+self.viewportH>88) self.viewportH=88-self.viewportB;
				Navbar.updateLR();
			} else
			if (ins=="meas"){
				var currentTick=self.viewportL+Math.floor(self.curX/self.width*self.viewportW);
				let tickPerMeas= Work.global.bpMeas * 4;
				
				if (currentTick<self.selX1){
					self.selX1= (Math.floor(self.selX1 / tickPerMeas) + 1) * tickPerMeas - 1;
					self.selX2= Math.floor(currentTick / tickPerMeas) * tickPerMeas;
				} else {
					self.selX1= Math.floor(self.selX1 / tickPerMeas) * tickPerMeas;
					self.selX2= (Math.floor(currentTick / tickPerMeas)+1) * tickPerMeas  - 1;
				}
				
				self.selectMeas(self.selX1, self.selX2, Work.global.through);
				self.selectNotes(self.selX1, 0, self.selX2, 87, Work.global.through, e.metaKey);
			};
		} else {// if not mouse down 
// 			if (self.curX<50) self.tilting=-1;
// 			else if (self.curX>self.width-50) self.tilting=1;
// 			else self.tilting=0;
		}
	};
	
	this.canvas.onmousedown=function(e){
	
		Navbar.dragType="";

// 		if (self.isPlaying) { 
// 			self.stop(); 
// 			return; 
// 		}; 

		self.moved=0;
		self.mouseDown=1;
		self.selX1=self.viewportL+Math.floor(e.clientX/self.width*self.viewportW);
		self.selX2=self.selX1;
		
		var x = e.clientX;
		var y = e.clientY-Yoffset; // 100: total height of toolbar 1 &2
		var w = self.width / self.viewportW;	
		var h = self.height / self.viewportH;			
		var tickX = Math.floor(x/w)+self.viewportL;	
		var tickY = Math.floor((self.height-y)/h)+self.viewportB;	

	 	var ins= Controls.tempDrag=="" ? self.dragType : Controls.tempDrag;		
 		if (ins=="rect"){		
			self.selY1=self.viewportB+Math.floor((1-y/self.height)*self.viewportH);
			self.selY2=self.selY1;
		} else if (ins=="span"){	
			self.selY1=0;
			self.selY2=87;
		} else if (ins=="pan"){
			self.selY1=self.viewportB+Math.floor((1-y/self.height)*self.viewportH);
			self.selY2=self.selY1;
			self.panX=self.viewportL;
			self.panY=self.viewportB;
		} else if (ins=="zoom"){
			self.selY1=self.viewportB+Math.floor((1-y/self.height)*self.viewportH);
			self.selY2=self.selY1;
			self.panX=self.viewportL;
			self.panY=self.viewportB;
		} else if (ins=="meas"){
			self.selY1=0;
			self.selY2=87;
		};
		
		var w=self.width / self.viewportW;	
		var h=self.height / self.viewportH;	

		if (self.newNote && e.button==0){
			self.addNote(tickX, {"note": tickY,
				"len": Tone.Time(self.newNote)/Tone.Time("16n"), "offset":0, "sel": 0, "vel": 30, "layer": Work.global.layer_sel});
			var ins=self.layer[Work.global.layer_sel].instrument;
			if (ins) ins.triggerAttackRelease(Global.chromatic_scale[tickY],
				Tone.Time("4n"), Tone.now(), 1);
			self.newNote=null;
		};
	};
	this.canvas.onmouseup=function(e){
	
		if (Navbar.dragType!="") return;

		self.mouseDown=0;
		self.selX1=-1;
		self.selX2=-1;
		self.selY1=-1;
		self.selY1=-1;	

		var x = e.clientX;
		var y = e.clientY-Yoffset; // 100: total height of toolbar 1 & 2
		var w = self.width / self.viewportW;	
		var h = self.height / self.viewportH;
		var tickX = Math.floor(x/w)+self.viewportL;	
		var tickY = Math.floor((self.height-y)/h)+self.viewportB;	

		if (!self.isPlaying || self.moved==0){
			self.playhead=tickX;			
			if (Work.global.magnet) self.playhead=
				Math.floor(self.playhead / (Work.global.bpMeas*4)) * (Work.global.bpMeas*4);
			self.playStart=self.playhead;
			self.playingFromT=Tone.now();
			self.stop();
//			self.selStart=self.playhead;
		};
		
// 		self.playhead=
// 			self.viewportL+Math.floor(e.clientX/self.width*self.viewportW);			
// 		if (Work.global.magnet) self.playhead=
// 			Math.floor(self.playhead / (Work.global.bpMeas*4)) * (Work.global.bpMeas*4);

		var notePos=self.getNote(x,y);
		if (e.metaKey) {
			if (notePos!=null && Work.global.seqIJ[notePos[0]].notes[notePos[1]].layer==Work.global.layer_sel)
				Work.global.seqIJ[notePos[0]].notes[notePos[1]].sel=
				1-Work.global.seqIJ[notePos[0]].notes[notePos[1]].sel;
//				console.log(self.selCount(),self.getOctListFromSel());
		} else {
			if (self.moved===0) {
				self.deSelectAll();
				self.deSelectMeas();
				self.stop();
			};
			if (notePos!=null && (Work.global.seqIJ[notePos[0]].notes[notePos[1]].layer==Work.global.layer_sel 
			|| Work.global.through == 1) ) {
				Work.global.seqIJ[notePos[0]].notes[notePos[1]].sel=1;
				var ins=self.layer[Work.global.layer_sel].instrument;
				if (ins) ins.triggerAttackRelease(
					Global.chromatic_scale[Work.global.seqIJ[notePos[0]].notes[notePos[1]].note],
					Work.global.seqIJ[notePos[0]].notes[notePos[1]].len > 8 ? Tone.Time("2n") :
					Work.global.seqIJ[notePos[0]].notes[notePos[1]].len * Tone.Time("16n"),
					Tone.now(), Work.global.seqIJ[notePos[0]].notes[notePos[1]].vel/30
				);		
				self.stop();
//				console.log(self.selCount(),self.getOctListFromSel());
			} else if (self.selCount()==0 && Controls.tempDrag==""
			 && self.moved==0 && !self.isPlaying){
				var ins=self.layer[Work.global.layer_sel].instrument;
				if (ins) ins.triggerAttackRelease(
					Global.chromatic_scale[tickY],
					Tone.Time("4n"), Tone.now(), 1
				);							
				self.stop();
			} else {
//				console.log(self.selCount(),self.getOctListFromSel());
			};
		};			
	};
};
Pianoroll.prototype.selectMeas=function(x1,x2, through){
	this.deSelectMeas();
	if (x1>x2) {
		tx=x1;
		x1=x2;
		x2=tx;
	};
	if (x2>Work.global.seqIJ.length-1) x2=Work.global.seqIJ.length-1;
	if (x1<=Work.global.seqIJ.length-1)
	for (var i=x1; i<=x2; i++) Work.global.seqIJ[i].sel=1;
}
Pianoroll.prototype.deSelectMeas=function(){
	for (var i=0; i<Work.global.seqIJ.length; i++) Work.global.seqIJ[i].sel=0;
}
Pianoroll.prototype.addNote=function(tick, note, cause){

	var l=Work.global.seqIJ.length;
	if (tick+note.len>l)
		for (var i=0; i<tick+note.len-l; i++){
			Work.global.seqIJ.push({notes:[]});
		};
	Work.global.seqIJ[tick].notes.push(note);
//	if (this.endTick<tick+note.len-1) this.endTick=tick+note.len-1;
 	this.updateEndTick(); 	
 	if (cause=="improvise") this.historyPush("improvise");
	else this.historyPush("add note");
}
Pianoroll.prototype.updateEndTick=function(){
	this.endTick=-99999;
	for (var i=0; i<Work.global.seqIJ.length; i++)
		for (var j=0; j<Work.global.seqIJ[i].notes.length; j++)
			if (this.endTick<i+(Work.global.seqIJ[i].notes[j].offset||0)+Work.global.seqIJ[i].notes[j].len) 
				this.endTick=i+(Work.global.seqIJ[i].notes[j].offset||0)+Work.global.seqIJ[i].notes[j].len;

//	this.endTick = (Math.floor(this.endTick / 16)+1)*16-1;


	var l=Work.global.seqIJ.length-1;

	if (this.endTick < l)
		for (var i=0; i< l-this.endTick; i++)
			Work.global.seqIJ.pop();	

	if (this.endTick > l)
		for (var i=0; i< this.endTick-l; i++)
			Work.global.seqIJ.push({notes:[], sel:0});	
			
//	this.viewportW=Work.global.seqIJ.length+1;
//	this.viewportL=0;
	Navbar.updateLR();		
}
Pianoroll.prototype.stop=function(){
	Tone.Transport.stop(); 
	this.isPlaying=false; 
}
Pianoroll.prototype.selectNotes=function(x1,y1,x2,y2,through,meta){
	var left = x1 < x2 ? x1 : x2;
	var right = x1 < x2 ? x2 : x1;
	var top = y1 < y2 ? y2 : y1;
	var bottom = y1 < y2 ? y1 : y2;
	this.playhead=left;
	for (var i=0; i<Work.global.seqIJ.length; i++)
	for (var j=0; j<Work.global.seqIJ[i].notes.length; j++){
		if (i+Work.global.seqIJ[i].notes[j].len>left && i<=right 
		&& Work.global.seqIJ[i].notes[j].note>=bottom && Work.global.seqIJ[i].notes[j].note<=top 
		&& (Work.global.seqIJ[i].notes[j].layer==Work.global.layer_sel || through) ) {
			Work.global.seqIJ[i].notes[j].sel=1;
		} else {
			if (!meta) Work.global.seqIJ[i].notes[j].sel=0;
		};
	};
};
Pianoroll.prototype.scroll=function(dir, step){
	if (dir=="up") { if (this.viewportB<88-this.viewportH) this.viewportB++};
	if (dir=="down") { if (this.viewportB>0) this.viewportB--};
	if (dir=="left") { if (this.viewportL>0) this.viewportL-=step; };
	if (dir=="right") this.viewportL+=step;
	if (dir=="top") this.viewportB=88-this.viewportH;
	if (dir=="bottom") this.viewportB=0;
	if (dir=="beginning") {
		if (this.viewportL==0) this.playhead=-1
			else this.viewportL=0;
	};
	if (dir=="end") {
		var h=Work.global.seqIJ.length-this.viewportW;
		this.viewportL= h>=0 ? h : 0;
	};
	Navbar.updateLR();
};
Pianoroll.prototype.historyPush=function(action){
	if (this.historyLastAction==action && action!=null){
		this.history.pop();		
	} else {
		var hislen=this.history.length;
		for (var i=0; i<hislen-1-this.historyPos; i++){
			this.history.pop();
		};
		this.historyPos++;
	};
	this.history.push(copyObj(Work.global.seqIJ));
	this.historyLastAction=action;
};
Pianoroll.prototype.undo=function(){
	this.stop();
	if (this.historyPos>0) this.historyPos--;
 	Work.global.seqIJ=copyObj(this.history[this.historyPos]);
	this.updateEndTick();
};
Pianoroll.prototype.redo=function(){
	this.stop();
	if (this.historyPos<this.history.length-1) this.historyPos++;
 	Work.global.seqIJ=copyObj(this.history[this.historyPos]);
	this.updateEndTick(); 	
};
Pianoroll.prototype.delNotes=function(){
	this.stop();
	for (var i=0; i<Work.global.seqIJ.length; i++) {
		var s=[];
		for (var j=0; j<Work.global.seqIJ[i].notes.length; j++)
			if (Work.global.seqIJ[i].notes[j].sel===0) 
				s.push(copyObj(Work.global.seqIJ[i].notes[j]));
		Work.global.seqIJ[i].notes=s;
	};
	this.updateEndTick();	
	this.historyPush("del note");
};
Pianoroll.prototype.move=function(dir, step){

	var top= -99999, left= 99999, right= -99999, bottom= 99999;
	for (var i=0; i<Work.global.seqIJ.length; i++)
	for (var j=0; j<Work.global.seqIJ[i].notes.length; j++)
	if (Work.global.seqIJ[i].notes[j].sel===1)
	{
		if (left>i) left=i;
		if (right<i+Work.global.seqIJ[i].notes[j].len-1) right=i+Work.global.seqIJ[i].notes[j].len-1;
		if (top<Work.global.seqIJ[i].notes[j].note) top=Work.global.seqIJ[i].notes[j].note;
		if (bottom>Work.global.seqIJ[i].notes[j].note) bottom=Work.global.seqIJ[i].notes[j].note;
	};
			
	if (dir=="up" && top<87){
		for (var i=0; i<Work.global.seqIJ.length; i++)
			for (var j=0; j<Work.global.seqIJ[i].notes.length; j++)
				if (Work.global.seqIJ[i].notes[j].sel===1)
					Work.global.seqIJ[i].notes[j].note++;
	};
		
	if (dir=="down" && bottom>0){
		for (var i=0; i<Work.global.seqIJ.length; i++)
			for (var j=0; j<Work.global.seqIJ[i].notes.length; j++)
				if (Work.global.seqIJ[i].notes[j].sel===1)
					Work.global.seqIJ[i].notes[j].note--;
	};

//	Buggy: Max Polyphony Reached! Crackling!!!
	if (dir=="up" || dir=="down")
	if (this.selCount()==1){
		var i, j;
		for (var ii=0; ii<Work.global.seqIJ.length; ii++)
		for (var jj=0; jj<Work.global.seqIJ[ii].notes.length; jj++)
		if (Work.global.seqIJ[ii].notes[jj].sel) {
			i=ii;
			j=jj;
			break;
		};
		var ins = this.layer[Work.global.layer_sel].instrument;
		if (ins) {
			ins.triggerAttackRelease(Global.chromatic_scale[Work.global.seqIJ[i].notes[j].note], 
			Tone.Time("16n"), Tone.now(), 1);	
		};
	};
	
	if (dir=="right" && right==Work.global.seqIJ.length-1) 
		Work.global.seqIJ.push({notes:[]});
	
	if ((dir=="left" && left>0) || 
	(dir=="right" && right<Work.global.seqIJ.length-1)){
			
		for (var i=0; i<Work.global.seqIJ.length; i++)
			for (var j=0; j<Work.global.seqIJ[i].notes.length; j++)
				if (Work.global.seqIJ[i].notes[j].sel===1) {
					Work.global.seqIJ[i].notes[j].sel=-1;
					var offset=1;
					if (dir=="left") offset=-1;
					Work.global.seqIJ[i+offset].notes.push(
						copyObj(Work.global.seqIJ[i].notes[j])
					);
					Work.global.seqIJ[i].notes[j].sel=1;
				};
		
		for (var i=0; i<Work.global.seqIJ.length; i++){
			var s=[];
			for (var j=0; j<Work.global.seqIJ[i].notes.length; j++) 
				if (Work.global.seqIJ[i].notes[j].sel!=1) 
					s.push(Work.global.seqIJ[i].notes[j]);
			Work.global.seqIJ[i].notes=s;
		};

		for (var i=0; i<Work.global.seqIJ.length; i++)
			for (var j=0; j<Work.global.seqIJ[i].notes.length; j++) 
				if (Work.global.seqIJ[i].notes[j].sel===-1)
					Work.global.seqIJ[i].notes[j].sel=1;

		this.updateEndTick();
	};
	
	this.historyPush("MOVE");
};
Pianoroll.prototype.deSelectAll=function(){
	for (var i=0; i<Work.global.seqIJ.length; i++)
		for (var j=0; j<Work.global.seqIJ[i].notes.length; j++)
			if (Work.global.seqIJ[i].notes[j].sel===1) 
				Work.global.seqIJ[i].notes[j].sel=0;
	this.historyLastAction=null;
};
Pianoroll.prototype.selCount=function(){
	var c=0;
	for (var i=0; i<Work.global.seqIJ.length; i++)
	for (var j=0; j<Work.global.seqIJ[i].notes.length; j++)
		if (Work.global.seqIJ[i].notes[j].sel===1) {
			c++;
	};
	return c;
};
Pianoroll.prototype.selectedNotes=function(){
	var r=[];
	for (var i=0; i<Work.global.seqIJ.length; i++)
	for (var j=0; j<Work.global.seqIJ[i].notes.length; j++)
		if (Work.global.seqIJ[i].notes[j].sel===1) {
			r.push({x: i, y: j, n: copyObj(Work.global.seqIJ[i].notes[j])});
	};
	return r;
};

Pianoroll.prototype.trisect=function(){
	var r=this.selectedNotes();
	if (r.length!=1) return;
	var n=copyObj(r[0].n), x=r[0].x, y=r[0].y;
	Work.global.seqIJ[x].notes[y].len = Work.global.seqIJ[x].notes[y].len / 3;
	this.addNote(x + Math.floor(n.len/3), {
		note:n.note,
		len:n.len/3,
		offset:n.len/3-Math.floor(n.len/3),
		vel:n.vel,
		sel:n.sel,
		layer:n.layer
	} ,"trisect")
	this.addNote(x + Math.floor(n.len*2/3), {
		note:n.note,
		len:n.len/3,
		offset:n.len*2/3-Math.floor(n.len*2/3),
		vel:n.vel,
		sel:n.sel,
		layer:n.layer
	} ,"trisect")
};

Pianoroll.prototype.drawPianoRoll=function(){
// pink 255,100,255

	var octpos;
	var h=this.height / this.viewportH;
	var w=this.width / this.viewportW;

	// draw horizontal lines (piano key lines)
	for (var i=this.viewportB; i<this.viewportH+this.viewportB; i++){
		octpos= i % 12;
		if (octpos == 1 || octpos == 4 || octpos == 6 
			|| octpos == 9 || octpos == 11)
		this.ctx.fillStyle="rgba(0,0,0,1)";
		else this.ctx.fillStyle="rgba(255,255,255,0.3)";		
		this.ctx.fillRect(0,this.height-(i-this.viewportB)*h-h,this.width,h-1);
	};
	// draw vertical lines
	for (var i=0; i<this.viewportW; i++){
// 		// accent column
// 		if ((i+this.viewportL) % (Global.timeSig*4) >= 0 
// 			&& (i+this.viewportL) % (Global.timeSig*4) <= 3) {
// 			this.ctx.fillStyle="rgba(255,255,255,0.1)";
// 			this.ctx.fillRect(w*i,0,w,this.height);
// 		};
// 		// sub accent column
// 		if ((i+this.viewportL) % (Global.timeSig*4) >= 8 
// 			&& (i+this.viewportL) % (Global.timeSig*4) <= 11) {
// 			this.ctx.fillStyle="rgba(255,255,255,0.04)";
// 			this.ctx.fillRect(w*i,0,w,this.height);
// 		};
		// odd measures
		if (Math.floor((i+this.viewportL) / (Work.global.bpMeas*4)) % 2 ==1) {
			this.ctx.fillStyle="rgba(255,255,255,0.1)";
			this.ctx.fillRect(w*i,0,w,this.height);
		};
		// beginning column
		if ((i+this.viewportL) == 0 && Work.global.seqIJ.length>0) {
			this.ctx.fillStyle="rgba(50,150,255,0.6)";
			this.ctx.fillRect(w*i,0,w,this.height);
		};
		// ending column
		if ((i+this.viewportL) == this.endTick) {
			this.ctx.fillStyle="rgba(50,150,255,0.6)";
			this.ctx.fillRect(w*i,0,w,this.height);
		};
		
// 		// playing column

// 		if (this.autoScrolling == 0 || this.mouseDown){
// 			if (this.isPlaying && (i+this.viewportL) == this.playhead){
// 				this.ctx.fillStyle="rgba(255,255,255,0.6)";
// 				this.ctx.fillRect(w * (i + (Tone.now()-this.playingFromT)/Tone.Time("16n")),0,w,this.height);
// 			};
// 			if (!this.isPlaying && (i+this.viewportL) == this.playhead){
// 				this.ctx.fillStyle="rgba(255,255,255,0.6)";
// 				this.ctx.fillRect(w * i, 0, w, this.height);
// 			};
// 		};

// 		if (this.isPlaying){
// 			var currentX = ((Tone.now()-this.playingFromT)/ Tone.Time("16n") - this.viewportL
// 				+ this.selStart) * w;
// 			this.ctx.beginPath();
// 			this.ctx.lineWidth=3;
// 			this.ctx.strokeStyle = "rgba(255,255,255,1)";
// 			this.ctx.moveTo(currentX, 0);
// 			this.ctx.lineTo(currentX, this.height);
// 			this.ctx.stroke();			
// 		};
		
		// thin vertical tick separating lines
		var lod = 4;
		if (this.viewportW / 32 > 8) lod= 8;
		if (this.viewportW / 32 > 16) lod= 16;
		if (this.viewportW / 32 < 4) lod= 2;
		if (this.viewportW / 32 < 2) lod= 1;
		this.ctx.beginPath();
		this.ctx.lineWidth=1;
		if ((i+this.viewportL) % 4 ==0) 
			this.ctx.strokeStyle = "rgba(0,0,0,1)";
		else 
			this.ctx.strokeStyle = "rgba(0,0,0,0.2)";
		if ((i+this.viewportL) % lod ==0){
		this.ctx.moveTo(w*i, 0);
		this.ctx.lineTo(w*i, this.height);
		this.ctx.stroke();
		};
	};
	
	// draw imp auto
	if (Global.imp_a) {
	var c=6, cs=Composer.palette;
	this.ctx.save();
	for (var i=1; i<this.viewportW+8; i++)
	if ((i+this.viewportL) % 8 == 0 && 
	Work.layer[0].seqIJ.length-(i+this.viewportL)>=0){
		for (var imp=0; imp<c; imp++){
			this.ctx.fillStyle=cs[imp]+",0.15)";
			if (Math.floor((i+this.viewportL) / 8)-1==Math.floor(this.playhead/8))
				this.ctx.fillStyle=cs[imp]+",0.5)";
			this.ctx.fillRect(
				w*(i-8)+imp*w*8/c,
				Work.layer[0].imp_a[i+this.viewportL-8].iparams[imp][0]*this.height,
				w*8/c, (Work.layer[0].imp_a[i-8+this.viewportL].iparams[imp][1]
				-Work.layer[0].imp_a[i+this.viewportL-8].iparams[imp][0])*this.height);
		};
	};
	this.ctx.restore();
	};

	if (this.autoScrolling == 0 || this.mouseDown){
		if (this.isPlaying){
			this.ctx.fillStyle="rgba(255,255,255,0.6)";
			this.ctx.fillRect(w * (this.playStart- this.viewportL + (Tone.now()-this.playingFromT)/Tone.Time("16n")),0,w,this.height);
		};
		if (!this.isPlaying){
			this.ctx.fillStyle="rgba(255,255,255,0.6)";
			this.ctx.fillRect(w * (this.playhead-this.viewportL), 0, w, this.height);
		};
	};
	if (this.autoScrolling == 1 && !this.mouseDown){
		this.ctx.fillStyle="rgba(255,255,255,0.6)";
		this.ctx.fillRect(w * (Math.floor(this.viewportW/2)),0,w,this.height);
	};

//	this.ctx.globalCompositeOperation = 'xor';

	const max_vel_height=12;

	// draw notes in out-focus layers
	for (var j=0; j<Work.global.seqIJ.length; j++) 
	if (Work.global.seqIJ[j].notes.length>0) {
	for (var i=0; i<Work.global.seqIJ[j].notes.length; i++)
	if (Work.global.seqIJ[j].notes[i].layer!=Work.global.layer_sel){
	
		// draw normal notes
		var left = (j+(Work.global.seqIJ[j].notes[i].offset||0)-this.viewportL)*w, 
			top= this.height-(Work.global.seqIJ[j].notes[i].note-this.viewportB)*h-h,
			width= w * Work.global.seqIJ[j].notes[i].len,
			height= h,
			colorF="rgba(40,130,50,0.5)";			
			
		var sel=this.selCount();
 		var sel=this.selCount();

		if (Composer.diatonic_mask[Work.global.seqIJ[j].notes[i].note]==0)
			colorF="rgba(255,80,80,0.5)";	

		this.ctx.beginPath();
		this.ctx.fillStyle= colorF;
		this.ctx.rect(left, top, width-1, height-1);
		this.ctx.fill();

		if ((Work.global.seqIJ[j].notes[i].sel==1 && !this.isPlaying) 
		|| ((!this.layer[Work.global.seqIJ[j].notes[i].layer].channel.muted &&
			this.isPlaying && this.playhead>=j+(Work.global.seqIJ[j].notes[i].offset||0) && 
			this.playhead<Work.global.seqIJ[j].notes[i].len+j+(Work.global.seqIJ[j].notes[i].offset||0)) &&
			(sel==0 || (sel>0 && Work.global.seqIJ[j].notes[i].sel==1)))) {
			
			this.ctx.save()
			
			colorF = "rgba(200,255,200,";
			if (Composer.diatonic_mask[Work.global.seqIJ[j].notes[i].note]==0){
				colorF = "rgba(255,50,50,";	
			};

 			var velH=h*max_vel_height*Work.global.seqIJ[j].notes[i].vel/127;
// 			if (this.isPlaying)
// 				if (Math.round(Tone.now()*1000) % 2 == 0) velH=velH*0.96;
			
			var grd=this.ctx.createLinearGradient(0,top-velH,0,top);
			grd.addColorStop(0,colorF+"0)");
			grd.addColorStop(1,colorF+"0.6)");
			this.ctx.fillStyle=grd;
			this.ctx.fillRect(left, top-velH, width-1, velH);

			grd=this.ctx.createLinearGradient(0,h+top,0,h+top+velH);
			grd.addColorStop(0,colorF+"0.6)");
			grd.addColorStop(1,colorF+"0)");
			this.ctx.fillStyle=grd;
			this.ctx.fillRect(left, h+top, width-1, velH);
			
			this.ctx.restore();
		};	
			
		if (Work.global.seqIJ[j].notes[i].sel===1){
			colorB = "rgba(255,255,255,1)";
			lineW=Math.ceil(512/this.viewportW);
			if (lineW<1) lineW=1;
			if (lineW>4) lineW=4;

			this.ctx.strokeStyle = colorB;
			this.ctx.lineWidth=lineW;
			this.ctx.stroke();	

		}
			
	};
	};		

	// draw notes in current layer
	for (var j=0; j<Work.global.seqIJ.length; j++) 
	if (Work.global.seqIJ[j].notes.length>0) {
	for (var i=0; i<Work.global.seqIJ[j].notes.length; i++)
	if (Work.global.seqIJ[j].notes[i].layer==Work.global.layer_sel){
		
		// draw normal notes	
		var left = (j+(Work.global.seqIJ[j].notes[i].offset||0)-this.viewportL)*w, 
			top= this.height-(Work.global.seqIJ[j].notes[i].note-this.viewportB)*h-h,
			width= w * Work.global.seqIJ[j].notes[i].len,
			height= h,
			colorF="rgba(100,255,100,0.9)";			
			
 		var sel=this.selCount();

		if (Composer.diatonic_mask[Work.global.seqIJ[j].notes[i].note]==0)
			colorF="rgba(255,80,80,0.9)";	

		this.ctx.beginPath();
		this.ctx.fillStyle= colorF;
		this.ctx.rect(left, top, width-1, height-1);
		this.ctx.fill();

		if ((Work.global.seqIJ[j].notes[i].sel==1 && !this.isPlaying) 
		|| ((!this.layer[Work.global.seqIJ[j].notes[i].layer].channel.muted &&
			this.isPlaying && this.playhead>=j+(Work.global.seqIJ[j].notes[i].offset||0) && 
			this.playhead<Work.global.seqIJ[j].notes[i].len+j+(Work.global.seqIJ[j].notes[i].offset||0)) &&
			(sel==0 || (sel>0 && Work.global.seqIJ[j].notes[i].sel==1)))) {
			
			this.ctx.save()
			
//			this.ctx.globalCompositeOperation = 'lighter';

			colorF = "rgba(200,255,200,";
			if (Composer.diatonic_mask[Work.global.seqIJ[j].notes[i].note]==0){
				colorF = "rgba(255,50,50,";	
			};

 			var velH=h*max_vel_height*Work.global.seqIJ[j].notes[i].vel/127;
// 			if (this.isPlaying)
// 				if (Math.round(Tone.now()*1000) % 2 == 0) velH=velH*0.96;
			
			var grd=this.ctx.createLinearGradient(0,top-velH,0,top);
			grd.addColorStop(0,colorF+"0)");
			grd.addColorStop(1,colorF+"0.6)");
			this.ctx.fillStyle=grd;
			this.ctx.fillRect(left, top-velH, width-1, velH);

			grd=this.ctx.createLinearGradient(0,h+top,0,h+top+velH);
			grd.addColorStop(0,colorF+"0.6)");
			grd.addColorStop(1,colorF+"0)");
			this.ctx.fillStyle=grd;
			this.ctx.fillRect(left, h+top, width-1, velH);
			
			this.ctx.restore();
	
		};		

		if (Work.global.seqIJ[j].notes[i].sel===1){
			colorB = "rgba(255,255,255,1)";
			lineW=Math.ceil(512/this.viewportW);
			if (lineW<1) lineW=1;
			if (lineW>4) lineW=4;

			this.ctx.strokeStyle = colorB;
			this.ctx.lineWidth=lineW;
			this.ctx.stroke();	

		}
	};
	};

//	this.ctx.globalCompositeOperation = 'source-over';


	//draw octave numbers
	for (var i=this.viewportB; i<this.viewportH+this.viewportB; i++){
		if (i % 12 == 3 && i<87){
			this.ctx.save();	
			this.ctx.font = "bold 32px Arial";
//			this.ctx.font = Math.round(w)+"px Arial bold";
			this.ctx.fillStyle = "rgba(200,200,200,1)";
			this.ctx.translate(25, 
				this.height-(i-this.viewportB)*h);
			this.ctx.rotate(-Math.PI/2);
			this.ctx.fillText("C"+(Math.floor(i/12)+1), 0,0);
			this.ctx.restore();
		};
	};
	
	//draw measure numbers
	var display_step= Math.ceil( 150 / (w * 16) );
	for (var i=0; i<this.viewportW; i++)
	if ((i+this.viewportL) % (16*display_step) == 0){
		this.ctx.save();	
// 		this.ctx.font = Math.round(h)+"px Arial bold";
		this.ctx.font = "bold 32px Arial";
		this.ctx.fillStyle = "rgba(200,200,200,1)";
		this.ctx.fillText("M" + (Math.floor((i+this.viewportL)/16)+1), 
			(i+1)*w, 25);
		this.ctx.restore();
	};
	

		
	// draw rectangle selection
 	var ins= Controls.tempDrag=="" ? this.dragType : Controls.tempDrag;		
	if (ins=="rect" || ins=="span" || ins=="meas"){
		var left = this.selX1 < this.selX2 ? this.selX1 : this.selX2;
		var right = this.selX1 < this.selX2 ? this.selX2 : this.selX1;
		if (ins=="rect"){
			var top = this.selY1 < this.selY2 ? this.selY2 : this.selY1;
			var bottom = this.selY1 < this.selY2 ? this.selY1 : this.selY2;
		} else {
			var top = 87;
			var bottom = 0;
		};
		this.ctx.fillStyle="rgba(255,100,255,0.4)";
		this.ctx.fillRect(
			w*(left-this.viewportL),
			this.height-h*(1+top-this.viewportB),
			w*(right-left+1),
			h*(top-bottom+1)
		);
	};
	
	// draw select measures
	for (var i=0; i<Work.global.seqIJ.length;i++)
	if (Work.global.seqIJ[i].sel===1) {
		this.ctx.fillStyle="rgba(255,255,255,0.4)";
		this.ctx.fillRect(
			w*(i-this.viewportL),
			0,
			w,
			h*(87+1)
		);
	};

	// if putting a new note on the roll
	if (this.newNote){
		this.ctx.beginPath();
		this.ctx.rect(this.curX-w/2, this.curY-h/2, w * Tone.Time(this.newNote)/Tone.Time("16n"), h);
		this.ctx.fillStyle= "rgba(0,255,0,0.5)";
		if (Composer.diatonic_mask[this.viewportB+Math.floor((this.height-this.curY)/h)]==0)
			this.ctx.fillStyle= "rgba(255,50,50,0.9)";
		this.ctx.fill();
		this.ctx.strokeStyle = "rgba(200,255,200,0.5)";
		this.ctx.lineWidth=2;
		this.ctx.stroke();		
	};
};
Pianoroll.prototype.resize=function(){
	this.canvas.height = window.innerHeight
		-document.getElementById("top-bar-group").offsetHeight
		-document.getElementById("canvas-nav").offsetHeight
		-document.getElementById("bottom-bar-group").offsetHeight;
 	this.canvas.width=window.innerWidth;
 	this.height=this.canvas.height;
 	this.width=this.canvas.width;
};
Pianoroll.prototype.anim=function(){
	this.ctx.clearRect(0,0,this.width,this.height);
	this.drawPianoRoll();
	requestAnimationFrame(this.anim.bind(this));
}

Pianoroll.prototype.stop=function(){
	if (this.isPlaying) { 
		Tone.Transport.stop(); 
		this.autoScrolling=0;
		this.isPlaying=false; 
	};
}

Pianoroll.prototype.play=function(){
	this.autoScrolling=0;
	if (Work.global.seqIJ.length==0) return;
	else if (this.isPlaying) { 
		this.stop();
	} else { 
		sel=this.selCount();
		if (sel>0){
			this.selEnd=-99999;
			this.selStart=99999;
			for (var i=0; i<Work.global.seqIJ.length; i++)
				for (var j=0; j<Work.global.seqIJ[i].notes.length; j++)
					if (Work.global.seqIJ[i].notes[j].sel===1){
						if (this.selEnd<(i+(Work.global.seqIJ[i].notes[j].offset||0)+Work.global.seqIJ[i].notes[j].len)) 
							this.selEnd=i+(Work.global.seqIJ[i].notes[j].offset||0)+Work.global.seqIJ[i].notes[j].len;
						if (this.selStart>i) this.selStart=i;
					};
			this.playhead=this.selStart-1;
		} else {
			this.selEnd=this.endTick;
			this.selStart=this.playhead;
		};

		this.playingFromT=Tone.now();
		this.playStart=this.playhead;
		Tone.Transport.start(); 
		this.isPlaying=true;
	};
}

Pianoroll.prototype.playNext=function(t){
	this.playhead++;

	if (Work.global.metronome){
		var tt=(this.playhead % 16);
		if (tt==0) this.drum1.triggerAttackRelease("A0", "8n", t, 0.7);
// 		if (tt==0) this.drum1.triggerAttackRelease("E1", "8n", t, 0.7);
		if (tt==4) this.drum2.triggerAttackRelease("16n", t, 0.04);
		if (tt==8) this.drum1.triggerAttackRelease("F1", "8n", t, 0.1);
		if (tt==12) this.drum2.triggerAttackRelease("16n", t, 0.04);
	};

	var sel=this.selCount();

	if (this.playhead>this.selEnd-1) {
		if (sel==0) this.selStart=0;	
		this.playhead=this.selStart;
		this.playStart=this.playhead;
		this.playingFromT=Tone.now();
	};

	// auto scrolling
	if (!this.mouseDown && this.viewportW<Work.global.seqIJ.length){

		var autoScrollOffset = -Math.floor(this.viewportW/2)+1;		
		this.viewportL = this.playhead + autoScrollOffset;

		if (this.viewportL < 0) this.viewportL=0;
		if (this.viewportL+this.viewportW > Work.global.seqIJ.length) 
			this.viewportL=Work.global.seqIJ.length-this.viewportW;

		if (this.isPlaying && this.viewportL > 0 && this.viewportL+this.viewportW < Work.global.seqIJ.length)
			this.autoScrolling = 1;
		else this.autoScrolling = 0;
		
		Navbar.updateLR();
	};

	if (Work.global.seqIJ[this.playhead].notes.length>0) 
	for (var i=0; i<Work.global.seqIJ[this.playhead].notes.length; i++)
	if (sel==0 || 
	(Work.global.seqIJ[this.playhead].notes[i].sel==1 && sel>0)){
		var ins=this.layer[Work.global.seqIJ[this.playhead].notes[i].layer].instrument;
		if (ins!=null) ins.triggerAttackRelease(
			Global.chromatic_scale[Work.global.seqIJ[this.playhead].notes[i].note], 
			Tone.Time("16n")*Work.global.seqIJ[this.playhead].notes[i].len, 
			t+(Work.global.seqIJ[this.playhead].notes[i].offset||0)*Tone.Time("16n"),
			Work.global.seqIJ[this.playhead].notes[i].vel/30);
	};	
}

Pianoroll.prototype.zoom=function(dir, step){
	if (dir=="x-in") if (this.viewportW>8) this.viewportW--;
	if (dir=="x-out") this.viewportW++;
	if (dir=="y-in") if (this.viewportH>0) this.viewportH--;
	if (dir=="y-out" && this.viewportH<88) this.viewportH++;
}
Pianoroll.prototype.tempo=function(dir, step){
	if (dir=="up") if (Global.bpm<Global.bpm_range[1]) {
		Global.bpm+=1;
		this.setBpm(Global.bpm);
	};
	if (dir=="down") if (Global.bpm>Global.bpm_range[0]) {
		Global.bpm-=1;
		this.setBpm(Global.bpm);
	};
}
Pianoroll.prototype.setNewNote=function(n){
	this.newNote=n;
}
Pianoroll.prototype.escapeKeyPressed=function(){
	Tone.Transport.stop();
	this.deSelectAll();
	this.isPlaying=false;
	this.newNote=null;
}
Pianoroll.prototype.selectAll=function(through){
	for (var i=0; i<Work.global.seqIJ.length; i++)
	for (var j=0; j<Work.global.seqIJ[i].notes.length; j++)
	if (through || Work.global.seqIJ[i].notes[j].layer==Work.global.layer_sel)
		Work.global.seqIJ[i].notes[j].sel=1;
}
Pianoroll.prototype.getNote=function(x,y){
	var w=this.width / this.viewportW;
	var h=this.height / this.viewportH;
	var r;
	for (var i=0; i<Work.global.seqIJ.length; i++) 
	for (var j=0; j<Work.global.seqIJ[i].notes.length; j++){
		if ((Work.global.seqIJ[i].notes[j].layer == Work.global.layer_sel || Work.global.through==1) 
		&& x > (i+(Work.global.seqIJ[i].notes[j].offset||0)-this.viewportL)*w 
		&& y > this.height-(Work.global.seqIJ[i].notes[j].note-this.viewportB)*h-h
		&& x < (i+(Work.global.seqIJ[i].notes[j].offset||0)-this.viewportL)*w + w*Work.global.seqIJ[i].notes[j].len 
		&& y< this.height-(Work.global.seqIJ[i].notes[j].note-this.viewportB)*h) {
			r=[i, j];
			break;
		};
	};
	return r;
};
Pianoroll.prototype.copyNotes=function(){
	this.clipboard=[];
	for (var i=0; i<Work.global.seqIJ.length; i++)
	for (var j=0; j<Work.global.seqIJ[i].notes.length; j++)
		if (Work.global.seqIJ[i].notes[j].sel===1) 
			this.clipboard.push([i, copyObj(Work.global.seqIJ[i].notes[j])]);
};
Pianoroll.prototype.cutNotes=function(){
	this.copyNotes();
	this.delNotes();
};

Pianoroll.prototype.adjustVel=function(a){
	var ns=this.selectedNotes();
	if (ns.length==0) return;
	for (var i=0; i<ns.length; i++) {
		Work.global.seqIJ[ns[i].x].notes[ns[i].y].vel=Work.global.seqIJ[ns[i].x].notes[ns[i].y].vel*(1-a*0.01);
		if (Work.global.seqIJ[ns[i].x].notes[ns[i].y].vel<5) Work.global.seqIJ[ns[i].x].notes[ns[i].y].vel=5;
		if (Work.global.seqIJ[ns[i].x].notes[ns[i].y].vel>127) Work.global.seqIJ[ns[i].x].notes[ns[i].y].vel=127;
	};
	this.historyPush("Adjust Velocity");
}

Pianoroll.prototype.pasteNotes=function(){
	if (this.clipboard.length===0) return;
	this.deSelectAll();

	var left=99999, right=-99999;
	for (var i=0; i<this.clipboard.length; i++){
		if (left>this.clipboard[i][0]) left=this.clipboard[i][0];
		if (right<this.clipboard[i][0]+this.clipboard[i][1].len-1) 
			right=this.clipboard[i][0]+this.clipboard[i][1].len-1;
	};
	
	var ph=this.playhead;
	if (ph<0) ph=0;

//	console.log(left, right);
	var l=Work.global.seqIJ.length;
	for (var i=0; i < ph+right-left-l+1; i++){
		Work.global.seqIJ.push({notes:[]});
	};
	
	for (var i=0; i<this.clipboard.length; i++){
		Work.global.seqIJ[ph+this.clipboard[i][0]-left].notes.push(
			{
				note: this.clipboard[i][1].note,
				len: this.clipboard[i][1].len,
				vel: this.clipboard[i][1].vel,
				sel: this.clipboard[i][1].sel,
				offset: this.clipboard[i][1].offset,
				layer: Work.global.layer_sel
			}
		);
	};

	this.updateEndTick();
	
	this.historyPush("paste notes");
};
Pianoroll.prototype.setBpm=function(bpm){
	Tone.Transport.bpm.rampTo(bpm, 0.01);
}
Pianoroll.prototype.saveToLocal=function(){
	var output=JSON.stringify(Work);
	
//	output=String.fromCharCode.apply(String, pako.gzip(output,{to:'string'}));
//	output=zip(output);

	var a = document.body.appendChild(
		document.createElement("a")
	);
	a.download = Work.global.workname+".motf";
	a.href = "data:text/plain;base64," + 
		btoa(output);
	a.click();
	document.body.removeChild(a);
}
Pianoroll.prototype.autoZoom=function(xy){
	//this.updateEndTick();
	
	if (xy==null) xy="xy";
	
	if (xy=="xy" || xy=="y") {
		var Ymax=-99999, Ymin=99999;
		for (var i=0; i<Work.global.seqIJ.length; i++)
		for (var j=0; j<Work.global.seqIJ[i].notes.length; j++)
		{
			if (Ymax<Work.global.seqIJ[i].notes[j].note) Ymax=Work.global.seqIJ[i].notes[j].note;
			if (Ymin>Work.global.seqIJ[i].notes[j].note) Ymin=Work.global.seqIJ[i].notes[j].note;
		};
		this.viewportH = Ymax - Ymin + 1 + 6;
		if (this.viewportH<24) this.viewportH=24;
		this.viewportB = Ymin - Math.round((this.viewportH-(Ymax-Ymin)) / 2);
		if (this.viewportB<0) this.viewportB=0;
	};

	if (xy=="xy" || xy=="x"){
		this.viewportL = 0;
		this.viewportW = Work.global.seqIJ.length+1;
 		if (this.viewportW<32) this.viewportW=32;
 		if (this.viewportW>1024) this.viewportW=1024;
		Navbar.updateLR();
	};
	
	this.initVW=this.viewportW;
	this.initVH=this.viewportH;

}

// Pianoroll.prototype.getOctListFromSel=function(){
// 	var hasValue=true;
// 	var seeds=[];
// 	var selC=this.selCount();
// 	if (selC==0) return;
// 	seeds=[];
// 	for (var i=0; i<Work.global.seqIJ.length; i++) {
// 		var noteC=0;
// 		for (var j=0; j<Work.global.seqIJ[i].notes.length; j++)
// 			if (Work.global.seqIJ[i].notes[j].sel==1 && 
// 				Work.global.seqIJ[i].notes[j].len % 8==0) {
// 				noteC++;
// 				seeds.push({
// 					x: i, 
// 					y: Work.global.seqIJ[i].notes[j].note, 
// 					l: Work.global.seqIJ[i].notes[j].len
// 				});
// 				Work.global.seqIJ[i].notes[j].seed=1;
// 			};
// 		if (noteC>1) return [];
// 	};
// 	for (var k=0; k<seeds.length-1; ++)
// 		if (seeds[k].x+seeds[k].l!=seeds[k+1].x) {
// 			for (var i=0; i<Work.global.seqIJ.length; i++) {
// 			for (var j=0; j<Work.global.seqIJ[i].notes.length; j++)
// 				if (Work.global.seqIJ[i].notes[j].seed==1)
// 					Work.global.seqIJ[i].notes[j].seed=0;
// 			hasValue=false;
// 			break;
// 		}
// 	return hasValue;
// };

var seeds=[];
Pianoroll.prototype.getOctListFromSel=function(){
	seeds=[];
	var selC=this.selCount();
	if (selC==0) return;
	seeds=[];
	for (var i=0; i<Work.global.seqIJ.length; i++) {
		var noteC=0;
		for (var j=0; j<Work.global.seqIJ[i].notes.length; j++)
			if (Work.global.seqIJ[i].notes[j].sel==1 
				&& Work.global.seqIJ[i].notes[j].len % 8==0) {
				noteC++;
				seeds.push({
					x: i, 
					y: Work.global.seqIJ[i].notes[j].note, 
					l: Work.global.seqIJ[i].notes[j].len
				});
			};
		if (noteC>1) return [];
	};
	for (var i=0; i<seeds.length-1; i++)
		if (seeds[i].x+seeds[i].l!=seeds[i+1].x)
			return [];
	if (seeds.length==0 || seeds[0].x % 8 !=0) return [];
	return seeds;
};

Pianoroll.prototype.improvise=function(mode){
// 	var isSeed=false;
// 	for (var i=0; i<Work.global.seqIJ.length; i++) {
// 	for (var j=0; j<Work.global.seqIJ[i].notes.length; j++) {
// 		if (Work.global.seqIJ[i].notes[j].seed==1)
// 			Work.global.seqIJ[i].notes[j].seed=0;
// 		isSeed=true;
// 		break;
// 	};
// 	if (!isSeed) return;

//	if (seeds.length==0) 
		seeds=this.getOctListFromSel();
		
	if (seeds==null) return;

	var notes_input=copyObj(seeds);
	
	if (notes_input.length==0) return;
	
//	this.deSelectAll();

// 	console.log("input: ", notes_input);

// 	if (Math.random()<Composer.chord[2].w)
// 		notes_input[0].y=Composer.getNoteByOffset(notes_input[0].y,
// 			Composer.chord[2].k)

	var tl=0;
	for (var i=0; i<notes_input.length; i++)
		tl+=notes_input[i].l;
	
	var nIndex=0;
	for (var i=0; i<notes_input.length; i++){
				
		var notes=Composer.octSplit(
		
			mode,
		
			{x:notes_input[i].x, y:notes_input[i].y, l:notes_input[i].l},

			((i==notes_input.length-1) ? 
			{x:notes_input[i].x+notes_input[i].l, y:notes_input[0].y, l:1}
			: {x:notes_input[i+1].x, y:notes_input[i+1].y, l:1})
			
		);

		if (notes == null) return;
		
		nIndex+=notes.length;
	
		for (var j=0; j<notes.length; j++){
			this.addNote(
				notes[j].x, 
				{
					note: notes[j].y + 12, 
					len: notes[j].l, 
					sel:1, 
					vel:40,
					layer: Work.global.layer_sel
				},
				"improvise"
			);
		};

		// how to force anim run for at least 1 frame here?		
	};
	
	this.autoZoom("y");
}

Pianoroll.prototype.init=function(){
//	Work.global.seqXY=Global.IJtoXY();

	Tone.Transport.bpm.value=Work.global.bpm;
//	pianoroll.instrument=Instruments.synth[0];
	this.drum1=Instruments.drum1;
	this.drum2=Instruments.drum2;
	pianoroll.master.volume.volume.value = document.getElementById("input_master_volume").value;

	this.resize();
// 	this.viewportW=Work.global.seqIJ.length;
// 	this.viewportL=Navbar.selL;
// 	this.viewportW=Navbar.selR-Navbar.selL;	
	this.autoZoom();
 	this.updateEndTick();

	var f=this.playNext.bind(this);
	Tone.Transport.scheduleRepeat(function(t){f(t);}, this.resolution);
	requestAnimationFrame(this.anim.bind(this));
		
	Navbar.updateLR();

 	this.historyPush(); 
}

var pianoroll=new Pianoroll();

// pianoroll.master.reverb = new Tone.Freeverb(0.5).toDestination();
// pianoroll.master.reverb.set({wet : 0.2 });

// pianoroll.master.compressor = new Tone.Compressor(-20, 3).toDestination();

//pianoroll.master.volume = new Tone.Volume(0).connect(pianoroll.master.reverb);
pianoroll.master.volume = new Tone.Volume(0).toDestination();

// pianoroll.master.volume.connect(pianoroll.master.compressor);

for (var i=0; i<8; i++){
	pianoroll.layer.push({
		channel: new Tone.Channel(0,0).connect(pianoroll.master.volume),
		instrument:null
	});
};