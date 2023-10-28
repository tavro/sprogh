const jsonData = {   
    "adventure": [
        "Personer från [LAND1] under [PERSON]s ledning anländer till [LAND2]. {PERSON:isFrom:LAND1, PERSON:isIn:LAND2}",
        "Kaptenen [PERSON] från [LAND] upptäcker [Ö]. {PERSON:isFrom:LAND, PERSON:discovered:Ö}",
        "[PERSON] anländer till [STAD1] efter att ha flytt från [STAD2]s slott på [Ö]. {PERSON:isIn:STAD1, PERSON:onTheRunFrom:STAD2, PERSON:onTheRunFrom:Ö}"
    ],
    "politics": [
        "Kung [PERSON] anländer till [STAD] för att inleda mötet med stormännen från [LAND]. {PERSON:isIn:STAD}",
        "Ett stillestånd sluts mellan [LAND1] och [LAND2] i [STAD]. {LAND1-hasTruce-LAND2}",
        "Stillestånd sluts mellan [LAND1] och [LAND2] i [STAD]. {LAND1-hasTruce-LAND2}",
        "[STAD1] ockuperar [STAD2]. {STAD2:occupiedBy:STAD1}",
        "Ett möte mellan [LAND1] och [LAND2] hålls i [STAD]. Man beslutar om vapenvila. {LAND1:hadMeeting:LAND2, LAND1-hasTruce-LAND2}",
        "Ett möte hålls mellan [LAND1] och [LAND2] i [STAD]. {LAND1:hadMeeting:LAND2}",
        "Ett möte hålls med [LAND1] och [LAND2] i [STAD]. {LAND1:hadMeeting:LAND2}",
        "Stillestånd sluts mellan [LAND1] och [LAND2] i [STAD]. Man lyckas inte lösa frågan om tributen. {LAND1-hasTruce-LAND2}",
        "[PERSON] kröns till kung av [LAND] i [STAD]. {PERSON:isKingOf:LAND}",
    ],
    "miscellaneous": [
        "[PERSON1] gifter sig med [PERSON2]. {PERSON1-marriedTo-PERSON2}",
        "[PERSON1] den yngre gifter sig med [PERSON2]. {PERSON1-marriedTo-PERSON2}",
        "[PERSON1] gifter sig med [PERSON2] av [LAND]. {PERSON1-marriedTo-PERSON2, PERSON2:isFrom:LAND}"
    ]
};

function getAsArr(inputStr, delimiter) {
    return inputStr.split(delimiter).map(str => str.trim());
}

function getRandomElement(data) {
    const keys = Object.keys(data);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    const randomArray = data[randomKey];
    const randomValue = randomArray[Math.floor(Math.random() * randomArray.length)];

    const elements = randomValue.match(/\[([A-Ö0-9_:]+)\]/g) || [];

    const relationships = randomValue.match(/\{([^{}]+)\}/g) || [];

    const cleanedElements = elements.map(match => match.replace(/\[|\]/g, ''));
    let cleanedRelationships = relationships.map(match => match.replace(/\{|\}/g, ''));
    let rels = getAsArr(cleanedRelationships[0], ',');

    return {
        value: randomValue,
        elements: cleanedElements,
        relationships: rels
    };
}

const randomData = getRandomElement(jsonData);

const graph = new RelationGraph();
randomData.elements.forEach(element => {
    graph.addNode(element);
});
randomData.relationships.forEach(element => {
    if(element.includes('-')) {
        const rel = getAsArr(element, '-');
        graph.addTwoWayEdge(rel[0], rel[2], rel[1]);
    }
    else if(element.includes(':')) {
        const rel = getAsArr(element, ':');
        graph.addEdge(rel[0], rel[2], rel[1]);
    }
});
graph.printAllRelationships();