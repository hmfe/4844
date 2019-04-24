const makeApiCall = (query) => {
    const headers = new Headers({
        "X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "X-RapidAPI-Key": "637b361f36msha0cab258f965845p10cbb3jsnb194de10b442",
    });

    return fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/autocomplete?number=10&query=${query}`,  {   
            method: 'GET',
            headers: headers
    })
            .then(response => response.json())
            .then(json => json.map((res) => res)) 
}

const fetchRecepies = async (searchString) => {
    const data = await makeApiCall(searchString)
    return data;
}

export { fetchRecepies };