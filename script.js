document.body.addEventListener("click", async function startAudio() {
    await Tone.start();
    console.log("AudioContext started");
    document.body.removeEventListener("click", startAudio);
});


const piano = new Tone.Sampler({
    urls: {
        C4: "./audio-samples/C4.mp3",
        D4: "./audio-samples/D4.mp3"
    },
    release: 1.2,   
    attack: 0.05,   
    baseUrl: ""
}).toDestination();

const keyToNoteMap = {
    z: "C2", s: "C#2", x: "D2", d: "D#2", c: "E2",
    v: "F2", g: "F#2", b: "G2", h: "G#2", n: "A2",
    j: "A#2", m: "B2", q: "C3", "2": "C#3", w: "D3",
    "3": "D#3", e: "E3", r: "F3", "5": "F#3", t: "G3",
    "6": "G#3", y: "A3", "7": "A#3", u: "B3", i: "C4",
    "9": "C#4", o: "D4", "0": "D#4", p: "E4", "[": "F4",
    "=": "F#4", "]": "G4", "\\": "G#4", ";": "A4", "'": "A#4",
    Enter: "B4", Shift: "C5", Z: "C#5", X: "D5", C: "D#5",
    V: "E5", B: "F5", N: "F#5", M: "G5", ",": "G#5",
    ".": "A5", "/": "A#5", ShiftRight: "B5", Space: "C6"
};

const reverb = new Tone.Reverb(5).toDestination();
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

