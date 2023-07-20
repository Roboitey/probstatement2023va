import React, { useState } from 'react';
import '../Styles/Opportunity.css';

function Opportunity() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const opportunitiesPerPage = 3; // Number of opportunities to display per page

  // Actual opportunity data
  const opportunities = [
    { id: 1, title: 'Software Engineer', description: 'We are looking for a skilled software engineer with experience in React and Node.js.', company: 'ABC Company', location: 'New York, USA' },
    { id: 2, title: 'Marketing Specialist', description: 'Join our marketing team to help promote our products and drive customer engagement.', company: 'XYZ Corporation', location: 'London, UK' },
    { id: 3, title: 'Graphic Designer', description: 'We are seeking a talented graphic designer to create visually appealing designs for our brand.', company: '123 Design Agency', location: 'San Francisco, USA' },
    // Add more opportunity objects here...
  ];

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
        <h2 className="opportunity-title"> Opportunitys and Jobs </h2>
        <input
          type="text"
          placeholder="Search..."
          className="opportunity-search"
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