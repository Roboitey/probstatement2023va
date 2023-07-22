import React, { useState, useEffect } from 'react';
import '../Styles/Opportunity.css';
import { getOpportunity } from '../services/OpportunityService';
import MDEditor from '@uiw/react-md-editor';


function Opportunity() {
  const [opportunities, setOpportunities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const opportunitiesPerPage = 3; // Number of opportunities to display per page


  useEffect(()=> {
    getOpportunity().then((data)=> {
      console.log(data)
      setOpportunities(data.opportunities)
    })
  },[])
  

   // Filter opportunities based on search term
   const filteredOpportunities = opportunities.filter(opportunity =>
    opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opportunity.contents.toLowerCase().includes(searchTerm.toLowerCase()) );

  // Pagination
  const indexOfLastOpportunity = currentPage * opportunitiesPerPage;
  const indexOfFirstOpportunity = indexOfLastOpportunity - opportunitiesPerPage;
  const currentOpportunities = filteredOpportunities.slice(indexOfFirstOpportunity, indexOfLastOpportunity);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="opportunity-container">
      <div className="opportunity-header">
        <h2 className="opportunity-title">Opportunities..</h2>
        <input
          type="text"
          placeholder="Search..."
          className="opportunity-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="opportunity-content">
        {currentOpportunities.length === 0 ? (
          <div className="no-results">No results found...</div>
        ) : (
          currentOpportunities.map(opportunity => (
            <div key={opportunity.id} className="opportunity-details">
              <h3 className="opportunity-details-title">{opportunity.title}</h3>
              <MDEditor.Markdown className="opportunity-details-description" source={opportunity.contents}/>
            </div>
          ))
        )}
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