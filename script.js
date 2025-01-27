import * as Tone from 'https://cdnjs.cloudflare.com/ajax/libs/tone/15.1.3/Tone.js'

const keys = document.querySelectorAll('.key')

const synth = new Tone.Synth().toDestination();

document.body.addEventListener('click', () => {
    if (Tone.context.state !== 'running') {
      Tone.context.resume(); // Resume the AudioContext
    }
  });


keys.forEach(key => {
   key.addEventListener("click", () => {
//     const note = key.dataset.note;
//    playSound(note)
       //create a synth and connect it to the main output (your speakers)

//play a middle 'C' for the duration of an 8th note
synth.triggerAttackRelease("C4", "8n");
   })


}
)


function playSound(note) {
    const audio = new Audio(`sounds/${note}.mp3`)
    audio.play()
}

