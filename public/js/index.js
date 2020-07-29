const desc = document.querySelectorAll('.recipe__description')
const descArray = Array.from(desc);
const copyrights = document.getElementById('copyrights')
const randomGallery = document.querySelectorAll('.recipe__image')
const scrollTop = document.getElementById('scroll__top');
const displayGallery = document.querySelector('.display__gallery')
let date = new Date;
let year = date.getFullYear();
copyrights.innerHTML = `&copy; Copyright ${year}, Dash of Passion!`


window.addEventListener('scroll', () => {
	if(displayGallery.getBoundingClientRect().bottom < 500){
		scrollTop.style.display = 'flex';
	} else {
		scrollTop.style.display = 'none';
	}
})




class Gallery {
	async getImages(){
		try{
			let result = await fetch("js/recipes.json")
			let data = await result.json();
			let recipes = data.items;
			recipes = recipes.map(item => {
				const {img} = item;
				const {title} = item;
				const {description} = item;
				return{img, title, description};
			}) 		
			return recipes;
		} catch (error) {
			console.log(error);
		} 
	}
} 

class GalleryShow {
	galleryDisplay(recipes){
		let usedRecipes = [];	
		randomGallery.forEach(recipe => {
			let randomIndex = Math.floor(Math.random() * recipes.length);
			let randomRecipe = recipes[randomIndex];
			if(recipes.length === 0){
				recipes = [...usedRecipes];
				usedRecipes = [];
			} else {
				let result = `<img class='random__recipes' src=${randomRecipe.img} />`;
				recipe.innerHTML = result;
				let usedRecipe = recipes.splice(randomIndex, 1);
				usedRecipes.push(usedRecipe);
			}
		})
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const galleryImages = new Gallery();
	const galleryShow = new GalleryShow();
	
	galleryImages.getImages().then(recipes => {
		galleryShow.galleryDisplay(recipes);
	}) 
})



const backgrounds = [
	['rgb(198, 198, 198)'],
	['rgb(216, 216, 216)'],
	['rgb(171, 171, 171)'],
	['rgb(232, 232, 232)'],
	['rgb(185, 185, 185)'],
	['rgb(203, 203, 203)']
]

function randomBackground(){
	descArray.forEach(desc => {
		desc.style.background = backgrounds[Math.floor(Math.random() * backgrounds.length)]
	});
}
randomBackground();











































// async function getCaloriesValue() {
// 	try {
// 		let result = await fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/9263/information?amount=100&unit=gram", {
// 			"method": "GET",
// 			"headers": {
// 				"x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
// 				"x-rapidapi-key": "742c3e4d47msh13052978aa4cb25p129a2fjsn1c21c1c5ad9c"
// 			}
// 		})
// 		let data = await result.json();

// 		return console.log(data);
	
	
// 	} catch(err) {
// 		console.log(err);
// 	};
// }
// getCaloriesValue();




