import React from "react";
// import classNames from "classnames";
import DayListItem from "components/DayListItem.js"

export default function DayList(props) {
  // console.log("Daylist props", props)

  // const {days, onChange, value} = props;

  const allDays = props.days.map(day => (
    <DayListItem
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === props.value}
      setDay={props.setDay}
      />
  ))
  
  return(
    <div>
      {allDays}
    </div>
  )


}