const pyramidDataSets: (number | null)[][][] = [
    [
        [null],
        [null, 309],
        [170, null, null],
        [null, null, null, 74],
        [null, null, null, null, 35],
        [null, null, 19, null, 20, null],
        [null, null, 13, null, null, null, null]
    ],
    [
        [null],
        [null, null],
        [null, null, null],
        [null, null, 65, 83],
        [null, null, null, null, 48],
        [16, null, null, 14, null, null],
        [11, null, null, null, null, null, 15]
    ],
    [
        [null],
        [null, null],
        [null, null, null],
        [null, null, null, null],
        [29, 36, 45, null, null],
        [null, null, 23, null, null, 22],
        [null, null, null, 15, null, null, 7]
    ],
    [
        [null],
        [257, null],
        [null, null, null],
        [null, null, 58, null],
        [null, 35, null, 27, 35],
        [null, null, null, null, null, null],
        [null, null, null, null, null, 7, 15]
    ],
];

export function generatePyramid(): (number | null)[][] {
    const randomIndex = Math.floor(Math.random() * pyramidDataSets.length);
    return pyramidDataSets[randomIndex].map(row => [...row]);
}
