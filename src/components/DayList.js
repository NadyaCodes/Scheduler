import React from "react";
// import classNames from "classnames";
import DayListItem from "components/DayListItem.js"

export default function DayList(props) {

  const allDays = props.days.map(x => (
    <DayListItem
      key={x.id}
      name={x.name}
      spots={x.spots}
      selected={x.name === props.day}
      setDay={props.setDay}
      />
  ))
  
  return(
    <div>
      {allDays}
    </div>
  )


}