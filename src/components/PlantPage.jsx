import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data))
      .catch((error) => console.error("Error fetching plants:", error));
  }, []);

  const addPlant = (newPlant) => {
    setPlants((previousPlants) => [newPlant, ...previousPlants]);
  };

  const togglePlantStatus = (plantId) => {
    setPlants((previousPlants) =>
      previousPlants.map((plant) => {
        if (plant.id !== plantId) return plant;

        const nextInStock = !(plant.inStock ?? true);
        return { ...plant, inStock: nextInStock };
      })
    );
  };

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={addPlant} />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PlantList plants={filteredPlants} onTogglePlant={togglePlantStatus} />
    </main>
  );
}

export default PlantPage;
