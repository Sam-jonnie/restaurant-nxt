import React, {useState, useEffect} from 'react'
import Header from './components/Header/Header'
import CategoryTabs from './components/CategoryTabs/CategoryTabs'
import DishItem from './components/DishItem/DishItem'
import './App.css'

const API_URL =
  'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

const App = () => {
  const [menuData, setMenuData] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState('')
  const [cart, setCart] = useState({}) // Stores items as { dishId: quantity }
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(API_URL)
        const data = await response.json()

        // FIX: The API returns an array. We must grab the first restaurant object [0]
        const restaurantObject = Array.isArray(data) ? data[0] : data
        const categories = restaurantObject?.table_menu_list || []

        setMenuData(categories)

        // Set the initial active tab to the very first category's ID
        if (categories.length > 0) {
          setActiveCategoryId(categories[0].menu_category_id)
        }
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching menu data:', error)
        setIsLoading(false)
      }
    }
    fetchMenu()
  }, [])

  const updateCartQuantity = (dishId, change) => {
    setCart(prevCart => {
      const currentQty = prevCart[dishId] || 0
      const newQty = currentQty + change

      if (newQty <= 0) {
        const updatedCart = {...prevCart}
        delete updatedCart[dishId]
        return updatedCart
      }
      return {...prevCart, [dishId]: newQty}
    })
  }

  // Compute overall dynamic cart item sum
  const totalCartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0)

  // 1. Find the object for whichever category button was clicked
  const activeCategory = menuData.find(
    cat => cat.menu_category_id === activeCategoryId,
  )

  // 2. Extract its specific list of dishes safely
  const activeDishes = activeCategory ? activeCategory.category_dishes : []

  if (isLoading) {
    return <div className="loading-spinner">Loading UNI Resto Cafe...</div>
  }

  return (
    <div className="app-container">
      <Header
        cartCount={totalCartCount}
        restaurantName={menuData[0]?.restaurant_name || 'UNI Resto Cafe'}
      />

      <CategoryTabs
        categories={menuData}
        activeCategoryId={activeCategoryId}
        setActiveCategoryId={setActiveCategoryId}
      />

      <main className="menu-items-container">
        {activeDishes.map(dish => (
          <DishItem
            key={dish.dish_id}
            dish={dish}
            quantity={cart[dish.dish_id] || 0}
            onUpdateQuantity={updateCartQuantity}
          />
        ))}
      </main>
    </div>
  )
}

export default App
