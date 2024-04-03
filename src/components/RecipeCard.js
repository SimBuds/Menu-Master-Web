import React, { useState } from 'react';
import '../assets/css/RecipeCard.css';

function RecipeCard({ recipe, onClose }) {
  const [editMode, setEditMode] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState(recipe);

  if (!recipe) return null;

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleChange = (index, field, value) => {
    const updatedIngredients = [...editedRecipe.ingredients];
    updatedIngredients[index] = { ...updatedIngredients[index], [field]: value };
    setEditedRecipe({ ...editedRecipe, ingredients: updatedIngredients });
  };

  return (
    <div className="recipe-card-popup">
      <div className="recipe-card">
        <div className="recipe-card-header">
          <h2 className="recipe-card-title">{editedRecipe.name}</h2>
          <button className="recipe-card-close-btn" onClick={onClose}>X</button>
        </div>
        <div className="recipe-card-body">
          <img className="recipe-card-image" src={editedRecipe.image_src || 'default-image.png'} alt={editedRecipe.name} />
          <div className="recipe-card-info">
            <p className="recipe-card-type"><strong>Type:</strong> {editedRecipe.recipe_type}</p>
            <p className="recipe-card-prep-time"><strong>Preparation Time:</strong> {editedRecipe.prep_time_min} min</p>
            <div className="recipe-card-ingredients">
              <h3>Ingredients</h3>
              {editedRecipe.ingredients && editedRecipe.ingredients.map((ingredient, index) => (
                <div key={index} className="recipe-card-ingredient">
                  {editMode ? (
                    <>
                      <input
                        type="text"
                        value={ingredient.name}
                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                        className="ingredient-name-input"
                      />
                      <input
                        type="number"
                        value={ingredient.quantity}
                        onChange={(e) => handleChange(index, 'quantity', parseFloat(e.target.value))}
                        className="ingredient-quantity-input"
                      />
                      <select
                        value={ingredient.measure_unit}
                        onChange={(e) => handleChange(index, 'measure_unit', e.target.value)}
                        className="ingredient-measure-unit-select"
                      >
                        <option value="lbs">lbs</option>
                        <option value="unit">unit</option>
                        <option value="tsp">tsp</option>
                      </select>
                      <input
                        type="number"
                        value={ingredient.cost}
                        onChange={(e) => handleChange(index, 'cost', parseFloat(e.target.value))}
                        className="ingredient-cost-input"
                      />
                    </>
                  ) : (
                    <>
                      <span className="ingredient-name">{ingredient.name}</span>
                      <span className="ingredient-quantity">{ingredient.quantity} {ingredient.measure_unit}</span>
                      <span className="ingredient-cost">{formatCurrency(ingredient.cost)}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="recipe-card-footer">
          {editMode ? (
            <button className="recipe-card-save-btn" onClick={handleSave}>Save</button>
          ) : (
            <button className="recipe-card-edit-btn" onClick={handleEdit}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
