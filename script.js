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
    a: "C4", w: "C#4", s: "D4", e: "D#4", d: "E4",
    f: "F4", t: "F#4", g: "G4", y: "G#4", h: "A4",
    u: "A#4", j: "B4", k: "C5"
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
