import {getAllRecipeCardDataWithTag} from 'fetchRecipes.js'

const url = new URL('index.js')
const queryInput = document.getElementById("query")


const cards = document.querySelector(".cards")
//query.addEventListener('input', searchHandler)

const form = document.getElementById('search-form')
const breadcrumbElem = document.querySelector('.breadcrumb-nav>ul')




form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchQuery = queryInput.value.trim()
  searchHandler(searchQuery)
  
})

async function searchHandler(searchQuery){
  if(searchQuery){
    filterRecipes(searchQuery)
    
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
    queryInput.value = ''
  }
}

async function navigateToRecipeIndex(searchQuery) {
  
    filterRecipes(searchTerm);
} else if (category === 'all-recipes') {
    // Reset to all recipes view
    fillRecipeCards(jsonAllRecipesData)
    clearBreadcrumbAfter('all-recipes');
}