const copyrights = document.getElementById('copyrights');
const date = new Date;
const year = date.getFullYear();
const recipesCard = document.querySelector('.recipes');
const categories = Array.from(document.querySelectorAll('.recipe__category'));
const categoriesContainer = document.querySelector('.category__container');
const goBackBtn = document.querySelector('.go__back');
const header = document.querySelector('.recipes__header');
const scrollTop = document.getElementById('scroll__top');
const input = document.getElementById('input__search');
const searchBtn = document.getElementById('search__button');
const amountChoiceBtns = Array.from(document.querySelectorAll('.amount__choice'))
const amountChoiceActive = document.querySelector('.amount__choice--active')
const recipePages = document.querySelector('.recipe__pages');
let amountChoice = parseInt(amountChoiceActive.value);
let from;
let to;
let result = ' ';

function chooseRecipeAmount(){
	amountChoiceBtns.forEach(button => {
		button.addEventListener('click', e => {
			if(e.target.className === "amount__choice"){
				amountChoiceBtns.forEach(button =>{button.classList.remove("amount__choice--active")});
				e.target.classList = "amount__choice amount__choice--active";
				amountChoice = parseInt(e.target.value);
			}
			
		})
	})
	return amountChoice;
}
chooseRecipeAmount();




input.addEventListener('keyup', (event) => {
	if(event.keyCode === 13){
		const url = `https://edamam-recipe-search.p.rapidapi.com/search?q=${input.value}`;	
		fetch(url , {
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "edamam-recipe-search.p.rapidapi.com",
				"x-rapidapi-key": `${API_KEY}`
			}
		})
		.then(response => {
			const data = response.json();
			return data;
		}).then(data => {
			const recipes = Array.from(data.hits);	
			let result = ' ';
			recipes.forEach(recipe => {
				const recipeImg = recipe.recipe.image;
				const recipeName = recipe.recipe.label;
				const recipeURL = recipe.recipe.url;
				const recipeCalories = recipe.recipe.calories;
				const recipeSource = recipe.recipe.source;
				result += `
					<div class="recipe__box">
							<div class="recipe__image"><a href="${recipeURL}" target=__blank"><img src='${recipeImg}'/></a></div>
							<div class="recipe__description">
								<h5 class="recipe__title">${recipeName}</h5> 
								<h6>Total Calories: ${Math.round(recipeCalories)} kCal</h6>
								<h6>Check the recipe <a href="${recipeURL}" target=__blank"><b>>HERE<</b></a></h6>
								<h6>Recipe Source: ${recipeSource} </h6>
								</div>
						</div>
					`
			})
			recipesCard.innerHTML = result;
			randomBackground();
			categoriesContainerDisappear();
			setTimeout(recipesCardAppear(), 
			setTimeout(goBackBtnAppear(), 550)
			, 500);
			input.value = "";
		})
		.catch(err => {
			console.log(err);
		});	
				
	}
})


window.addEventListener('scroll', () => {
	if(header.getBoundingClientRect().bottom < 200){
		scrollTop.style.display = 'flex';
	} else {
		scrollTop.style.display = 'none';
	}
})



categories.forEach(category => {
	category.addEventListener('click', () => {
	getRecipes(category);
	categoriesContainerDisappear();
	setTimeout(recipesCardAppear(), 
	setTimeout(goBackBtnAppear(), 550)
	, 500);
	})
})

goBackBtn.addEventListener('click', () => {
	recipesCardDisappear();
	goBackBtnDisappear();
	setTimeout(categoriesContainerAppear(), 500);
})

