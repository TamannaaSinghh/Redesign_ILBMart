import React from "react";
import "./SidebarButton.css";

interface ButtonProps {
  button: {
    id: number;
    name: string;
    imgsrc: string;
  };
  activeId: string;
  setActiveId: (id: string) => void;
}

const SidebarButton: React.FC<ButtonProps> = ({ button, activeId, setActiveId }) => {
  return (
    <div
      className={`sidebar-button ${activeId === button.name ? "active" : ""}`}
      onClick={() => setActiveId(button.name)}
    >
      <img className="button-img" src={button.imgsrc} alt={button.name} />
      <span className={`button-name ${activeId === button.name ? "active" : ""}`}>{button.name}</span>
    </div>
  );
};

export default SidebarButton;
