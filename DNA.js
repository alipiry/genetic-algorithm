/*
@author Ali Piry <alipiry@icloud.com>

@module Genetic Algorithm
@description
  A class to describe a pseudo-DNA, i.e. genotype
    Here, a virtual organism's DNA is an array of character.
    Functionality:
      -- convert DNA into a string
      -- calculate DNA's "fitness"
      -- mate DNA with another set of DNA
      -- mutate DNA
*/

// @function Create random DNA and convert it to string
function newChar() {
  let c = floor(random(63, 122));
  if (c === 63) c = 32;
  if (c === 64) c = 46;
  return String.fromCharCode(c);
}

// @class DNA
class DNA {
  // Initialize main parameters in constructor
  constructor(num) {
    // The genetic sequence
    this.genes = [];
    this.fitness = 0;
    for (let i = 0; i < num; i++) {
      this.genes[i] = newChar(); // Pick from range of chars
    }
  }

  // Converts character array to a String
  getPhrase() {
    return this.genes.join("");
  }

  // Fitness function (returns floating point % of "correct" characters)
  calcFitness(target) {
    let score = 0;
    for (let i = 0; i < this.genes.length; i++) {
      if (this.genes[i] === target.charAt(i)) {
        score++;
      }
    }
    this.fitness = score / target.length;
  }

  // Crossover
  crossover(partner) {
    // A new child
    let child = new DNA(this.genes.length);

    let midpoint = floor(random(this.genes.length)); // Pick a midpoint

    // Half from one, half from the other
    for (let i = 0; i < this.genes.length; i++) {
      if (i > midpoint) child.genes[i] = this.genes[i];
      else child.genes[i] = partner.genes[i];
    }
    return child;
  }

  // Based on a mutation probability, picks a new random character
  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.genes[i] = newChar();
      }
    }
  }
}
