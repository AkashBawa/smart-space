const spaceType = [
    { 
        name : 'singleSpace', 
        building: [ 
            { 
                name :'Library Building', 
                id : 'aRcQTIOekeElB2Za0Ja1',
                levels : [1,2 ,3]
            },
        ],
        accommodate: 1,
        computer: false,
        power: false,
        projector: false,
        screen: false
    },
    { 
        name : 'doubleSpace', 
        building: [ 
            { 
                name :'Library Building', 
                id : 'aRcQTIOekeElB2Za0Ja1',
                levels : [1,2 ,3]
            },
            
        ],
        accommodate: 2,
        computer: false,
        power: true,
        projector: false,
        screen: false
    },
    { 
        name : 'group4', 
        building: [ 
            { 
                name :'Library Building', 
                id : 'aRcQTIOekeElB2Za0Ja1',
                levels : [1,2 ,3]
            },
            
        ],
        accommodate: 4,
        computer: false,
        power: true,
        projector: false,
        screen: false
    },
    { 
        name : 'group8', 
        building: [ 
            { 
                name :'Library Building', 
                id : 'aRcQTIOekeElB2Za0Ja1',
                levels : [1,2 ,3]
            },
            
        ],
        accommodate: 8,
        computer: false,
        power: true,
        projector: false,
        screen: false
    },
    { 
        name : 'closedSpace', 
        building: [ 
            { 
                name :'Library Building', 
                id : 'aRcQTIOekeElB2Za0Ja1',
                levels : [2]
            },
            
        ],
        accommodate: 8,
        computer: false,
        power: true,
        projector: false,
        screen: true
    },
    { 
        name : 'theater', 
        building: [ 
            { 
                name : 'A Building', 
                id : 'gdOh2w92IyASqUIZ7t8w',
                levels : [3]
            },
            { 
                name : 'B Building', 
                id : 'iIUjAXuRklHbcJbxcTiG',
                levels : [3]
            }
            
        ],
        accommodate: 20,
        computer: false,
        power: true,
        projector: true,
        screen: true
    },
    { 
        name : 'comLab', 
        building: [ 
            { 
                name : 'T Building', 
                id : 'zfbT1vs4ScVWSYGvVi5q',
                levels : [1]
            }
        ],
        accommodate: 40,
        computer: false,
        power: true,
        projector: true,
        screen: true
    }
]

export {
    spaceType
}