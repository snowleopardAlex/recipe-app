import React, {useEffect, useState} from "react";
import Recipe from "./Recipe";
import './App.css';

const App = () => {

  // API from edaman
  const APP_ID = "ebbb45d8";
  const APP_KEY = "d79e517c5bf092bb0dd5c52a760a9425";

  const [recipes, setRecipes] = useState([]);
  // the state for the search
  const [search, setSearch] = useState('');
  // the state for the query
  const [query, setQuery] = useState('chicken');

  // hook - executes the code that needs to happen during lifecycle of the component
  // instead of on specific user interactions or DOM events. 
  // Effects are when our app reacts with the outside world, like with an API. It 
  // allows us to run a function based on whether something changed.
  // It allows to combine componentDidMount and componentDidUpdate
  // It runs asynchronously and after a render is painted to the screen.
  // You can't run hook before render. useEffect is the only hook that is meant for trying in to
  // the component lifecycle, it only ever runs after render. 
  
  useEffect(() => {
    getRecipes();
  }, [query]);

  // call to the API to fetch data
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  // updating search
  const updateSearch = e => {
    setSearch(e.target.value);
  }

  // setting query
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input 
          value={search}
          onChange={updateSearch}
          className="search-bar" 
          type="text" 
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
