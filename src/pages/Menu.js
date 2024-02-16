import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Mock data for recipes
const recipesData = [
  { id: 1, name: 'Demi Glace', onMenu: false },
  { id: 2, name: 'Creme Brulee', onMenu: false },
  { id: 3, name: 'Chicken Stock', onMenu: false },
  // ... other recipes
];

function Menu() {
    const [recipes, setRecipes] = useState(recipesData);
    const [searchTermRecipes, setSearchTermRecipes] = useState('');
    const [searchTermOnMenu, setSearchTermOnMenu] = useState('');

    // Toggle recipe presence on the menu
    const handleToggleMenu = (id) => {
        setRecipes(recipes.map(recipe =>
        recipe.id === id ? { ...recipe, onMenu: !recipe.onMenu } : recipe
        ));
    };

    // Assuming you want to filter recipes based on search term and onMenu status
    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTermRecipes.toLowerCase()) && !recipe.onMenu
    );

    const filteredOnMenu = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTermOnMenu.toLowerCase()) && recipe.onMenu
    );

    return (
        <div className="container mt-3">
          <h1 className="text-center mb-4">Menu</h1>
          <div className="row">
            <div className="col-md-6">
              <h2>Recipes</h2>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Search..."
                value={searchTermRecipes}
                onChange={(e) => setSearchTermRecipes(e.target.value)}
              />
              <div className="list-group">
                {filteredRecipes.map(recipe => (
                  <div key={recipe.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <input
                        className="form-check-input me-1"
                        type="checkbox"
                        checked={recipe.onMenu}
                        onChange={() => handleToggleMenu(recipe.id)}
                      />
                      {recipe.name}
                    </div>
                    <button className="btn btn-outline-primary btn-sm">Show recipe</button>
                  </div>
                ))}
              </div>
            </div>
    
            <div className="col-md-6">
              <h2>On Menu</h2>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Search..."
                value={searchTermOnMenu}
                onChange={(e) => setSearchTermOnMenu(e.target.value)}
              />
              <div className="list-group">
                {filteredOnMenu.map(recipe => (
                  <div key={recipe.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <input
                        className="form-check-input me-1"
                        type="checkbox"
                        checked={recipe.onMenu}
                        onChange={() => handleToggleMenu(recipe.id)}
                      />
                      {recipe.name}
                    </div>
                    <button className="btn btn-outline-primary btn-sm">Show recipe</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
    
          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-secondary">Undo</button>
            <button className="btn btn-success">Save</button>
          </div>
        </div>
      );
    }

export default Menu;