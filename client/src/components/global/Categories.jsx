import "../../styles/Categories.scss";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="categories">
      <h1>Categories</h1>
      {/* <p>
        Explore our wide range of vacation rentals that cater to all types of
        travelers. Immerse yourself in the local culture, enjoy the comforts of
        home, and create unforgettable memories in your dream destination.
      </p> */}

      <div className="categories_list">
        {categories.map((category, index) => (
          <Link key={index} to={``}>
            <div className="category">
              <img src={category.img} alt={category.label} />
              <div className="overlay"></div>
              <div className="category_text">
                <div className="category_text_icon">{category.icon}</div>
                <p>{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;

const categories = [
  {
    img: "/categories/fund1.jpg",
    label: "Ward Fund",
    // icon: <TbBeach />,
    description: "This property is close to the beach!",
  },
  {
    img: "/categories/strips.jpeg",
    label: "Glucose Strips",
    // icon: <TbBeach />,
    description: "This property is close to the beach!",
  },
  {
    img: "/categories/items2.webp",
    label: "Items",
    // icon: <TbBeach />,
    description: "This property is close to the beach!",
  },
  {
    img: "/categories/fund2.jpg",
    label: "Other Funds",
    // icon: <TbBeach />,
    description: "This property is close to the beach!",
  },
];