const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const synth = new Tone.PolySynth(Tone.Synth).toDestination();

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let x = 0;
let y = 0;
let delta = 255;
let angle = 0;
let midiNote = 21;
let drawing = false;

let brushType = 'plain';

canvas.addEventListener('mousemove', e => {
    if (drawing === true) {
        switch (brushType) {
            case 'plain':
                drawPlain(ctx, x, y, e.offsetX, e.offsetY);
            break;
        }
        x = e.offsetX;
        y = e.offsetY;
    }
});

canvas.addEventListener('mousedown', e => {
    x = e.offsetX;
    y = e.offsetY;
    drawing = true;
    window.setInterval(() => {
        deltaChange();
        midiNoteChange();
        playTone();
    }, 500)
})

canvas.addEventListener('mouseup', e => {
    drawing = false;
    delta = 1;
})

window.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'KeyA':
            angleLeft();
        break;
        case 'KeyD':
            angleRight();
        break;
    } 
})

function toColor(num) {
    num >>>= 0;
    var b = num & 0xFF,
        g = (num & 0xFF00) >>> 8,
        r = (num & 0xFF0000) >>> 16,
        a = ( (num & 0xFF000000) >>> 24 ) / 255 ;
    return "rgba(" + [r, g, b, 1].join(",") + ")";
}

function angleLeft() {
    if (angle == 0) {
        angle = 360
    } else if (angle <= 360) {
        angle -= 1
    }

    console.log(angle);
}

function angleRight() {
    if (angle == 360) {
        angle = 0
    } else if (angle >= 0) {
        angle += 1;
    }

    console.log(angle);
}

function deltaChange() {
    delta *= 7
    if (delta >= 21474836470) {
        delta = 1
    }
}

function midiNoteChange() {
    midiNote += 1
    if (midiNote > 95) {
        midiNote = 21;
    }
}

function playTone() {
    synth.triggerAttackRelease((midiNoteNumberToNote(midiNote)), "8n");
}

function midiNoteNumberToNote(number) {
    console.log("number:" + number);
    return {
        95: 'B3',
        93: 'A4',
        91: 'C6',
        89: 'E6',
        88: 'C2',
        86: 'D5',
        84: 'G3',
        83: 'D1',
        81: 'G6',
        79: 'A5',
        77: 'D3',
        76: 'F6',
        74: 'C3',
        72: 'A3',
        71: 'C4',
        69: 'F3',
        67: 'C1',
        65: 'D2',
        64: 'G2',
        62: 'E1',
        60: 'B5',
        59: 'A0',
        57: 'B0',
        55: 'F4',
        53: 'D6',
        52: 'B4',
        50: 'F2',
        48: 'A6',
        47: 'A2',
        45: 'E2',
        43: 'G5',
        41: 'B6',
        40: 'G1',
        38: 'C5',
        36: 'B1',
        35: 'G4',
        33: 'E4',
        31: 'B2',
        29: 'F5',
        28: 'A1',
        26: 'D4',
        24: 'E3',
        23: 'E5',
        21: 'F1',
        }[number]
}

function drawPlain(context, x, y) {
    console.log(toColor(delta));
    context.beginPath();
    context.strokeStyle = toColor(delta);
    context.lineWidth = 1;
    context.moveTo(x, y);
    context.lineTo(x * 10 * Math.cos(angle), y * 10 * Math.sin(angle));
    context.stroke()
}

