import React, { useState, useEffect } from 'react';
import { getAllMenus, updateMenu } from '../services/Mutations';

function Menu() {
    const [searchTermRecipes, setSearchTermRecipes] = useState('');
    const [searchTermOnMenu, setSearchTermOnMenu] = useState('');
    const [menus, setMenus] = useState([]);
    const [recipes, setRecipes] = useState([]); // Add this line

    // Fetch menu data from the backend
    useEffect(() => {
      const fetchMenus = async () => {
          try {
              const menusData = await getAllMenus();
              setMenus(menusData.data);
              setRecipes(menusData.data[0].items); // Set the recipes state variable
          } catch (error) {
              console.error('Failed to fetch menus:', error);
          }
      };

      fetchMenus();
  }, []);

    // Toggle recipe presence on the menu
    const handleToggleMenu = async (id) => {
      const updatedMenus = menus.map(menu => {
          const updatedItems = menu.items.map(item =>
              item.recipe_id === id ? { ...item, onMenu: !item.onMenu } : item
          );
          return { ...menu, items: updatedItems };
      });
  
      setMenus(updatedMenus);
  
      // Loop over each menu and update it in the backend
      for (const menu of updatedMenus) {
          try {
              await updateMenu(menu._id, { items: menu.items });
          } catch (error) {
              console.error(`Failed to update menu ${menu._id}:`, error);
          }
      }
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