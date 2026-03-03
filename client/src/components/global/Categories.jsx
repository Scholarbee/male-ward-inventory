import { Link } from "react-router-dom";

const categories = [
  {
    img: "/categories/fund1.jpg",
    label: "Ward Fund",
    path: "/ward-fund",
    description: "Track ward fund contributions",
  },
  {
    img: "/categories/strips.jpeg",
    label: "Glucose Strips",
    path: "/glucose-strips",
    description: "Manage glucose strip inventory",
  },
  {
    img: "/categories/items2.webp",
    label: "Items",
    path: "/items",
    description: "Manage ward items",
  },
  {
    img: "/categories/fund2.jpg",
    label: "Other Funds",
    path: "/other-funds",
    description: "Track other fund sources",
  },
];

const Categories = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
        Categories
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Link 
            key={index} 
            to={category.path}
            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="relative h-64">
              <img 
                src={category.img} 
                alt={category.label}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                {category.icon && (
                  <div className="text-5xl mb-4">{category.icon}</div>
                )}
                <p className="text-2xl font-bold text-center px-4">{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;