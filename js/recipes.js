const copyrights = document.getElementById('copyrights');
let date = new Date;
let year = date.getFullYear();
copyrights.innerHTML = `&copy; Copyright ${year}, Dash of Passion!`
const recipesCard = document.querySelector('.recipes');
const recipes = [];


fetch("https://edamam-recipe-search.p.rapidapi.com/search?q=chicken", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "edamam-recipe-search.p.rapidapi.com",
		"x-rapidapi-key": "742c3e4d47msh13052978aa4cb25p129a2fjsn1c21c1c5ad9c"
	}
})
.then(response => {
	const data = response.json();
	return data;
}).then(data => {
	console.log(data);
	
	const recipes = Array.from(data.hits);
	console.log(recipes);
	let result = ' ';
	recipes.forEach(recipe => {
		const recipeImg = recipe.recipe.image;
		const recipeName = recipe.recipe.label;
		const recipeURL = recipe.recipe.url;
		const recipeCalories = recipe.recipe.calories;
		result += `
		<div class="recipe__box">
				<div class="recipe__image"><a href="${recipeURL}" target=__blank"><img src='${recipeImg}'/></a></div>
				<div class="recipe__description">
					<h5 class="recipe__title">${recipeName}</h5> 
					<h6>Total Calories: ${Math.round(recipeCalories)} kCal</h6>
					<h6>Check the recipe <a href="${recipeURL}" target=__blank"><b>>HERE<</b></a></h6>
				</div>
			</div>
		`
	})
	recipesCard.innerHTML = result;
	const descArray = Array.from(document.querySelectorAll('.recipe__description'));
	const backgrounds = [
		['rgb(198, 198, 198)'],
		['rgb(216, 216, 216)'],
		['rgb(240, 240, 240)'],
		['rgb(232, 232, 232)'],
		['rgb(223, 223, 223)'],
		['rgb(203, 203, 203)']
	]

	function randomBackground(){
		descArray.forEach(desc => {
			desc.style.background = backgrounds[Math.floor(Math.random() * backgrounds.length)]
		});
	}
	randomBackground();

	})
	.catch(err => {
		console.log(err);
});



