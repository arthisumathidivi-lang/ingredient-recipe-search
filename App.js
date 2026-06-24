import React, { useState } from "react";
import "./App.css";

function App() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [noResult, setNoResult] = useState(false);

  const searchRecipes = async () => {
    if (ingredient.trim() === "") return;

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );

    const data = await response.json();

    if (data.meals) {
      setRecipes(data.meals);
      setNoResult(false);
      setSelectedRecipe(null);
    } else {
      setRecipes([]);
      setSelectedRecipe(null);
      setNoResult(true);
    }
  };

  const viewRecipe = async (id) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );

    const data = await response.json();
    setSelectedRecipe(data.meals[0]);
  };

  return (
    <div className="container">
      <h1>🍲 Recipe Search</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter ingredient..."
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />

        <button onClick={searchRecipes}>Search</button>
      </div>

      {noResult && <h2>No recipes found.</h2>}

      <div className="recipe-list">
        {recipes.map((recipe) => (
          <div className="card" key={recipe.idMeal}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <h3>{recipe.strMeal}</h3>
            <button onClick={() => viewRecipe(recipe.idMeal)}>
              View Details
            </button>
          </div>
        ))}
      </div>

      {selectedRecipe && (
        <div className="details">
          <h2>{selectedRecipe.strMeal}</h2>

          <img
            src={selectedRecipe.strMealThumb}
            alt={selectedRecipe.strMeal}
          />

          <h3>Category: {selectedRecipe.strCategory}</h3>

          <h3>Area: {selectedRecipe.strArea}</h3>

          <h3>Instructions</h3>

          <p>{selectedRecipe.strInstructions}</p>
        </div>
      )}
    </div>
  );
}

export default App;