import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getMenuById, updateMenu, getAllRecipes } from '../services/Mutations';

function Menu() {
  const [searchTermRecipes, setSearchTermRecipes] = useState('');
  const [searchTermOnMenu, setSearchTermOnMenu] = useState('');
  const [previousMenuData, setPreviousMenuData] = useState(null); // To store previous menu state for undo functionality
  const queryClient = useQueryClient();
  const menuId = '65f8ab5d89e6e77ac7fb1083'; // Use the actual menu ID

  // Fetch all recipes
  const { data: recipesData, isLoading: isLoadingRecipes, isError: isErrorRecipes } = useQuery('recipes', getAllRecipes);

  // Fetch the current menu
  const { data: menuData, isLoading: isLoadingMenu, isError: isErrorMenu } = useQuery(['menu', menuId], () => getMenuById(menuId));

  // Mutation to update the menu
  const updateMenuMutation = useMutation(updateMenu, {
    onSuccess: () => {
      queryClient.invalidateQueries(['menu', menuId]);
    },
    onError: (error) => {
      console.error('Error updating menu:', error);
    },
  });

  // This function constructs the payload for updating the menu
  function constructMenuPayload(menuData, updatedItems) {
    if (!menuData.name || !menuData.restaurant_id || typeof menuData.food_profit !== 'number') {
      console.error('Menu data is missing required fields');
      return null;
    }
  
    return {
      name: menuData.name,
      restaurant_id: menuData.restaurant_id,
      food_profit: menuData.food_profit,
      items: updatedItems.map(item => ({
        recipe_id: item.recipe_id,
        price: item.price
      })),
    };
  }
  

  const handleToggleMenu = (recipeId) => {
    // Save the current menu data before making changes
    if (!previousMenuData) {
      setPreviousMenuData(menuData.data);
    }
  
    if (!menuData?.data || !Array.isArray(menuData.data.items)) {
      console.error('Invalid menu data', menuData);
      return;
    }
  
    const updatedItems = menuData.data.items.some(item => item.recipe_id === recipeId)
      ? menuData.data.items.filter(item => item.recipe_id !== recipeId) // Remove item
      : [...menuData.data.items, { 
          recipe_id: recipeId, 
          price: recipesData.data.find(recipe => recipe._id === recipeId)?.price 
        }]; // Add item
  
    // Make sure we have all necessary fields in the payload
    if (!menuData.data.name || !menuData.data.restaurant_id || typeof menuData.data.food_profit !== 'number') {
      console.error('Menu data is missing required fields');
      return;
    }
  
    const updatePayload = constructMenuPayload(menuData.data, updatedItems);
    if (updatePayload) {
      console.log('Payload before sending update:', updatePayload);
      updateMenuMutation.mutate({ menuId, menuData: updatePayload }, {
        onSuccess: (data) => {
          console.log('Response data after update:', data);
        },
        // Potentially you might also want to log or handle the error scenario
        onError: (error) => {
          console.error('Error after update:', error);
        }
      });  // This closing parenthesis was missing
    }
  };  

  const handleSave = () => {
    const savePayload = constructMenuPayload(menuData.data, menuData.data.items);
    if (savePayload) {
      updateMenuMutation.mutate({ menuId, menuData: savePayload });
    }
  };
    
  const handleUndo = () => {
    // Revert to the previous menu data
    if (previousMenuData) {
      updateMenuMutation.mutate({ menuId, menuData: previousMenuData });
      setPreviousMenuData(null); // Reset the previous menu data
    }
  };

  // Check for loading or error state
  if (isLoadingRecipes || isLoadingMenu) {
    return <div>Loading...</div>;
  }

  if (isErrorRecipes || isErrorMenu) {
    return <div>Error fetching data...</div>;
  }

  // Merge the recipes and menu data to determine which recipes are on the menu
  const mergedRecipes = recipesData?.data.map(recipe => ({
    ...recipe,
    onMenu: menuData?.data?.items ? menuData.data.items.some(item => item.recipe_id === recipe._id) : false,
  })) || [];

  // Filtered lists for UI
  const filteredRecipes = mergedRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTermRecipes.toLowerCase()) && !recipe.onMenu
  );

  const filteredOnMenu = mergedRecipes.filter(recipe =>
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
              <div key={recipe._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="form-check">
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    checked={recipe.onMenu}
                    onChange={() => handleToggleMenu(recipe._id)}
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
              <div key={recipe._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="form-check">
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    checked={recipe.onMenu}
                    onChange={() => handleToggleMenu(recipe._id)}
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
        <button className="btn btn-secondary" onClick={handleUndo}>Undo</button>
        <button className="btn btn-success" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default Menu;