// It's javascript!
const video = document.getElementById("video")
const button = document.getElementById("button")

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    const tracks = stream.getVideoTracks()
    const track = tracks[0]
    video.srcObject = stream
    video.play()
})
const context = new AudioContext()
const o = context.createOscillator()
const g = context.createGain()
o.connect(g)
g.connect(context.destination)

let started = false
button.onmousedown = () => {
    if (!started) {
        console.log("started")
        started = true
        o.start(0)
    }
    console.log("onmousedown")
    g.gain.cancelScheduledValues(context.currentTime)
    g.gain.setValueAtTime(0.00001, context.currentTime)
    g.gain.exponentialRampToValueAtTime(0.5, context.currentTime + 0.04)
}

function stopSound() {
    g.gain.cancelScheduledValues(context.currentTime)
    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 3)
}

document.onmouseup = stopSound
document.onmouseleave = stopSound