import {getRecipe} from './fetchRecipes.js'
import { createBreadcrumb } from './breadcrumb.js'

const url = new URL(location.href)
const recipeId = url.searchParams.get('recipeId')
const searchQuery = url.searchParams.get('searchQuery')

const recipeTemplate = document.querySelector('.recipe-template')
const recipeDiv = document.getElementById('recipe')
const breadcrumb = document.querySelector('.breadcrumb-nav')

fillRecipe(recipeId)


async function fillRecipe(recipeId){
  const recipe = recipeTemplate.cloneNode(true)
  const recipeData = await getRecipe(recipeId)

  //title
  const recipeTitle = recipe.querySelector('h2')
  recipeTitle.innerText = recipeData.recipeTitle

  //description
  //OBS: description text in db is already formatted into <p> etc
  const description = recipe.querySelector('.recipe-description')
  description.innerHTML = recipeData.description

  //image
  if(recipeData.imgRelPath){
    const img = recipe.querySelector('img')
    img.setAttribute('src', recipeData.imgRelPath)
    img.setAttribute('alt', recipeData.imgAlt)
  }
  
  
  //ingredients
  const ingredientsList = recipe.querySelector('.ingredients-list')
  const ingredients =recipeData.ingredients
  const ingredientsLi = ingredients.map((ingredient) => {
    const listItem = document.createElement('li')
    listItem.innerHTML =  (ingredient.amount ||'') + ' ' + (ingredient.unit || '' ) + ' ' + (ingredient.name)
    return listItem
  })
  ingredientsList.append(...ingredientsLi)

  //instructions
  //OBS: instructions in db are already formatted (eg with links and <strong>)
  const instructionsList = recipe.querySelector('.instructions-steps')
  const instructions = recipeData.instructions
  const instructionsLi = instructions.map((instruction) => {
    const listItem = document.createElement('li')
    listItem.innerHTML = instruction
    return listItem
  })
  instructionsList.append(...instructionsLi)


  recipeDiv.replaceChildren(recipe)

  // create breadcrumb nav
  createBreadcrumb(breadcrumb, searchQuery, recipeData.recipeTitle)
}



