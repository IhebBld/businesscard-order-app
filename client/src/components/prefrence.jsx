import axios from "axios";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { items } from "./items";

export default function Prefrence() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState(items);

  let filters = ["Classic", "Modern Minimalist", "Luxurious", "Playful"];

  const handleFilterButtonClick = (selectedCategory) => {
    if (selectedFilters.includes(selectedCategory)) {
      let filters = selectedFilters.filter((el) => el !== selectedCategory);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };

  useEffect(() => {
    filterItems();
  }, [selectedFilters]);

  const filterItems = () => {
    if (selectedFilters.length === 0) {
      setFilteredItems([...items]);
      return;
    }
    const filtered = items.filter((item) =>
      selectedFilters.some((category) => item.category === category)
    );
    setFilteredItems(filtered);
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const location = useLocation();
  const userData = location.state;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetch("/login")
      .then((response) => response.json())
      .then((data) => {
        setIsLoggedIn(data.loggedIn);
        setUserId(data.user[0].id);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedImage) {
      alert("Please select an image");
      return;
    }

    const combinedData = { ...userData, design: selectedImage, userId };

    axios
      .post("/add_user", combinedData)
      .then((res) => {
        console.log("Combined Data:", combinedData);
        window.location.assign("/");
      })
      .catch((err) => console.error(err));
  };
  return (
    <div id="filter-page" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Design Your Card</h2>
          <p id="bar">
            Choose one option, and we'll tailor it to your needs.
            <br />
            Refine your search by applying filters.
          </p>
        </div>
        <div id="buttons-container">
          {filters.map((category, idx) => (
            <button
              id="filter-btn"
              onClick={() => handleFilterButtonClick(category)}
              className={`button ${
                selectedFilters?.includes(category)
                  ? "active btn btn-custom btn-lg"
                  : "btn btn-custom btn-lg"
              }`}
              //"btn btn-custom btn-lg"
              key={`filters-${idx}`}
            >
              {category}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="gallery-items">
              {filteredItems.map((item, idx) => (
                <div
                  key={`items-${idx}`}
                  className="col-sm-6 col-md-4 col-lg-4"
                >
                  <div className="gallery-item">
                    <div className="hover-bg">
                      <a
                        // href=""
                        data-lightbox-gallery="gallery1"
                        alt={item.name}
                        onClick={() => setSelectedImage(item.name)}
                      >
                        <div className="hover-text">
                          <h4>{item.category}</h4>
                          <button
                            type="button"
                            className="btn btn-primary"
                            disabled={selectedImage === item.name}
                          >
                            Select
                          </button>
                        </div>
                        <img
                          src={item.image}
                          className="img-responsive "
                          alt="Example"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <button
              type="submit"
              id="submit"
              className="btn btn-custom btn-lg"
              disabled={!selectedImage}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
