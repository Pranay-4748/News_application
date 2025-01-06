import React, { useState } from "react";
import { Dropdown, DropdownButton, FormControl, Button } from "react-bootstrap"; // Import necessary Bootstrap components
import { FaSearch } from "react-icons/fa"; // Import search icon
import './navbar.css';

const categories = ["business", "entertainment", "health", "science", "sports", "technology"];

const Navbar = ({ onCategoryChange, searchTerm, setSearchTerm }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]); // Default selected category

  // Handle category change
  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory); // Update local state with the selected category
    onCategoryChange(selectedCategory); // Trigger category change in parent (AppleNews)
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          My News Application
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Category Dropdown */}
            <li className="nav-item">
              <DropdownButton
                id="category-dropdown"
                variant="secondary"
                title={selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} // Capitalize first letter
                onSelect={handleCategoryChange} // Trigger category change
              >
                <Dropdown.Item eventKey="all">All</Dropdown.Item> {/* 'All' option */}
                {categories.map((cat) => (
                  <Dropdown.Item key={cat} eventKey={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)} {/* Capitalize each category */}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </li>
          </ul>

          {/* Search Bar */}
          <form className="d-flex" role="search">
            <FormControl
              type="text"
              placeholder="Search News"
              className="me-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />
            <Button
              variant="outline-secondary"
              onClick={() => console.log(searchTerm)} // For demonstration, logging the search term to console
            >
              <FaSearch />
            </Button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
