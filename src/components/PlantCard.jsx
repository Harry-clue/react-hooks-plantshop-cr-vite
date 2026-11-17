import React from "react";

function PlantCard({ plant, onTogglePlant }) {
  const isInStock = plant.inStock ?? true;

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {isInStock ? (
        <button className="primary" onClick={() => onTogglePlant(plant.id)}>
          In Stock
        </button>
      ) : (
        <button onClick={() => onTogglePlant(plant.id)}>Out of Stock</button>
      )}
    </li>
  );
}

export default PlantCard;