function getRecipes(category){
	const categorySearch = category.alt;
	let data = {
		categoryChoice: categorySearch
	}
	let options = {
		method: 'POST',
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		},
		body: JSON.stringify(data)
	}
	const promise = fetch('/data', options);
	promise.then(response => {
		if(!response.ok){
			console.error(response)
		} else {
			return response.json();
		}
	}).then(result => {
		 console.log(result);
		 const data = result;
		 return data;
	}).then(data => {
		console.log(data)
		let recipes = Array.from(data.hits);	
		let newRecipes = [];
		recipes.forEach(item => {
			let recipe = {
				"image" : item.recipe.image,
				"name" : item.recipe.label,
				"URL" : item.recipe.url,
				"calories" : item.recipe.calories,
				"source" : item.recipe.source
			}
			newRecipes.push(recipe);
			return newRecipes;
		})

		function createAllButtons(){
		const amountOfPages = 100/parseInt(amountChoice);	
		for(let i = 0;i < amountOfPages; i++){
			createButton();
			let num = 1;
			const recipePagesBtns = document.querySelectorAll('.recipe__page')
			recipePagesBtns.forEach(button => {
				button.innerHTML = num;	
				num++;
			})
		}}

		createAllButtons();
		let currentPage = document.querySelector('.recipe__page-active').innerHTML;
		currentPage--;
		function createRecipe(newRecipes){
			let start = amountChoice * currentPage;
			let end = start + amountChoice;
			let recipesArray = newRecipes.slice(start, end);
			console.log(recipesArray);
			recipesArray.forEach(recipe => {
				result += `
				<div class="recipe__box">
						<div class="recipe__image"><a href="${recipe.URL}" target=__blank"><img src='${recipe.image}'/></a></div>
						<div class="recipe__description">
							<h5 class="recipe__title">${recipe.name}</h5> 
							<h6>Total Calories: ${Math.round(recipe.calories)} kCal</h6>
							<h6>Check the recipe <a href="${recipe.URL}" target=__blank"><b>>HERE<</b></a></h6>
							<h6>Recipe Source: ${recipe.source} </h6>
							</div>
					</div>
				`
		})	

		function removeRecipes(){
			const recipeBoxes = document.querySelectorAll('.recipe__box');
			recipeBoxes.forEach(box => {
				box.parentNode.removeChild(box)
			})
		}
		
		const recipePagesBtns = document.querySelectorAll('.recipe__page')
		function changePage(){
			recipePagesBtns.forEach(button => { button.addEventListener('click', (e) => {
				removeRecipes();
				recipePagesBtns.forEach(button => {button.classList.remove("recipe__page-active")});
				e.target.classList.add('recipe__page-active');
				currentPage = e.target.innerHTML;
				createRecipe(newRecipes);
			})})
		}
		
		changePage();
		
		
		
		recipesCard.innerHTML = result;
		randomBackground();
	}
	createRecipe(newRecipes);
	
	})
	.catch(err => {
		console.log(err);
	});	
}



function createButton(){
	const pages = document.createElement('div');
	pages.className = "recipe__page";
	document.querySelector('.recipe__pages').appendChild(pages);
	document.querySelector('.recipe__pages').firstElementChild.classList.add('recipe__page-active');
}

function recipesCardDisappear(){
	recipesCard.style.animation = "disappear 0.5s linear";
	recipesCard.style.display = "none";
}
function recipesCardAppear(){
	recipesCard.style.animation = "appear 0.5s linear";
	recipesCard.style.display = "grid"
}
function categoriesContainerDisappear(){
	categoriesContainer.style.animation = "disappear 0.5s linear";
	categoriesContainer.style.display = "none"
}
function categoriesContainerAppear(){
	categoriesContainer.style.animation = "appear 0.5s linear";
	categoriesContainer.style.display = "grid"
}

function goBackBtnDisappear(){
	goBackBtn.style.display = 'none';
}
function goBackBtnAppear(){
	goBackBtn.style.display = 'block';
}

function randomBackground(){
	const descArray = Array.from(document.querySelectorAll('.recipe__description'));
	const backgrounds = [
		['rgb(198, 198, 198)'],
		['rgb(216, 216, 216)'],
		['rgb(240, 240, 240)'],
		['rgb(232, 232, 232)'],
		['rgb(223, 223, 223)'],
		['rgb(203, 203, 203)']
	];

	descArray.forEach(desc => {
		desc.style.background = backgrounds[Math.floor(Math.random() * backgrounds.length)]
	});
}


copyrights.innerHTML = `&copy; Copyright ${year}, Dash of Passion!`