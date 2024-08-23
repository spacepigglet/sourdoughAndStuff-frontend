
const url = 'https://sourdoughandstuff-backend.onrender.com/api/v1/recipes/'

export async function getAllRecipeCardData(){
	const responseJson = await get(url + "all")
	return extractRecipeCardData(responseJson)
}

export async function getAllRecipeCardDataWithTag(tag){
	const responseJson = await get(url + "tag/" + tag)
  return extractRecipeCardData(responseJson)
}

function extractRecipeCardData(jsonData){
	return jsonData.map((recipe) => ({
		id: recipe._id,
    recipeTitle: recipe.recipeTitle,
    thumbnailRelPath: recipe.thumbnailImgRelPath ?? '../img/logo/webp/sourdough--stuff-logo-round-small.webp',
		imgAlt: recipe.imgAlt
  }))
}

export async function getRecipe(recipeId){
  return get(url + recipeId);
}

async function get(url){
  try {
		const response = await fetch(url);
		return response.json();
	} catch (error) {
		console.error(error);
	}
}