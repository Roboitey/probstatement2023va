import React, { useState, useEffect } from 'react';
import '../Styles/Opportunity.css';
import { getOpportunity } from '../services/OpportunityService';
import MDEditor from '@uiw/react-md-editor';
import Pagination from 'react-bootstrap/Pagination';

function AdvancedExample() {
  const [opportunities, setOpportunities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const opportunitiesPerPage = 5; // Number of opportunities to display per page

  useEffect(() => {
    getOpportunity().then((data) => {
      console.log(data);
      setOpportunities(data.opportunities);
    });
  }, []);

  // Filter opportunities based on search term
  const filteredOpportunities = opportunities.filter(
    (opportunity) =>
      opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.contents.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastOpportunity = currentPage * opportunitiesPerPage;
  const indexOfFirstOpportunity = indexOfLastOpportunity - opportunitiesPerPage;
  const currentOpportunities = filteredOpportunities.slice(
    indexOfFirstOpportunity,
    indexOfLastOpportunity
  );

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > Math.ceil(filteredOpportunities.length / opportunitiesPerPage)) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  // Helper function to render pagination items
  const renderPaginationItems = () => {
    const totalPages = Math.ceil(filteredOpportunities.length / opportunitiesPerPage);

    const items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => paginate(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };
  const searchPaginationItems = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  return (
    <div className="opportunity-container">
      <div className="opportunity-header">
        <h2 className="opportunity-title">Opportunities: </h2>
        <input
          type="text"
          placeholder="Search..."
          className="opportunity-search"
          value={searchTerm}
          onChange={searchPaginationItems}
        />
      </div>
      <div className="opportunity-content">
        {currentOpportunities.length === 0 ? (
          <div className="no-results">No results found...</div>
        ) : (
          currentOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="opportunity-details">
              <h3 className="opportunity-details-title">{opportunity.title}</h3>
              <MDEditor.Markdown className="opportunity-details-description" source={opportunity.contents} />
            </div>
          ))
        )}
        {/* Pagination */}
        <div className="pagination">
          <Pagination>
            <Pagination.Prev onClick={() => paginate(currentPage - 1)} />
            {renderPaginationItems()}
            <Pagination.Next onClick={() => paginate(currentPage + 1)} />
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default AdvancedExample;