// Users Api and Mutator
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

export async function getUsers() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/user`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

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