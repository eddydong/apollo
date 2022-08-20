var Work = {};

(function(){

Work.global= {

	workname: "Another Piece of Shit",
	
	author: "noname",

	key: 0, // 0-11 / offset from C, in chromatic scale
	
	scale: "Major",
	
	bpMeas: 4,
	
	bpNote: 4,

	volume: -6,
	
	reverb: 0.5,
	
	wet: 0.5,
	
	through: 0,
	
	magnet: 0,
	
	bpm: 120,
	
	metronome: 0,

	tempo_auto:[ // 0..seq.length/16 (resolution: 1 measure)
	],
	
	layer_sel: 0,
	
	imp_pre_sel: 0,
	
	// 1..10
	imp_pre: [ 
		{
			name: "Root Gen.",
			
			rhythm: "11111111",
			
			suggester: [
				{d:0, p:0.8},
				{d:1, p:1},
				{d:-1, p:0.8},
				{d:2, p:0.2},
				{d:-2, p:0.2},
				{d:3, p:0.1},
				{d:-3, p:0.3},
				{d:4, p:0.05},
				{d:-4, p:0.02},
				{d:5, p:0.05},
				{d:-5, p:0.02},
				{d:7, p:0.0},
				{d:-7, p:0.0}						
			],
			
			iparams: [// all
				[0.0, 1.0], // up_n_down: how zig-zag the progression is 
				[0.0, 1.0], // key_span: max pitch minus min pitch
				[0.0, 1.0], // granularity: number of notes
				[0.0, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
				[0.0, 1.0],  // leading_to_dest: is last but one note adjacent to the destiny?
				[0.0, 1.0]  // self-ref
			]
		},
		{
			name: "Bass Calm",
			
			rhythm: "random",
			
			suggester: [
				{d:0, p:0.2},
				{d:1, p:1},
				{d:-1, p:0.8},
				{d:2, p:0.2},
				{d:-2, p:0.2},
				{d:3, p:0.1},
				{d:-3, p:0.3},
				{d:4, p:0.05},
				{d:-4, p:0.02},
				{d:5, p:0.05},
				{d:-5, p:0.02},
				{d:7, p:0.0},
				{d:-7, p:0.0}						
			],
			
			iparams: [// all
				[0.2, 0.5], // up_n_down: how zig-zag the progression is 
				[0.0, 1.0], // key_span: max pitch minus min pitch
				[0.0, 1.0], // granularity: number of notes
				[0.0, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
				[0.0, 1.0],  // leading_to_dest: is last but one note adjacent to the destiny?
				[0.0, 1.0]  // self-ref
			]
		},
		{
			name: "Bass Rhy.",
			
			rhythm: "random",
			
			suggester: [
				{d:0, p:0.2},
				{d:1, p:1},
				{d:-1, p:0.8},
				{d:2, p:0.2},
				{d:-2, p:0.2},
				{d:3, p:0.1},
				{d:-3, p:0.3},
				{d:4, p:0.05},
				{d:-4, p:0.02},
				{d:5, p:0.05},
				{d:-5, p:0.02},
				{d:7, p:0.0},
				{d:-7, p:0.0}						
			],
			
			iparams: [// all
				[0.0, 1.0], // up_n_down: how zig-zag the progression is 
				[0.0, 1.0], // key_span: max pitch minus min pitch
				[0.0, 1.0], // granularity: number of notes
				[0.0, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
				[0.0, 1.0],  // leading_to_dest: is last but one note adjacent to the destiny?
				[0.0, 1.0]  // self-ref
			]
		},
		{
			name: "Melody 1",
			
			rhythm: "random",
			
			suggester: [
				{d:0, p:0.2},
				{d:1, p:1},
				{d:-1, p:0.8},
				{d:2, p:0.2},
				{d:-2, p:0.2},
				{d:3, p:0.1},
				{d:-3, p:0.3},
				{d:4, p:0.05},
				{d:-4, p:0.02},
				{d:5, p:0.05},
				{d:-5, p:0.02},
				{d:7, p:0.0},
				{d:-7, p:0.0}						
			],
			
			iparams: [// all
				[0.0, 1.0], // up_n_down: how zig-zag the progression is 
				[0.0, 1.0], // key_span: max pitch minus min pitch
				[0.0, 1.0], // granularity: number of notes
				[0.0, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
				[0.0, 1.0],  // leading_to_dest: is last but one note adjacent to the destiny?
				[0.0, 1.0]  // self-ref
			]
		},
		{
			name: "Melody 2",
			
			rhythm: "random",
			
			suggester: [
				{d:0, p:0.2},
				{d:1, p:1},
				{d:-1, p:0.8},
				{d:2, p:0.2},
				{d:-2, p:0.2},
				{d:3, p:0.1},
				{d:-3, p:0.3},
				{d:4, p:0.05},
				{d:-4, p:0.02},
				{d:5, p:0.05},
				{d:-5, p:0.02},
				{d:7, p:0.0},
				{d:-7, p:0.0}						
			],
			
			iparams: [// all
				[0.0, 1.0], // up_n_down: how zig-zag the progression is 
				[0.0, 1.0], // key_span: max pitch minus min pitch
				[0.0, 1.0], // granularity: number of notes
				[0.0, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
				[0.0, 1.0],  // leading_to_dest: is last but one note adjacent to the destiny?
				[0.0, 1.0]  // self-ref
			]
		},
		{
			name: "Melody 3",
			
			rhythm: "random",
			
			suggester: [
				{d:0, p:0.2},
				{d:1, p:1},
				{d:-1, p:0.8},
				{d:2, p:0.2},
				{d:-2, p:0.2},
				{d:3, p:0.1},
				{d:-3, p:0.3},
				{d:4, p:0.05},
				{d:-4, p:0.02},
				{d:5, p:0.05},
				{d:-5, p:0.02},
				{d:7, p:0.0},
				{d:-7, p:0.0}						
			],
			
			iparams: [// all
				[0.0, 1.0], // up_n_down: how zig-zag the progression is 
				[0.0, 1.0], // key_span: max pitch minus min pitch
				[0.0, 1.0], // granularity: number of notes
				[0.0, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
				[0.0, 1.0],  // leading_to_dest: is last but one note adjacent to the destiny?
				[0.0, 1.0]  // self-ref
			]
		},
		{
			name: "Rhythm 1",
			
			rhythm: "random",
			
			suggester: [
				{d:0, p:0.2},
				{d:1, p:1},
				{d:-1, p:0.8},
				{d:2, p:0.2},
				{d:-2, p:0.2},
				{d:3, p:0.1},
				{d:-3, p:0.3},
				{d:4, p:0.05},
				{d:-4, p:0.02},
				{d:5, p:0.05},
				{d:-5, p:0.02},
				{d:7, p:0.0},
				{d:-7, p:0.0}						
			],
			
			iparams: [// all
				[0.0, 1.0], // up_n_down: how zig-zag the progression is 
				[0.0, 1.0], // key_span: max pitch minus min pitch
				[0.0, 1.0], // granularity: number of notes
				[0.0, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
				[0.0, 1.0],  // leading_to_dest: is last but one note adjacent to the destiny?
				[0.0, 1.0]  // self-ref
			]
		},
		{
			name: "Rhythm 2",
			
			rhythm: "random",
			
			suggester: [
				{d:0, p:0.2},
				{d:1, p:1},
				{d:-1, p:0.8},
				{d:2, p:0.2},
				{d:-2, p:0.2},
				{d:3, p:0.1},
				{d:-3, p:0.3},
				{d:4, p:0.05},
				{d:-4, p:0.02},
				{d:5, p:0.05},
				{d:-5, p:0.02},
				{d:7, p:0.0},
				{d:-7, p:0.0}						
			],
			
			iparams: [// all
				[0.0, 1.0], // up_n_down: how zig-zag the progression is 
				[0.0, 1.0], // key_span: max pitch minus min pitch
				[0.0, 1.0], // granularity: number of notes
				[0.0, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
				[0.0, 1.0],  // leading_to_dest: is last but one note adjacent to the destiny?
				[0.0, 1.0]  // self-ref
			]
		},
		{
			name: "Arpeggio 1",
			
			rhythm: "random",
			
			suggester: [
				{d:0, p:0.2},
				{d:1, p:1},
				{d:-1, p:0.8},
				{d:2, p:0.2},
				{d:-2, p:0.2},
				{d:3, p:0.1},
				{d:-3, p:0.3},
				{d:4, p:0.05},
				{d:-4, p:0.02},
				{d:5, p:0.05},
				{d:-5, p:0.02},
				{d:7, p:0.0},
				{d:-7, p:0.0}						
			],
			
			iparams: [// all
				[0.0, 1.0], // up_n_down: how zig-zag the progression is 
				[0.0, 1.0], // key_span: max pitch minus min pitch
				[0.0, 1.0], // granularity: number of notes
				[0.0, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
				[0.0, 1.0],  // leading_to_dest: is last but one note adjacent to the destiny?
				[0.0, 1.0]  // self-ref
			]
		},
		{
			name: "Arpeggio 2",
			
			rhythm: "random",
			
			suggester: [
				{d:0, p:0.2},
				{d:1, p:1},
				{d:-1, p:0.8},
				{d:2, p:0.2},
				{d:-2, p:0.2},
				{d:3, p:0.1},
				{d:-3, p:0.3},
				{d:4, p:0.05},
				{d:-4, p:0.02},
				{d:5, p:0.05},
				{d:-5, p:0.02},
				{d:7, p:0.0},
				{d:-7, p:0.0}						
			],
			
			iparams: [// all
				[0.0, 1.0], // up_n_down: how zig-zag the progression is 
				[0.0, 1.0], // key_span: max pitch minus min pitch
				[0.0, 1.0], // granularity: number of notes
				[0.0, 1.0], // in_harmony: total notes in harmony(of root & root of root) in ticks
				[0.0, 1.0],  // leading_to_dest: is last but one note adjacent to the destiny?
				[0.0, 1.0]  // self-ref
			]
		}
	],
	
	seqIJ: [{"notes":[{"note":39,"offset": 0, "len":16,"vel":127,"sel":0,"layer":0}]},{"notes":[]},{"notes":[]},{"notes":[]},{"notes":[]},{"notes":[]},{"notes":[]},{"notes":[]},{"notes":[]},{"notes":[]},{"notes":[]},{"notes":[]},{"notes":[]},{"notes":[]},{"notes":[]},{"notes":[]}],
	
	seqXY: [{notes:[]}]
};

Work.layer= [  // T01..T10
	{
		name: "Melody 1",
		
		instrument: 0,
		
		mute: 0,
		
		solo: 0,
		
		volume: -12,
		
		pan: 0,
		
		seq: [],
		
		vel_a:[ // 0..seq.length
		],
		
		imp_a:[ // 0..seq.length/8 (resolution: 16n x 8 = 2n, or 1/2 measure)
		]
	},
	{
		name: "Melody 1",
		
		instrument: 0,
		
		mute: 0,
		
		solo: 0,
		
		volume: -12,
		
		pan: 0,
		
		eff: {
			pan: 0,
			reverb: 0,
			compression: 0
		},
		
		seq: [],
		
		vel_a:[ // 0..seq.length
		],
		
		imp_a:[ // 0..seq.length/8 (resolution: 16n x 8 = 2n, or 1/2 measure)
		]
	},
	{
		name: "Melody 1",
		
		instrument: 0,
		
		mute: 0,
		
		solo: 0,
		
		volume: -12,
		
		pan: 0,
		
		eff: {
			pan: 0,
			reverb: 0,
			compression: 0
		},
		
		seq: [],
		
		vel_a:[ // 0..seq.length
		],
		
		imp_a:[ // 0..seq.length/8 (resolution: 16n x 8 = 2n, or 1/2 measure)
		]
	},
	{
		name: "Melody 1",
		
		instrument: 0,
		
		mute: 0,
		
		solo: 0,
				
		volume: -12,
		
		pan: 0,

		eff: {
			pan: 0,
			reverb: 0,
			compression: 0
		},
		
		seq: [],
		
		vel_a:[ // 0..seq.length
		],
		
		imp_a:[ // 0..seq.length/8 (resolution: 16n x 8 = 2n, or 1/2 measure)
		]
	},
	{
		name: "Melody 1",
		
		instrument: 0,
		
		mute: 0,
		
		solo: 0,
		
		volume: -12,
		
		pan: 0,
		
		eff: {
			pan: 0,
			reverb: 0,
			compression: 0
		},
		
		seq: [],
		
		vel_a:[ // 0..seq.length
		],
		
		imp_a:[ // 0..seq.length/8 (resolution: 16n x 8 = 2n, or 1/2 measure)
		]
	},
	{
		name: "Melody 1",
		
		instrument: 0,
		
		mute: 0,
		
		solo: 0,
		
		volume: -12,
		
		pan: 0,
		
		eff: {
			pan: 0,
			reverb: 0,
			compression: 0
		},
		
		seq: [],
		
		vel_a:[ // 0..seq.length
		],
		
		imp_a:[ // 0..seq.length/8 (resolution: 16n x 8 = 2n, or 1/2 measure)
		]
	},
	{
		name: "Melody 1",
		
		instrument: 0,
		
		mute: 0,
		
		solo: 0,
		
		volume: -12,
		
		pan: 0,
		
		eff: {
			pan: 0,
			reverb: 0,
			compression: 0
		},
		
		seq: [],
		
		vel_a:[ // 0..seq.length
		],
		
		imp_a:[ // 0..seq.length/8 (resolution: 16n x 8 = 2n, or 1/2 measure)
		]
	},
	{
		name: "Melody 1",
		
		instrument: 0,
		
		mute: 0,
		
		solo: 0,
		
		volume: -12,
		
		pan: 0,
		
		eff: {
			pan: 0,
			reverb: 0,
			compression: 0
		},
		
		seq: [],
		
		vel_a:[ // 0..seq.length
		],
		
		imp_a:[ // 0..seq.length/8 (resolution: 16n x 8 = 2n, or 1/2 measure)
		]
	}
]

// init layer[0].imp_a with default iparams
// Work.layer[0].seq=pianoroll.seq;
for (var i=0; i<Work.layer[0].seq.length; i++)
if (i % 8 == 0) Work.layer[0].imp_a[i]=Global.default_params;

}())
