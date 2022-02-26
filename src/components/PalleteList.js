import React from 'react'
import { AiOutlineMinusCircle } from 'react-icons/ai'
import ColorBlock from './ColorBlock.js'

function PalleteList({ Pallete_List, handleRemove }) {
    return Pallete_List.map((pallete, index) => (
        <div className="card-row" key={index} style={{ color: pallete.pallete.color3 }}>
            <div className="icon">
                <AiOutlineMinusCircle onClick={() => handleRemove(pallete.id)} className='delete-icon' />
            </div>
                <ColorBlock color={pallete.pallete.color1} />
                <ColorBlock color={pallete.pallete.color2} />
                <ColorBlock color={pallete.pallete.color3} />
                <ColorBlock color={pallete.pallete.color4} />
                <ColorBlock color={pallete.pallete.color5} />

        </div>
    ))

}

export default PalleteList