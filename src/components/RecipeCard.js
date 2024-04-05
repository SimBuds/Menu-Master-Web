import React, { useState, useEffect } from 'react';
import '../assets/css/RecipeCard.css';

function RecipeCard({ recipe, onClose }) {
  const [editMode, setEditMode] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState(recipe);

  useEffect(() => {
    setEditedRecipe(recipe);
  }, [recipe]);

  if (!recipe) return null;

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleChange = (index, field, value) => {
    const updatedSteps = [...editedRecipe.steps];
    updatedSteps[index] = value;
    setEditedRecipe({ ...editedRecipe, steps: updatedSteps });
  };

  return (
    <div className="recipe-card-popup">
      <div className="recipe-card">
        <div className="recipe-card-header">
          <h2 className="recipe-card-title">{editedRecipe.name}</h2>
          <button className="recipe-card-close-btn" onClick={onClose}>X</button>
        </div>
        <div className="recipe-card-body">
          <img className="recipe-card-image" src={editedRecipe.image_src} alt={editedRecipe.name} />
          <div className="recipe-card-info">
            <div className="recipe-card-steps">
              <h3>Steps</h3>
              {editedRecipe.steps && editedRecipe.steps.map((step, index) => (
                <div key={index} className="recipe-card-step">
                  {editMode ? (
                    <input
                      type="text"
                      value={step}
                      onChange={(e) => handleChange(index, 'step', e.target.value)}
                      className="step-input"
                    />
                  ) : (
                    <span className="step">{step}</span>
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