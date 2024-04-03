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

// Menu Api and Mutators
// Get Menu by ID
export async function getMenuById(menuId) {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/menu/${menuId}`);
        const responseData = await response.json();
        if (!response.ok || !Array.isArray(responseData.data)) {
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
export async function updateMenu({ menuId, menuData }) {
    const url = `${process.env.REACT_APP_API_URL}/menu/${menuId}`;
    try {
        if (!menuData) {
            throw new Error('Menu data is missing');
        }
        const response = await fetch(url, {
            method: 'PUT',
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

        if (responseData.code !== 200 || responseData.data !== true) {
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
    const response = await fetch(`${process.env.REACT_APP_API_URL}/inventory`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ingredient_id: inventoryData.ingredient_id,
            stock: inventoryData.stock
        }),
    });

    const responseData = await response.json();

    if (!response.ok) {
        const error = new Error(`Failed to create inventory: HTTP status ${response.status}`);
        error.responseData = responseData;
        throw error;
    }

    if (!responseData || !responseData.data) {
        throw new Error('Failed to create inventory: No response data');
    }

    return responseData.data;
}