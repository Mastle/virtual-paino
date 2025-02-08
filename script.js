document.body.addEventListener("click", async function startAudio() {
    await Tone.start();
    console.log("AudioContext started");
    document.body.removeEventListener("click", startAudio);
});

const piano = new Tone.Sampler({
    urls: {
        C3: "./audio-samples/C3.mp3",
        D3: "./audio-samples/D3.mp3",
        E3: "./audio-samples/E3.mp3",
        C4: "./audio-samples/C4.mp3"
    },
    release: 1.2,
    attack: 0.05,
    baseUrl: ""
}).toDestination();

const keyToNoteMap = {
    z: "C3", s: "C#3", x: "D3", d: "D#3", c: "E3",
    v: "F3", g: "F#3", b: "G3", h: "G#3", n: "A3",
    j: "A#3", m: "B3", q: "C4", "2": "C#4", w: "D4",
    "3": "D#4", e: "E4", r: "F4", "5": "F#4", t: "G4",
    "6": "G#4", y: "A4", "7": "A#4", u: "B4", i: "C5",
    "9": "C#5", o: "D5", "0": "D#5", p: "E5", "[": "F5",
    "=": "F#5", "]": "G5", "\\": "G#5", ";": "A5", "'": "A#5",
    Enter: "B5"
};

const reverb = new Tone.Reverb(3).toDestination();
const eq = new Tone.EQ3(-3, 2, 3).toDestination();
const compressor = new Tone.Compressor(-30, 3).toDestination();

piano.chain(compressor, eq, reverb);

const activeKeys = new Set();

// Function to handle key press (keyboard or mouse)
function triggerNote(note) {
    if (!activeKeys.has(note)) {
        piano.triggerAttack(note);
        activeKeys.add(note);
    }
}

// Function to handle key release (keyboard or mouse)
function releaseNote(note) {
    if (activeKeys.has(note)) {
        piano.triggerRelease(note);
        activeKeys.delete(note);
    }
}

// Keyboard event listeners
document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    if (keyToNoteMap[key]) {
        triggerNote(keyToNoteMap[key]);
    }
});

document.addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();
    if (keyToNoteMap[key]) {
        releaseNote(keyToNoteMap[key]);
    }
});

// Mouse event listeners for piano keys
document.querySelectorAll(".key").forEach((keyElement) => {
    keyElement.addEventListener("mousedown", () => {
        const note = keyElement.getAttribute("data-note");
        triggerNote(note);
    });

    keyElement.addEventListener("mouseup", () => {
        const note = keyElement.getAttribute("data-note");
        releaseNote(note);
    });

    // Optional: Handle mouse leave to ensure notes are released
    keyElement.addEventListener("mouseleave", () => {
        const note = keyElement.getAttribute("data-note");
        releaseNote(note);
    });
});


/* 
  current step:
  - you have enough audio samples for now - there is no time for recording the rest. 
    Add the ones that are finished and work on sampling the rest of the notes based off of these ones. You can always make it good later!
  - [ISSUE]: audio playback cuts off on "keyup" (there needs to be a delay so it can naturally reverberate)
   
*/

/* 

- for renaming: 

cd "[address]"

Get-ChildItem -File | Rename-Item -NewName { $_.Name -replace " sample", "" }


Get-ChildItem -File | Rename-Item -NewName { $_.Name -replace "1 Raw", "3 Raw" }

*/