document.body.addEventListener("click", async function startAudio() {
    await Tone.start();
    console.log("AudioContext started");
    document.body.removeEventListener("click", startAudio);
});

const piano = new Tone.Sampler({
    urls: {
        C3: "./audio-samples/C3.mp3",
        Db3: "./audio-samples/Db3.mp3",
        D3: "./audio-samples/D3.mp3",
        Eb3: "./audio-samples/Eb3.mp3",
        E3: "./audio-samples/E3.mp3",
        F3: "./audio-samples/F3.mp3",
        Gb3: "./audio-samples/Gb3.mp3",
        G3: "./audio-samples/G3.mp3",
        Ab3: "./audio-samples/Ab3.mp3",
        A3: "./audio-samples/A3.mp3",
        Bb3: "./audio-samples/Bb3.mp3",
        B3: "./audio-samples/B3.mp3",
        C4: "./audio-samples/C4.mp3",
        Db4: "./audio-samples/Db4.mp3",
        D4: "./audio-samples/D4.mp3",
        Eb4: "./audio-samples/Eb4.mp3",
        E4: "./audio-samples/E4.mp3",
        F4: "./audio-samples/F4.mp3",
        Gb4: "./audio-samples/Gb4.mp3",
        G4: "./audio-samples/G4.mp3",
        Ab4: "./audio-samples/Ab4.mp3",
        A4: "./audio-samples/A4.mp3",
        Bb4: "./audio-samples/Bb4.mp3",
        B4: "./audio-samples/B4.mp3",
        C5: "./audio-samples/C5.mp3",
        Db5: "./audio-samples/Db5.mp3",
        D5: "./audio-samples/D5.mp3",
        Eb5: "./audio-samples/Eb5.mp3",
        E5: "./audio-samples/E5.mp3",
        F5: "./audio-samples/F5.mp3",
        Gb5: "./audio-samples/Gb5.mp3",
        G5: "./audio-samples/G5.mp3",
        Ab5: "./audio-samples/Ab5.mp3",
        A5: "./audio-samples/A5.mp3",
        Bb5: "./audio-samples/Bb5.mp3",
        B5: "./audio-samples/B5.mp3"
    },
    release: 1.5, // Longer release for better fade out
    attack: 0.05,
    baseUrl: ""
}).toDestination();

const keyToNoteMap = {
    z: "C3", s: "Db3", x: "D3", d: "Eb3", c: "E3",
    v: "F3", g: "Gb3", b: "G3", h: "Ab3", n: "A3",
    j: "Bb3", m: "B3", q: "C4", "2": "Db4", w: "D4",
    "3": "Eb4", e: "E4", r: "F4", "5": "Gb4", t: "G4",
    "6": "Ab4", y: "A4", "7": "Bb4", u: "B4", i: "C5",
    "9": "Db5", o: "D5", "0": "Eb5", p: "E5", "[": "F5",
    "=": "Gb5", "]": "G5", "\\": "Ab5", ";": "A5", "'": "Bb5",
    Enter: "B5"
};

const reverb = new Tone.Reverb(3).toDestination();
const eq = new Tone.EQ3(-3, 2, 3).toDestination();
const compressor = new Tone.Compressor(-30, 3).toDestination();

piano.chain(compressor, eq, reverb);

const activeKeys = new Set();

function triggerNote(note) {
    if (!activeKeys.has(note)) {
        piano.triggerAttackRelease(note, "2n"); // Note will play fully with a natural fade
        activeKeys.add(note);
    }
}

function releaseNote(note) {
    setTimeout(() => {
        activeKeys.delete(note);
    }, 500); // Small delay to prevent abrupt cut-off
}

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

document.querySelectorAll(".key").forEach((keyElement) => {
    keyElement.addEventListener("mousedown", () => {
        const note = keyElement.getAttribute("data-note");
        triggerNote(note);
    });

    keyElement.addEventListener("mouseup", () => {
        const note = keyElement.getAttribute("data-note");
        releaseNote(note);
    });

    keyElement.addEventListener("mouseleave", () => {
        const note = keyElement.getAttribute("data-note");
        releaseNote(note);
    });
});


/* 
  current step:
  - There is no way but to add the specific note sound files for all the keys
    Add the ones that are finished and work on sampling the rest of the notes based off of these ones. You can always make it good later!
   - Once the piano is fully functional, add it to the Harmony Hub MVP and then continue the project from there
  - Add the visual aspect after converting to react
*/

/* 

- for renaming: 

cd "[address]"

Get-ChildItem -File | Rename-Item -NewName { $_.Name -replace " sample", "" }


Get-ChildItem -File | Rename-Item -NewName { $_.Name -replace "1 Raw", "3 Raw" }

*/