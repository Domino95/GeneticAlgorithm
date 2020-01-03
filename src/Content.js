import React, { useState } from 'react';
import "./App.css"
const Content = () => {
    const [numberPopulation, setnumberPopulation] = useState(10)
    const [result, setresult] = useState(41260)
    const [iterations, setiterations] = useState(100)
    const [endresult, setendresult] = useState()
    const [endpopulation, setendpopulation] = useState()
    const [counter, setcounter] = useState()
    const [adaptation, setadaptation] = useState()
    const [mutations, setmutations] = useState(0.10)
    const [cross, setcorss] = useState(0.75)


    const handleinput = (e) => {
        if (e.target.id === "number")
            setnumberPopulation(e.target.value)
        if (e.target.id === "result")
            setresult(e.target.value)
        if (e.target.id === "iterations")
            setiterations(e.target.value)
        if (e.target.id === "mutations")
            setmutations(e.target.value)
        if (e.target.id === "cross")
            setcorss(e.target.value)
    }

    function createBinaryString(nMask) {

        for (var nFlag = 0, nShifted = nMask, sMask = ''; nFlag < 32;
            nFlag++ , sMask += String(nShifted >>> 31), nShifted <<= 1);
        sMask = sMask.replace(/\B(?=(.{8})+(?!.))/g, " ")

        return sMask.slice(-5);
    }

    const startPopulation = (numberPopulation) => {
        //Losowanie poczatkowej populacji
        let startPopulation = []
        for (let i = 0; i < numberPopulation; i++) {
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

            if (probability <= cross) {
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
        console.log("Populacja po krzyzowaniu: " + populationAfter, cross)
        return populationAfter
    }
    const mutation = (populationAfter) => {
        //Mutacja
        populationAfter.map((i, index) => {
            let probability = Math.random();
            if (probability <= mutations) {
                let point = Math.floor(Math.random() * 5) + 1;
                let parent = createBinaryString(i)
                let before = parent.slice(0, point - 1)

                let after = parent.substring(point)

                let mutated = parent.charAt(point - 1)

                if (mutated == 0) {
                    mutated = 1
                }
                else if (mutated == 1)
                    mutated = 0

                let mutatedChild = before + mutated + after
                populationAfter.splice(index, 1, parseInt(mutatedChild, 2))

            }
        })
        console.log("Populacja po mutacji: " + populationAfter, mutations)
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

    const run = (numberPopulation, result, iterations) => {
        let populations = startPopulation(numberPopulation)
        let resultAdaptations = adaptationResult(populations)
        let sumAdaptation = SumAdaptationResult(resultAdaptations)
        let counter = 0;
        let BestChromosome
        while ((sumAdaptation < result) && (counter < iterations)) {

            let percentAdaptations = percentAdaptation(resultAdaptations, sumAdaptation)
            let populationAfterRouletteWhell = rouletteWheel(percentAdaptations, populations)
            let populationAfterCross = crosses(populationAfterRouletteWhell)
            let populationAfterMutated = mutation(populationAfterCross)
            populations = populationAfterMutated
            resultAdaptations = adaptationResult(populationAfterMutated)
            counter++
            console.log("Iteracja numer: " + counter)

            sumAdaptation = SumAdaptationResult(resultAdaptations)
            BestChromosome = theBestChromosome(populations)
        }
        setendresult(BestChromosome)
        setendpopulation(resultAdaptations)
        setadaptation(sumAdaptation)
        setcounter(counter)
    }

    return (
        <div className="content">

            <div className="inputs">
                <label htmlFor="number"> Wielkość populacji </label>
                <input type="number" id="number" value={numberPopulation} onChange={(e) => handleinput(e)} />

                <label htmlFor="resut"> Oczekiwany wynik </label>
                <input type="number" id="result" value={result} onChange={(e) => handleinput(e)} />

                <label htmlFor="iterations"> Pokolenia</label>
                <input type="number" id="iterations" value={iterations} onChange={(e) => handleinput(e)} />

                <label htmlFor="cross"> Krzyzowanie  </label>
                <input type="number" id="cross" value={cross} min="0" max="1" onChange={(e) => handleinput(e)} />

                <label htmlFor="mutations"> Mutacja </label>
                <input type="number" id="mutations" value={mutations} min="0" max="1" onChange={(e) => handleinput(e)} />
            </div>
            <button onClick={() => run(numberPopulation, result, iterations)}>Oblicz</button>
            <div className="result">
                <h3> Najlepszy chromoson: {endresult} </h3>
                {adaptation === result ?
                    <h3 style={{ color: "green" }}>Suma adaptacji:  {adaptation} </h3> :
                    <h3>Suma adaptacji: {adaptation}</h3>}

                <h3>Końcowa populacja: {endpopulation && endpopulation.map(i =>
                    <>
                        <p>{i}</p>
                    </>
                )}
                </h3>
                {counter >= iterations ?
                    <h3 style={{ color: "red" }}>Ilosc pokoleń:  {counter} </h3> :
                    <h3>Ilosc pokoleń: {counter}</h3>}


            </div>
        </div >
    );
}

export default Content;
