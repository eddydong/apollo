var Controls= {};

(function(){

	Controls.tempDrag="";

	const default_params=[{"name":"Root Gen.","rhythm":"11111111","suggester":[{"d":0,"p":1},{"d":1,"p":1},{"d":-1,"p":1},{"d":2,"p":0.8},{"d":-2,"p":0.8},{"d":3,"p":0.45},{"d":-3,"p":0.85},{"d":4,"p":0.85},{"d":-4,"p":0.15},{"d":5,"p":0},{"d":-5,"p":0},{"d":7,"p":0},{"d":-7,"p":0}],"iparams":[["0","1"],["0","0.7"],["0.35","1"],["1","1"],["0","1"],["0.35","1"]]},{"name":"Bass Calm","rhythm":"random","suggester":[{"d":0,"p":0.8},{"d":1,"p":1},{"d":-1,"p":1},{"d":2,"p":0.5},{"d":-2,"p":0.5},{"d":3,"p":0.9},{"d":-3,"p":0.9},{"d":4,"p":0.4},{"d":-4,"p":0},{"d":5,"p":0},{"d":-5,"p":0},{"d":7,"p":0},{"d":-7,"p":0}],"iparams":[["0","1"],["0","0.5"],["0","0.5"],["0","0.5"],["0","1"],["0","1"]]},{"name":"Bass Rhy.","rhythm":"random","suggester":[{"d":0,"p":0.5},{"d":1,"p":1},{"d":-1,"p":1},{"d":2,"p":0.5},{"d":-2,"p":0.5},{"d":3,"p":0.7},{"d":-3,"p":0.9},{"d":4,"p":0.8},{"d":-4,"p":0},{"d":5,"p":0},{"d":-5,"p":0},{"d":7,"p":0},{"d":-7,"p":0}],"iparams":[["0","1"],["0","0.9"],["0.3","1"],["0.55","1"],["0","1"],["0","1"]]},{"name":"Melody 1","rhythm":"random","suggester":[{"d":0,"p":0.3},{"d":1,"p":1},{"d":-1,"p":1},{"d":2,"p":0.7},{"d":-2,"p":0.7},{"d":3,"p":0.6},{"d":-3,"p":0.7},{"d":4,"p":0.65},{"d":-4,"p":0.02},{"d":5,"p":0},{"d":-5,"p":0},{"d":7,"p":0.3},{"d":-7,"p":0}],"iparams":[["0","0.55"],["0","0.55"],["0.5","1"],["0","1"],["0","1"],["0","1"]]},{"name":"Melody 2","rhythm":"random","suggester":[{"d":0,"p":0.3},{"d":1,"p":1},{"d":-1,"p":1},{"d":2,"p":0.7},{"d":-2,"p":0.7},{"d":3,"p":0.6},{"d":-3,"p":0.7},{"d":4,"p":0.65},{"d":-4,"p":0.02},{"d":5,"p":0},{"d":-5,"p":0},{"d":7,"p":0.3},{"d":-7,"p":0}],"iparams":[["0","1"],["0","0.85"],["0.25","1"],["0","1"],["0","1"],["0","1"]]},{"name":"Melody 3","rhythm":"random","suggester":[{"d":0,"p":0.3},{"d":1,"p":1},{"d":-1,"p":1},{"d":2,"p":0.7},{"d":-2,"p":0.7},{"d":3,"p":0.6},{"d":-3,"p":0.7},{"d":4,"p":0.65},{"d":-4,"p":0.02},{"d":5,"p":0},{"d":-5,"p":0},{"d":7,"p":0.3},{"d":-7,"p":0}],"iparams":[["0","1"],["0","1"],["0","1"],["0","1"],["0","1"],["0","1"]]},{"name":"Rhythm 1","rhythm":"random","suggester":[{"d":0,"p":0.95},{"d":1,"p":0.9},{"d":-1,"p":0.9},{"d":2,"p":0.8},{"d":-2,"p":0.8},{"d":3,"p":0.75},{"d":-3,"p":0.75},{"d":4,"p":0.25},{"d":-4,"p":0.02},{"d":5,"p":0},{"d":-5,"p":0},{"d":7,"p":0},{"d":-7,"p":0}],"iparams":[["0","0.55"],["0","0.7"],["0.4","1"],["0","0.55"],["0","1"],["0","1"]]},{"name":"Rhythm 2","rhythm":"random","suggester":[{"d":0,"p":0.95},{"d":1,"p":0.9},{"d":-1,"p":0.9},{"d":2,"p":0.8},{"d":-2,"p":0.8},{"d":3,"p":0.75},{"d":-3,"p":0.75},{"d":4,"p":0.25},{"d":-4,"p":0.02},{"d":5,"p":0},{"d":-5,"p":0},{"d":7,"p":0},{"d":-7,"p":0}],"iparams":[["0","0.55"],["0","0.7"],["0.4","1"],["0","1"],["0","1"],["0","1"]]},{"name":"Arpeggio 1","rhythm":"11111111","suggester":[{"d":0,"p":0},{"d":1,"p":1},{"d":-1,"p":1},{"d":2,"p":0.4},{"d":-2,"p":0.4},{"d":3,"p":0.8},{"d":-3,"p":0.8},{"d":4,"p":0.7},{"d":-4,"p":0.15},{"d":5,"p":0},{"d":-5,"p":0},{"d":7,"p":0.4},{"d":-7,"p":0.45}],"iparams":[["0.3","1"],["0","1"],["0.2","1"],["1","1"],["1","1"],["0","1"]]},{"name":"Arpeggio 2","rhythm":"11111111","suggester":[{"d":0,"p":0.2},{"d":1,"p":1},{"d":-1,"p":1},{"d":2,"p":0.8},{"d":-2,"p":0.5},{"d":3,"p":0.7},{"d":-3,"p":0.95},{"d":4,"p":0.8},{"d":-4,"p":0.1},{"d":5,"p":0},{"d":-5,"p":0},{"d":7,"p":0},{"d":-7,"p":0}],"iparams":[["0.3","1"],["0","0.7"],["0.35","1"],["0.65","1"],["0","1"],["0.65","1"]]}];

	var isWritingPreset=0;

	window.onkeydown=function(e){
 		if (document.activeElement.id=="input_rhythm" ||
 			document.activeElement.id=="input_bpm" ||
 			document.activeElement.id=="input_layer_name" ||
 			document.activeElement.id=="input_workname")
 			return;

		e.preventDefault();

		Tone.start();

		var isEscapeDown = false;
		if ("key" in e) {
			isEscapeDown = (e.key == "Escape" || e.key == "Esc");
		} else {
			isEscapeDown = (e.keyCode == 27);
		};
		
		if (e.metaKey) {
		
			// scrolling
			if (e.keyCode == 37) pianoroll.scroll("beginning");
			if (e.keyCode == 39) pianoroll.scroll("end");
			if (e.keyCode == 38) pianoroll.scroll("top");
			if (e.keyCode == 40) pianoroll.scroll("bottom");			
			
			// copy / cut / paste / select all
			if (e.keyCode == 67) pianoroll.copyNotes();
			if (e.keyCode == 86) pianoroll.pasteNotes();
			if (e.keyCode == 88) pianoroll.cutNotes();		
			if (e.keyCode == 65) pianoroll.selectAll(Work.global.through);
			
			// undo / redo
			if (e.keyCode == 90 && !e.shiftKey) 
				pianoroll.undo();		
			if (e.keyCode == 90 && e.shiftKey) 
				pianoroll.redo();	
			
			// save seq to local	
			if (e.keyCode == 83) pianoroll.saveToLocal();
			
		} else if (e.altKey){		
			// adjust viewport size
			if (e.keyCode == 37) pianoroll.zoom("x-out");
			if (e.keyCode == 39) pianoroll.zoom("x-in");
			if (e.keyCode == 38) pianoroll.zoom("y-in");
			if (e.keyCode == 40) pianoroll.zoom("y-out");
			
		} else if (e.shiftKey){
		
		} else if (e.ctrlKey){

		} else {

			// abort
			if (isEscapeDown) {
				document.getElementById("btn_esc").onclick();
			};		
						
			// PLAY
			if (e.keyCode==13){ // space
				document.getElementById("btn_play").onclick();
			};
			
			// changing tempo
			if (e.keyCode==189){ // -
				pianoroll.tempo("down");
			};
			if (e.keyCode==187){ // +
				pianoroll.tempo("up");
			};
			
			// delete note(s)
			if (e.keyCode == 8) 
				pianoroll.delNotes();	
				
			// move note(s)
			if (pianoroll.selCount()>0) {
				if (e.keyCode == 37) pianoroll.move("left",1);
				if (e.keyCode == 39) pianoroll.move("right",1);
				if (e.keyCode == 38) pianoroll.move("up",1);
				if (e.keyCode == 40) pianoroll.move("down",1);
			} else 
			
			// scrolling 
			{
				if (e.keyCode == 37) pianoroll.scroll("left",1);
				if (e.keyCode == 39) pianoroll.scroll("right",1);
				if (e.keyCode == 38) pianoroll.scroll("up",1);
				if (e.keyCode == 40) pianoroll.scroll("down",1);
			};		

			// adjust length of selected note
			if (pianoroll.selCount()==1)
			for (var i=0; i<Work.global.seqIJ.length; i++)
			for (var j=0; j<Work.global.seqIJ[i].notes.length; j++)
			if (Work.global.seqIJ[i].notes[j].sel==1){
				var n=Work.global.seqIJ[i].notes[j];
				if (e.keyCode == 219 && n.len>1) {
					n.len--;
					pianoroll.historyPush("Length Adjust");
					pianoroll.updateEndTick();
				};
				if (e.keyCode == 221 && n.len<64) {
					n.len++;
					pianoroll.historyPush("Length Adjust");
					pianoroll.updateEndTick();
				};
				break;	
			};
			
			// i for improvising
			if (e.keyCode==73) {
				pianoroll.improvise("preset");
			};

			// new note
			// 192,49,50,51,51: "`1234"
			if (e.keyCode == 49) { pianoroll.setNewNote("16n"); };
			if (e.keyCode == 50) { pianoroll.setNewNote("8n"); };
			if (e.keyCode == 51) { pianoroll.setNewNote("4n"); };
			if (e.keyCode == 52) { pianoroll.setNewNote("2n"); };
			if (e.keyCode == 53) { pianoroll.setNewNote("1n"); };
			if (e.keyCode == 54) { pianoroll.setNewNote(Tone.Time("1n")*2); };
			if (e.keyCode == 55) { pianoroll.setNewNote(Tone.Time("1n")*4); };
			if (e.keyCode == 56) { pianoroll.setNewNote(Tone.Time("1n")*8); };
								
			if (e.keyCode == 84) { document.getElementById("btn_trisect").click(); };

			if (e.keyCode == 84) { document.getElementById("btn_trisect").click(); };
			if (e.keyCode == 192) { document.getElementById("btn_dot").click(); };
			
			// switch among synth instruments
// 			if (e.keyCode == 188) pianoroll.synthID--; 
// 			if (pianoroll.synthID<0) pianoroll.synthID=Instruments.synthCount-1;
// 			if (e.keyCode == 190) pianoroll.synthID++;
// 			if (pianoroll.synthID==Instruments.synthCount) pianoroll.synthID=0;

			// toggle metronome
			if (e.keyCode == 77) document.getElementById("btn_metronome").click();

		};
	};
	
	window.onkeyup=function(e){

	};
	
	window.onmouseup=(e)=>{
		Navbar.dragType="";
		Controls.tempDrag="";
	
		pianoroll.mouseDown=0;
		pianoroll.selX1=-1;
		pianoroll.selX2=-1;
		pianoroll.selY1=-1;
		pianoroll.selY1=-1;	
	}
	
	
	Controls.btn_imp_1=document.getElementById("btn_imp_1");
	Controls.btn_save=document.getElementById("btn_save");
	Controls.btn_open=document.getElementById("btn_open");
	Controls.btn_new=document.getElementById("btn_new");
	Controls.btn_metronome=document.getElementById("btn_metronome");
	Controls.btn_imp_a=document.getElementById("btn_imp_a");
	Controls.input_suggester_nob=document.getElementById("input_suggester_nob");
	Controls.select_suggester=document.getElementById("select_suggester");
	Controls.input_min_0=document.getElementById("input_min_0");
	Controls.input_max_0=document.getElementById("input_max_0");
	Controls.input_min_1=document.getElementById("input_min_1");
	Controls.input_max_1=document.getElementById("input_max_1");
	Controls.input_min_2=document.getElementById("input_min_2");
	Controls.input_max_2=document.getElementById("input_max_2");
	Controls.input_min_3=document.getElementById("input_min_3");
	Controls.input_max_3=document.getElementById("input_max_3");
	Controls.input_min_4=document.getElementById("input_min_4");
	Controls.input_max_4=document.getElementById("input_max_4");
	Controls.input_min_5=document.getElementById("input_min_5");
	Controls.input_max_5=document.getElementById("input_max_5");
	Controls.btn_imp_0=document.getElementById("btn_imp_0");
	Controls.btn_imp_1=document.getElementById("btn_imp_1");
	Controls.btn_imp_2=document.getElementById("btn_imp_2");
	Controls.btn_imp_3=document.getElementById("btn_imp_3");
	Controls.btn_imp_4=document.getElementById("btn_imp_4");
	Controls.btn_imp_5=document.getElementById("btn_imp_5");
	Controls.btn_imp_6=document.getElementById("btn_imp_6");
	Controls.btn_imp_7=document.getElementById("btn_imp_7");
	Controls.btn_imp_8=document.getElementById("btn_imp_8");
	Controls.btn_imp_9=document.getElementById("btn_imp_9");

	function updatePresets(){
		for (var i=0;i<10;i++) {
			var c= (i==Work.global.imp_pre_sel) ? "#bb33bb" : "#666666";
			document.getElementById("btn_imp_"+i).style.background=c;
		};
		fromPreset();
	}
		
	Controls.btn_imp_0.onclick=()=>{
		Work.global.imp_pre_sel=0;
		if (isWritingPreset) writePreset();
		updatePresets();
	};
	Controls.btn_imp_1.onclick=()=>{
		Work.global.imp_pre_sel=1;
		if (isWritingPreset) writePreset();
		updatePresets();
	};
	Controls.btn_imp_2.onclick=()=>{
		Work.global.imp_pre_sel=2;
		if (isWritingPreset) writePreset();
		updatePresets();
	};
	Controls.btn_imp_3.onclick=()=>{
		Work.global.imp_pre_sel=3;
		if (isWritingPreset) writePreset();
		updatePresets();
	};
	Controls.btn_imp_4.onclick=()=>{
		Work.global.imp_pre_sel=4;
		if (isWritingPreset) writePreset();
		updatePresets();
	};
	Controls.btn_imp_5.onclick=()=>{
		Work.global.imp_pre_sel=5;
		if (isWritingPreset) writePreset();
		updatePresets();
	};
	Controls.btn_imp_6.onclick=()=>{
		Work.global.imp_pre_sel=6;
		if (isWritingPreset) writePreset();
		updatePresets();
	};
	Controls.btn_imp_7.onclick=()=>{
		Work.global.imp_pre_sel=7;
		if (isWritingPreset) writePreset();
		updatePresets();
	};
	Controls.btn_imp_8.onclick=()=>{
		Work.global.imp_pre_sel=8;
		if (isWritingPreset) writePreset();
		updatePresets();
	};
	Controls.btn_imp_9.onclick=()=>{
		Work.global.imp_pre_sel=9;
		if (isWritingPreset) writePreset();
		updatePresets();
	};
	
//	Controls.btn_imp_0.onclick();	

	window.onscroll = (e) => { e.preventDefault(); window.scroll(0, 0); };
	window.oncontextmenu=function(){ return false; };
	window.onresize = () => { 
// 		Global.resize();
 		pianoroll.resize();
// 		Navbar.resize();
	};
						
	Controls.btn_save.onclick=()=>{
		pianoroll.saveToLocal();
	};
	
	// local .motf file loader
	var fileloader = document.body.appendChild(document.createElement("input"));
	fileloader.type = "file";
	fileloader.accept = ".motf";
	fileloader.style.display ="none";
	fileloader.onchange=()=>{
		var selectedFile = fileloader.files[0];
		var name = selectedFile.name;
		var size = selectedFile.size;
		var reader = new FileReader();
		reader.readAsText(selectedFile);
		reader.onload = function(){
			var res=this.result;

//			res=unzip(res);
		
			Work = JSON.parse(res);

//			Work.global.seqIJ=Global.XYtoIJ();
			
			pianoroll.historyPush();
			pianoroll.autoZoom();
			pianoroll.updateEndTick();
			pianoroll.playhead=-1;	
			Composer.init();
			init();
		};			
	}
	Controls.btn_open.onclick=()=>{
		pianoroll.stop();
		fileloader.click();
	};
	
	Controls.btn_new.onclick=()=>{
		pianoroll.stop();
		var seq=[];
		for (var i=0; i<64; i++) seq.push({notes: []});
		Work.global.seqIJ=seq;
		pianoroll.autoZoom();
		pianoroll.historyPush("New");
	};
	
	Controls.btn_metronome.style.background="#bb33bb";
	Controls.btn_metronome.onclick=()=>{
		if (Work.global.metronome===1) Work.global.metronome=0;
		else Work.global.metronome=1;
		Controls.btn_metronome.style.background=
			(Work.global.metronome==1) ? "#bb33bb" : "#666666";
	};	
	
	Controls.btn_imp_a.style.background="#666666";
	Controls.btn_imp_a.onclick=()=>{
		if (Global.imp_a===1) Global.imp_a=0; else Global.imp_a=1;
		Controls.btn_imp_a.style.background=
			(Global.imp_a==1) ? "#bb33bb" : "#666666";
	};	
	
	// foot zone init
	
	Controls.input_suggester_nob.oninput=()=>{
		var sug=Controls.select_suggester;
		sug.options[sug.selectedIndex].innerHTML=sug.options[sug.selectedIndex].innerHTML.substring(0,8)
			+ parseFloat(Controls.input_suggester_nob.value).toFixed(2);
			
		var comp=0;
		for (var j=0; j<13; j++){
			var v=parseFloat(document.getElementById("select_suggester").options[j].innerHTML.substring(8));
			Controls.params.suggester[j].p=parseFloat(v);
			comp+=v;
		};	
		document.getElementById("label_comp").innerHTML=comp.toFixed(1);
		document.getElementById("label_comp").style.background=
			"rgba("+(255*comp/10)+","+(180*(10-comp)/10)+","+(30*(10-comp)/10)+",1)";			
	};

	Controls.select_suggester.onchange=()=>{
		Controls.input_suggester_nob.value=
			Controls.select_suggester.value.substring(8);
	};

	Controls.input_max_0.oninput=()=>{
		var opposite=Controls.input_min_0;
		if (Controls.input_max_0.value<opposite.value)
			opposite.value=Controls.input_max_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[0][0]=
// 			Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[0][1]=
// 			Controls.input_max_0.value;
		Controls.params.iparams[0][0]=parseFloat(Controls.input_min_0.value);
		Controls.params.iparams[0][1]=parseFloat(Controls.input_max_0.value);
	};
	Controls.input_min_0.oninput=()=>{
		var opposite=Controls.input_max_0;
		if (Controls.input_min_0.value>opposite.value)
			opposite.value=Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[0][0]=
// 			Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[0][1]=
// 			Controls.input_max_0.value;
		Controls.params.iparams[0][0]=parseFloat(Controls.input_min_0.value);
		Controls.params.iparams[0][1]=parseFloat(Controls.input_max_0.value);
	};
	Controls.input_max_1.oninput=()=>{
		var opposite=Controls.input_min_1;
		if (Controls.input_max_1.value<opposite.value)
			opposite.value=Controls.input_max_1.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[1][0]=
// 			Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[1][1]=
// 			Controls.input_max_0.value;
		Controls.params.iparams[1][0]=parseFloat(Controls.input_min_1.value);
		Controls.params.iparams[1][1]=parseFloat(Controls.input_max_1.value);
	};
	Controls.input_min_1.oninput=()=>{
		var opposite=Controls.input_max_1;
		if (Controls.input_min_1.value>opposite.value)
			opposite.value=Controls.input_min_1.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[1][0]=
// 			Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[1][1]=
// 			Controls.input_max_0.value;
		Controls.params.iparams[1][0]=parseFloat(Controls.input_min_1.value);
		Controls.params.iparams[1][1]=parseFloat(Controls.input_max_1.value);
	};
	Controls.input_max_2.oninput=()=>{
		var opposite=Controls.input_min_2;
		if (Controls.input_max_2.value<opposite.value)
			opposite.value=Controls.input_max_2.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[2][0]=
// 			Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[2][1]=
// 			Controls.input_max_0.value;
		Controls.params.iparams[2][0]=parseFloat(Controls.input_min_2.value);
		Controls.params.iparams[2][1]=parseFloat(Controls.input_max_2.value);
	};
	Controls.input_min_2.oninput=()=>{
		var opposite=Controls.input_max_2;
		if (Controls.input_min_2.value>opposite.value)
			opposite.value=Controls.input_min_2.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[2][0]=
// 			Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[2][1]=
// 			Controls.input_max_0.value;
		Controls.params.iparams[2][0]=parseFloat(Controls.input_min_2.value);
		Controls.params.iparams[2][1]=parseFloat(Controls.input_max_2.value);
	};
	Controls.input_max_3.oninput=()=>{
		var opposite=Controls.input_min_3;
		if (Controls.input_max_3.value<opposite.value)
			opposite.value=Controls.input_max_3.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[3][0]=
// 			Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[3][1]=
// 			Controls.input_max_0.value;
		Controls.params.iparams[3][0]=parseFloat(Controls.input_min_3.value);
		Controls.params.iparams[3][1]=parseFloat(Controls.input_max_3.value);
	};
	Controls.input_min_3.oninput=()=>{
		var opposite=Controls.input_max_3;
		if (Controls.input_min_3.value>opposite.value)
			opposite.value=Controls.input_min_3.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[3][0]=
// 			Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[3][1]=
// 			Controls.input_max_0.value;
		Controls.params.iparams[3][0]=parseFloat(Controls.input_min_3.value);
		Controls.params.iparams[3][1]=parseFloat(Controls.input_max_3.value);
	};
	Controls.input_max_4.oninput=()=>{
		var opposite=Controls.input_min_4;
		if (Controls.input_max_4.value<opposite.value)
			opposite.value=Controls.input_max_4.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[4][0]=
// 			Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[4][1]=
// 			Controls.input_max_0.value;
		Controls.params.iparams[4][0]=parseFloat(Controls.input_min_4.value);
		Controls.params.iparams[4][1]=parseFloat(Controls.input_max_4.value);
	};
	Controls.input_min_4.oninput=()=>{
		var opposite=Controls.input_max_4;
		if (Controls.input_min_4.value>opposite.value)
			opposite.value=Controls.input_min_4.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[4][0]=
// 			Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[4][1]=
// 			Controls.input_max_0.value;
		Controls.params.iparams[4][0]=parseFloat(Controls.input_min_4.value);
		Controls.params.iparams[4][1]=parseFloat(Controls.input_max_4.value);
	};
	Controls.input_max_5.oninput=()=>{
		var opposite=Controls.input_min_5;
		if (Controls.input_max_5.value<opposite.value)
			opposite.value=Controls.input_max_5.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[5][0]=
// 			Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[5][1]=
// 			Controls.input_max_0.value;
		Controls.params.iparams[5][0]=parseFloat(Controls.input_min_5.value);
		Controls.params.iparams[5][1]=parseFloat(Controls.input_max_5.value);
	};
	Controls.input_min_5.oninput=()=>{
		var opposite=Controls.input_max_5;
		if (Controls.input_min_5.value>opposite.value)
			opposite.value=Controls.input_min_5.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[5][0]=
// 			Controls.input_min_0.value;
// 		Work.global.imp_pre[Work.global.imp_pre_sel].iparams[5][1]=
// 			Controls.input_max_0.value;
		Controls.params.iparams[5][0]=parseFloat(Controls.input_min_5.value);
		Controls.params.iparams[5][1]=parseFloat(Controls.input_max_5.value);
	};

	document.getElementById("input_bpm").onchange=()=>{
		Tone.Transport.bpm.rampTo(document.getElementById("input_bpm").value);
		Work.global.bpm=document.getElementById("input_bpm").value;
	}
	
	window.onload=()=>{
		document.getElementById("mask").style.display="none";
	}
	
	document.getElementById("btn_fit_xy").onclick=()=>{ 
		pianoroll.autoZoom("xy"); 
	};
	
	document.getElementById("btn_fit_x").onclick=()=>{ 
		pianoroll.autoZoom("x"); 
	};
	
	document.getElementById("btn_fit_y").onclick=()=>{ 
		pianoroll.autoZoom("y"); 
	};
	
	document.getElementById("btn_begin").onclick=()=>{ 
		pianoroll.scroll("beginning");
	};
	
	document.getElementById("btn_end").onclick=()=>{ 
		pianoroll.scroll("end"); 
	};
	
	document.getElementById("btn_play").onclick=()=>{ 
		pianoroll.play(); 
		var c;
		if (pianoroll.isPlaying) c="#bb33bb"; else c="#666666";
		document.getElementById("btn_play").style.background=c;
	};
	
	function fromPreset(){
		for (var i=0; i<10; i++){
			document.getElementById("btn_imp_"+i).innerHTML=
				Work.global.imp_pre[i].name;
		};
		
		document.getElementById("input_rhythm").value=
			Work.global.imp_pre[Work.global.imp_pre_sel].rhythm;
		document.getElementById("input_rhythm").style.background="#666666";
		document.getElementById("input_rhythm").style.color="#ffffff";
		
		var comp=0;
		for (var j=0; j<13; j++){
			var s=document.getElementById("select_suggester").options[j].innerHTML;
			document.getElementById("select_suggester").options[j].innerHTML
			=s.substring(0,8)+Work.global.imp_pre[Work.global.imp_pre_sel].suggester[j].p.toFixed(2);
			comp+=Work.global.imp_pre[Work.global.imp_pre_sel].suggester[j].p;
		};	
		Controls.input_suggester_nob.value=
			Controls.select_suggester.value.substring(8);

		document.getElementById("label_comp").innerHTML=comp.toFixed(1);
		document.getElementById("label_comp").style.background=
			"rgba("+(255*comp/10)+","+(180*(10-comp)/10)+","+(30*(10-comp)/10)+",1)";
		
		for (var j=0; j<6; j++){
			document.getElementById("input_min_"+j).value=
				Work.global.imp_pre[Work.global.imp_pre_sel].iparams[j][0];
			document.getElementById("input_max_"+j).value=
				Work.global.imp_pre[Work.global.imp_pre_sel].iparams[j][1];
		};	
		
		Controls.params=copyObj(Work.global.imp_pre[Work.global.imp_pre_sel]);
	};
	
	
	// validate input_rhythm
	document.getElementById("input_rhythm").onchange=(e)=>{
		var legal=1;

		var v=document.getElementById("input_rhythm").value;
		
		v=v.trim();
		
		if (v.toLowerCase()!="random" && v.toLowerCase()!="") {

			for (var i=0; i<v.length; i++) {
				if (v[i]!="1" && v[i]!="2" && v[i]!="3"
				&& v[i]!="4" && v[i]!="5" && v[i]!="6"
				&& v[i]!="7" && v[i]!="8") legal=0;
				break;
			};
			
			if (legal===1) {
				var sum=0;
				for (var i=0; i<v.length; i++) sum+=parseInt(v[i]);
				if (sum!=8) legal=0;
			};
		};

		if (legal===1){
			if (v=="") v="random";
			Controls.params.rhythm=v;
			document.getElementById("btn_apply_preset").focus();
		} else document.getElementById("input_rhythm").value="";
	
	};
	
	document.getElementById("input_rhythm").onfocus=()=>{
		document.getElementById("input_rhythm").style.background="#ffffff";
		document.getElementById("input_rhythm").style.color="#000000";
	}
	
	document.getElementById("input_rhythm").onblur=()=>{
		if (document.getElementById("input_rhythm").value.trim()=="")
			document.getElementById("input_rhythm").value="random";
		document.getElementById("input_rhythm").style.background="#666666";
		document.getElementById("input_rhythm").style.color="#ffffff";
	}

	document.getElementById("btn_write_preset").onclick=()=>{
		isWritingPreset=1;
		for (var i=0; i<10; i++)
		document.getElementById("btn_imp_"+i).style.background="#003300";
		document.getElementById("btn_imp_"+Work.global.imp_pre_sel).style.background="#118811";
	};

	document.getElementById("btn_apply_preset").onclick=()=>{
		pianoroll.improvise("preset");
	};

	document.getElementById("btn_auto_imp").onclick=()=>{
		pianoroll.improvise("automation");
	};

	document.getElementById("btn_esc").onclick=()=>{
		pianoroll.escapeKeyPressed();
		isWritingPreset=0;
		updatePresets();
		Tone.Transport.stop(); 
		pianoroll.isPlaying=false; 
		document.getElementById("btn_play").style.background="#666666";
	};
	
	function writePreset(){
// 		Work.global.imp_pre[Work.global.imp_pre_sel].rhythm=
// 			document.getElementById("input_rhythm").value;
// 		if (Work.global.imp_pre[Work.global.imp_pre_sel].rhythm=="")
// 			Work.global.imp_pre[Work.global.imp_pre_sel].rhythm="random";
// 
// 		for (var j=0; j<13; j++){		
// 			Work.global.imp_pre[Work.global.imp_pre_sel].suggester[j].p=
// 			parseFloat(document.getElementById("select_suggester").options[j].innerHTML.substring(8));
// 		};	
// 		
// 		for (var j=0; j<6; j++){
// 			Work.global.imp_pre[Work.global.imp_pre_sel].iparams[j][0]=
// 				parseFloat(document.getElementById("input_min_"+j).value);
// 			Work.global.imp_pre[Work.global.imp_pre_sel].iparams[j][1]=
// 				parseFloat(document.getElementById("input_max_"+j).value);
// 		};	

		Work.global.imp_pre[Work.global.imp_pre_sel]=copyObj(Controls.params);

		isWritingPreset=0;
	}
	
	function clearDragBtns(){
		for (var j=0; j<5; j++) 
			document.getElementById("btn_drag_"+j).style.background="#666666";
	};
		
	document.getElementById("btn_drag_0").onclick=()=>{
		clearDragBtns();
		pianoroll.dragType="pan";
		document.getElementById("btn_drag_0").style.background="#bb33bb";
	}
	document.getElementById("btn_drag_1").onclick=()=>{
		clearDragBtns();
		pianoroll.dragType="zoom";
		document.getElementById("btn_drag_1").style.background="#bb33bb";
	}
	document.getElementById("btn_drag_2").onclick=()=>{
		clearDragBtns();
		pianoroll.dragType="rect";
		document.getElementById("btn_drag_2").style.background="#bb33bb";
	}
	document.getElementById("btn_drag_3").onclick=()=>{
		clearDragBtns();
		pianoroll.dragType="span";		
		document.getElementById("btn_drag_3").style.background="#bb33bb";
	}
	document.getElementById("btn_drag_4").onclick=()=>{
		clearDragBtns();
		pianoroll.dragType="meas";		
		document.getElementById("btn_drag_4").style.background="#bb33bb";
	}
	
	document.getElementById("select_key").oninput=()=>{
		Work.global.key=document.getElementById("select_key").selectedIndex;
		Global.generate_chromatic_scale();
		Composer.init();
	}
	document.getElementById("select_scale").oninput=()=>{
		Work.global.scale=document.getElementById("select_scale").value;
		Composer.init();
	}

	document.getElementById("select_instrument").onchange=()=>{
		if (document.getElementById("select_instrument").value.substring(0,1)=="=") {
			console.log("skipping");
			return;
		};
		var i=document.getElementById("select_instrument").selectedIndex;
		Work.layer[Work.global.layer_sel].instrument=i;

		if (Work.layer[Work.global.layer_sel].instrument<16)
		pianoroll.layer[Work.global.layer_sel].instrument=Instruments.newSynth(Work.layer[Work.global.layer_sel].instrument, Work.global.layer_sel);
		else pianoroll.layer[Work.global.layer_sel].instrument=Instruments.newSampler(Work.layer[Work.global.layer_sel].instrument, Work.global.layer_sel);
	}

	document.getElementById("input_workname").onchange=()=>{
		document.getElementById("btn_save").focus();
		Work.global.workname=document.getElementById("input_workname").value.trim();
	}

// 	document.getElementById("input_master_reverb").oninput=()=>{
// 		Work.global.reverb=document.getElementById("input_master_reverb").value;
// 		pianoroll.master.reverb.roomSize.value=document.getElementById("input_master_reverb").value;
// 	}	

// 	var global_eff=1;
// 	document.getElementById("btn_global_effect").onclick=()=>{
// 		global_eff=1-global_eff;
// 		if (global_eff){
// 			pianoroll.master.volume.connect(pianoroll.master.reverb);
// 			pianoroll.master.volume.connect(pianoroll.master.compressor);
// 			pianoroll.master.volume.disconnect(Tone.getDestination());
// 		} else {
// 			pianoroll.master.volume.disconnect(pianoroll.master.reverb);
// 			pianoroll.master.volume.disconnect(pianoroll.master.compressor);
// 			pianoroll.master.volume.connect(Tone.getDestination());
// 		};
// 	};
// 
	var bl=(i)=>{return document.getElementById("btn_layer_"+i)};
	var fl=(k)=>{
		Work.global.layer_sel = k;
		for (var i=0; i<8; i++) bl(i).style.background="#666666";
		bl(k).style.background="#bb33bb";
		document.getElementById("select_instrument").selectedIndex=Work.layer[Work.global.layer_sel].instrument;
		document.getElementById("input_layer_name").value=Work.layer[k].name;	
		document.getElementById("input_layer_volume").value=Work.layer[k].volume;	
		document.getElementById("input_layer_pan").value=Work.layer[k].pan;	
	};
// 	for (var i=0; i<8; i++){
// 		var k=i;
// 		bl(k).onclick=()=>{ fl(k)};
// 	}
	bl(0).onclick=()=>{fl(0)};
	bl(1).onclick=()=>{fl(1)};
	bl(2).onclick=()=>{fl(2)};
	bl(3).onclick=()=>{fl(3)};
	bl(4).onclick=()=>{fl(4)};
	bl(5).onclick=()=>{fl(5)};
	bl(6).onclick=()=>{fl(6)};
	bl(7).onclick=()=>{fl(7)};
	
	var bm=(i)=>{return document.getElementById("btn_layer_"+i+"_mute")};
	var fm=(k)=>{
		Work.layer[k].mute = !Work.layer[k].mute;
		pianoroll.layer[k].channel.mute = Work.layer[k].mute;
		if (Work.layer[k].mute) bm(k).style.background="#ff0000";
		else bm(k).style.background="#660000";
	};
// 	for (var i=0; i<8; i++) {
// 		var k=i;
// 		bm(k).onclick=()=>{ fm(k)};
// 	};
	bm(0).onclick=()=>{fm(0)};
	bm(1).onclick=()=>{fm(1)};
	bm(2).onclick=()=>{fm(2)};
	bm(3).onclick=()=>{fm(3)};
	bm(4).onclick=()=>{fm(4)};
	bm(5).onclick=()=>{fm(5)};
	bm(6).onclick=()=>{fm(6)};
	bm(7).onclick=()=>{fm(7)};

	var bs=(i)=>{return document.getElementById("btn_layer_"+i+"_solo")};
	var fs=(k)=>{
		Work.layer[k].solo = !Work.layer[k].solo;
		pianoroll.layer[k].channel.solo = Work.layer[k].solo;
		if (Work.layer[k].solo) bs(k).style.background="#00dd00";
		else bs(k).style.background="#006600";
		for (var j=0; j<8; j++)
		if (pianoroll.layer[j].channel.muted) bm(j).style.background="#ff0000";
		else bm(j).style.background="#660000";	
	};
// 	for (var i=0; i<8; i++) {
// 		var k=i;
// 		bm(k).onclick=()=>{ fm(k)};
// 	};
	bs(0).onclick=()=>{fs(0)};
	bs(1).onclick=()=>{fs(1)};
	bs(2).onclick=()=>{fs(2)};
	bs(3).onclick=()=>{fs(3)};
	bs(4).onclick=()=>{fs(4)};
	bs(5).onclick=()=>{fs(5)};
	bs(6).onclick=()=>{fs(6)};
	bs(7).onclick=()=>{fs(7)};
	
	document.getElementById("input_master_volume").oninput=()=>{
		Work.global.volume=document.getElementById("input_master_volume").value;
		pianoroll.master.volume.volume.value = document.getElementById("input_master_volume").value;
	}
	
	document.getElementById("input_layer_volume").oninput=()=>{
		Work.layer[Work.global.layer_sel].volume=document.getElementById("input_layer_volume").value;
		pianoroll.layer[Work.global.layer_sel].channel.volume.value = document.getElementById("input_layer_volume").value;
	}	

	document.getElementById("input_layer_pan").oninput=()=>{
		Work.layer[Work.global.layer_sel].pan=document.getElementById("input_layer_pan").value;
		pianoroll.layer[Work.global.layer_sel].channel.pan.value = document.getElementById("input_layer_pan").value;
	}	

	document.getElementById("input_layer_name").onchange=()=>{
		Work.layer[Work.global.layer_sel].name=document.getElementById("input_layer_name").value;
		document.getElementById("btn_layer_"+Work.global.layer_sel).innerHTML=Work.layer[Work.global.layer_sel].name;
		document.getElementById("input_layer_"+Work.global.layer_sel).focus();
	}	
	
	document.getElementById("btn_improvise_pannel").onclick=()=>{
		if (document.getElementById("bottom-bar-group").style.display=="block"){
			document.getElementById("btn_improvise_pannel").style.background="#666666";
			document.getElementById("bottom-bar-group").style.display="none";
			pianoroll.resize();
		} else {
			document.getElementById("btn_improvise_pannel").style.background="#bb33bb";
			document.getElementById("bottom-bar-group").style.display="block";
			pianoroll.resize();
		}
	};
	
	document.getElementById("btn_through").onclick=()=>{
		if (Work.global.through == null) Work.global.through=0;
		Work.global.through=1-Work.global.through;
		document.getElementById("btn_through").style.background=
		Work.global.through===1 ? "#bb33bb" : "#666666";
	}

	document.getElementById("btn_magnet").onclick=()=>{
		if (Work.global.magnet == null) Work.global.magnet=0;
		Work.global.magnet=1-Work.global.magnet;
		document.getElementById("btn_magnet").style.background=
		Work.global.magnet===1 ? "#bb33bb" : "#666666";
	}

	document.getElementById("btn_select_all").onclick=()=>{
		pianoroll.selectAll(Work.global.through);
	}

	document.getElementById("btn_undo").onclick=()=>{
		pianoroll.undo();
	}

	document.getElementById("btn_redo").onclick=()=>{
		pianoroll.redo();
	}
	
	document.getElementById("btn_trisect").onclick=()=>{
		pianoroll.trisect();
	}

	document.getElementById("btn_x2").onclick=()=>{
		pianoroll.newNote=Tone.Time(pianoroll.newNote)*2;
		if (pianoroll.newNote>Tone.Time("1n"*8))
		pianoroll.newNote=Tone.Time("1n"*8);
	}

	document.getElementById("btn_/2").onclick=()=>{
		pianoroll.newNote=Tone.Time(pianoroll.newNote)/2;
		if (pianoroll.newNote<Tone.Time("64n"))
		pianoroll.newNote=Tone.Time("64n");
	}

	document.getElementById("btn_dot").onclick=()=>{
		Global.dotted=1-Global.dotted;
		document.getElementById("btn_dot").style.background=
		Global.dotted==1 ? "#bb33bb" : "#666666";
		if (pianoroll.newNote!=null) pianoroll.newNote=
		Global.dotted ?
		Tone.Time(pianoroll.newNote)*1.5 : Tone.Time(pianoroll.newNote)/1.5;
	}

	document.getElementById("btn_new_note").onclick=()=>{
//		pianoroll.setNewNote(Math.pow(2,document.getElementById("select_new_note_length").options.selectedIndex));
		var n=document.getElementById("select_new_note_length").value
		if (Global.dotted) n=n+"."; else
		if (Global.triplet) n=n.substring(0,n.length-1)+"t";
		console.log(n);
		pianoroll.setNewNote(n);
	}

	document.getElementById("select_new_note_length").oninput=()=>{
		if (pianoroll.newNote!=null)
		pianoroll.setNewNote(Math.pow(2,document.getElementById("select_new_note_length").options.selectedIndex));
	}
	
	
// var node;
// var rotation = 0;
// var gestureStartRotation = 0;
// var gestureStartScale = 0;
// var scale = 1;
// var posX = 0;
// var posY = 0;
// var startX;
// var startY;
// 	
window.addEventListener('wheel', (e) => {
	e.preventDefault();

// onWheel+ctrlKey for non-Safari browsers. GestureChange only works for Safari.

  if (e.ctrlKey) {
//     scale -= e.deltaY * 0.005;
//     
// pianoroll.viewportW=Math.round(pianoroll.initVW*scale);
// pianoroll.viewportH=Math.round(pianoroll.initVH*scale);
// 
// 	if (pianoroll.viewportW >512) pianoroll.viewportW=512;
// 	if (pianoroll.viewportH + pianoroll.viewportB >88) 
// 		pianoroll.viewportH = 88-pianoroll.viewportB;
// 
// 	if (pianoroll.viewportW < 32) pianoroll.viewportW=32;
// 	if (pianoroll.viewportH < 24) pianoroll.viewportH=24;
    
  } else {
//     posX -= e.deltaX * 2;
//     posY -= e.deltaY * 2;
		pianoroll.adjustVel(e.deltaY);
  }
// 	pianoroll.viewportL+=Math.round(e.deltaX * 0.1);
// 	if (pianoroll.viewportL<0) pianoroll.viewportL=0;
// 	pianoroll.viewportB-=Math.round(e.deltaY * 0.1);
// 	if (pianoroll.viewportB<0) pianoroll.viewportB=0;
// 	if (pianoroll.viewportB+pianoroll.viewportH>88) pianoroll.viewportB=88-pianoroll.viewportH;
});	


window.addEventListener("gesturestart", function (e) {
  e.preventDefault();
//   startX = e.pageX - posX;
//   startY = e.pageY - posY;
//  gestureStartRotation = rotation;
//   gestureStartScale = scale;
});

window.addEventListener("gesturechange", function (e) {
  e.preventDefault();
  
//  rotation = gestureStartRotation + e.rotation;
//   scale = gestureStartScale / e.scale;
// 
// pianoroll.viewportW=Math.round(pianoroll.initVW*scale);
// pianoroll.viewportH=Math.round(pianoroll.initVH*scale);
// 
// 	if (pianoroll.viewportW >512) pianoroll.viewportW=512;
// 	if (pianoroll.viewportH + pianoroll.viewportB >88) 
// 		pianoroll.viewportH = 88-pianoroll.viewportB;
// 
// 	if (pianoroll.viewportW < 32) pianoroll.viewportW=32;
// 	if (pianoroll.viewportH < 24) pianoroll.viewportH=24;

//   posX = e.pageX - startX;
//   posY = e.pageY - startY;
//  render();
})

window.addEventListener("gestureend", function (e) {
  e.preventDefault();
});

	function init(){
	
		Work.global.imp_pre=default_params;

		updatePresets();

		document.getElementById("btn_imp_"+Work.global.imp_pre_sel).onclick();

		// a real-time image of the param panel settings
		Controls.params=copyObj(Work.global.imp_pre[Work.global.imp_pre_sel]);
		
		document.getElementById("btn_metronome").style.background= Work.global.metronome==1 ?
			"#bb33bb":"#666666";
	
		document.getElementById("btn_drag_0").onclick();
		
		// preload instrument for each layer
		for (var i=0; i<8; i++)
		if (Work.layer[i].instrument<16)
		pianoroll.layer[i].instrument=Instruments.newSynth(Work.layer[i].instrument, i);
		else pianoroll.layer[i].instrument=Instruments.newSampler(Work.layer[i].instrument, i);

		document.getElementById("btn_layer_"+Work.global.layer_sel).onclick();

		for (var i=0; i<8; i++)
		document.getElementById("btn_layer_"+i).innerHTML=Work.layer[i].name;

		for (var i=0; i<8; i++){
		pianoroll.layer[i].channel.volume.value=Work.layer[i].volume;
		pianoroll.layer[i].channel.pan.value=Work.layer[i].pan;
		}

		document.getElementById("select_instrument").selectedIndex=Work.layer[Work.global.layer_sel].instrument;
		
		document.getElementById("select_key").selectedIndex=Work.global.key;

		var k=-1;
		var ss=document.getElementById("select_scale");
		for (var i=0; i<ss.options.length; i++)
			if (ss.options[i].innerHTML==Work.global.scale) {
				k=i;
				break;
			};
		ss.selectedIndex=k;
		
		var k=-1;
		var ss=document.getElementById("select_bpMeas");
		for (var i=0; i<ss.options.length; i++)
			if (ss.options[i].innerHTML==Work.global.bpMeas) {
				k=i;
				break;
			};
		ss.selectedIndex=k;

		var k=-1;
		var ss=document.getElementById("select_bpNote");
		for (var i=0; i<ss.options.length; i++)
			if (ss.options[i].innerHTML==Work.global.bpNote) {
				k=i;
				break;
			};
		ss.selectedIndex=k;

		document.getElementById("input_bpm").value=Work.global.bpm;
		document.getElementById("input_master_volume").value=Work.global.volume;
//		document.getElementById("input_master_reverb").value=Work.global.reverb;
// 		document.getElementById("input_master_wet").value=Work.global.wet;
		pianoroll.master.volume.volume.value=Work.global.volume;
//		pianoroll.master.reverb.roomSize.value=Work.global.reverb;
// 		pianoroll.master.reverb.wet.value=Work.global.wet;

		Tone.Transport.bpm.value=Work.global.bpm;
		
		document.getElementById("input_workname").value=Work.global.workname;
		
		document.getElementById("select_new_note_length").options.selectedIndex=2;
	};
	
init();
	
Controls.init=init;

}());
