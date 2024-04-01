// Users Api and Mutator

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

// Menu Api and Mutator

// Get All Menus
export async function getAllMenus() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/menu`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

// Update Menu
export async function updateMenu(menuId, menuData) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/menu/${menuId}`, {
        method: 'POST',
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