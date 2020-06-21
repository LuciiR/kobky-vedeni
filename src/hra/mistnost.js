export default {
    velikostCtverecku : 72,
    mistnost: [ 
        { 
            pozadi:'pravidla',
            pozicePanacka:{
                x: 1,
                y: 4
            },
            poziceNPC: {
                x: 11,
                y: 4
            },
            cisloMin: 0,
            cisloMax: 0,
            matice: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 1],
                [2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 1, 3, 0, 2],
                [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        {
            pozadi: 'kuchyne_box',
            pozicePanacka:{
                x: 1,
                y: 4
            },
            poziceNPC: {
                x: 12,
                y: 6
            },
            cisloMin: 0,
            cisloMax: 0,
            matice: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
                [1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 2],
                [1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 1],
                [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 3, 1, 3, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        {
            pozadi: 'knihovna2_box',
            pozicePanacka:{
                x: 1,
                y: 6
            },
            poziceNPC: {
                x: 10,
                y: 2
            },
            cisloMin: 0,
            cisloMax: 0,
            matice: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 3, 1, 2, 1, 1],
                [1, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 0, 0, 1],
                [1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1],
                [1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
                [2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1],
                [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        {
            pozadi: 'posilovna_box',
            pozicePanacka:{
                x: 1,
                y:2
            },
            poziceNPC: {
                x: 13,
                y: 5
            },
            cisloMin: 0,
            cisloMax: 0,
            matice: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 3, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 3, 1],
                [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        }
    ]      
}