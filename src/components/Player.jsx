import { useState } from "react";

export default function Player({initalName, symbol, isActive, onNameChange}) {
    const [playerName, setPlayerName] = useState(initalName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing((editing)=>!editing);
        if(isEditing){
            onNameChange(symbol, playerName);
        }
    }

    function handlerChange(event) {
        setPlayerName(event.target.value);
    }

    let editableplayerName = <span className="player-name">{playerName}</span>;

    if(isEditing){
        editableplayerName = <input type="text" required value={playerName} onChange={handlerChange}></input>;
    }

  return (<li className={isActive ? 'active' : undefined}>
    <span className="player">
        {editableplayerName}
        <span className="player-symbol">{symbol}</span>
    </span>
    <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
  </li>
  );
}