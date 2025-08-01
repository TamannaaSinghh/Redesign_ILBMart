"use client";

import { useEffect, useState } from "react";
import { fetchCategories, Category } from "@/lib/Data/Categories";
import { CategoryCard } from "./CategoryCard";
import { Skeleton } from "@/components/ui/skeleton";
import "./CategorySection.css";

const CategorySection = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setTimeout(() => setCategories(data), 800); // Simulate API delay
    };
    loadCategories();
  }, []);

  const renderGrid = () => (
    <div className="categorysection-grid">
      {categories
        ? categories.map((cat) => <CategoryCard key={cat.id} category={cat} />)
        : Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="categorysection-skeleton" />
          ))}
    </div>
  );

  return (
    <section className="categorysection-root">
      <div className="categorcard-container">
        <h2 className="categorysection-title">Category Name 1</h2>
        {renderGrid()}
      </div>

      <div className="categorcard-container">
        <h2 className="categorysection-title">Category Name 2</h2>
        {renderGrid()}
        {renderGrid()}
      </div>

      <div className="categorcard-container">
        <h2 className="categorysection-title">Category Name 3</h2>
        {renderGrid()}
      </div>

      <div className="categorcard-container">
        <h2 className="categorysection-title">Category Name 4</h2>
        {renderGrid()}
        <div className="categorysection-grid">
          {categories
            ? categories
                .slice(0, Math.ceil(categories.length / 2))
                .map((cat) => (
                  <CategoryCard key={`half-${cat.id}`} category={cat} />
                ))
            : Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={`half-skel-${i}`}
                  className="categorysection-skeleton"
                />
              ))}
        </div>
      </div>

      <div className="categorcard-container">
        <h2 className="categorysection-title">Category Name n</h2>
        {renderGrid()}
      </div>
    </section>
  );
};

export default CategorySection;
