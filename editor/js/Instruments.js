var Instruments={};

(function(){

Instruments.sampler=[];

var samplerParams=[
	{
		name: "Piano",
		urls: {
        'A7': 'A7.mp3',
        'A1': 'A1.mp3',
        'A2': 'A2.mp3',
        'A3': 'A3.mp3',
        'A4': 'A4.mp3',
        'A5': 'A5.mp3',
        'A6': 'A6.mp3',
        'A#7': 'As7.mp3',
        'A#1': 'As1.mp3',
        'A#2': 'As2.mp3',
        'A#3': 'As3.mp3',
        'A#4': 'As4.mp3',
        'A#5': 'As5.mp3',
        'A#6': 'As6.mp3',
        'B7': 'B7.mp3',
        'B1': 'B1.mp3',
        'B2': 'B2.mp3',
        'B3': 'B3.mp3',
        'B4': 'B4.mp3',
        'B5': 'B5.mp3',
        'B6': 'B6.mp3',
        'C7': 'C7.mp3',
        'C1': 'C1.mp3',
        'C2': 'C2.mp3',
        'C3': 'C3.mp3',
        'C4': 'C4.mp3',
        'C5': 'C5.mp3',
        'C6': 'C6.mp3',
        'C7': 'C7.mp3',
        'C#7': 'Cs7.mp3',
        'C#1': 'Cs1.mp3',
        'C#2': 'Cs2.mp3',
        'C#3': 'Cs3.mp3',
        'C#4': 'Cs4.mp3',
        'C#5': 'Cs5.mp3',
        'C#6': 'Cs6.mp3',
        'D7': 'D7.mp3',
        'D1': 'D1.mp3',
        'D2': 'D2.mp3',
        'D3': 'D3.mp3',
        'D4': 'D4.mp3',
        'D5': 'D5.mp3',
        'D6': 'D6.mp3',
        'D#7': 'Ds7.mp3',
        'D#1': 'Ds1.mp3',
        'D#2': 'Ds2.mp3',
        'D#3': 'Ds3.mp3',
        'D#4': 'Ds4.mp3',
        'D#5': 'Ds5.mp3',
        'D#6': 'Ds6.mp3',
        'E7': 'E7.mp3',
        'E1': 'E1.mp3',
        'E2': 'E2.mp3',
        'E3': 'E3.mp3',
        'E4': 'E4.mp3',
        'E5': 'E5.mp3',
        'E6': 'E6.mp3',
        'F7': 'F7.mp3',
        'F1': 'F1.mp3',
        'F2': 'F2.mp3',
        'F3': 'F3.mp3',
        'F4': 'F4.mp3',
        'F5': 'F5.mp3',
        'F6': 'F6.mp3',
        'F#7': 'Fs7.mp3',
        'F#1': 'Fs1.mp3',
        'F#2': 'Fs2.mp3',
        'F#3': 'Fs3.mp3',
        'F#4': 'Fs4.mp3',
        'F#5': 'Fs5.mp3',
        'F#6': 'Fs6.mp3',
        'G7': 'G7.mp3',
        'G1': 'G1.mp3',
        'G2': 'G2.mp3',
        'G3': 'G3.mp3',
        'G4': 'G4.mp3',
        'G5': 'G5.mp3',
        'G6': 'G6.mp3',
        'G#7': 'Gs7.mp3',
        'G#1': 'Gs1.mp3',
        'G#2': 'Gs2.mp3',
        'G#3': 'Gs3.mp3',
        'G#4': 'Gs4.mp3',
        'G#5': 'Gs5.mp3',
        'G#6': 'Gs6.mp3'
		},
		baseUrl: "http://motf.io/sample/piano1/"
	},
	{
		name: "Cello",
		urls: {
			'E3': 'E3.mp3',
			'E4': 'E4.mp3',
			'F2': 'F2.mp3',
			'F3': 'F3.mp3',
			'F4': 'F4.mp3',
			'F#3': 'Fs3.mp3',
			'F#4': 'Fs4.mp3',
			'G2': 'G2.mp3',
			'G3': 'G3.mp3',
			'G4': 'G4.mp3',
			'G#2': 'Gs2.mp3',
			'G#3': 'Gs3.mp3',
			'G#4': 'Gs4.mp3',
			'A2': 'A2.mp3',
			'A3': 'A3.mp3',
			'A4': 'A4.mp3',
			'A#2': 'As2.mp3',
			'A#3': 'As3.mp3',
			'B2': 'B2.mp3',
			'B3': 'B3.mp3',
			'B4': 'B4.mp3',
			'C2': 'C2.mp3',
			'C3': 'C3.mp3',
			'C4': 'C4.mp3',
			'C5': 'C5.mp3',
			'C#3': 'Cs3.mp3',
			'C#4': 'Cs4.mp3',
			'D2': 'D2.mp3',
			'D3': 'D3.mp3',
			'D4': 'D4.mp3',
			'D#2': 'Ds2.mp3',
			'D#3': 'Ds3.mp3',
			'D#4': 'Ds4.mp3',
			'E2': 'E2.mp3'
		},
		baseUrl: "http://motf.io/sample/cello/"	
	},
	{
		name:"Violin",
		urls: {
        'A3': 'A3.mp3',
        'A4': 'A4.mp3',
        'A5': 'A5.mp3',
        'A6': 'A6.mp3',
        'C4': 'C4.mp3',
        'C5': 'C5.mp3',
        'C6': 'C6.mp3',
        'C7': 'C7.mp3',
        'E4': 'E4.mp3',
        'E5': 'E5.mp3',
        'E6': 'E6.mp3',
        'G4': 'G4.mp3',
        'G5': 'G5.mp3',
        'G6': 'G6.mp3'
		},
		baseUrl: "http://motf.io/sample/violin/"
	},
	{
		name:"Steel Guitar",
		urls: {
        'F4': 'F4.mp3',
        'F#2': 'Fs2.mp3',
        'F#3': 'Fs3.mp3',
        'F#4': 'Fs4.mp3',
        'G2': 'G2.mp3',
        'G3': 'G3.mp3',
        'G4': 'G4.mp3',
        'G#2': 'Gs2.mp3',
        'G#3': 'Gs3.mp3',
        'G#4': 'Gs4.mp3',
        'A2': 'A2.mp3',
        'A3': 'A3.mp3',
        'A4': 'A4.mp3',
        'A#2': 'As2.mp3',
        'A#3': 'As3.mp3',
        'A#4': 'As4.mp3',
        'B2': 'B2.mp3',
        'B3': 'B3.mp3',
        'B4': 'B4.mp3',
        'C3': 'C3.mp3',
        'C4': 'C4.mp3',
        'C5': 'C5.mp3',
        'C#3': 'Cs3.mp3',
        'C#4': 'Cs4.mp3',
        'C#5': 'Cs5.mp3',
        'D2': 'D2.mp3',
        'D3': 'D3.mp3',
        'D4': 'D4.mp3',
        'D5': 'D5.mp3',
        'D#2': 'Ds2.mp3',
        'D#3': 'Ds3.mp3',
        'D#4': 'Ds4.mp3',
        'E2': 'E2.mp3',
        'E3': 'E3.mp3',
        'E4': 'E4.mp3',
        'F2': 'F2.mp3',
        'F3': 'F3.mp3'
		},
		baseUrl: "http://motf.io/sample/guitar-acoustic/"
	},
	{
		name: "Nylon Guitar",
		urls: {
        'F#2': 'Fs2.mp3',
        'F#3': 'Fs3.mp3',
        'F#4': 'Fs4.mp3',
        'F#5': 'Fs5.mp3',
        'G3': 'G3.mp3',
        'G5': 'G5.mp3',
        'G#2': 'Gs2.mp3',
        'G#4': 'Gs4.mp3',
        'G#5': 'Gs5.mp3',
        'A2': 'A2.mp3',
        'A3': 'A3.mp3',
        'A4': 'A4.mp3',
        'A5': 'A5.mp3',
        'A#5': 'As5.mp3',
        'B1': 'B1.mp3',
        'B2': 'B2.mp3',
        'B3': 'B3.mp3',
        'B4': 'B4.mp3',
        'C#3': 'Cs3.mp3',
        'C#4': 'Cs4.mp3',
        'C#5': 'Cs5.mp3',
        'D2': 'D2.mp3',
        'D3': 'D3.mp3',
        'D#5': 'Ds5.mp3',
        'D#4': 'Ds4.mp3',
        'E2': 'E2.mp3',
        'E3': 'E3.mp3',
        'E4': 'E4.mp3',
        'E5': 'E5.mp3'
		},
		baseUrl: "http://motf.io/sample/guitar-nylon/"
	},
	{
		name:"Trumpet",
		urls: {
        'C6': 'C6.mp3',
        'D5': 'D5.mp3',
        'D#4': 'Ds4.mp3',
        'F3': 'F3.mp3',
        'F4': 'F4.mp3',
        'F5': 'F5.mp3',
        'G4': 'G4.mp3',
        'A3': 'A3.mp3',
        'A5': 'A5.mp3',
        'A#4': 'As4.mp3',
        'C4': 'C4.mp3'
		},
		baseUrl: "http://motf.io/sample/trumpet/"
	},
	{
		name: "Trombone",
		urls: {
        'A#3': 'As3.mp3',
        'C3': 'C3.mp3',
        'C4': 'C4.mp3',
        'C#2': 'Cs2.mp3',
        'C#4': 'Cs4.mp3',
        'D3': 'D3.mp3',
        'D4': 'D4.mp3',
        'D#2': 'Ds2.mp3',
        'D#3': 'Ds3.mp3',
        'D#4': 'Ds4.mp3',
        'F2': 'F2.mp3',
        'F3': 'F3.mp3',
        'F4': 'F4.mp3',
        'G#2': 'Gs2.mp3',
        'G#3': 'Gs3.mp3',
        'A#1': 'As1.mp3',
        'A#2': 'As2.mp3'
		},
		baseUrl: "http://motf.io/sample/trombone/"
	},
	{
		name:"Harp",
		urls: {
        'C5': 'C5.mp3',
        'D2': 'D2.mp3',
        'D4': 'D4.mp3',
        'D6': 'D6.mp3',
        'D7': 'D7.mp3',
        'E1': 'E1.mp3',
        'E3': 'E3.mp3',
        'E5': 'E5.mp3',
        'F2': 'F2.mp3',
        'F4': 'F4.mp3',
        'F6': 'F6.mp3',
        'F7': 'F7.mp3',
        'G1': 'G1.mp3',
        'G3': 'G3.mp3',
        'G5': 'G5.mp3',
        'A2': 'A2.mp3',
        'A4': 'A4.mp3',
        'A6': 'A6.mp3',
        'B1': 'B1.mp3',
        'B3': 'B3.mp3',
        'B5': 'B5.mp3',
        'B6': 'B6.mp3',
        'C3': 'C3.mp3'
		},
		baseUrl: "http://motf.io/sample/harp/"
	},
	{
		name: "Electric Guitar",
		urls: {
        'D#3': 'Ds3.mp3',
        'D#4': 'Ds4.mp3',
        'D#5': 'Ds5.mp3',
        'E2': 'E2.mp3',
        'F#2': 'Fs2.mp3',
        'F#3': 'Fs3.mp3',
        'F#4': 'Fs4.mp3',
        'F#5': 'Fs5.mp3',
        'A2': 'A2.mp3',
        'A3': 'A3.mp3',
        'A4': 'A4.mp3',
        'A5': 'A5.mp3',
        'C3': 'C3.mp3',
        'C4': 'C4.mp3',
        'C5': 'C5.mp3',
        'C6': 'C6.mp3',
        'C#2': 'Cs2.mp3'
		},
		baseUrl: "http://motf.io/sample/guitar-electric/"
	},
	{
		name: "Contrabass",
		urls: {
        'C2': 'C2.mp3',
        'C#3': 'Cs3.mp3',
        'D2': 'D2.mp3',
        'E2': 'E2.mp3',
        'E3': 'E3.mp3',
        'F#1': 'Fs1.mp3',
        'F#2': 'Fs2.mp3',
        'G1': 'G1.mp3',
        'G#2': 'Gs2.mp3',
        'G#3': 'Gs3.mp3',
        'A2': 'A2.mp3',
        'A#1': 'As1.mp3',
        'B3': 'B3.mp3'
		},
		baseUrl: "http://motf.io/sample/contrabass/"
	},
	{
		name: "Flute",
		urls: {
        'A6': 'A6.mp3',
        'C4': 'C4.mp3',
        'C5': 'C5.mp3',
        'C6': 'C6.mp3',
        'C7': 'C7.mp3',
        'E4': 'E4.mp3',
        'E5': 'E5.mp3',
        'E6': 'E6.mp3',
        'A4': 'A4.mp3',
        'A5': 'A5.mp3'
		},
		baseUrl: "http://motf.io/sample/flute/"
	},
	{
		name: "French Horn",
		urls: {
        'D3': 'D3.mp3',
        'D5': 'D5.mp3',
        'D#2': 'Ds2.mp3',
        'F3': 'F3.mp3',
        'F5': 'F5.mp3',
        'G2': 'G2.mp3',
        'A1': 'A1.mp3',
        'A3': 'A3.mp3',
        'C2': 'C2.mp3',
        'C4': 'C4.mp3'
		},
		baseUrl: "http://motf.io/sample/french-horn/"
	},
	{
		name: "Electric Bass",
		urls: {
        'A#1': 'As1.mp3',
        'A#2': 'As2.mp3',
        'A#3': 'As3.mp3',
        'A#4': 'As4.mp3',
        'C#1': 'Cs1.mp3',
        'C#2': 'Cs2.mp3',
        'C#3': 'Cs3.mp3',
        'C#4': 'Cs4.mp3',
        'E1': 'E1.mp3',
        'E2': 'E2.mp3',
        'E3': 'E3.mp3',
        'E4': 'E4.mp3',
        'G1': 'G1.mp3',
        'G2': 'G2.mp3',
        'G3': 'G3.mp3',
        'G4': 'G4.mp3'
		},
		baseUrl: "http://motf.io/sample/bass-electric/"
	},
	{
		name: "Bassoon",
		urls: {
        'A4': 'A4.mp3',
        'C3': 'C3.mp3',
        'C4': 'C4.mp3',
        'C5': 'C5.mp3',
        'E4': 'E4.mp3',
        'G2': 'G2.mp3',
        'G3': 'G3.mp3',
        'G4': 'G4.mp3',
        'A2': 'A2.mp3',
        'A3': 'A3.mp3'
		},
		baseUrl: "http://motf.io/sample/bassoon/"
	}	
];

Instruments.newSampler=(i, ch)=>{
	var si=document.getElementById("select_instrument");
	si.options[i].innerHTML="="+si.options[i].innerHTML.substring(1);
	var ind=i;
	var s=new Tone.Sampler(
		samplerParams[i-16].urls,
		function(){
			console.log("loaded");
			pianoroll.layer[ch].instrument=s;
			pianoroll.layer[ch].instrument.connect(pianoroll.layer[ch].channel);			
			si.options[ind].innerHTML= si.options[ind].innerHTML.substring(1);
		},
		samplerParams[i-16].baseUrl
	);
}


var synth=[];

var synthParams= [

{
	name:"Tiny",
    "harmonicity": 2,
    "oscillator": {
        "type": "amsine2",
      	"modulationType" : "sine",
 	     "harmonicity": 1.01
    },
    "envelope": {
        "attack": 0.006,
        "decay": 4,
        "sustain": 0.04,
        "release": 1.2
    },
    "modulation" : {
      	"volume" : 13,
        "type": "amsine2",
      	"modulationType" : "sine",
 	     "harmonicity": 12
    },
    "modulationEnvelope" : {
        "attack": 0.006,
        "decay": 0.2,
        "sustain": 0.2,
        "release": 0.4
    }
},

{
	name: "Kalimba",
    "harmonicity":8,
    "modulationIndex": 2,
    "oscillator" : {
        "type": "sine"
    },
    "envelope": {
        "attack": 0.001,
        "decay": 2,
        "sustain": 0.1,
        "release": 2
    },
    "modulation" : {
        "type" : "square"
    },
    "modulationEnvelope" : {
        "attack": 0.002,
        "decay": 0.2,
        "sustain": 0,
        "release": 0.2
    }
},

{
	name: "Pianoetta",
    "oscillator": {
        "type": "square"
    },
    "filter": {
        "Q": 2,
        "type": "lowpass",
        "rolloff": -12
    },
    "envelope": {
        "attack": 0.005,
        "decay": 3,
        "sustain": 0,
        "release": 0.45
    },
    "filterEnvelope": {
        "attack": 0.001,
        "decay": 0.32,
        "sustain": 0.9,
        "release": 3,
        "baseFrequency": 700,
        "octaves": 2.3
    }
},

{
	"name": "Marimba",
    "oscillator": {
        "partials": [
            1,
            0,
            2,
            0,
            3
        ]
    },
    "envelope": {
        "attack": 0.001,
        "decay": 1.2,
        "sustain": 0,
        "release": 1.2
    }
},

{
	"name": "Tree Trunk",
    "oscillator": {
        "type": "sine"
    },
    "envelope": {
        "attack": 0.001,
        "decay": 0.1,
        "sustain": 0.1,
        "release": 1.2
    }
},

{
	"name": "Steel Pan",
    "oscillator": {
        "type": "fatcustom",
      	"partials" : [0.2, 1, 0, 0.5, 0.1],
      	"spread" : 40,
      	"count" : 3
    },
    "envelope": {
        "attack": 0.001,
        "decay": 1.6,
        "sustain": 0,
        "release": 1.6
    }
},

{
	name: "Pizz",
     "oscillator": {
        "type": "sawtooth"
    },
    "filter": {
        "Q": 3,
        "type": "highpass",
        "rolloff": -12
    },
    "envelope": {
        "attack": 0.01,
        "decay": 0.3,
        "sustain": 0,
        "release": 0.9
    },
    "filterEnvelope": {
        "attack": 0.01,
        "decay": 0.1,
        "sustain": 0,
        "release": 0.1,
        "baseFrequency": 800,
        "octaves": -1.2
    }
},

{
	"name": "Super Saw",
    "oscillator" : {
        "type" : "fatsawtooth",
        "count" : 3,
        "spread" : 30
    },
    "envelope": {
        "attack": 0.01,
        "decay": 0.1,
        "sustain": 0.5,
        "release": 0.4,
        "attackCurve" : "exponential"
    }
},

{
	name: "Lectric",
    "portamento" : 0.2,
    "oscillator": {
        "type": "sawtooth"
    },
    "envelope": {
        "attack": 0.03,
        "decay": 0.1,
        "sustain": 0.2,
        "release": 0.02
    }
},

{
	name: "Harmonics",
    "harmonicity": 3.999,
    "oscillator": {
        "type": "square"
    },
    "envelope": {
        "attack": 0.03,
        "decay": 0.3,
        "sustain": 0.7,
        "release": 0.8
    },
    "modulation" : {
      	"volume" : 12,
        "type": "square6"
    },
    "modulationEnvelope" : {
        "attack": 2,
        "decay": 3,
        "sustain": 0.8,
        "release": 0.1
    }
},

{
	name:"Tiny Saw",
    "harmonicity": 0.5,
    "modulationIndex": 1.2,
    "oscillator": {
        "type": "fmsawtooth",
        "modulationType" : "sine",
        "modulationIndex" : 20,
        "harmonicity" : 3
    },
    "envelope": {
        "attack": 0.05,
        "decay": 0.3,
        "sustain": 0.1,
        "release": 1.2
    },
    "modulation" : {
        "volume" : 0,
        "type": "triangle"
    },
    "modulationEnvelope" : {
        "attack": 0.35,
        "decay": 0.1,
        "sustain": 1,
        "release": 0.01
    }
},

{
	name: "Electric Cello",
    "harmonicity": 3.01,
    "modulationIndex": 14,
    "oscillator": {
        "type": "triangle"
    },
    "envelope": {
        "attack": 0.2,
        "decay": 0.3,
        "sustain": 0.1,
        "release": 1.2
    },
    "modulation" : {
        "type": "square"
    },
    "modulationEnvelope" : {
        "attack": 0.01,
        "decay": 0.5,
        "sustain": 0.2,
        "release": 0.1
    }
},

{
	name: "Bass Guitar",
    "oscillator": {
        "type": "fmsquare5",
		"modulationType" : "triangle",
      	"modulationIndex" : 2,
      	"harmonicity" : 0.501
    },
    "filter": {
        "Q": 1,
        "type": "lowpass",
        "rolloff": -24
    },
    "envelope": {
        "attack": 0.01,
        "decay": 0.1,
        "sustain": 0.4,
        "release": 2
    },
    "filterEnvelope": {
        "attack": 0.01,
        "decay": 0.1,
        "sustain": 0.8,
        "release": 1.5,
        "baseFrequency": 50,
        "octaves": 4.4
    }
},

{
	name: "Brass Circuit",
    "portamento": 0.01,
    "oscillator": {
        "type": "sawtooth"
    },
    "filter": {
        "Q": 2,
        "type": "lowpass",
        "rolloff": -24
    },
    "envelope": {
        "attack": 0.1,
        "decay": 0.1,
        "sustain": 0.6,
        "release": 0.5
    },
    "filterEnvelope": {
        "attack": 0.05,
        "decay": 0.8,
        "sustain": 0.4,
        "release": 1.5,
        "baseFrequency": 2000,
        "octaves": 1.5
    }
},

{
	name: "Cool Guy",
    "oscillator" : {
        "type" : "pwm",
        "modulationFrequency" : 1
    },
    "filter" : {
        "Q" : 6,
        "rolloff" : -24 
    },
    "envelope" : {
        "attack" : 0.025,
        "decay" : 0.3,
        "sustain" : 0.9,
        "release" : 2
    },
    "filterEnvelope" : {
        "attack" : 0.245,
        "decay" : 0.131,
        "sustain" : 0.5,
        "release" : 2,
        "baseFrequency" : 20,
        "octaves" : 7.2,
        "exponent" : 2
    }
},


{
	name: "Bassy",
    "portamento": 0.08,
    "oscillator": {
        "partials": [2, 1, 3, 2, 0.4]
    },
    "filter": {
        "Q": 4,
        "type": "lowpass",
        "rolloff": -48
    },
    "envelope": {
        "attack": 0.04,
        "decay": 0.06,
        "sustain": 0.4,
        "release": 1
    },
    "filterEnvelope": {
        "attack": 0.01,
        "decay": 0.1,
        "sustain": 0.6,
        "release": 1.5,
        "baseFrequency": 50,
        "octaves": 3.4
    }
}
];

const drum1 = new Tone.MembraneSynth().toDestination();

const lowPass = new Tone.Filter({
  frequency: 8000,
}).toDestination();

const snareDrum = new Tone.NoiseSynth({
//  volume: 5,
  noise: {
    type: 'white',
//    playbackRate: 3,
  },
  envelope: {
    attack: 0.001,
    decay: 0.20,
    sustain: 0.15,
    release: 0.05,
  },
}).connect(lowPass);

Instruments.newSynth=(i, ch)=>{
	var s=new Tone.PolySynth();
	s.set(synthParams[i]);
	return s.connect(pianoroll.layer[ch].channel);
}

Instruments.drum1=drum1;
Instruments.drum2=snareDrum;

}())
