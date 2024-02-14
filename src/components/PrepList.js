import React from 'react';
import Button from './common/Button';

function PrepList() {
  return (
    <div className="prep-list">
      <h2>Prep</h2>
      {/* ... list of prep items ... */}
      <Button text="Sell All" onClick={() => {/* ... */}} />
    </div>
  );
}

export default PrepList;
