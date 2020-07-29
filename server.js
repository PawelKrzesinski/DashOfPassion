const express = require('express');
const app = express();
const fetch = require('node-fetch');
require('dotenv').config();
const API_KEY = process.env.API_KEY;
const port = process.env.PORT || 3100;
app.listen(port, () => console.log('listening at 3100'));
app.use(express.static('public'));
app.use(express.json({ limit: "1mb"}));


app.post('/data', async (request, response) => {
	const data = await request.body;
	const gotData = data.categoryChoice;
	const category = gotData;
	console.log(category);
	const url = `https://edamam-recipe-search.p.rapidapi.com/search?q=${category}&from=0&to=100`
	const fetch_response = await fetch(url, {headers: {"x-rapidapi-key": API_KEY}});
	const json = await fetch_response.json();
	response.json(json);
})
