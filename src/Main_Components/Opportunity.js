import React, { useState } from 'react';
import "../Styles/Opportunity.css";


function Opportunity() {
  // Sample opportunity data
  const opportunities = [
    { id: 1, title: 'Job Title 1', description: 'Description of job opportunity 1', company: 'Company A', location: 'Location 1' },
    { id: 2, title: 'Job Title 2', description: 'Description of job opportunity 2', company: 'Company B', location: 'Location 2' },
    { id: 3, title: 'Job Title 3', description: 'Description of job opportunity 3', company: 'Company C', location: 'Location 3' },
    // Add more opportunity objects here...
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const opportunitiesPerPage = 3; // Number of opportunities to display per page

  // Filter opportunities based on search term
  const filteredOpportunities = opportunities.filter(opportunity =>
    opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opportunity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opportunity.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opportunity.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastOpportunity = currentPage * opportunitiesPerPage;
  const indexOfFirstOpportunity = indexOfLastOpportunity - opportunitiesPerPage;
  const currentOpportunities = filteredOpportunities.slice(indexOfFirstOpportunity, indexOfLastOpportunity);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="opportunity-container">
      <div className="opportunity-header">
        <h2 className="opportunity-title">Opportunity</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="opportunity-content">
        {currentOpportunities.map(opportunity => (
          <div key={opportunity.id} className="opportunity-details">
            <h3 className="opportunity-details-title">{opportunity.title}</h3>
            <p className="opportunity-details-description">{opportunity.description}</p>
            <h3 className="opportunity-details-title">Company</h3>
            <p className="opportunity-details-description">{opportunity.company}</p>
            <h3 className="opportunity-details-title">Location</h3>
            <p className="opportunity-details-description">{opportunity.location}</p>
          </div>
        ))}
        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredOpportunities.length / opportunitiesPerPage) }, (_, index) => (
            <button
              key={index}
              className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Opportunity;