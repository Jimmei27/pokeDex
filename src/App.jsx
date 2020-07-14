import React, {useState} from 'react';
import PokeCard from './PokeCard.jsx';
import Autosuggest from 'react-autosuggest';
import {pNames} from './pokemonNames'
import PokeInfo from './PokeInfo.jsx'

const App =() => {
  const [name, setName] = useState("POKEMON")
  const [information, setInformation] = useState("")
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  
  const escapeRegexCharacters = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  const getSuggestions = (value) => {
    const escapedValue = escapeRegexCharacters(value);
  if (escapedValue === '') {
    return [];
  }
  const regex = new RegExp('^' + escapedValue, 'i');
  return pNames.filter(names => regex.test(names.name));
  }

  const findName = (e) => {
    e.preventDefault();
    let name = value
    setName(prev => prev = name)
    const searchName = name.toLocaleLowerCase()

    let searchUrl = `https://pokeapi.co/api/v2/pokemon/${searchName}`
    
    fetch(searchUrl)
    .then((res) => res.json())
    .then(data => {
      const {name, id, species, height, weight, types} = data
      let info = {};
      info.data = {name, id, species, height, weight, types}
       let pokeType = "";
       for (let i = 0; i < (info.data.types).length; i += 1) {
         if (i === 1) {
           pokeType += " & " + info.data.types[i].type.name
         } else {
         pokeType += info.data.types[i].type.name
         }
       }
       info.data.types = pokeType.toUpperCase()

      const pokeImage = `https://pokeres.bastionbot.org/images/pokemon/${info.data.id}.png`
      info.data.pokeImage = pokeImage
      info.data.name = info.data.name.toUpperCase()

       fetch(info.data.species.url)
       .then((res) => res.json())
       .then(data => {
         const des = data.flavor_text_entries.filter(e => e.language.name === "en").map(e => e.flavor_text)
         info.data.description = des.join()
         info.data.evolution = data.evolution_chain


    let first = {};
    let second = {};
    let third = {};
    fetch(info.data.evolution.url)
    .then((res) => res.json())
    .then(data => {
      first.name = data.chain.species.name.toUpperCase()
      first.id = data.chain.species.url.slice(42, data.chain.species.url.length - 1)
      first.image = `https://pokeres.bastionbot.org/images/pokemon/${first.id}.png`
      let two;
      if(data.chain.evolves_to) {
        two = data.chain.evolves_to[0]
        if (two) {
          second.name = two.species.name.toUpperCase()
          second.id = two.species.url.slice(42, two.species.url.length - 1)
          second.image = `https://pokeres.bastionbot.org/images/pokemon/${second.id}.png`
      }
      let three;
      if (data.chain.evolves_to[0]){
        three = data.chain.evolves_to[0].evolves_to[0]
        if (three) {
          third.name = three.species.name.toUpperCase()
          third.id = three.species.url.slice(42, three.species.url.length - 1)
          third.image = `https://pokeres.bastionbot.org/images/pokemon/${third.id}.png`
        }
      }
      }
      info.data.firstImage = first.image
      info.data.secondImage = second.image
      info.data.thirdImage = third.image
      info.data.firstName = first.name
      info.data.secondName = second.name
      info.data.thirdName = third.name
      

      setInformation(info.data)
      })
     })
    })
    setValue("")
  }


    return (
      <div id="mainApp">
        <h1 id="quote">Gotta Catch 'Em All!</h1>
        <div className="container">
        <div className="leftSide">
            <div className="leftCurve">
                <div className="blueLight">
                   <div className="blueLightReflect"></div>
                </div>
                <div className="redLight"></div>
                <div className="yellowLight"></div>
                <div className="greenLight"></div>
          </div>
              <h1 className="pokeName">{name}</h1>
          <div className="middleCurve"></div>
          <div className="rightCurve"></div>
          <PokeCard information={information}/>
          <div className="main">
            <div className="searchBox">
               <Autosuggest
               suggestions={suggestions}
               onSuggestionsClearRequested={() => setSuggestions([])}
               onSuggestionsFetchRequested={({ value }) => {
               setValue(value);
               setSuggestions(getSuggestions(value));
               }}
               getSuggestionValue={suggestion => suggestion.name}
               renderSuggestion={suggestion => <span>{suggestion.name}</span>}
               inputProps={{
                placeholder: "Type a Pokemon Name",
                value: value,
                onChange: (_, { newValue, method }) => {
                setValue(newValue);
            // {
            //   this.setState({
            //     value: (method === 'click' || method === 'enter') ? '' : newValue
            //   });
            // }
            }
            }}
            highlightFirstSuggestion={true}
          />
            </div>
            <button className="submitButton" type="submit" onClick={(findName)}>Submit</button>
        </div>
          <div className="column"></div>
          </div>
          <div className="rightSide">
            <PokeInfo information={information}/>
          </div>
          </div>
      </div>
    );
  }

export default App;
