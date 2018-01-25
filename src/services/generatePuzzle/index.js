import generateWordSearch from './WordSearchGenerator';

export default function generatePuzzle(gridWidth, words, charset)
{
  // mock data
  const result = {};

  return new Promise(function(resolve, reject) {
    setTimeout(resolve, 3000, result);
  });
}