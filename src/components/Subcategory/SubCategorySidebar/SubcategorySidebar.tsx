"use client";
import React, { useState } from "react";
import "./SubcategorySidebar.css";
import SidebarButton from "./SidebarButton";

const SubcategorySidebar = () => {
  const [activeId, setActiveId] = useState("All"); // store the active button id

  const sidebarButtons = [
    { id: 1, name: "All", imgsrc: "/assets/images/default-img.png" },
    { id: 2, name: "Fresh Vegetables", imgsrc: "/assets/images/default-img.png" },
    { id: 3, name: "Fresh Fruits", imgsrc: "/assets/images/default-img.png" },
    { id: 4, name: "Seasonal Picks", imgsrc: "/assets/images/default-img.png" },
    { id: 5, name: "Exotics & Premium", imgsrc: "/assets/images/default-img.png" },
    { id: 6, name: "Organics & Hydronics", imgsrc: "/assets/images/default-img.png" },
    { id: 7, name: "Flower & Leaves", imgsrc: "/assets/images/default-img.png" },
    { id: 8, name: "Leafy & Herbs", imgsrc: "/assets/images/default-img.png" },
    { id: 9, name: "Cuts & Sprouts", imgsrc: "/assets/images/default-img.png" },
    { id: 10, name: "Dried & Dehydrated", imgsrc: "/assets/images/default-img.png" },
  ];

  return (
    <div className="sidebar-container">
      {sidebarButtons.map((button) => (
        <SidebarButton
          key={button.id}
          button={button}
          
          activeId={activeId}
          setActiveId={setActiveId}
        />
      ))}
    </div>
  );
};

export default SubcategorySidebar;
