import React from 'react';


const PokeInfo = ({information}) => {
    return (
        <div>
        <div className="description">
        <h1>DESCRIPTION</h1>
        <hr/>
        <p> {information.description}</p>
        </div>
        <div className="types">
        <h1>TYPE: {information.types} </h1>
      </div>
      <div className="height">
        <h1><u>HEIGHT</u></h1>
        <p> {information.height}</p>
      </div>
      <div className="weight">
        <h1><u>WEIGHT</u></h1>
        <p> {information.weight}</p>
      </div>
      <div className="evolution">
        <div className="pokeEvo">
          <img alt="" src={information.firstImage}></img>
          <h3> {information.firstName} </h3>
        </div>
        <div className="pokeEvo">
          <img alt="" src={information.secondImage}></img>
          <h3> {information.secondName} </h3>
        </div>
        <div className="pokeEvo">
          <img alt="" src={information.thirdImage}></img>
          <h3> {information.thirdName} </h3>
        </div>
      </div>
      </div>
    )
  }
  
  export default PokeInfo;