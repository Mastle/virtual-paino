document.body.addEventListener("click", async function startAudio() {
    await Tone.start();
    console.log("AudioContext started");
    document.body.removeEventListener("click", startAudio);
});

const piano = new Tone.Sampler({
    urls: {
        C3: "C3.mp3",
        Db3: "Db3.mp3",
        D3: "D3.mp3",
        Eb3: "Eb3.mp3",
        E3: "E3.mp3",
        F3: "F3.mp3",
        Gb3: "Gb3.mp3",
        G3: "G3.mp3",
        Ab3: "Ab3.mp3",
        A3: "A3.mp3",
        Bb3: "Bb3.mp3",
        B3: "B3.mp3",
        C4: "C4.mp3",
        Db4: "Db4.mp3",
        D4: "D4.mp3",
        Eb4: "Eb4.mp3",
        E4: "E4.mp3",
        F4: "F4.mp3",
        Gb4: "Gb4.mp3",
        G4: "G4.mp3",
        Ab4: "Ab4.mp3",
        A4: "A4.mp3",
        Bb4: "Bb4.mp3",
        B4: "B4.mp3",
        C5: "C5.mp3",
        Db5: "Db5.mp3",
        D5: "D5.mp3",
        Eb5: "Eb5.mp3",
        E5: "E5.mp3",
        F5: "F5.mp3",
        Gb5: "Gb5.mp3",
        G5: "G5.mp3",
        Ab5: "Ab5.mp3",
        A5: "A5.mp3",
        Bb5: "Bb5.mp3",
        B5: "B5.mp3"
    },
    release: 1.5, 
    attack: 0.05,
    baseUrl: "./audio-samples/"
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



const heldKeys = new Set(); 

document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    if (keyToNoteMap[key] && !heldKeys.has(key)) {
        piano.triggerAttack(keyToNoteMap[key]);
        heldKeys.add(key);
    }
});

document.addEventListener("keyup", (event) => {
    const key = event.key.toLowerCase();
    if (keyToNoteMap[key]) {
        piano.triggerRelease(keyToNoteMap[key]);
        heldKeys.delete(key);
    }
});



document.querySelectorAll(".key").forEach((keyElement) => {
    keyElement.addEventListener("mousedown", () => {
        const note = keyElement.getAttribute("data-note");
        piano.triggerAttack(note);
    });

    keyElement.addEventListener("mouseup", () => {
        const note = keyElement.getAttribute("data-note");
        piano.triggerRelease(note);
    });

    keyElement.addEventListener("mouseleave", () => {
        const note = keyElement.getAttribute("data-note");
        piano.triggerRelease(note);
    });

});


/* 
  current step:
   - The piano seems to be finished. (ISSUE: I think the minor quirks such as the weird beep at the end of each note sound can be fixed after it's fully implemented in react)(using release methods no piano would only make the playback finish prematurely)
   - convert the current the code to react and continue from there (making the piano pretty is the next step)
   - It makes sense to do the final test with this piano after it's been implemented in harmony hub and all the other details (such as the visual aspect with CSS) are added
*/
