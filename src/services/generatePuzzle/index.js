import wordSearchGenerator from './wordSearchGenerator.worker';

export default function generatePuzzle(gridWidth, words, charset)
{
    if (!window.Worker) {
        throw new Error('Web Worker API unavailable.');
    }
    //const webworker = new Worker(wordSearchGenerator);
    const webworker = new wordSearchGenerator();
    
    return new Promise(function(resolve, reject) {
        webworker.postMessage([gridWidth, words, charset]);
        webworker.onmessage = ({data}) => {
            if (data) {
                resolve(data);
            }
            reject('Could not generate a word search puzzle');
        };
    });
}