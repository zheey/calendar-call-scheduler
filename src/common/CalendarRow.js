import React from "react";

const CalendarRow = ({ rowData, onDayClick, rowNumber, currentDate }) => {
    const today = new Date();
    const todayDay = today.getDate();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
  return (
    <tr>
      {rowData.map((row, i) => {
        const day = row.date;
        const selectedDay = currentDate && currentDate.day;
        const selectedMonth = currentDate && currentDate.month;
        const currentDay = selectedDay && selectedDay === day;
        const selectedYear = currentDate && currentDate.year;
        const olderDate = ((day <= todayDay || day > todayDay) && selectedYear < todayYear) || ((day < todayDay || (day > todayDay && selectedMonth < todayMonth) || (day === todayDay && selectedMonth < todayMonth)) && todayYear === selectedYear && selectedMonth <= todayMonth);

        return (
          <td
            key={rowNumber * 7 + i}
            className={`calendar-day ${currentDay ? "today" : ""} ${!day ? "empty" : ""} ${!day ? "empty" : ""} ${olderDate ? "old" : ""}`}
            onClick={olderDate ? () => {} : () => onDayClick(day)}
          >
            {" "}
            {day}
          </td>
        );
      })}
    </tr>
  );
};

export default CalendarRow;
