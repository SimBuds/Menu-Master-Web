import React from 'react';
import '../assets/css/AddRecipeCard.css';

function AddRecipeCard({ onClose, onSave, newRecipe, handleChange, handleIngredientChange }) {
  const handleSave = (event) => {
    event.preventDefault();
    onSave(newRecipe);
  };

  return (
    <div className="recipe-card-popup">
      <div className="recipe-card">
        <div className="recipe-card-header">
          <h2 className="recipe-card-title">Add Recipe</h2>
          <button onClick={onClose} className="recipe-card-close-btn">X</button>
        </div>
        <form onSubmit={handleSave} className="recipe-card-body">
          <input
            type="text"
            name="name"
            placeholder="Recipe Name"
            value={newRecipe.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="image_src"
            placeholder="Image URL"
            value={newRecipe.image_src}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="prep_time_min"
            placeholder="Preparation Time (minutes)"
            value={newRecipe.prep_time_min}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="recipe_type"
            placeholder="Recipe Type"
            value={newRecipe.recipe_type}
            onChange={handleChange}
            required
          />
          {newRecipe.ingredients.map((ingredient, index) => (
            <div key={index}>
              <input
                type="text"
                name="ingredient_id"
                placeholder="Ingredient ID"
                value={ingredient.ingredient_id}
                onChange={(e) => handleIngredientChange(index, 'ingredient_id', e.target.value)}
                required
              />
              <input
                type="text"
                name="measure_unit"
                placeholder="Measure Unit"
                value={ingredient.measure_unit}
                onChange={(e) => handleIngredientChange(index, 'measure_unit', e.target.value)}
                required
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, 'quantity', parseFloat(e.target.value))}
                required
              />
              <input
                type="number"
                name="cost"
                placeholder="Cost"
                value={ingredient.cost}
                onChange={(e) => handleIngredientChange(index, 'cost', parseFloat(e.target.value))}
                required
              />
              <input
                type="number"
                name="product_yield"
                placeholder="Product Yield"
                value={ingredient.product_yield}
                onChange={(e) => handleIngredientChange(index, 'product_yield', parseFloat(e.target.value))}
                required
              />
            </div>
          ))}
          <button type="submit" className="recipe-card-save-btn">Save</button>
        </form>
      </div>
    </div>
  );
}

export default AddRecipeCard;
