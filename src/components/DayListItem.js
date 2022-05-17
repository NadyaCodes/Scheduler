import React from "react";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  // const {name, spots, selected, setDay} = props;

  return (
    <li onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular" >{props.name}</h2> 
      <h3 className="text--light" >{props.spots} spots remaining</h3>
    </li>
  );
}