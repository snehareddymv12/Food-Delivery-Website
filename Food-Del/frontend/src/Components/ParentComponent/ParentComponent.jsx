import React, { useState, useRef } from 'react';
import ExploreMenu from '../../Components/ExploreMenu'
import FoodDisplay from '../../Components/FoodDisplay'
const ParentComponent = () => {
    const [category, setCategory] = useState("All");
    const foodDisplayRef = useRef(null);

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        if (foodDisplayRef.current) {
            foodDisplayRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <ExploreMenu category={category} setCategory={handleCategoryChange} />
            <div ref={foodDisplayRef}>
                <FoodDisplay category={category} />
            </div>
        </div>
    );
}

export default ParentComponent;
