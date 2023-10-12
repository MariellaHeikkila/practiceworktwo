import './Details.css'
import React from "react";

export default function Details(props) {

    return (
        <div className='details'>
            <h1>{props.name}</h1>
            <p>This charismatic character's height is {props.height} cm and weight is {props.mass} kg. </p>
            <p>{props.name} birth year is {props.birth_year} and gender is {props.gender}. </p>
            <a href="#" onClick={props.close}>Back to characters list.</a>
        </div>
    )
}