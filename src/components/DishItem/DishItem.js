import React from 'react'

const DishItem = ({dish, quantity, onUpdateQuantity}) => {
  const {
    dish_id: dishId,
    dish_name: dishName,
    dish_price: dishPrice,
    dish_currency: dishCurrency,
    dish_description: dishDescription,
    dish_calories: dishCalories,
    dish_image: dishImage,
    dish_Availability: isAvailable,
    addonCat,
    dish_Type: dishType,
  } = dish

  const hasCustomizations = addonCat && addonCat.length > 0

  return (
    <div className="dish-card">
      <div className="dish-details-col">
        <div className="dish-type-header">
          <span
            className={`diet-indicator-box ${
              dishType === 2 ? 'veg-indicator' : 'non-veg-indicator'
            }`}
          >
            <span className="diet-indicator-circle"></span>
          </span>
          {/* HTML Heading Element for dish_name */}
          <h2 className="dish-title">{dishName}</h2>
        </div>

        {/* HTML Paragraph Element for dish_currency & dish_price */}
        <p className="dish-price-tag">
          {dishCurrency} {dishPrice}
        </p>

        {/* HTML Paragraph Element for dish_description */}
        <p className="dish-description-text">{dishDescription}</p>

        {isAvailable ? (
          <div className="quantity-control-block">
            <button
              type="button"
              className="qty-btn minus-btn"
              onClick={() => onUpdateQuantity(dishId, -1)}
            >
              -
            </button>
            <span className="qty-value">{quantity}</span>
            <button
              type="button"
              className="qty-btn plus-btn"
              onClick={() => onUpdateQuantity(dishId, 1)}
            >
              +
            </button>
          </div>
        ) : (
          <p className="not-available-tag">Not available</p>
        )}

        {hasCustomizations && isAvailable && (
          <p className="customization-alert">Customizations available</p>
        )}
      </div>

      {/* Middle Column: Calories Display */}
      <div className="dish-calories-col">
        {/* HTML Paragraph Element for dish_calories */}
        <p className="calorie-count">{dishCalories} calories</p>
      </div>

      {/* Right Column: Dish Photo Assets */}
      <div className="dish-image-col">
        <img
          src={dishImage}
          alt={dishName}
          className="dish-thumbnail"
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default DishItem
