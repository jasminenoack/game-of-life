const a = "alive"
const e = "empty"

export const patterns = {
    block: [
        [a, a],
        [a, a]
    ],
    beehive: [
        [e, a, a, e],
        [a, e, e, a],
        [e, a, a, e]
    ],
    loaf: [
        [e, a, a, e],
        [a, e, e, a],
        [e, a, e, a],
        [e, e, a, e]
    ],
    boat: [
        [a, a, e],
        [a, e, a],
        [e, a, e]
    ],
    tub: [
        [e, a, e],
        [a, e, a],
        [e, a, e]
    ],

    blinker: [
        [a, a, a]
    ],
    toad: [
        [e, a, a, a],
        [a, a, a, e]
    ],
    beacon: [
        [a, a, e, e],
        [a, e, e, e],
        [e, e, e, a],
        [e, e, a, a]
    ],
    pulsar: [
        [e, e, a, a, e, e, e, e, e, a, a, e, e],
        [e, e, e, a, a, e, e, e, a, a, e, e, e],
        [a, e, e, a, e, a, e, a, e, a, e, e, a],
        [a, a, a, e, a, a, e, a, a, e, a, a, a],
        [e, a, e, a, e, a, e, a, e, a, e, a, e],
        [e, e, a, a, a, e, e, e, a, a, a, e, e],

        [e, e, e, e, e, e, e, e, e, e, e, e, e],

        [e, e, a, a, a, e, e, e, a, a, a, e, e],
        [e, a, e, a, e, a, e, a, e, a, e, a, e],
        [a, a, a, e, a, a, e, a, a, e, a, a, a],
        [a, e, e, a, e, a, e, a, e, a, e, e, a],
        [e, e, e, a, a, e, e, e, a, a, e, e, e],
        [e, e, a, a, e, e, e, e, e, a, a, e, e],
    ],
    pentadecathlon: [
        [a, a, a],
        [e, a, e],
        [e, a, e],
        [a, a, a],

        [e, e, e],

        [a, a, a],
        [a, a, a],

        [e, e, e],

        [a, a, a],
        [e, a, e],
        [e, a, e],
        [a, a, a],
    ],

    glider: [
        [e, a, e],
        [e, e, a],
        [a, a, a],
    ],
    lightweightSpaceship: [
        [a, e, e, a, e],
        [e, e, e, e, a],
        [a, e, e, e, a],
        [e, a, a, a, a]
    ],
    rPentomino: [
        [e, a, a],
        [a, a, e],
        [e, a, e]
    ],
    diehard: [
        [e, e, e, e, e, e, a, e],
        [a, a, e, e, e, e, e, e],
        [e, a, e, e, e, a, a, a]
    ],
    acorn: [
        [e, a, e, e, e, e, e],
        [e, e, e, a, e, e, e],
        [a, a, e, e, a, a, a]
    ],
    gosperGliderGun: [
        [e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, a, e, e, e, e, e, e, e, e, e, e, e],
        [e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, a, e, a, e, e, e, e, e, e, e, e, e, e, e],
        [e, e, e, e, e, e, e, e, e, e, e, e, a, a, e, e, e, e, e, e, a, a, e, e, e, e, e, e, e, e, e, e, e, e, a, a],
        [e, e, e, e, e, e, e, e, e, e, e, a, e, e, e, a, e, e, e, e, a, a, e, e, e, e, e, e, e, e, e, e, e, e, a, a],
        [a, a, e, e, e, e, e, e, e, e, a, e, e, e, e, e, a, e, e, e, a, a, e, e, e, e, e, e, e, e, e, e, e, e, e, e],

        [a, a, e, e, e, e, e, e, e, e, a, e, e, e, a, e, a, a, e, e, e, e, a, e, a, e, e, e, e, e, e, e, e, e, e, e],
        [e, e, e, e, e, e, e, e, e, e, a, e, e, e, e, e, a, e, e, e, e, e, e, e, a, e, e, e, e, e, e, e, e, e, e, e],
        [e, e, e, e, e, e, e, e, e, e, e, a, e, e, e, a, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e],
        [e, e, e, e, e, e, e, e, e, e, e, e, a, a, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e],
    ],
    engine1: [
        [e, e, e, e, e, e, a, e],
        [e, e, e, e, a, e, a, a],
        [e, e, e, e, a, e, a, e],
        [e, e, e, e, a, e, e, e],
        [e, e, a, e, e, e, e, e],
        [a, e, a, e, e, e, e, e]
    ],
    engine2: [
        [a, a, a, e, a],
        [a, e, e, e, e],
        [e, e, e, a, a],
        [e, a, a, e, a],
        [a, e, a, e, a]
    ],
    engine3: [
        [a, a, a, a, a, a, a, a, e, a, a, a, a, a, e, e, e, a, a, a, e, e, e, e, e, e, a, a, a, a, a, a, a, e, a, a, a, a, a]
    ]
}