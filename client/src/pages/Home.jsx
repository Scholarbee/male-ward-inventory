import React from "react";
import Navbar from "../components/global/Navbar";
import Categories from "../components/global/Categories";

function Home() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <Categories />
    </div>
  );
}

export default Home;
