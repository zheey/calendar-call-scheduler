export const getBlankDaysInMonth = (firstDayOfMonth) => {
  let blanks = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    blanks.push({date: null});
  }

  return blanks;
};

export const getDaysInMonth = (daysInMonth) => {
  let monthDays = [];
  for (let day = 1; day <= daysInMonth; day++) {
    monthDays.push({date: day});
  }
  return monthDays;
};

export const getMonthRows = (blanks, monthDays) => {
    const totalSlots = [...blanks, ...monthDays];
    let rows = [];
    let cells = [];
  
    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });

    return rows;
};

export const groupMonthSlots = (slots, dateMonth, dateYear) => {
    const datesInMonth = slots.filter(singleDtate => {
        const dateTime = singleDtate.date_time;
        const dayDate = dateTime.split(" ")[0];
        let year = dayDate.split("-")[0];
        year = parseInt(year, 10)
        let month = dayDate.split("-")[1];
        month = parseInt(month, 10)

        return year === dateYear && month === dateMonth; 
    });

    return { dates: datesInMonth, dateMonth, dateYear };
};

export const getDaySlots = (slots, dateMonth,  dateDay) => {
    const datesInMonth = slots.filter(singleDtate => {
        const dateTime = singleDtate.date_time;
        const dayDate = dateTime.split(" ")[0];
        let month = dayDate.split("-")[1];
        month = parseInt(month, 10)
        let day = dayDate.split("-")[2];
        day = parseInt(day, 10)

        return month === dateMonth && day === dateDay; 
    });

    return { dates: datesInMonth };
};

export const getMonthName = (month) => {
  switch (month) {
      case 1:
          return "January";
      case 2:
          return "February";
      case 3:
          return "March";    
      case 4:
          return "April";
      case 5:
          return "May";
      case 6:
          return "June";
      case 7:
          return "July";
      case 8:
          return "August";
      case 9:
          return "September";
      case 10:
          return "October";
      case 11:
          return "November";
      case 12:
          return "December";
      default:
          break;
  }
};
