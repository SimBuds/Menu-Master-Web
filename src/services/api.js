import axios from 'axios';

const API_BASE_URL = 'http://170.187.155.55:27041';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// User Services
export const getUsers = async () => {
  return apiClient.get('/user/');
};

export const registerUser = async (userData) => {
  return apiClient.post('/user/register', userData);
};

export const loginUser = async (credentials) => {
  return apiClient.post('/user/login', credentials);
};

// Restaurant Services
export const getRestaurants = async () => {
  return apiClient.get('/restaurant/');
};

// Menu Services
export const getMenu = async (menuId) => {
  return apiClient.get(`/menu/${menuId}`);
};

export const updateMenu = async (menuId, menuData) => {
  return apiClient.post(`/menu/${menuId}`, menuData);
};

// Recipe Services
export const getRecipes = async () => {
  return apiClient.get('/recipe/');
};

export const addNewRecipe = async (recipeData) => {
  return apiClient.post('/recipe/', recipeData);
};

export const updateRecipe = async (recipeId, recipeData) => {
  return apiClient.put(`/recipe/${recipeId}`, recipeData);
};

export const deleteRecipe = async (recipeId) => {
  return apiClient.delete(`/recipe/${recipeId}`);
};

// Prep List Services
export const getPrepLists = async () => {
  return apiClient.get('/preplist/');
};

export const addNewPrepList = async (prepListData) => {
  return apiClient.post('/preplist/', prepListData);
};

export const getPrepListById = async (prepListId) => {
  return apiClient.get(`/preplist/${prepListId}`);
};

export const updatePrepList = async (prepListId, prepListData) => {
  return apiClient.put(`/preplist/${prepListId}`, prepListData);
};

export const deletePrepList = async (prepListId) => {
  return apiClient.delete(`/preplist/${prepListId}`);
};

// Ingredient Services
export const getIngredientById = async (ingredientId) => {
  return apiClient.get(`/ingredient/${ingredientId}`);
};

export const createNewIngredient = async (ingredientData) => {
  return apiClient.post('/ingredient', ingredientData);
};

export const updateIngredient = async (ingredientId, ingredientData) => {
  return apiClient.put(`/ingredient/${ingredientId}`, ingredientData);
};

export const deleteIngredient = async (ingredientId) => {
  return apiClient.delete(`/ingredient/${ingredientId}`);
};

// Inventory Services
export const getInventory = async () => {
  return apiClient.get('/inventory');
};

export const createNewInventory = async (inventoryData) => {
  return apiClient.post('/inventory', inventoryData);
};

export const updateInventory = async (inventoryId, inventoryData) => {
  return apiClient.put(`/inventory/${inventoryId}`, inventoryData);
};

// Product Order Services
export const getRestaurantOrders = async (restaurantId) => {
  return apiClient.get(`/productorder/${restaurantId}`);
};

export const createRestaurantOrder = async (orderData) => {
  return apiClient.post('/productorder', orderData);
};

export const deleteRestaurantOrder = async (restaurantId) => {
  return apiClient.delete(`/productorder/${restaurantId}`);
};