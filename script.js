//** new code  */

    const synth = new Tone.Synth().toDestination();
    const keys = document.querySelectorAll(".key");

    // Mapping keyboard keys to musical notes
    const keyToNoteMap = {
        a: "C4", w: "C#4", s: "D4", e: "D#4", d: "E4",
        f: "F4", t: "F#4", g: "G4", y: "G#4", h: "A4",
        u: "A#4", j: "B4", k: "C5"
    };

    // Prevent multiple triggers while holding a key
    let activeKeys = new Set();

    function playNote(note, key) {
        if (!activeKeys.has(key)) {
            activeKeys.add(key);
            synth.triggerAttack(note);
            document.querySelector(`[data-key="${key}"]`)?.classList.add("active");
        }
    }

    function stopNote(key) {
        activeKeys.delete(key);
        synth.triggerRelease();
        document.querySelector(`[data-key="${key}"]`)?.classList.remove("active");
    }

    // Handle keyboard input
    document.addEventListener("keydown", (event) => {
        const key = event.key.toLowerCase();
        if (keyToNoteMap[key]) {
            // Ensure Tone.js AudioContext is started
            Tone.start().then(() => playNote(keyToNoteMap[key], key));
        }
    });

    document.addEventListener("keyup", (event) => {
        const key = event.key.toLowerCase();
        if (keyToNoteMap[key]) {
            stopNote(key);
        }
    });

    // Handle mouse click on keys
    keys.forEach((key) => {
        key.addEventListener("mousedown", () => {
            const note = key.dataset.note;
            const keyChar = key.dataset.key;
            Tone.start().then(() => playNote(note, keyChar));
        });

        key.addEventListener("mouseup", () => {
            stopNote(key.dataset.key);
        });

        key.addEventListener("mouseleave", () => {
            stopNote(key.dataset.key);
        });
    });


/* current step: 
    -- use the recommended way to add event handlers to the piano keys
    -- udnerstnd how firing off sounds exactly works in Tone.js for the best piano sounds
    -- combine the keyboard buttons and piano sounds til you get 

*/