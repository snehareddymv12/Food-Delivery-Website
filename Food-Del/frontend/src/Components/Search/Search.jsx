import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from '../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';


const SearchResults = () => {
    //   const { searchTerm } = useParams();
    //   const [searchResults, setSearchResults] = useState([]);

    //   useEffect(() => {
    //     const fetchResults = async () => {
    //       try {
    //         const response = await axios.get(`/api/food/search/${searchTerm}`);
    //         if (response.data.success) {
    //           setSearchResults(response.data.data);
    //         } else {
    //           console.error('Search failed:', response.data.message);
    //         }
    //       } catch (error) {
    //         console.error('An error occurred:', error);
    //       }
    //     };

    //     fetchResults();
    //   }, [searchTerm]);

    //   return (
    //     <div>
    //       <h2>Search Results for "{searchTerm}"</h2>
    //       <div>
    //         {searchResults.length > 0 ? (
    //           <ul>
    //             {searchResults.map((food) => (
    //               <li key={food._id}>
    //                 <h3>{food.name}</h3>
    //                 <p>{food.description}</p>
    //                 <p>Price: ${food.price}</p>
    //                 <p>Category: {food.category}</p>
    //                 <img src={`/uploads/${food.image}`} alt={food.name} width="100" />
    //               </li>
    //             ))}
    //           </ul>
    //         ) : (
    //           <p>No results found</p>
    //         )}
    //       </div>
    //     </div>
    //   );


    const { food_search_list } = useContext(StoreContext);


    return (
        <div className='food-display' id='food-display'>
           
            <div className='food-display-list'>
                {food_search_list.map((item) => {
                    return (
                        <FoodItem
                            key={item._id}
                            id={item._id}
                            name={item.name}
                            image={item.image}
                            price={item.price}
                            description={item.description}
                        />
                    );
                })}
            </div>
        </div>
    );

};

export default SearchResults;
