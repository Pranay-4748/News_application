import React, { useState } from "react";
import { Dropdown, DropdownButton, FormControl, Button } from "react-bootstrap"; 

const categories = ["business", "entertainment", "health", "science", "sports", "technology"];

const Navbar = ({ onCategoryChange, searchTerm, setSearchTerm }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]); 
  
  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    onCategoryChange(selectedCategory); 
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-secondary">
      <div className="container-fluid ">
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
        <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
           
           
            <li className="nav-item">
              <DropdownButton
                id="category-dropdown"
                variant="secondary"
                title={selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} 
                onSelect={handleCategoryChange} 
              >
                <Dropdown.Item eventKey="all">All</Dropdown.Item> 
                {categories.map((cat) => (
                  <Dropdown.Item key={cat} eventKey={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)} 
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </li>
          </ul>

          {/* Search Bar */}
          <form className="d-flex col-4" role="search">
            <FormControl
              type="text"
              placeholder="Search News"
              className="me-0 w-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
