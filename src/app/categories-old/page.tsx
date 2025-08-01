// src/app/categories/page.tsx
import React from "react";
import CategorySection from "@/components/Category/CategorySection";
import { Category } from "@/components/Category/types";

const CategoriesPage = () => {
  // Sample data - replace with your actual data or fetch from API
  const categories: Category[] = [
    {
      id: "1",
      name: "Chicken, Meat & Fish",
      slug: "chicken-meat-fish",
      image: "/chicken.jpg",
      subcategories: [
        { id: "1-1", name: "Exotic Meat", slug: "exotic-meat" },
        { id: "1-2", name: "Chicken", slug: "chicken" },
        {
          id: "1-3",
          name: "Sausage, Salami & Ham",
          slug: "sausage-salami-ham",
        },
      ],
    },
    {
      id: "2",
      name: "Pet Care",
      slug: "pet-care",
      image: "/pet-care.jpg",
      subcategories: [
        { id: "2-1", name: "Dog Food & Treats", slug: "dog-food-treats" },
        {
          id: "2-2",
          name: "Pet Grooming & Accessories",
          slug: "pet-grooming-accessories",
        },
        {
          id: "2-3",
          name: "Accessories & Other Supplies",
          slug: "accessories-other-supplies",
        },
        { id: "2-4", name: "Other Pet Supplies", slug: "other-pet-supplies" },
        { id: "2-5", name: "Pet Litter", slug: "pet-litter" },
      ],
    },
    {
      id: "3",
      name: "Baby Care",
      slug: "baby-care",
      image: "/baby-care.jpg",
      subcategories: [
        { id: "3-1", name: "Baby Diapers", slug: "baby-diapers" },
        { id: "3-2", name: "Baby Wipes", slug: "baby-wipes" },
        {
          id: "3-3",
          name: "Baby's Health & Safety Tools",
          slug: "baby-health-safety-tools",
        },
      ],
    },
    {
      id: "4",
      name: "Fish & Seafood",
      slug: "fish-seafood",
      image: "/seafood.jpg",
      subcategories: [
        { id: "4-1", name: "Mutton", slug: "mutton" },
        { id: "4-2", name: "Cat Food & Treats", slug: "cat-food-treats" },
        { id: "4-3", name: "Cat Treats", slug: "cat-treats" },
        { id: "4-4", name: "Dog Treat", slug: "dog-treat" },
        {
          id: "4-5",
          name: "Pet Health & Supplements",
          slug: "pet-health-supplements",
        },
        { id: "4-6", name: "Pet Toys", slug: "pet-toys" },
        { id: "4-7", name: "Baby Feeding Needs", slug: "baby-feeding-needs" },
        { id: "4-8", name: "Hygiene", slug: "hygiene" },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-light-900">Categories</h1>

      {categories.map((category) => (
        <CategorySection key={category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoriesPage;
