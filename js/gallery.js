const copyrights = document.getElementById('copyrights');
const gallery = document.querySelector('.main__gallery');
let date = new Date;
let year = date.getFullYear();
const scrollTop = document.getElementById('scroll__top');
const spices = document.querySelector('.spices__background')
copyrights.innerHTML = `&copy; Copyright ${year}, Dash of Passion!`


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
		let result = ' ';
		recipes.forEach(recipe => {
			result += `
			<img src=${recipe.img} class='images'/>
			`
		});
		gallery.innerHTML = result;
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const galleryImages = new Gallery();
	const galleryShow = new GalleryShow();
	
	galleryImages.getImages().then(recipes => {
		galleryShow.galleryDisplay(recipes);
	}) 
})
