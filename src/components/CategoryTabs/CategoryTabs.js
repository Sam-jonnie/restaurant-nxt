import React from 'react'

const CategoryTabs = ({categories, activeCategoryId, setActiveCategoryId}) => {
  return (
    <div className="tabs-outer-wrapper">
      <div className="tabs-scroller">
        {categories.map(category => {
          const isActive = category.menu_category_id === activeCategoryId
          return (
            /* Explicit HTML button element mapping the 'menu_category' key */
            <button
              key={category.menu_category_id}
              type="button"
              className={`tab-item ${isActive ? 'tab-active' : ''}`}
              onClick={() => setActiveCategoryId(category.menu_category_id)}
            >
              {category.menu_category}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryTabs
