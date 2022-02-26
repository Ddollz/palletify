import React from "react";


const Settings = ({
    id,
    label,
    value,
    type,
    onChange,
    valueUnit,
    ...props
}) => {
    return (
        <div className="inputWrapper"
            style={props.max && {
                '--value': `${100 - (props.max - value) / (props.max - props.min) * 100}%`
            }}>
            {type === "range" ? (
                <>
                    <label htmlFor={id}> {label}</label>
                    <input id={id} type={type} value={value} onChange={onChange} {...props} />
                </>
            ) : (
                <>
                    {/* <label htmlFor={id}><GiPerspectiveDiceSixFacesRandom className="inputIcon"/></label> */}
                    <input id={id} type={type} value={value} onChange={onChange} {...props} />
                    
                </>
            )}


        </div>
    );
};

export default Settings;
