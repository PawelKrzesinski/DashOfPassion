const copyrights = document.getElementById('copyrights');
let date = new Date;
let year = date.getFullYear();
copyrights.innerHTML = `&copy; Copyright ${year}, Dash of Passion!`
