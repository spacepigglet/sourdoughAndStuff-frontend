import {getAllRecipeCardData, getAllRecipeCardDataWithTag} from "./fetchRecipes.js"
//import { addBreadcrumb, restoreBreadcrumbs, saveBreadcrumbs, clearBreadcrumbAfter } from "./breadcrumb.js";
const jsonAllRecipesData = await getAllRecipeCardData()
window.onload = restoreBreadcrumbs;
/*const url = new URL(location.href)
const search = url.searchParams.get('searchQuery')
*/
/*const storageSearch = localStorage.getItem('searchQuery')*/

const queryInput = document.getElementById("query")
console.dir(queryInput)
const recipeWidget = document.getElementById("#recipe-widget")

const cards = document.querySelector(".cards")
//query.addEventListener('input', searchHandler)

const form = document.getElementById('search-form')
const breadcrumbElem = document.querySelector('.breadcrumb-nav>ul')




form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const searchQuery = queryInput.value.trim()
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
  
  // Add search term to breadcrumbs
  clearBreadcrumbAfter('all-recipes');
  addBreadcrumb(searchQuery, `search-${searchQuery}`);
  //saveBreadcrumbs();  
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

function addBreadcrumb(name, category) {
  const breadcrumbItem = document.createElement('li');
  const link = document.createElement('a');
  link.href = "#";
  link.textContent = name;
  link.dataset.category = category;

  link.addEventListener('click', (event) => {
      event.preventDefault();
      navigateToCategory(category);
  });

  /*
  if (breadcrumbElem.children.length > 0) {
      breadcrumbElem.innerHTML += " > ";
  }*/

  breadcrumbItem.appendChild(link);
  breadcrumbElem.appendChild(breadcrumbItem);
  saveBreadcrumbs();  // Save breadcrumb state
}

// Save breadcrumb trail to localStorage
function saveBreadcrumbs() {
  const breadcrumbs = Array.from(breadcrumbElem.children)
      
      .map(item => ({
          name: item.textContent,
          category: item.dataset.category
      }));
  localStorage.setItem('breadcrumbs', JSON.stringify(breadcrumbs));
}
/*
export function saveBreadcrumbs(breadcrumbElem) {
  const breadcrumbs = Array.from(breadcrumbElem.children).map(item => ({
      name: item.textContent,
      category: item.dataset.category
  }));
  localStorage.setItem('breadcrumbs', JSON.stringify(breadcrumbs));
}*/

// Restore breadcrumb trail from localStorage
function restoreBreadcrumbs() {
  const savedBreadcrumbs = JSON.parse(localStorage.getItem('breadcrumbs') || '[]');
  breadcrumbElem.innerHTML = ''; // Clear existing breadcrumbs

  if (savedBreadcrumbs.length === 0) {
    // If no breadcrumbs are saved, show "All Recipes" by default
    navigateToCategory('all-recipes');
} else {
  //breadcrumbElem.innerHTML = '';
  savedBreadcrumbs.forEach(crumb => {
    addBreadcrumb(crumb.name, crumb.category);

    // If the last breadcrumb is a search term, filter the recipes
    if (crumb.category.startsWith('search-')) {
        const searchTerm = crumb.category.replace('search-', '');
        filterRecipes(searchTerm);
    } else if (crumb.category === 'all-recipes') {
        navigateToCategory('all-recipes');
    }
  })
}
}


// Function to navigate to a category (based on breadcrumb click)
async function navigateToCategory(category) {
  if (category.startsWith('search-')) {
    const searchTerm = category.replace('search-', '');
    filterRecipes(searchTerm);
} else if (category === 'all-recipes') {
    // Reset to all recipes view
    fillRecipeCards(jsonAllRecipesData)
    clearBreadcrumbAfter('all-recipes');
}

  console.log("Navigating to:", category);
  
}

// Function to clear the breadcrumb trail after a certain point
function clearBreadcrumbAfter(category) {
  const breadcrumbs = Array.from(breadcrumbElem.children);
  const index = breadcrumbs.findIndex(item => item.firstElementChild && item.firstElementChild.dataset.category === category);

  // Always keep "All recipes"
  const allRecipesBreadcrumb = breadcrumbs.find(item => item.firstElementChild && item.firstElementChild.dataset.category === 'all-recipes');
  
  // Clear all breadcrumbs after the specified category
  if (index !== -1) {
      const itemsToKeep = breadcrumbs.slice(0, index + 1);
      breadcrumbElem.innerHTML = ''; // Clear all breadcrumbs

      // Ensure "All recipes" is always the first breadcrumb
      if (allRecipesBreadcrumb) {
          breadcrumbElem.appendChild(allRecipesBreadcrumb);
      }

      itemsToKeep.forEach(item => {
          if (item !== allRecipesBreadcrumb) { // Avoid appending "All recipes" twice
              breadcrumbElem.appendChild(item);
          }
      });
  } else {
      // If category is not found, reset breadcrumbs to just "All recipes"
      breadcrumbElem.innerHTML = ''; 
      if (allRecipesBreadcrumb) {
          breadcrumbElem.appendChild(allRecipesBreadcrumb);
      }
  }

  saveBreadcrumbs();  // Save state
}