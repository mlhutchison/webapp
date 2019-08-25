import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe';


const App = () => {
  const APP_ID = '82357c12';
  const APP_KEY = '6c5f69cb2d25926d5499042456a310a0';
  var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  
  const [query, setQuery] = useState('chicken');
  var myUrl = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
 
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  

  useEffect( () => {
    getRecipes();    
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(proxyUrl + myUrl);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
    
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  return(
    <div className="App">

      <form onSubmit={getSearch} className="search-form">
        <input 
          className="search-bar" 
          type="text" 
          value={search}
          onChange={updateSearch}
          />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
    

    <div className="recipes">
      {recipes.map(recipe =>(
        <Recipe 
        key={recipe.recipe.label} 
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}/>
      ))}
    </div>
  </div>
  );
};


export default App;
