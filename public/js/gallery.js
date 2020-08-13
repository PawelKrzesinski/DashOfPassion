const copyrights = document.getElementById('copyrights');
const gallery = document.querySelector('.main__gallery');
let date = new Date;
let year = date.getFullYear();
const scrollTop = document.getElementById('scroll__top');
const spices = document.querySelector('.spices__background')
copyrights.innerHTML = `&copy; Copyright ${year}, Dash of Passion!`
const blackBackground = document.querySelector('.black-transparent-background');

window.addEventListener('scroll', () => {
	if(spices.getBoundingClientRect().bottom < 200){
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
				const {id} = item;
				return{img, title, id};
			}) 		
			return recipes;
		} catch (error) {
			console.log(error);
		} 
	}
} 

class GalleryShow {
	galleryDisplay(recipes){
		console.log(recipes);
		let result = '';
		recipes.forEach(recipe => {
			result += `<img src=${recipe.img} class="images ${recipe.id}"/>`
		});
		gallery.innerHTML = result;
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const galleryImages = new Gallery();
	const galleryShow = new GalleryShow();
	galleryImages.getImages().then(recipes => {
		galleryShow.galleryDisplay(recipes);
		const images = document.querySelectorAll('.images');
		const imageBigger = document.querySelector('.image__bigger');
		const imageTitle = document.querySelector('.image__title')
		imageTitle.innerHTML = ' ';
		images.forEach(image => {
			image.addEventListener('click', e => {
				recipes.forEach(recipe => {
					if(e.target.classList == `images ${recipe.id}`){
						imageBigger.src = `${e.target.src}`
						imageTitle.innerHTML = `${recipe.title}`;
					}
		   })
				blackBackground.style.display = "flex";
				blackBackground.style.animation = "appear 0.3s linear";
				setTimeout( () => {
					imageBigger.style.animation = "appear 0.3s linear";
					imageBigger.style.opacity = "1";
				}, 300)
				blackBackground.style.opacity = "1";
			})
			
		})
		blackBackground.addEventListener('click', () => { 
			blackBackground.style.animation = "disappear 0.3s linear";
			blackBackground.style.opacity = "0";
			setTimeout(() => {blackBackground.style.display = "none"},300)
			
		})
	})
})


