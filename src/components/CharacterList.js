import { useEffect, useState } from 'react';
import './CharacterList.css'
import axios from 'axios';
import Details from './Details';
import SearchFilter from './SearchFilter';

const URL = "https://swapi.dev/api/people/"

function CharacterList() {

  const [character, setCharacter] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedName, setSelectedName] = useState(null)
  const [filteredCharacter, setfilteredCharacter] = useState([])

  useEffect(() => {
    
    axios.get(URL)
      .then((res) => {
        setCharacter(res.data.results)
        setIsLoading(false)
      }).catch(error => {
        alert("Now there is error..:", error)
        setIsLoading(false)
      })
  }, [])

  //hakufunktio... vaatii vielä ajattelua (lähde searchfilterkomponentissa),
  //mutta filtteröidään nimet eikä haittaa isot/pienet kirjaimet
function makeSearch(searchCharacter) {
  const filtered = character.filter((character) =>
  character.name.toLowerCase().includes(searchCharacter.toLowerCase()));
  setfilteredCharacter(filtered)
} 

//nollataan haku kun "palataan etusivulle" detailsista
const resetSearch = () => {
  setfilteredCharacter([])
}

//valitse nimi ja avaa lisätiedot
function handleCharacter(character) {
  setSelectedName(character)
}

// palaa takaisin etusivulle ja nollaa haku
function close() {
  setSelectedName(null)
  resetSearch()
}
//jos klikataan nimeä, avataan details
//jos datan latauksessa kestää, niin ilmoitusteksti (lataus kestääkin hetken minulla..)
//muuten esittää sw hahmoja, sisältäen hakutoiminnon jollain lailla omana komponenttinaan
  if ( selectedName != null) {
    return <Details
      name={selectedName.name}
      height={selectedName.height}
      mass={selectedName.mass}
      birth_year={selectedName.birth_year}
      gender={selectedName.gender}
      close= {close}
    />
  }  
  else if (isLoading) {
    return <main className="characters"><p>Loading, please wait...</p></main>
  } else {
    return (
      <main className="characters">
        <h3>Here is a list of some Star Wars characters: </h3>
        <p>Click name if you want more info, try search too since there are so many names...</p>        
        <SearchFilter onSearch={makeSearch} />        
        <p>{(filteredCharacter.length > 0 ? filteredCharacter : character)?.map((character, index)=> ( 
        <h2 className="clickname" key={index} onClick={() => handleCharacter(character)}>{character.name}</h2>
        ))}</p>      
      </main>
    );
  }
}
export default CharacterList;

//parantelisin tätä nyt tekemällä <ul><li> listana nimet, ei olisi ehkä niin sekasotkunen. 
// meni vähän hepreaksi kun muokkasin hakutoiminnon koodeihin ja luulen että tätä saisi yksinkertaistettua jos osaisi.
