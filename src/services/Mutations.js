// Users Apis and Mutators
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

// Menu Apis and Mutators
// Get Menu by ID
export async function getMenuById(menuId) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/menu/${menuId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch menu');
    }
    return response.json();
}

// Update Menu
export async function updateMenu(menuId, menuData) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/menu/${menuId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuData),
    });

    if (!response.ok) {
        throw new Error('Failed to update menu');
    }

    return response.json();
}

// Recipe Apis and Mutators
// Get Recipes
export async function getAllRecipes() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/recip/e`);
    if (!response.ok) {
        throw new Error('Failed to fetch recipe');
    }
    return response.json();
}