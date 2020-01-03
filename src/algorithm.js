/* ax2 + bx + c
 Nr indeksu: 4934
a = 4
b = 9
c = 3
*/
//Pradwopobienstwo krzyzowania
const pk = 0.75;

//Pradwopobienstwo mutacji
const pm = 0.1;

//Liczba poczatkowej populacji. Tylko liczby parzyste
const numberPopulations = 10



function createBinaryString(nMask) {

    for (var nFlag = 0, nShifted = nMask, sMask = ''; nFlag < 32;
        nFlag++ , sMask += String(nShifted >>> 31), nShifted <<= 1);
    sMask = sMask.replace(/\B(?=(.{8})+(?!.))/g, " ")

    return sMask.slice(-5);
}


const startPopulation = () => {
    //Losowanie poczatkowej populacji
    let startPopulation = []
    for (let i = 0; i < numberPopulations; i++) {
        startPopulation.push(Math.floor(Math.random() * 32))
    }
    console.log('Startowa poulacja: ' + startPopulation)
    return startPopulation
}

const adaptationResult = (startPopulation) => {
    // Obliczanie wartosci przystosowania
    let adaptationResult = []
    startPopulation.map(i => {
        let result = (4 * Math.pow(i, 2)) + (9 * i) + 3
        adaptationResult.push(result)
    })
    console.log("wynik adaptacji: " + adaptationResult)
    return adaptationResult
}

const SumAdaptationResult = (adaptationResult) => {
    // Suma wartosci przystosowania
    let sumAdaptation = 0
    adaptationResult.map(i => {
        sumAdaptation = sumAdaptation + i
    })
    console.log("suma adaptacji populacji: " + sumAdaptation)
    return sumAdaptation
}

const percentAdaptation = (adaptationResult, sumAdaptation) => {
    // Wartosci przystosowania w procentach
    let percentAdaptation = []
    adaptationResult.map(i => {
        let result = i / sumAdaptation * 100
        percentAdaptation.push(result)
    }
    )
    // console.log("Procentowa wartosc adaptacji " + percentAdaptation)
    return percentAdaptation
}



const rouletteWheel = (percentAdaptation, startPopulation) => {
    // Selekcja kolo ruletki
    let rouletteWheel = []
    let result = 0
    percentAdaptation.map(i => {
        result = result + i
        rouletteWheel.push(result)
    })
    let newPopulation = []
    for (let i = 0; i < startPopulation.length; i++) {
        let random = Math.random() * 100
        for (let i = 0; i < startPopulation.length; i++) {
            if (i === 0 && random < rouletteWheel[i]) {
                newPopulation.push(startPopulation[i])
            }
            else if (random >= rouletteWheel[i] && random <= rouletteWheel[i + 1]) {
                newPopulation.push(startPopulation[i])
            }
        }
    }
    console.log("populacja po selekcji" + newPopulation)
    return newPopulation

}

const crosses = (newPopulation) => {
    //Krzyzowanie
    let counterCouple = newPopulation.length / 2
    let couplePopulation = []
    let counter = 0
    for (let i = 0; i < counterCouple; i++) {
        couplePopulation.push({
            1: newPopulation[counter],
            2: newPopulation[counter + 1]
        })
        counter = counter + 2
    }
    let child1 = '';
    let child2 = '';
    let populationAfter = []
    couplePopulation.map(i => {
        let probability = Math.random();
        if (probability <= pk) {
            let point = Math.floor(Math.random() * 4) + 1;
            let parent1 = createBinaryString(i[1])
            let parent2 = createBinaryString(i[2])
            couplePopulation.splice(i, 1)

            let stringToReplace1 = parent1.substr(point)
            let stringToReplace2 = parent2.substr(point)

            child1 = parent1.slice(0, point) + stringToReplace2
            child2 = parent2.slice(0, point) + stringToReplace1


            populationAfter.push(parseInt(child1, 2), parseInt(child2, 2))
        }
    })
    for (let i = 0; i < couplePopulation.length; i++) {
        populationAfter.push(couplePopulation[i][1])
        populationAfter.push(couplePopulation[i][2])
    }
    console.log("Populacja po krzyzowaniu: " + populationAfter)
    return populationAfter
}

const mutation = (populationAfter) => {
    //Mutacja
    populationAfter.map((i, index) => {
        let probability = Math.random();
        if (probability <= pm) {
            let point = Math.floor(Math.random() * 5) + 1;
            let parent = createBinaryString(i)
            let before = parent.slice(0, point - 1)

            let after = parent.substring(point)

            let mutated = parent.charAt(point - 1)

            if (mutated === 0) {
                mutated = 1
            }
            else if (mutated === 1)
                mutated = 0

            let mutatedChild = before + mutated + after
            populationAfter.splice(index, 1, parseInt(mutatedChild, 2))

        }
    })
    console.log("Populacja po mutacji: " + populationAfter)
    return populationAfter
}

const theBestChromosome = (population) => {
    let theBestChromosome = 0
    population.map(i => {
        if (i >= theBestChromosome)
            theBestChromosome = i

    })
    console.log("Najlepszy chromoson: " + theBestChromosome)
    return theBestChromosome
}


const run = () => {
    let populations = startPopulation()
    let resultAdaptations = adaptationResult(populations)
    let sumAdaptation = SumAdaptationResult(resultAdaptations)
    let counter = 0;
    while ((sumAdaptation < 41260) && (counter < 10000)) {

        let percentAdaptations = percentAdaptation(resultAdaptations, sumAdaptation)
        let populationAfterRouletteWhell = rouletteWheel(percentAdaptations, populations)
        let populationAfterCross = crosses(populationAfterRouletteWhell)
        let populationAfterMutated = mutation(populationAfterCross)
        populations = populationAfterMutated
        resultAdaptations = adaptationResult(populationAfterMutated)
        counter++
        console.log("Iteracja numer: " + counter)
        sumAdaptation = SumAdaptationResult(resultAdaptations)
        let BestChromosome = theBestChromosome(resultAdaptations)
    }

}