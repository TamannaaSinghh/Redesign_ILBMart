import React from "react";
import Image from "next/image";

import { SubCategory } from "./types";
import "./SubCategoryCard.css";

interface SubCategoryCardProps {
  subCategory: SubCategory;
}

const SubCategoryCard: React.FC<SubCategoryCardProps> = ({ subCategory }) => {
  return (
    <div className="subcategorycard-root">
      <div className="subcategorycard-img-wrapper">
        <Image
          src="/assets/images/categories/fruits1.jpg"
          alt={subCategory.name}
          layout="fill"
          objectFit="cover"
          className="subcategorycard-img"
        />
      </div>
      <div className="subcategorycard-content">
        <h3 className="subcategorycard-title">
          {subCategory.name}
        </h3>
      </div>
    </div>
  );
};

export default SubCategoryCard;
