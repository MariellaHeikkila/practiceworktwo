import React, { useState } from "react";
import './SearchFilter.css'

export default function SearchFilter({ onSearch }) {

    const [searchCharacter, setSearchCharacter] = useState("")

    //reaaliaikainen päivittyminen kun hakukenttään kirjoittaa/poistaa kirjaimia...
    const handleSearchChange = (e) => {
        const written = e.target.value
        setSearchCharacter(written)
        onSearch(written)
    }

    return (
        <div className="search-container">
            <input placeholder="Write letters.." value={searchCharacter} onChange={handleSearchChange}></input>

        </div>
    )
}

//Search-lähde: https://contactmentor.com/build-reactjs-search-filter/

