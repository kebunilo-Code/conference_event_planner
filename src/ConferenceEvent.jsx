import React, { useState } from "react";
import "./ConferenceEvent.css";
import TotalCost from "./TotalCost";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "./venueSlice";
//brings methods from avSlice.js
import { incrementAvQuantity, decrementAvQuantity } from "./avSlice";
import { toggleMealSelection } from "./mealsSlice";
const ConferenceEvent = () => {
    const [showItems, setShowItems] = useState(false);
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    // variable pulls infromation and methods from venueSlice.js
    const venueItems = useSelector((state) => state.venue);
    // variable pulls infromation and methods from avSlice.js
    const avItems = useSelector((state) => state.av);
    const dispatch = useDispatch();
    //As the name describes, it calculates the remaning number of seats wihin the venue
    const remainingAuditoriumQuantity = 3 - venueItems.find(item => item.name === "Auditorium Hall (Capacity:200)").quantity;
    // variable pulls infromation and methods from mealsSlice.js
    const mealsItems = useSelector((state) => state.meals);
    
    const handleToggleItems = () => {
        console.log("handleToggleItems called");
        setShowItems(!showItems);
    };

    // Handles the Increase in quantity of tickets for the venue
    const handleAddToCart = (index) => {
        //If the name within venue is "Auditorium Hall (Capacity:200)" and the qunatity is greater then 3, it returns to the function that called it
        if (venueItems[index].name === "Auditorium Hall (Capacity:200)" && venueItems[index].quantity >= 3) {
          return; 
        }
        //Runs if the stated if statement is not true
        dispatch(incrementQuantity(index));
      };

      //Similar to the handleAddToCart, but it decreases the quantity
      const handleRemoveFromCart = (index) => {
        if (venueItems[index].quantity > 0) {
          dispatch(decrementQuantity(index));
        }
      };
    //uses the dispact keyword to utilize the methods found in avSlice 
    const handleIncrementAvQuantity = (index) => {
        dispatch(incrementAvQuantity(index));
    };

    const handleDecrementAvQuantity = (index) => {
        dispatch(decrementAvQuantity(index));
    };
    //If the checkbox is selected with the mealForPeople variable passed
    //The function will pass both the item, as well as the number of people ordiernig the item
    //else it passes nothin but the item selected
    const handleMealSelection = (index) => {
        const item = mealsItems[index];
        if (item.selected && item.type === "mealForPeople"){
            //makes sure that if the user does not pass a value, the number of people is set to zero
            const newNumberOfPeople = item.selected ? numberOfPeople : 0;
            dispatch(toggleMealSelection(index, newNumberOfPeople));
        }
        else {
            dispatch(toggleMealSelection(index));
        }
    };

    const getItemsFromTotalCost = () => {
        const items = [];
    };

    const items = getItemsFromTotalCost();

    const ItemsDisplay = ({ items }) => {

    };

    //Calculates the total cost of the room when the increase'+' or Decrease'-' buttons are pressed
    //Inside of the Venue room Section
    const calculateTotalCost = (section) => {
        let totalCost = 0;
        if (section === "venue") {
          //forEach function peforms the stated method for each entry in the array 'venueItems'
          venueItems.forEach((item) => {
            totalCost += item.cost * item.quantity;
          });
        }
        else if (section === "av") {
            //forEach function peforms the stated method for each entry in the array 'avItems'
            avItems.forEach((item) => {
              totalCost += item.cost * item.quantity;
            });
          } 
        else if (section === "meals"){
            //forEach function peforms the stated method for each entry in the array 'mealsItems'
            mealsItems.forEach((item) => {
                if (item.selected){
                    totalCost += item.cost * numberOfPeople;
                }
            });
          }
        return totalCost;
      };

    //Automatically Calculates the total cost of each of the diffrent values that are called
    const venueTotalCost = calculateTotalCost("venue");
    const avTotalCost = calculateTotalCost("av");
    const mealTotalCost = calculateTotalCost("meals");

    const navigateToProducts = (idType) => {
        if (idType == '#venue' || idType == '#addons' || idType == '#meals') {
          if (showItems) { // Check if showItems is false
            setShowItems(!showItems); // Toggle showItems to true only if it's currently false
          }
        }
      }

    return (
        <>
            <navbar className="navbar_event_conference">
                <div className="company_logo">Conference Expense Planner</div>
                <div className="left_navbar">
                    <div className="nav_links">
                        <a href="#venue" onClick={() => navigateToProducts("#venue")} >Venue</a>
                        <a href="#addons" onClick={() => navigateToProducts('#addons')}>Add-ons</a>
                        <a href="#meals" onClick={() => navigateToProducts('#meals')}>Meals</a>
                    </div>
                    <button className="details_button" onClick={() => setShowItems(!showItems)}>
                        Show Details
                    </button>
                </div>
            </navbar>
            <div className="main_container">
                {!showItems
                    ?
                    (
                        <div className="items-information">
                             <div id="venue" className="venue_container container_main">
        <div className="text">
 
          <h1>Venue Room Selection</h1>
        </div>
        <div className="venue_selection">
          {venueItems.map((item, index) => (
            <div className="venue_main" key={index}>
              <div className="img">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="text">{item.name}</div>
              <div>${item.cost}</div>
     <div className="button_container">
        {venueItems[index].name === "Auditorium Hall (Capacity:200)" ? (

          <>
          <button
            className={venueItems[index].quantity === 0 ? "btn-warning btn-disabled" : "btn-minus btn-warning"}
            onClick={() => handleRemoveFromCart(index)}
          >
            &#8211;
          </button>
          <span className="selected_count">
            {venueItems[index].quantity > 0 ? ` ${venueItems[index].quantity}` : "0"}
          </span>
          <button
            className={remainingAuditoriumQuantity === 0? "btn-success btn-disabled" : "btn-success btn-plus"}
            onClick={() => handleAddToCart(index)}
          >
            &#43;
          </button>
        </>
        ) : (
          <div className="button_container">
           <button
              className={venueItems[index].quantity ===0 ? " btn-warning btn-disabled" : "btn-warning btn-plus"}
              onClick={() => handleRemoveFromCart(index)}
            >
               &#8211;
            </button>
            <span className="selected_count">
              {venueItems[index].quantity > 0 ? ` ${venueItems[index].quantity}` : "0"}
            </span>
            <button
              className={venueItems[index].quantity === 10 ? " btn-success btn-disabled" : "btn-success btn-plus"}
              onClick={() => handleAddToCart(index)}
            >
             &#43;
            </button>
            
            
          </div>
        )}
      </div>
            </div>
          ))}
        </div>
        {/*Displays the total cost of the venue at the bottom of the venue section*/}
        <div className="total_cost">Total Cost: ${venueTotalCost}</div>
      </div>

                            {/*Necessary Add-ons*/}
                            <div id="addons" className="venue_container container_main">


                                <div className="text">

                                    <h1> Add-ons Selection</h1>

                                </div>
                                <div className="addons_selection">
                                    {/* Allows all code within "()" to access the infromation wihin avItems */}
                                    {avItems.map((item,index) => (
                                        <div className="av_data venue_main" key={index}>
                                            <div className="img">
                                                <img src={item.img} alt={item.name} />
                                            </div>
                                        <div className="text">{item.name} </div>
                                        <div> ${item.cost}</div>
                                            {/* Creates two butttons that call the "handleIncrementAvQuantity" and "handleDecrementAvQuantity" methods */}
                                            <div className="addons_btn">
                                                <button className="btn-warning" onClick={() => handleDecrementAvQuantity(index)}> &ndash; </button>
                                                <span className="quantity-value">{item.quantity}</span>
                                                <button className="btn-success" onClick={() => handleIncrementAvQuantity(index)}> &#43; </button>
                                            </div>
                                        </div>   
                                    ))} 
                                </div>
                                <div className="total_cost">Total Cost: ${avTotalCost}</div>

                            </div>

                            {/* Meal Section */}

                            <div id="meals" className="venue_container container_main">

                                <div className="text">

                                    <h1>Meals Selection</h1>
                                </div>
                                {/* Selection box that collects the number of people */}
                                <div className="input-container venue_selection">
                                    <label htmlFor="numberOfPeople"><h3>Number of People:</h3></label>
                                    <input type ="number" className="input_box5" id="numberOfPeople" value={numberOfPeople}
                                        onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                                        min="1"
                                        />
                                </div>
                                <div className="meal_selection">
                                    {mealsItems.map((item,index) => (
                                        <div className="meals_item" key={index} style={{padding: 15}}>
                                            <div className="inner">
                                                <input type="checkbox" id ={`meal_${index}`}
                                                    checked={item.selected}
                                                    onChange={() => handleMealSelection(index)}
                                                    />
                                                <label htmlFor={`meal_${index}`}> {item.name} </label>                       
                                            </div>
                                            <div className="meal_cost">${item.cost}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="total_cost">Total Cost:{mealTotalCost} </div>


                            </div>
                        </div>
                    ) : (
                        <div className="total_amount_detail">
                            <TotalCost totalCosts={totalCosts} handleClick={handleToggleItems} ItemsDisplay={() => <ItemsDisplay items={items} />} />
                        </div>
                    )
                }




            </div>     
        </>

    );
};

export default ConferenceEvent;
