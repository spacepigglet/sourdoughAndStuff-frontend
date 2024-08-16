
/*const url = 'https://f14f567f-6b95-4937-8d8e-eb56ebca532b-00-2xuxw8xz84y4j.spock.replit.dev/api/v1/recipes/';*/
const url = 'https://f14f567f-6b95-4937-8d8e-eb56ebca532b-00-2xuxw8xz84y4j.spock.replit.dev:3000/api/v1/recipes/'
/*const url = 'https://sourdoughandstuff-backend.onrender.com/api/v1/recipes/'*/
/*const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '73c1747928mshfdf4635e0ea7f4dp15952bjsncefecd3260dd',
		'x-rapidapi-host': 'food-ingredient-measurement-conversion.p.rapidapi.com'
	}
};*/

/*
export async function getAllRecipeCardData(){
	try {
		const response = await fetch(url+ "all"); //,options
		//const result = await response.text();
		console.log(response);
		return response.json();
	} catch (error) {
		console.error(error);
	}
}*/

export async function getAllRecipeCardData(){
	const responseJson = await get(url + "all")
	return extractRecipeCardData(responseJson)
}

export async function getAllRecipeCardDataWithTag(tag){
	const responseJson = await get(url + "tag/" + tag)
  return extractRecipeCardData(responseJson)
}

function extractRecipeCardData(jsonData){
	console.log("jsonData")
	console.dir(jsonData)
	return jsonData.map((recipe) => ({
		id: recipe._id,
    recipeTitle: recipe.recipeTitle,
    thumbnailRelPath: recipe.thumbnailImgRelPath ?? 'https://baconmockup.com/300/200',
		imgAlt: recipe.imgAlt
  }))
}

export async function getRecipe(recipeId){
  return get(url + recipeId);
}

async function get(url){
  try {
		const response = await fetch(url); //,options
		//const result = await response.text();
		console.log(response);
		return response.json();
	} catch (error) {
		console.error(error);
	}
}