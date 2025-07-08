'use strict';

const cakeRecipes = require("./cake-recipes.json");
const prompt = require('prompt-sync')();
// Your functions here
function authorList(data) {
  const authors = [];
  data.forEach(recipe => {
    if (!authors.includes(recipe.Author)) {
      authors.push(recipe.Author);
    }
  });
  return authors;
}
//console.log(authorList(cakeRecipes));

function recipeList(data) {
  if (!data || data.length === 0) {
    console.log("No recipes found.");
    return [];
  }
  return data.map(({ Name }) => Name)
}
//console.log(recipeList(cakeRecipes));
//const emptyarray = [];
//console.log(recipeList(emptyarray));

function recipesByAuthor(recipeData, authorData) {
  const result1 = recipeData.filter(({ Author }) => Author === authorData);
  return recipeList(result1);
}
//recipesByAuthor(cakeRecipes, 'Mary Cadogan');

function recipesByIngredient(recipeData, ingredientData) {
  const result2 = recipeData
  .filter(({ Ingredients }) => 
    Ingredients.some(item => item.includes(ingredientData))
  );
  return recipeList(result2)
}
//console.log(recipesByIngredient(cakeRecipes, "140g caster sugar" ));

let savedIngredients = [];

function recipesByName(recipeData, recipeNameData) {
  const foundRecipe = recipeData.find(({ Name }) => Name.includes(recipeNameData));
  if (foundRecipe) {
    const userResponse = prompt(`Recipe found: ${foundRecipe.Name}. Do you want to save the ingredients? (Y/N): `).toUpperCase();
    if (userResponse === 'Y') {
      savedIngredients.push(...foundRecipe.Ingredients);
      console.log("Ingredients are saved.");
      } else {
        console.log("Ingredients are not saved.");
      }
  } else {
    console.log("Recipe not found.");
  }
  return foundRecipe;
}
//console.log(recipesByName(cakeRecipes, 'Christmas pud cupcakes'));

function createGroceryList() {
  if(savedIngredients.length === 0) {
    console.log("No ingredients saved.");
    return [];
  }
  return savedIngredients;
}

// Part 2

const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
}


let choice;

do {
  choice = displayMenu();

  switch (choice) {
    case 1:
      console.log(authorList(cakeRecipes));
      break;
    case 2:
      let nameChoice = prompt("Choose a author name: ")
      console.log(recipesByAuthor(cakeRecipes, nameChoice));
      break;
    case 3:
      let ingredientChoice = prompt("Choose a ingredient: ")
      console.log(recipesByIngredient(cakeRecipes, ingredientChoice));
      break;
    case 4:
      let recipeChoice = prompt("Choose a recipe: ")
      recipesByName(cakeRecipes, recipeChoice);
        break;
    case 5:
      console.log(createGroceryList());
      break;
    case 0:
      console.log("Exiting...");
      break;
    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);
