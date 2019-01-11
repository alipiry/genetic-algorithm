/*
@author Ali Piry <alipiry@icloud.com>

@module Genetic Algorithm
@description
  Demonstration of using a genetic algorithm to perform a search

  setup()
   # Step 1: The Population
     # Create an empty population (an array or ArrayList)
     # Fill it with DNA encoded objects (pick random values to start)

  draw()
   # Step 1: Selection
     # Create an empty mating pool (an empty ArrayList)
     # For every member of the population, evaluate its fitness based on some criteria / function,
       and add it to the mating pool in a manner consistent with its fitness, i.e. the more fit it
       is the more times it appears in the mating pool, in order to be more likely picked for reproduction.

   # Step 2: Reproduction
     # Create a new empty population
     # Fill the new population by executing the following steps:
        1. Pick two "parent" objects from the mating pool.
        2. Crossover -- create a "child" object by mating these two parents.
        3. Mutation -- mutate the child's DNA based on a given probability.
        4. Add the child object to the new population.
     # Replace the old population with the new population

    # Rinse and repeat

*/

let target;
let popMax;
let mutationRate;
let population;

let bestPhrase;
let allPhrases;
let stats;

function setup() {
  // Use p5.js api to display algorithm data

  // Create paragraph "Best phrase:"
  bestPhrase = createP("Best phrase:");
  // Set paragraph class to "best" to use style
  bestPhrase.class("best");

  // Create paragraph "All phrases:"
  allPhrases = createP("All phrases:");
  // Set paragraph position
  allPhrases.position(600, 10);
  // Set paragraph class to "all" to use style
  allPhrases.class("all");

  // Create paragraph "Stats"
  stats = createP("Stats");
  // Set paragraph class to "stats" to use style
  stats.class("stats");

  target = "Artificial Intelligence.";
  popMax = 200;
  mutationRate = 0.01;

  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(target, mutationRate, popMax);
}

function draw() {
  // Generate mating pool
  population.naturalSelection();
  // Create next generation
  population.generate();
  // Calculate fitness
  population.calcFitness();

  population.evaluate();

  // If we found the target phrase, stop
  if (population.isFinished()) {
    noLoop(); // p5.js function
  }

  displayInfo();
}

function displayInfo() {
  // Display current status of population
  let answer = population.getBest();

  bestPhrase.html("Best answer:<br>" + answer);

  let statsText = "total generations:     " + population.getGenerations() + "<br>";
  statsText += "average fitness:       " + nf(population.getAverageFitness()) + "<br>";
  statsText += "total population:      " + popMax + "<br>";
  statsText += "mutation rate:         " + floor(mutationRate * 100) + "%";

  stats.html(statsText);

  allPhrases.html("All phrases:<br>" + population.allPhrases())
}
