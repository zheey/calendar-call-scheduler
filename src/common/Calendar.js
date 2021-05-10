import React, { useMemo, useState } from "react";
import moment from "moment";
import {
  getDaysInMonth,
  getBlankDaysInMonth,
  getMonthRows,
  getMonthName
} from "../helpers/calendarHelper";
import CalendarRow from "./CalendarRow";

const weekdayshort = moment.weekdaysShort();
let weekdayshortname = weekdayshort.map(day => {
  return (
    <th key={day} className="week-day">
      {day}
    </th>
  );
});

const Calendar = ({ onDayClick = () => {}, currentDate, onMonthChange, onYearChange }) => {
  const [dateObject, setDateState] = useState(moment());
  const firstDayOfMonth = useMemo(() => {
    let firstDay = moment(dateObject)
      .startOf("month")
      .format("d");
    return firstDay;
  }, [dateObject]);

  const daysInMonth = useMemo(() => {
    let firstDay = moment(dateObject).daysInMonth();
    return firstDay;
  }, [dateObject]);

  let blanks = getBlankDaysInMonth(firstDayOfMonth);
  let monthDays = getDaysInMonth(daysInMonth, onDayClick);
  let rows = getMonthRows(blanks, monthDays);
  const month = currentDate && currentDate.month;
  const handleIncreaseMonth = () => {
      const nextMonth = moment(dateObject).add(1, 'months').month() + 1
    setDateState(moment(dateObject).add(1, 'months'));
    if(onMonthChange) {
        onMonthChange(nextMonth);
    }
    if(nextMonth === 1 && onYearChange ) {
        const nextYear = moment(dateObject).add(1, 'years').year()
        onYearChange(nextYear);
    }
  };

  const handleDecreaseMonth = () => {
    const lastMonth = moment(dateObject).subtract(1, 'months').month() + 1
  setDateState(moment(dateObject).subtract(1, 'months'));
  if(onMonthChange) {
      onMonthChange(lastMonth);
  }
  if(lastMonth === 12 && onYearChange ) {
      const nextYear = moment(dateObject).subtract(1, 'years').year()
      onYearChange(nextYear);
  }
};

  return (
    <>
      <div className="nav-wrapper">
          <div className="nav-control-wrapper left" onClick={handleDecreaseMonth}> {"<"} </div>
          <div className="nav-label">{`${getMonthName(month)}, ${currentDate && currentDate.year}`}</div>
          <div className="nav-control-wrapper right" onClick={handleIncreaseMonth}> {">"} </div>
      </div>
      <table className="calendar-day calendar">
        <thead>
          <tr>{weekdayshortname}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            return (
              <CalendarRow
                rowData={row}
                onDayClick={onDayClick}
                rowNumber={i}
                currentDate={currentDate}
                key={i}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Calendar;
