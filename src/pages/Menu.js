import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getMenuById, updateMenu, getAllRecipes } from '../services/Mutations';

function Menu() {
    const [searchTermRecipes, setSearchTermRecipes] = useState('');
    const [searchTermOnMenu, setSearchTermOnMenu] = useState('');
    const [recipes, setRecipes] = useState([]);
    const queryClient = useQueryClient();

    // Fetch menu and recipes
    useEffect(() => {
      const fetchRecipes = async () => {
        try {
          const allRecipes = await getAllRecipes();
          setRecipes(allRecipes);
        } catch (error) {
          console.error('Failed to fetch recipes:', error);
        }
      };

      fetchRecipes();
    }, []);

    const menuId = '65f8ab5d89e6e77ac7fb1083'; // Replace with actual menu ID

    const { data: menu } = useQuery(['menu', menuId], () => getMenuById(menuId), {
      onSuccess: (data) => {
        console.log('Menu fetched successfully:', data);
      },
      onError: (error) => {
        console.error('Error fetching menu:', error);
      }
    });

    const updateMenuMutation = useMutation(updateMenu, {
      onSuccess: () => {
        queryClient.invalidateQueries(['menu', menuId]);
      },
      onError: (error) => {
        console.error('Error updating menu:', error);
      },
    });

    const handleToggleMenu = (recipeId) => {
      const updatedRecipes = recipes.map(recipe =>
        recipe._id === recipeId ? { ...recipe, onMenu: !recipe.onMenu } : recipe
      );
      setRecipes(updatedRecipes);

      // Construct the updated items list
      const updatedItems = menu.items.map(item =>
        item.recipe_id === recipeId ? { ...item, onMenu: !item.onMenu } : item
      );

      // Trigger the mutation to update the menu
      updateMenuMutation.mutate({ id: menuId, data: { items: updatedItems } });
    };

    // Filtered recipes for UI
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