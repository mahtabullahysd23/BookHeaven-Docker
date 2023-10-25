import React from 'react'
import './PaginationOrganism.style.scss'    
import PaginationMolecule from '../../molecules/PaginationMolecule/PaginationMolecule'
import useBook from '../../../CustomHooks/useBook'


const PaginationOrganism = () => {
  const { books } = useBook();
  const totalResults = books.total;
  const pageNumber = books.page;
  const limit = books.limit;
  const X = (pageNumber === 1) ? 1 : (pageNumber - 1) * limit + 1;
  const Y = Math.min(pageNumber * limit, totalResults);
  return (
    <div className="pagination">
        <p>
            { `Showing ${X} - ${Y} of ${totalResults} results`}
        </p>
        <PaginationMolecule
             totalItems={books.total}
             itemsPerPage={books.limit}
        />
    </div>
  )
}

export default PaginationOrganism