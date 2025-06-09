import React, { useState, useEffect } from "react";
import axios from "axios";
import { items } from "./items";

export default function DesignForm() {
  const [formData, setFormData] = useState({
    name: "",
    job: "",
    company: "",
    phone: "",
    email: "",
    website: "",
  });

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState(items);
  const [selectedImage, setSelectedImage] = useState(null);

  const [userId, setUserId] = useState(null);

  const filters = ["Classic", "Modern Minimalist", "Luxurious", "Playful"];

  useEffect(() => {
    fetch("/login")
      .then((response) => response.json())
      .then((data) => {
        if (data.loggedIn && data.user && data.user[0]) {
          setUserId(data.user[0].id);
        }
      });
  }, []);

  const handleFilterButtonClick = (selectedCategory) => {
    if (selectedFilters.includes(selectedCategory)) {
      setSelectedFilters(selectedFilters.filter((el) => el !== selectedCategory));
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };

  useEffect(() => {
    if (selectedFilters.length === 0) {
      setFilteredItems([...items]);
      return;
    }
    const filtered = items.filter((item) =>
      selectedFilters.some((category) => item.category === category)
    );
    setFilteredItems(filtered);
  }, [selectedFilters]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isFormComplete =
    Object.values(formData).every((val) => val.trim() !== "") && selectedImage && userId;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormComplete) {
      alert("Please fill all fields and select a design.");
      return;
    }
    const combinedData = { ...formData, design: selectedImage, userId };
    axios
      .post("/add_user", combinedData)
      .then((res) => {
        window.location.assign("/account");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div id="design-form-page" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Personal Information</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="job"
                  className="form-control"
                  placeholder="Job"
                  value={formData.job}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="company"
                  className="form-control"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="website"
                  className="form-control"
                  placeholder="Website"
                  value={formData.website}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="section-title">
            <h2>Choose a Design</h2>
          </div>

          <div id="buttons-container" style={{ marginTop: "5px" }}>
            {filters.map((category, idx) => (
              <button
                type="button"
                id="filter-btn"
                onClick={() => handleFilterButtonClick(category)}
                className={`button ${
                  selectedFilters?.includes(category)
                    ? "active btn btn-custom btn-lg"
                    : "btn btn-custom btn-lg"
                }`}
                key={`filters-${idx}`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="row" style={{ marginTop: "20px" }}>
            <div className="gallery-items">
              {filteredItems.map((item, idx) => (
                <div
                  key={`items-${idx}`}
                  className="col-sm-6 col-md-4 col-lg-4"
                >
                  <div className="gallery-item">
                    <div className="hover-bg">
                      <a
                        data-lightbox-gallery="gallery1"
                        alt={item.name}
                        onClick={() => setSelectedImage(item.name)}
                        style={{ cursor: "pointer" }}
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
                          className="img-responsive"
                          alt="Example"
                        />
                      </a>
                      {selectedImage === item.name && (
                        <div style={{ color: "green", fontWeight: "bold" }}>
                          Selected
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group" style={{ marginTop: "30px" }}>
            <button
              type="submit"
              id="submit"
              className="btn btn-custom btn-lg"
              disabled={!isFormComplete}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}