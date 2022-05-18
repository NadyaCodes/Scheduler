import React from "react";
// import classNames from "classnames";
import DayListItem from "components/DayListItem.js"

export default function DayList(props) {

  const allDays = props.days.map(day => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={props.onChange}
      />
  ))
  
  return(
    <div>
      {allDays}
    </div>
  )


}