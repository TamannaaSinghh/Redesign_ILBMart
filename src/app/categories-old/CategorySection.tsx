import React from "react";
import SubCategoryCard from "./SubCategoryCard";
import { Category } from "./types";
import "./CategorySection.css";

interface CategorySectionProps {
  category: Category;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category }) => {
  return (
    <section className="categorysection-root">
      <h2 className="categorysection-title">{category.name}</h2>
      <div className="categorysection-grid">
        {category.subcategories.map((SubCategory) => (
          <SubCategoryCard key={SubCategory.id} subCategory={SubCategory} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
