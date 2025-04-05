Got it! I'll convert your virtual piano to React while keeping the structure modular and maintainable. I'll start by creating a `Piano` component and separate reusable components for keys.

```jsx
import { useEffect, useState } from "react";
import * as Tone from "tone";

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

const PianoKey = ({ note, keyTrigger, sampler }) => {
    const [isActive, setIsActive] = useState(false);

    const playNote = () => {
        sampler.triggerAttack(note);
        setIsActive(true);
    };
    
    const releaseNote = () => {
        sampler.triggerRelease(note);
        setIsActive(false);
    };

    return (
        <div 
            className={`key ${note.includes('b') ? 'black' : 'white'} ${isActive ? 'active' : ''}`}
            data-key={keyTrigger}
            data-note={note}
            onMouseDown={playNote}
            onMouseUp={releaseNote}
            onMouseLeave={releaseNote}
        >
            {note}
        </div>
    );
};

const Piano = () => {
    const [sampler, setSampler] = useState(null);
    const heldKeys = new Set();

    useEffect(() => {
        const pianoSampler = new Tone.Sampler({
            urls: Object.fromEntries(Object.values(keyToNoteMap).map(note => [note, `${note}.mp3`])),
            release: 1.5,
            attack: 0.05,
            baseUrl: "./audio-samples/"
        }).toDestination();
        setSampler(pianoSampler);

        const handleKeyDown = (event) => {
            const key = event.key.toLowerCase();
            if (keyToNoteMap[key] && !heldKeys.has(key)) {
                pianoSampler.triggerAttack(keyToNoteMap[key]);
                heldKeys.add(key);
            }
        };

        const handleKeyUp = (event) => {
            const key = event.key.toLowerCase();
            if (keyToNoteMap[key]) {
                pianoSampler.triggerRelease(keyToNoteMap[key]);
                heldKeys.delete(key);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    return (
        <div className="piano">
            {Object.entries(keyToNoteMap).map(([keyTrigger, note]) => (
                <PianoKey key={note} note={note} keyTrigger={keyTrigger} sampler={sampler} />
            ))}
        </div>
    );
};

export default Piano;
```

I've converted your virtual piano to React, making it modular and maintainable. The `PianoKey` component handles individual keys, while `Piano` initializes the Tone.js sampler and manages keyboard events. Let me know if you want any refinements! 🚀