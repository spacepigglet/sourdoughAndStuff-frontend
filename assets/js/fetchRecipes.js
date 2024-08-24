
const url = 'https://sourdoughandstuff-backend.onrender.com/api/v1/recipes/'

export async function getAllRecipeCardData(){
	const responseJson = await fetchRecipes(url + "all")
	return extractRecipeCardData(responseJson)
}

export async function getAllRecipeCardDataWithTag(tag){
	const responseJson = await fetchRecipes(url + "tag/" + tag)
  return extractRecipeCardData(responseJson)
}

function extractRecipeCardData(jsonData){
	//complete recipes are not needed for the recipe cards.
	//Relevant info is extracted.
	return jsonData.map((recipe) => ({
		id: recipe._id,
    recipeTitle: recipe.recipeTitle,
    thumbnailRelPath: recipe.thumbnailImgRelPath ?? '../img/logo/sourdough--stuff-topLogo_small.webp',
		imgAlt: recipe.imgAlt ?? 'Sourdough & Stuff logo'
  }))//in case no image is availabe, a default image is set
}

export async function getRecipe(recipeId){
  return fetchRecipes(url + recipeId);
}

async function fetchRecipes(url){
  try {
		const response = await fetch(url);
		return response.json();
	} catch (error) {
		console.error(error);
	}
}