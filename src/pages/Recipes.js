import React, { useState, useMemo } from 'react';
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
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const { data: recipes, isLoading, isError } = useQuery('recipes', getAllRecipes);

  const createMutation = useMutation(createRecipe, {
    onSuccess: () => {
      queryClient.invalidateQueries('recipes');
      setNewRecipe({ name: '', image_src: '', steps: [], ingredients: [], prep_time_min: 0, recipe_type: '', active: true });
      setIsAddRecipeCardVisible(false);
    }
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (type) => {
    setFilter(type);
  };

  const filteredRecipes = useMemo(() => {
    return recipes?.data?.filter((recipe) =>
      (filter === 'All' || recipe.recipe_type === filter) &&
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [recipes, filter, searchTerm]);

  const handleOpenAddRecipeCard = () => {
    setIsAddRecipeCardVisible(true);
  };

  const handleCloseAddRecipeCard = () => {
    setIsAddRecipeCardVisible(false);
  };

  const handleShowRecipeCard = (recipe) => {
    setSelectedRecipe(recipe);
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
    <div key={recipe._id} className="recipe-element" onClick={() => handleShowRecipeCard(recipe)}>
      <div className="recipe-image-container">
        <img src={recipe.image_src} alt={recipe.name} className="recipe-image" />
        <div className="recipe-time">{recipe.prep_time_min} min</div>
      </div>
      <div className="recipe-info">
        <h3 className="recipe-title">{recipe.name}</h3>
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
        <button onClick={handleOpenAddRecipeCard} className="add-recipe-button">
          Add Recipe +
        </button>
        <div className="filter-buttons">
          {['All', 'Breakfast', 'Dinner', 'Salads', 'Desserts', 'Soups'].map((type) => (
            <button
              key={type}
              onClick={() => handleFilterChange(type)}
              className={`filter-button ${filter === type ? 'active' : ''}`}
            >
              {type}
            </button>
          ))}
        </div>
      </header>
      {isAddRecipeCardVisible && (
        <AddRecipeCard
          onClose={handleCloseAddRecipeCard}
          onSave={handleCreate}
          newRecipe={newRecipe}
          handleChange={handleChange}
        />
      )}
      {selectedRecipe && (
        <RecipeCard
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
      <div className="recipes-grid">
        {recipeElements}
      </div>
    </div>
  );
}

export default RecipesPage;