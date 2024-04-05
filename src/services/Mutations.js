// Users Api and Mutators
// Login
export async function loginUser({ username, password }) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return response.json();
  }

// Get All Users
export async function getUsers() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/user`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

// Register User
export async function registerUser(userData) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/user/register`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Failed to register user');
    }

    return response.json();
}

// Restaurants Api and Mutator
// Get All Restaurants
export async function getAllRestaurants() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/restaurant/`);
    const responseData = await response.json();

    if (!response.ok || !Array.isArray(responseData.data)) {
        throw new Error(responseData.message || 'Failed to fetch restaurants: Data is not an array');
    }

    return responseData;
}

// Menu Api and Mutators
// Get Menu
export async function getMenu() {
    const menuId = "65f8954489e6e77ac7fb1027";
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/menu/${menuId}`);
        const responseData = await response.json();
        if (!response.ok || !Array.isArray(responseData.data) || responseData.data.length === 0) {
            console.error('An error occurred while fetching the menu:', response.statusText);
            throw new Error('Failed to fetch menu');
        }
        return responseData;
    } catch (error) {
        console.error("An error occurred while fetching the menu:", error);
        throw error;
    }
}

// Update Menu
export async function updateMenu(menuData) {
    const menuId = "65f8ab5d89e6e77ac7fb1083";
    const url = `${process.env.REACT_APP_API_URL}/menu/${menuId}`;
    try {
        if (!menuData || !Array.isArray(menuData.items) || menuData.items.length === 0) {
            throw new Error('Menu data is missing or invalid');
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(menuData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Server returned an error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const responseData = await response.json();

        if (responseData.code !== 200 || !Array.isArray(responseData.data) || responseData.data.length === 0) {
            throw new Error('Failed to update menu: ' + (responseData.message || 'Unexpected response data'));
        }

        return responseData;
    } catch (error) {
        console.error("An error occurred while updating the menu:", error);
        throw error;
    }
}

// Recipe Api and Mutators
// Get Recipes
export async function getAllRecipes() {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/recipe/`);
        const responseData = await response.json();

        if (!Array.isArray(responseData.data)) {
            throw new Error(responseData.message || 'Failed to fetch recipes: Data is not an array');
        }

        return responseData;
    } catch (error) {
        console.error("An error occurred while fetching the recipes:", error);
        throw error;
    }
}

// Create Recipes
export async function createRecipe(recipeData) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/recipe/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
    });
    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.message || `Failed to create recipe: HTTP status ${response.status}`);
    }
    return responseData;
}

// Update Recipes
export async function updateRecipe(recipeId, recipeData) {
    const encodedRecipeId = encodeURIComponent(recipeId);
    const url = `${process.env.REACT_APP_API_URL}/recipe/${encodedRecipeId}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
    });
    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.message || `Failed to update recipe: HTTP status ${response.status}`);
    }
    return responseData;
}

// Delete Recipes
export async function deleteRecipe(recipeId) {
    const encodedRecipeId = encodeURIComponent(recipeId);
    const url = `${process.env.REACT_APP_API_URL}/recipe/${encodedRecipeId}`;
    const response = await fetch(url, {
        method: 'DELETE'
    });
    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.message || `Failed to delete recipe: HTTP status ${response.status}`);
    }
    return responseData;
}

// Inventory API and Mutators
// Get All Inventory
export async function getAllInventory() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/inventory/`);
    const responseData = await response.json();
    if (!response.ok || !responseData) {
        throw new Error(`Failed to fetch inventory: HTTP status ${response.status}`);
    }    
    return responseData;
}

// Update Inventory
export async function updateInventory(inventoryData) {
    const url = `${process.env.REACT_APP_API_URL}/inventory`;
    console.log('Sending update request to:', url);
    console.log('Payload:', inventoryData);
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inventoryData),
    });
    const responseData = await response.json();
    console.log('Response:', responseData);
    if (!response.ok || responseData.data !== true) {
        console.error('Update inventory failed:', response.status, responseData.message);
        throw new Error(responseData.message || `Failed to update inventory: HTTP status ${response.status}`);
    } 
    return responseData;
}

// Create New Inventory
export async function createInventory(inventoryData) {
    const url = `${process.env.REACT_APP_API_URL}/inventory`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inventoryData),
        });

        if (!response.ok) {
            // If the server responds with a status code that is not in the 2xx range
            const errorResponse = await response.json();
            console.error(`Error ${response.status}: `, errorResponse);
            throw new Error(`Failed to create inventory: HTTP status ${response.status}`);
        }

        // If the server response is ok, parse and return the response as JSON
        const jsonResponse = await response.json();
        console.log('Inventory item created:', jsonResponse.data);
        return jsonResponse;
    } catch (error) {
        console.error('Error during inventory creation:', error);
        throw error;
    }
}

// In Mutations.js
export async function getIngredientById(ingredientId) {
    const restaurantId = "65f8954489e6e77ac7fb1027"; // The static restaurant ID
    const url = `${process.env.REACT_APP_API_URL}/ingredient/${restaurantId}?id=${ingredientId}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        // Handle non-2xx responses here
        console.error(`Network response was not ok (${response.status})`);
        return null; // Return null or appropriate error handling
      }
      return await response.json();
    } catch (error) {
      console.error('Error in getIngredientById:', error);
      return null; // Return null or appropriate error handling
    }
}