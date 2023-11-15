import React, { useState } from 'react'

const Player = ({ initialName, symbol, isActive, onChangeName }) => {
    const [PlayerName, setPlayerName] = useState(initialName);
    const [isEditing, setisEditing] = useState(false);
    const handleEditClick = () => {
        setisEditing((edit) => !edit);
        
        if (isEditing){
            onChangeName(symbol, PlayerName);
        }
    }
    const handleChangePlayerName = (event) => {
        setPlayerName(event.target.value);
    }
    let editablePlayerName = <span className="player-name">{PlayerName}</span>;
    let btnCaption = 'Edit'
    if (isEditing) {
        editablePlayerName = <input type="text" onChange={handleChangePlayerName} required defaultValue={PlayerName} />
        btnCaption = 'Save'
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{btnCaption}</button>
        </li>
    )
}

export default Player
