

const cards = document.querySelector(".cards")

export function addBreadcrumb(breadcrumbElem, name, category) {
  const breadcrumbItem = document.createElement('a');
  breadcrumbItem.href = "#";
  breadcrumbItem.textContent = name;
  breadcrumbItem.dataset.category = category;

  breadcrumbItem.addEventListener('click', (event) => {
      event.preventDefault();
      navigateToCategory(category);
  });

  if (breadcrumbElem.children.length > 0) {
      breadcrumbElem.innerHTML += " > ";
  }

  breadcrumbElem.appendChild(breadcrumbItem);
  saveBreadcrumbs();  // Save breadcrumb state
}

// Save breadcrumb trail to localStorage
export function saveBreadcrumbs(breadcrumbElem) {
  const breadcrumbs = Array.from(breadcrumbElem.children)
      .filter(item => item.tagName === 'A')
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
export function restoreBreadcrumbs(bread) {
  const savedBreadcrumbs = JSON.parse(localStorage.getItem('breadcrumbs') || '[]');
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


// Function to navigate to a category (based on breadcrumb click)
function navigateToCategory(category) {
  if (category.startsWith('search-')) {
    const searchTerm = category.replace('search-', '');
    filterRecipes(searchTerm);
} else if (category === 'all-recipes') {
    // Reset to all recipes view
    cards.innerHTML = "<div>All Recipes Content</div>";
    clearBreadcrumbAfter('all-recipes');
}

  console.log("Navigating to:", category);
  
}

// Function to clear the breadcrumb trail after a certain point
function clearBreadcrumbAfter(breadcrumbElem, category) {
  const breadcrumbs = Array.from(breadcrumbElem.children);
  const index = breadcrumbs.findIndex(item => item.dataset.category === category);
  if (index !== -1) {
    breadcrumbElem.innerHTML = '';
      breadcrumbs.slice(0, index + 1).forEach(item => breadcrumbElem.appendChild(item));
  }
}