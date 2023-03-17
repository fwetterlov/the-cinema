import React, { useState } from "react";

export default function SelectCategory(props) {

  const { movies, selectedCategory, handleCategoryChange } = props

  function getUniqueCategories(movies) {
    const categories = [];

    movies.forEach((movie) => {
      movie.description.categories.forEach((category) => {
        if (!categories.includes(category)) {
          categories.push(category);
        }
      });
    });

    return categories;
  }

  const uniqueCategories = getUniqueCategories(movies);

  return (
    <div>
      <label htmlFor="category-select">Select a category: </label>
      <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        {uniqueCategories.map((category) => {
          return <option key={category} value={category}>{category}</option>;
        })}
      </select>
    </div>
  );
}