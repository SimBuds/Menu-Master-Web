import React, { useState, useMemo } from 'react';
import RecipeCard from '../components/RecipeCard';
import AddRecipeCard from '../components/AddRecipeCard';
import '../assets/css/Recipes.css';

function RecipesPage() {
  const [newRecipe, setNewRecipe] = useState({
    id: 0,
    name: '',
    image_src: '',
    steps: [],
    ingredients: [],
    prep_time_min: 0,
    recipe_type: '',
    active: true
  });
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: 'Ceviche',
      image_src: require('../assets/images/ceviche.jpg'),
      steps: ['Step 1: Cut the fish', 'Step 2: Mix with lime', 'Step 3: Add onions', 'Step 4: Serve cold'],
      ingredients: ['Fish', 'Lime', 'Onions'],
      prep_time_min: 30,
      recipe_type: 'Dinner'
    },
    {
      id: 2,
      name: 'Creme Brulee',
      image_src: require('../assets/images/creme.jpg'),
      steps: ['Step 1: Mix ingredients', 'Step 2: Bake', 'Step 3: Cool down', 'Step 4: Serve with caramelized sugar on top'],
      ingredients: [],
      prep_time_min: 10,
      recipe_type: 'Desserts',
      active: true
    },
    {
      id: 3,
      name: 'Demi',
      image_src: require('../assets/images/demi.jpg'),
      steps: ['Step 1: Roast bones', 'Step 2: Add vegetables', 'Step 3: Simmer', 'Step 4: Strain and reduce'],
      ingredients: [],
      prep_time_min: 20,
      recipe_type: 'All',
      active: true
    },
    {
      id: 4,
      name: 'Mashed Potatoes',
      image_src: require('../assets/images/mashed.jpg'),
      steps: ['Step 1: Boil potatoes', 'Step 2: Drain water', 'Step 3: Mash potatoes', 'Step 4: Add butter and milk'],
      ingredients: [],
      prep_time_min: 62,
      recipe_type: 'All',
      active: true
    },
    {
      id: 5,
      name: 'Tiramisu',
      image_src: require('../assets/images/tiramisu.jpg'),
      steps: ['Step 1: Mix mascarpone', 'Step 2: Dip ladyfingers in coffee', 'Step 3: Layer ladyfingers and mascarpone', 'Step 4: Chill and serve'],
      ingredients: [],
      prep_time_min: 60,
      recipe_type: 'Desserts',
      active: true
    },
    {
      id: 6,
      name: 'Beef Stroganoff',
      image_src: require('../assets/images/beef-stroganoff.jpg'),
      steps: ['Step 1: Sear beef', 'Step 2: Cook onions and mushrooms', 'Step 3: Add cream', 'Step 4: Serve with rice'],
      ingredients: [],
      prep_time_min: 40,
      recipe_type: 'Dinner',
      active: true
    },
    {
      id: 7,
      name: 'Mushroom Risotto',
      image_src: require('../assets/images/mushroom-risotto.jpg'),
      steps: ['Step 1: Sautee mushrooms', 'Step 2: Cook rice with broth', 'Step 3: Add mushrooms', 'Step 4: Serve with parmesan'],
      ingredients: [],
      prep_time_min: 20,
      recipe_type: 'Dinner',
      active: true
    },
    {
      id: 8,
      name: 'Chicken Parmesan',
      image_src: require('../assets/images/chicken-parmesan.jpg'),
      steps: ['Step 1: Bread chicken', 'Step 2: Fry chicken', 'Step 3: Top with sauce and cheese', 'Step 4: Bake until cheese is melted'],
      ingredients: [],
      prep_time_min: 30,
      recipe_type: 'Dinner',
      active: true
    }
  ]);
  const [isAddRecipeCardVisible, setIsAddRecipeCardVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (type) => {
    setFilter(type);
  };

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) =>
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
  

  const handleCreate = (newRecipeData) => {
    const newId = recipes.length > 0 ? Math.max(...recipes.map(r => r.id)) + 1 : 1;
    setRecipes([...recipes, { ...newRecipeData, id: newId }]);
    setNewRecipe({ id: newId, name: '', image_src: '', steps: [], ingredients: [], prep_time_min: 0, recipe_type: '', active: true });
    setIsAddRecipeCardVisible(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  const recipeElements = filteredRecipes.map((recipe) => (
    <div key={recipe.id} className="recipe-card" onClick={() => handleShowRecipeCard(recipe)} tabIndex={0}>
      <div className="recipe-image-container">
        <img src={recipe.image_src} alt={recipe.name} className="recipe-image" />
        <div className="recipe-time">{recipe.prep_time_min} min</div>
      </div>
      <div className="recipe-info">
        <h3 className="recipe-title">{recipe.name}</h3>
        <button className="recipe-show-button">Show more</button>
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
              tabIndex={0}
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
        <div className="row">
          {recipeElements}
        </div>
      </div>
    </div>
  );
}

export default RecipesPage;