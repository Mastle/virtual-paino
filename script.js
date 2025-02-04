document.body.addEventListener("click", async function startAudio() {
    await Tone.start();
    console.log("AudioContext started");
    document.body.removeEventListener("click", startAudio);
});

const piano = new Tone.Sampler({
    urls: {
        C1: "./audio-samples/C1.mp3",
        D1: "./audio-samples/D1.mp3",
        E1: "./audio-samples/E1.mp3"
        
   
    },
    release: 1.2,
    attack: 0.05,
    baseUrl: ""
}).toDestination();

const keyToNoteMap = {
    z: "C1", s: "C#1", x: "D1", d: "D#1", c: "E1",
    v: "F1", g: "F#1", b: "G1", h: "G#1", n: "A1",
    j: "A#1", m: "B1", q: "C2", "2": "C#2", w: "D2",
    "3": "D#2", e: "E2", r: "F2", "5": "F#2", t: "G2",
    "6": "G#2", y: "A2", "7": "A#2", u: "B2", i: "C3",
    "9": "C#3", o: "D3", "0": "D#3", p: "E3", "[": "F3",
    "=": "F#3", "]": "G3", "\\": "G#3", ";": "A3", "'": "A#3",
    Enter: "B3"
};

const reverb = new Tone.Reverb(3).toDestination();
const eq = new Tone.EQ3(-3, 2, 3).toDestination();
const compressor = new Tone.Compressor(-30, 3).toDestination();

piano.chain(compressor, eq, reverb);

const activeKeys = new Set();

document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    if (keyToNoteMap[key] && !activeKeys.has(key)) {
        piano.triggerAttack(keyToNoteMap[key]);
        activeKeys.add(key); 
    }
});

document.addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();
    if (keyToNoteMap[key]) {
        piano.triggerRelease(keyToNoteMap[key]);
        activeKeys.delete(key); 
    }
});