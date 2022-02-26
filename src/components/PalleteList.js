import React from 'react'
import {AiOutlineMinusCircle} from 'react-icons/ai'

function PalleteList({ Pallete_List,handleRemove }) {
    return Pallete_List.map((pallete, index) => (
        <div className="card-row" key={index}>
            <div className="icon">
            <AiOutlineMinusCircle onClick={()=>handleRemove(pallete.id)} className='delete-icon' style={{ color: pallete.pallete.color3 }}/>
            </div>
            <div className="color-card" style={{ background: pallete.pallete.color1 }}></div>
            <div className="color-card" style={{ background: pallete.pallete.color2 }}></div>
            <div className="color-card" style={{ background: pallete.pallete.color3 }}></div>
            <div className="color-card" style={{ background: pallete.pallete.color4 }}></div>
            <div className="color-card" style={{ background: pallete.pallete.color5 }}></div>
        </div>
    ))

}

export default PalleteList