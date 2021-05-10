import React, { useMemo, useState } from "react";
import Calendar from "./Calendar";
import moment from "moment-timezone";
import { MentorContext } from "../context/mentorContext";
import TimeSlotComponent from "./TimeSlotComponent";
import TextAreaInput from "./TextAreaInput";
import Button from "./Button";

const ShowCalendarOverlay = ({
  onClickAction,
  onDayClick,
  onMonthChange,
  onYearChange,
  onSaveSchedule
}) => {
  const userTimeZone = useMemo(
    () => moment.tz(moment.tz.guess()).format("Z z"),
    []
  );
  const context = React.useContext(MentorContext);
  const currentDate =
    context && context.state
      ? {
          day: context.state.day,
          month: context.state.month,
          year: context.state.year
        }
      : null;
  const [errorState, setErrorState] = useState(null);
  const [timeState, setTimeState] = useState(null);
  const [reasonState, setReasonState] = useState("");
  const handleBookedClick = () => {
    setTimeState(null);
    setErrorState("Date is Booked");
  };

  const getBookedTimeSlot = useMemo(() => {
    let mentorSchedules =
      context && context.mentorDaySlots ? context.mentorDaySlots.dates : [];
    let bookedMentorSlot = mentorSchedules
      ? mentorSchedules.map(schedule => {
          const date_time = moment
            .tz(schedule.date_time, moment.tz.guess())
            .format();
          const bookedTime = parseInt(new Date(date_time).getHours(), 10);
          return bookedTime;
        })
      : [];
    return bookedMentorSlot;
  }, [context]);

  const getTimeSlots = () => {
    let timeArray = [];
    for (let d = 0; d < 24; d++) {
      const booked =
        (getBookedTimeSlot && getBookedTimeSlot.includes(d)) || false;
      const currentTime = parseInt(new Date().getHours(), 10);
      const currentDay = currentDate && currentDate.day;
      const today = new Date();
      const todayDay = today.getDate();
      const olderTime = d < currentTime && todayDay === currentDay;
      let time = "";
      if (d === 0) {
        time = `12:00 am`;
      } else if (d === 12) {
        time = `12:00 pm`;
      } else if (d > 12) {
        time = `${d - 12}:00 pm`;
      } else {
        time = `${d}:00 am`;
      }
      timeArray.push({ time, booked, olderTime });
    }

    return timeArray;
  };
  const handleSelectTime = time => {
    setErrorState(null);
    setTimeState(time);
  };

  const handleDatePick = date => {
    setTimeState(null);
    setErrorState(null);
    setReasonState("");

    if (onDayClick) {
      onDayClick(date);
    }
  };

  const handleInputChange = event => {
    const { value } = event.target;
    setReasonState(value);
  };

  const handleSaveSchedule = () => {
    const mentorId = context && context.state.mentorId;
    const slotTime = timeState.split(" ");
    let selectedTime = Number(slotTime[0].split(":")[0]);
    const timeHour = slotTime[1];
    if (timeHour === "pm") {
      selectedTime = selectedTime + 12;
    } else {
      if (selectedTime === 12) {
        selectedTime = `00`;
      }
    }
    const date_time = `${context.state.year}-${context.state.month}-${context.state.day} ${selectedTime}:00:00`;

    const data = {
      mentorId,
      reasonForSchedule: reasonState,
      date_time: moment(new Date(date_time)).format("YYYY-MM-DD HH:mm Z")
    };
    if (onSaveSchedule) {
      onSaveSchedule(data);
    }
  };

  return (
    <div className="overlay">
      <div className="calendar-container">
        {context && context.state.isLoading ? (
          <span>Loading...</span>
        ) : (
          <>
            <h2>Book A Call With Mentor</h2>
            <div className="wrapper">
              <div className="mentor-profile">
                <h3>Mentor</h3>
                <p>
                  {context &&
                  context.state &&
                  context.state.mentorCalendar &&
                  context.state.mentorCalendar.mentor
                    ? context.state.mentorCalendar.mentor.name
                    : "N/A"}
                </p>
              </div>
              <div className="calendar-wrapper">
                <Calendar
                  onDayClick={handleDatePick}
                  currentDate={currentDate}
                  onMonthChange={onMonthChange}
                  onYearChange={onYearChange}
                />
              </div>
              <div className="side-wrapper">
                <TimeSlotComponent
                  showTime={currentDate && currentDate.day}
                  userTimeZone={userTimeZone}
                  slots={getTimeSlots()}
                  selectedTime={timeState}
                  handleBookedClick={handleBookedClick}
                  handleSelectTime={handleSelectTime}
                  error={errorState}
                />
                {timeState ? (
                  <TextAreaInput
                    label="Reason For Scheduling Call"
                    isRequired={true}
                    value={reasonState}
                    onHandleEventChange={handleInputChange}
                  />
                ) : null}
              </div>
            </div>
            {reasonState ? (
              <Button label="Schedule Call" onClick={handleSaveSchedule} />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default ShowCalendarOverlay;
