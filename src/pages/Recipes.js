import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAllRecipes, createRecipe } from '../services/Mutations';
import RecipeCard from '../components/RecipeCard';
import AddRecipeCard from '../components/AddRecipeCard';
import '../assets/css/Recipes.css';

function RecipesPage() {
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    image_src: '',
    steps: [],
    ingredients: [],
    prep_time_min: 0,
    recipe_type: '',
    active: true
  });
  const queryClient = useQueryClient();
  const [isAddRecipeCardVisible, setIsAddRecipeCardVisible] = useState(false);
  const [isRecipeCardVisible, setIsRecipeCardVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const { data: recipes, isLoading, isError } = useQuery('recipes', getAllRecipes);

  const createMutation = useMutation(createRecipe, {
    onSuccess: () => {
      queryClient.invalidateQueries('recipes');
      setNewRecipe({ name: '', image_src: '', steps: [], ingredients: [], prep_time_min: 0, recipe_type: '', active: true });
    }
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRecipes = recipes?.data?.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAddRecipeForm = () => {
    setIsAddRecipeCardVisible(true);
  };

  const handleShowRecipeCard = (recipe) => {
    if (recipe) {
      setSelectedRecipe(recipe);
      setIsRecipeCardVisible(true);
    }
  };

  const handleCloseAddRecipeCard = () => {
    setIsAddRecipeCardVisible(false);
  };

  const handleCloseRecipeCard = () => {
    setIsRecipeCardVisible(false);
    setSelectedRecipe({});
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      await createMutation.mutateAsync(newRecipe);
    } catch (error) {
      console.error('Error creating recipe', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching recipes: Kind: missing field `product_yield`, labels: {}</div>;
  }

  const recipeElements = filteredRecipes?.map((recipe) => (
    <div key={recipe._id} className="recipe-element">
      <div className="recipe-image-container">
        <img src={recipe.image_src} alt={recipe.name} className="recipe-image" />
        <div className="recipe-time">{recipe.prep_time_min} min</div>
      </div>
      <div className="recipe-info">
        <h3 className="recipe-title">{recipe.name}</h3>
        <button onClick={() => handleShowRecipeCard(recipe)} className="recipe-show-button" aria-haspopup="dialog">View Recipe</button>
      </div>
    </div>
  ));

  return (
    <div className="container mt-3">
      <header className="recipes-header">
        <h1>Recipes</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
        <button onClick={handleOpenAddRecipeForm} className="add-recipe-button">
          Add Recipe +
        </button>
      </header>
      {isAddRecipeCardVisible && (
        <AddRecipeCard
          onClose={handleCloseAddRecipeCard}
          onSave={handleCreate}
          newRecipe={newRecipe}
          handleChange={handleChange}
        />
      )}
      {isRecipeCardVisible && (
        <RecipeCard
          recipe={selectedRecipe}
          onClose={handleCloseRecipeCard}
        />
      )}
      <div className="recipes-grid">
        {recipeElements}
      </div>
    </div>
  );
}

export default RecipesPage;