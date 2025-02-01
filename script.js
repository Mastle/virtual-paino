document.body.addEventListener("click", async () => {
   await Tone.start();  // Ensure AudioContext is ready after user interaction
   console.log("AudioContext started");

   // Load a high-quality piano sound sample
   const piano = new Tone.Sampler({
       urls: {
           C4: "./audio-samples/C4.mp3",
           D4: "./audio-samples/D4.mp3"
       },
       release: 1, // Sustain for a more natural fade-out
       baseUrl: ""
   }).toDestination();

   const keyToNoteMap = {
       a: "C4", w: "C#4", s: "D4", e: "D#4", d: "E4",
       f: "F4", t: "F#4", g: "G4", y: "G#4", h: "A4",
       u: "A#4", j: "B4", k: "C5"
   };

   document.addEventListener("keydown", (event) => {
       const key = event.key.toLowerCase();
       if (keyToNoteMap[key]) {
           piano.triggerAttack(keyToNoteMap[key]);
       }
   });

   document.addEventListener("keyup", (event) => {
       const key = event.key.toLowerCase();
       if (keyToNoteMap[key]) {
           piano.triggerRelease(keyToNoteMap[key]);
       }
   });
});



/* current step:
  -- [ISSUE] : each time the body is clicked a new audio context is started which makes the piano louder! how to stop this? 
  -- The playback system is nearly complete. I need to figure out how to increase the quality of the playback sound
  -- I think that might be enough for this project? I think I'll be ready to implement this in Harmony Hub and I'll simply take care of the CSS there


*/