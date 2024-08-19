import {getAllRecipeCardData, getAllRecipeCardDataWithTag} from "./fetchRecipes.js"

const jsonAllRecipesData = await getAllRecipeCardData()

const url = new URL(location.href)
//const search = url.searchParams.get('searchQuery')

const searchQuery =url.searchParams.get('searchQuery')
const queryInput = document.getElementById("query")
console.dir(queryInput)

const cards = document.querySelector(".cards")
//query.addEventListener('input', searchHandler)

const form = document.getElementById('search-form')

searchHandler(searchQuery)


form.addEventListener('submit', async (e) => {
  e.preventDefault();
  searchQuery = queryInput.value.trim()
  searchHandler(searchQuery)
  
})
/*
if(search){
  searchHandler(search)
}else{
  getAllRecipeCardData()
}
*/
async function searchHandler(searchQuery){
  if(searchQuery){
    filterRecipes(searchQuery)
    /*
    url.searchParams.set("searchQuery", searchQuery)
    
    localStorage.setItem("searchQuery", searchQuery)
    const searchResult = await getAllRecipeCardDataWithTag(searchQuery)
    fillRecipeCards(searchResult)
    const li = document.createElement('li')
    let a = document.createElement('a')
    a.href = `../html/recipeIndex.html?searchQuery=${searchQuery}`
    a.innerText = searchQuery
    li.appendChild(a)
    
    breadcrumb.appendChild(li)
    queryInput.value = ''*/
  }
}

// Function to filter and display recipes based on search term
async function filterRecipes(searchQuery) {

  const searchResult = await getAllRecipeCardDataWithTag(searchQuery)
    fillRecipeCards(searchResult)
  

}




fillRecipeCards(jsonAllRecipesData)

async function fillRecipeCards(jsonRecipesData){
  
  console.dir(jsonRecipesData)
  cards.innerHTML = ''

  const newCards = jsonRecipesData.map((recipe) => {
    
    let a = document.createElement('a')
    a.href = `../html/recipeTemplate.html?recipeId=${recipe.id}`
    const newCard = document.createElement('div')
    newCard.id = recipe.id;
    newCard.classList.add('card')

    const heading = document.createElement('h2')
    heading.innerText = recipe.recipeTitle

    const thumbnail = document.createElement('img')
    thumbnail.setAttribute('src', recipe.thumbnailRelPath)
    thumbnail.classList.add('thumbnail')
    thumbnail.setAttribute('alt', recipe.imgAlt)

    newCard.appendChild(heading)
    newCard.appendChild(thumbnail)
    a.appendChild(newCard)
    //newCard.addEventListener('click', cardClickHandler)
    console.dir(newCard)
    return a
  })
  cards.replaceChildren(...newCards)
  
}

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
