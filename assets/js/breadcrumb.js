
export function createBreadcrumb(searchQuery, recipeName){
  const breadcrumb = document.createElement('ul')
  const allRecipesUrl = '../html/recipeIndex.html'
  searchQuery = searchQuery || undefined
  recipeName = recipeName || undefined;

  const allRecipesLi = makeLi(allRecipesUrl, 'All recipes')
  breadcrumb.appendChild(allRecipesLi)

  if(searchQuery){
    const queryLi = makeLi(`${allRecipesUrl}?searchQuery=${searchQuery}`, searchQuery)
    breadcrumb.appendChild(queryLi)
  }

  if(recipeName){
    const recipeLi = makeLi('#', recipeName)
    breadcrumb.appendChild(recipeLi)
  }
  
  return breadcrumb
}

function makeLi(url, innertext){
  const a = document.createElement('a')
  a.href = url
  a.innerText = innertext
  const li = document.createElement('li')
  li.appendChild(a);

  return li
}