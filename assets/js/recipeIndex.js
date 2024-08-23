import {getAllRecipeCardData, getAllRecipeCardDataWithTag} from "./fetchRecipes.js"
import { createBreadcrumb } from './breadcrumb.js'

const jsonAllRecipesData = await getAllRecipeCardData()

const url = new URL(location.href)
//const search = url.searchParams.get('searchQuery')

let searchQuery =url.searchParams.get('searchQuery')
const queryInput = document.getElementById("query")
console.dir(queryInput)

const cards = document.querySelector(".cards")
//query.addEventListener('input', searchHandler)

const form = document.getElementById('search-form')

const breadcrumb = document.querySelector('.breadcrumb-nav')
const oops = document.getElementById('oops')


createBreadcrumb(breadcrumb, searchQuery, undefined)

if(searchQuery){
  searchHandler(searchQuery)
  
}else {
  fillRecipeCards(jsonAllRecipesData)
}



form.addEventListener('submit', async (e) => {
  e.preventDefault();
  searchQuery = queryInput.value.trim()
  searchHandler(searchQuery)
  createBreadcrumb(breadcrumb, searchQuery, undefined)
  
})
/*
if(search){
  searchHandler(search)
}else{
  getAllRecipeCardData()
}
*/
// Function to filter and display recipes based on search term
async function searchHandler(searchQuery){
  if(searchQuery){
    const searchResult = await getAllRecipeCardDataWithTag(searchQuery)
    fillRecipeCards(searchResult)
  }
}

async function fillRecipeCards(jsonRecipesData){
  if(jsonRecipesData.length == 0){
    console.log("jsonRecipesData")
    console.dir(jsonRecipesData)
    cards.innerHTML = ''
    oops.style.display = 'block'
    return;
  } else{
    oops.style.display = 'none'
  }
  
  console.dir(jsonRecipesData)
  

  const newCards = jsonRecipesData.map((recipe) => {
    
    const a = document.createElement('a')
    a.href = `../html/recipeTemplate.html?recipeId=${recipe.id}`
    if(searchQuery){
      a.href += `&searchQuery=${searchQuery}`
    }

    a.classList.add('card')
    a.id = recipe.id;

    const heading = document.createElement('h2')
    heading.innerText = recipe.recipeTitle

    const thumbnail = document.createElement('img')
    thumbnail.setAttribute('src', recipe.thumbnailRelPath)
    thumbnail.classList.add('thumbnail')
    thumbnail.setAttribute('alt', recipe.imgAlt)

    a.appendChild(heading)
    a.appendChild(thumbnail)
    //newCard.addEventListener('click', cardClickHandler)
    console.dir(a)
    return a
  })
  cards.replaceChildren(...newCards)
  
  
}

/*
const newCards = jsonRecipesData.map((recipe) => {
    
    const a = document.createElement('a')
    a.href = `../html/recipeTemplate.html?recipeId=${recipe.id}`
    if(searchQuery){
      a.href += `&searchQuery=${searchQuery}`
    }
    const newCard = document.createElement('div')
    newCard.id = recipe.id;
    newCard.classList.add('card')

    const newCardContent = document.createElement('div')
    newCardContent.classList.add('card-content')

    const heading = document.createElement('h2')
    heading.innerText = recipe.recipeTitle

    const thumbnail = document.createElement('img')
    thumbnail.setAttribute('src', recipe.thumbnailRelPath)
    thumbnail.classList.add('thumbnail')
    thumbnail.setAttribute('alt', recipe.imgAlt)

    newCardContent.appendChild(heading)
    newCardContent.appendChild(thumbnail)
    a.appendChild(newCardContent)
    newCard.appendChild(a)
    //newCard.addEventListener('click', cardClickHandler)
    console.dir(newCard)
    return newCard
  })*/ 

/*
async function searchHandler(event){
  event.preventDefault();
  const searchQuery = query.value
  console.log(searchQuery);
  const result = await getAllRecipeCardDataWithTag(searchQuery)
  fillRecipeCards(result)
}*/
/*
async function cardClickHandler(event){
  const TARGET = event.target;
  console.dir(TARGET)
  let recipeId = TARGET.id
  console.dir(recipeId)
  fillRecipe(recipeId)
  
  window.location.href = "../html/recipeTemplate.html";
  
}*/
