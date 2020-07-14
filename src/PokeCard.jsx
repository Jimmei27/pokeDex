import React from 'react';

const PokeCard = ({information}) => {
  return (
          <div className="frameScreen">
              <br/>
            <div className="screen">
                <img alt="" src={information.pokeImage}/>
            </div>
                <div className="redDot"></div>
                <p className="pokeNumber">PokéNumber: {information.id}</p> 
            </div>
  )
}

export default PokeCard;