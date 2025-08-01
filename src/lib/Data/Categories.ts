export interface Category {
  id: number;
  name: string;
  imageUrl: string;
}

export const fetchCategories = async (): Promise<Category[]> => {
  return [
    { id: 1, name: "Vegetables & Fruits", imageUrl: "/assets/images/default-img.png" },
    {
      id: 2,
      name: "Dairy & Breakfast",
      imageUrl: "/assets/images/default-img.png",
    },
    {
      id: 3,
      name: "Cold Drinks & Juices",
      imageUrl: "/assets/images/default-img.png",
    },
    {
      id: 4,
      name: "Instant & Frozen Food",
      imageUrl: "/assets/images/default-img.png",
    },
    {
      id: 5,
      name: "Tea & Coffee",
      imageUrl: "/assets/images/default-img.png",
    },
    {
      id: 6,
      name: "Atta, Rice & Dal",
      imageUrl: "/assets/images/default-img.png",
    },
     {
      id: 7,
      name: "Masala, Oil & Dry Fruits",
      imageUrl: "/assets/images/default-img.png",
    },
     {
      id: 8,
      name: "Chicken, Meat & Fish",
      imageUrl: "/assets/images/default-img.png",
    },
    { id: 9, name: "Vegetables & Fruits", imageUrl: "/assets/images/default-img.png" },

    { id: 10, name: "Dairy & Breakfast", imageUrl: "/assets/images/default-img.png" },
    // Add more items as needed...
  ];
};
