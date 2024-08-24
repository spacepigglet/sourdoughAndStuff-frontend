export function createBreadcrumb(breadcrumb, searchQuery, recipeName){
  const breadcrumbUl = document.createElement('ul')
  const allRecipesUrl = '../html/recipeIndex.html'
  searchQuery = searchQuery || undefined
  recipeName = recipeName || undefined;

  const allRecipesLi = makeLi(allRecipesUrl, 'All recipes')
  breadcrumbUl.appendChild(allRecipesLi)

  if(searchQuery){
    const queryLi = makeLi(`${allRecipesUrl}?searchQuery=${searchQuery}`, searchQuery)
    breadcrumbUl.appendChild(queryLi)
  }

  if(recipeName){
    //link is not necessary, as a recipe title will only show up on the breadcrumb navigation while on the recipe page itself
    const recipeLi = makeLi('#', recipeName)
    breadcrumbUl.appendChild(recipeLi)
  }
  
  breadcrumb.replaceChildren(breadcrumbUl)
}

//create a list element containing a link
function makeLi(url, innertext){
  const a = document.createElement('a')
  a.href = url
  a.innerText = innertext
  const li = document.createElement('li')
  li.appendChild(a);

  return li
}