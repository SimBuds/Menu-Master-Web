import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getMenuById, updateMenu, getAllRecipes } from '../services/Mutations';
import '../assets/css/Menu.css';

function Menu() {
  const [searchTermRecipes, setSearchTermRecipes] = useState('');
  const [searchTermOnMenu, setSearchTermOnMenu] = useState('');
  const [previousMenuData, setPreviousMenuData] = useState(null);
  const queryClient = useQueryClient();
  const menuId = '65f8ab5d89e6e77ac7fb1083';

  const { data: recipesData, isLoading: isLoadingRecipes, isError: isErrorRecipes } = useQuery('recipes', getAllRecipes);
  const { data: menuData, isLoading: isLoadingMenu, isError: isErrorMenu } = useQuery(['menu', menuId], () => getMenuById(menuId));

  const updateMenuMutation = useMutation(updateMenu, {
    onSuccess: () => {
      queryClient.invalidateQueries(['menu', menuId]);
    },
    onError: (error) => {
      console.error('Error updating menu:', error);
    },
  });

  function constructMenuPayload(menuData, updatedItems) {
    if (!menuData.name || !menuData.restaurant_id || typeof menuData.food_profit !== 'number') {
      console.error('Menu data is missing required fields');
      return null;
    }
  
    return {
      name: menuData.name,
      restaurant_id: menuData.restaurant_id,
      food_profit: menuData.food_profit,
      items: updatedItems,
    };
  }

  const handleToggleMenu = async (recipeId, add) => {
    // Ensure menuData.data is valid and has an items array
    if (!menuData?.data) {
      console.error('Menu data is not available');
      return;
    }
  
    // Initialize items as an empty array if it's not an array
    const items = Array.isArray(menuData.data.items) ? menuData.data.items : [];
  
    let updatedItems = [...items];
  
    if (add) {
      // Check if the recipe is already in the menu
      const isItemExists = updatedItems.some(item => item.recipe_id === recipeId);
      if (!isItemExists) {
        // Find the recipe to add
        const recipeToAdd = recipesData.data.find(recipe => recipe._id === recipeId);
        if (recipeToAdd) {
          updatedItems.push({
            recipe_id: recipeId,
            price: recipeToAdd.price // Use recipe's price
          });
        } else {
          console.error('Recipe to add does not exist:', recipeToAdd);
        }
      }
    } else {
      // Remove the recipe if it exists in the menu
      updatedItems = updatedItems.filter(item => item.recipe_id !== recipeId);
    }
  
    // Console log for debugging
    console.log('Updated items to be sent to the server:', updatedItems);
  
    // Construct the payload
    const menuUpdatePayload = constructMenuPayload(menuData.data, updatedItems);
  
    // Console log for debugging
    console.log('Payload being sent to updateMenu function:', menuUpdatePayload);
  
    // Update the menu using the constructed payload
    if (menuUpdatePayload) {
      try {
        await updateMenuMutation.mutateAsync({ menuId, menuData: menuUpdatePayload });
        queryClient.invalidateQueries(['menu', menuId]);
      } catch (error) {
        console.error('Error updating menu:', error);
      }
    }
  };  

  const handleSave = () => {
    const savePayload = constructMenuPayload(menuData.data, menuData.data.items);
    if (savePayload) {
      updateMenuMutation.mutate({ menuId, menuData: savePayload });
    }
  };
    
  const handleUndo = () => {
    if (previousMenuData) {
      updateMenuMutation.mutate({ menuId, menuData: previousMenuData });
      setPreviousMenuData(null);
    }
  };

  if (isLoadingRecipes || isLoadingMenu) {
    return <div>Loading...</div>;
  }

  if (isErrorRecipes || isErrorMenu) {
    return <div>Error fetching data...</div>;
  }

  const mergedRecipes = recipesData?.data.map(recipe => ({
    ...recipe,
    onMenu: menuData?.data?.items ? menuData.data.items.some(item => item.recipe_id === recipe._id) : false,
  })) || [];

  const filteredRecipes = mergedRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTermRecipes.toLowerCase())
  );

  const onMenuRecipes = filteredRecipes.filter(recipe => recipe.onMenu && recipe.name.toLowerCase().includes(searchTermOnMenu.toLowerCase()));
  const offMenuRecipes = filteredRecipes.filter(recipe => !recipe.onMenu && recipe.name.toLowerCase().includes(searchTermRecipes.toLowerCase()));

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
            {offMenuRecipes.map(recipe => (
              <div key={recipe._id} className="list-group-item d-flex justify-content-between align-items-center">
                <img src={recipe.image} alt={recipe.name} className="recipe-image" />
                <span>{recipe.name}</span>
                <input type="checkbox" onChange={() => handleToggleMenu(recipe._id, true)} />
                <span>{recipe.price ? recipe.price.toFixed(2) : 'N/A'}</span> {/* Display recipe's price */}
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
            {onMenuRecipes.map(recipe => (
              <div key={recipe._id} className="list-group-item d-flex justify-content-between align-items-center">
                <img src={recipe.image} alt={recipe.name} className="recipe-image" />
                <span>{recipe.name}</span>
                <input type="checkbox" checked onChange={() => handleToggleMenu(recipe._id, false)} />
                <span>{recipe.price ? recipe.price.toFixed(2) : 'N/A'}</span> {/* Display recipe's price */}
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