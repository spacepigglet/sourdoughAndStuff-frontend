import {getAllRecipeCardData, getAllRecipeCardDataWithTag} from "./fetchRecipes.js"
import { createBreadcrumb } from './breadcrumb.js'

const jsonAllRecipesData = await getAllRecipeCardData()

const url = new URL(location.href)

let searchQuery =url.searchParams.get('searchQuery')
const queryInput = document.getElementById("query")

const cards = document.querySelector(".cards")

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

// Function to filter and display recipes based on search term
async function searchHandler(searchQuery){
  if(searchQuery){
    const searchResult = await getAllRecipeCardDataWithTag(searchQuery)
    fillRecipeCards(searchResult)
  }
}

async function fillRecipeCards(jsonRecipesData){
  if(jsonRecipesData.length == 0){
    cards.innerHTML = ''
    oops.style.display = 'block'
    return;
  } else{
    oops.style.display = 'none'
  }

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
    
    return a
  })
  cards.replaceChildren(...newCards)
  
}

