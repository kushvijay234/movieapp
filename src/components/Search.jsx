import React from 'react'

const Search = ({ searchTerm, setSearchTerm}) => {
  return (
    <div className="search" >
        <div>
            <img src="searchIcon.svg" alt="search" />

            <input 
            type="text" 
            placeholder='Search throught thousand of Movies'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      
    </div>
  )
}

export default Search
