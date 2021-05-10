import React, { useReducer, useEffect, useMemo } from "react";
import TopNavBar from "../common/TopNavBar";
import SideNav from "../common/SideNav";
import Main from "../common/Main";
import moment from "moment";
import { mentorReducer } from "../reducers/mentorReducer";
import { MentorInitialState, MentorConstants } from "../constants";
import ShowCalendarOverlay from "../common/ShowCalendarOverlay";
import { MentorContext } from "../context/mentorContext";
import { mentorService } from "../services/mentorService";
import { groupMonthSlots } from "../helpers/calendarHelper";
import SuccessModal from "../common/SuccessModal";

const Dashboard = () => {
  const [mentorAction, dispatchMentorActions] = useReducer(
    mentorReducer,
    MentorInitialState
  );
  const handleActionClick = mentorId => {
    dispatchMentorActions({
      type: MentorConstants.SHOW_CALENDAR,
      payload: { mentorId }
    });
  };

  useEffect(() => {
    if (mentorAction.mentorId) {
      mentorService.getMentorSlots(mentorAction.mentorId).then(
        slots => {
          const day = new Date();
          dispatchMentorActions({
            type: MentorConstants.GET_MENTOR_SLOT,
            payload: {
              slots,
              day: day.getDate(),
              month: day.getMonth() + 1,
              year: day.getFullYear()
            }
          });
        },
        error => {}
      );
    }
  }, [mentorAction.mentorId]);

  const handleDayClick = day => {
    dispatchMentorActions({
      type: MentorConstants.SET_DATE,
      payload: { type: "day", value: day }
    });
  };
  const handleMonthClick = month => {
    dispatchMentorActions({
      type: MentorConstants.SET_DATE,
      payload: { type: "month", value: month }
    });
    handleDayClick(null);
  };

  const handleYearChange = year => {
    dispatchMentorActions({
      type: MentorConstants.SET_DATE,
      payload: { type: "year", value: year }
    });
    handleDayClick(null);
  };
  const mentorDaySlots = useMemo(() => {
    if (
      (mentorAction.mentorCalendar.calendar &&
        mentorAction.month &&
        mentorAction.year,
      mentorAction.day)
    ) {
      return (
        mentorAction.groupedSlots &&
        mentorAction.groupedSlots[mentorAction.year] &&
        mentorAction.groupedSlots[mentorAction.year][mentorAction.month] &&
        mentorAction.groupedSlots[mentorAction.year][mentorAction.month][
          mentorAction.day
        ]
      );
    }
  }, [
    mentorAction.mentorCalendar.calendar,
    mentorAction.month,
    mentorAction.year,
    mentorAction.day,
    mentorAction.groupedSlots
  ]);

  const handleSaveSchedule = data => {
    dispatchMentorActions({
      type: MentorConstants.SAVE_SCHEDULE,
      payload: { data }
    });
  };

  useEffect(() => {
    if (mentorAction.mentorCalendar.calendar && !mentorDaySlots) {
      const monthSlots = groupMonthSlots(
        mentorAction.mentorCalendar.calendar,
        mentorAction.month,
        mentorAction.year
      );
      dispatchMentorActions({
        type: MentorConstants.GET_MENTOR_DAY_SLOT,
        payload: { monthSlots }
      });
    }
  }, [
    mentorDaySlots,
    mentorAction.mentorCalendar.calendar,
    mentorAction.month,
    mentorAction.year,
    mentorAction.day
  ]);
  const getSuccessMessage = () => {
    const mentorId = mentorAction.mentorId;
    const mentorName = mentorAction.mentorCalendar.mentor.name;
    const scheduledCall = mentorAction.schedules.find(
      schedule => schedule.mentorId === mentorId
    );
    return {mentorName, scheduledCall};
  };

  const handleCloseSuccess = () => {
    dispatchMentorActions({
        type: MentorConstants.SCHEDULE_SUCCESS
      });
  };

  return (
    <div className="app-body">
      <SideNav />
      <div className="mainWrapper">
        <TopNavBar />
        <MentorContext.Provider value={{ state: mentorAction}}>
            <Main onClickAction={handleActionClick} />
        </MentorContext.Provider>
      </div>
      {mentorAction.showCalendar && (
        <MentorContext.Provider value={{ state: mentorAction, mentorDaySlots }}>
          <ShowCalendarOverlay
            onClickAction={handleActionClick}
            onDayClick={handleDayClick}
            onMonthChange={handleMonthClick}
            onYearChange={handleYearChange}
            onSaveSchedule={handleSaveSchedule}
          />
        </MentorContext.Provider>
      )}
      {mentorAction.showSuccess && (
        <SuccessModal
          header="Schedule Successful"
          buttonLabel="Great!"
          onCloseModal={handleCloseSuccess}
        >
          <div className="div-height">
            <p>A call has been schedule with <span>{getSuccessMessage().mentorName}</span> for <span>{moment(getSuccessMessage().scheduledCall.date_time, moment.defaultFormat).toDate().toString()}</span>.</p>
            <p><span>Reason For Call: </span> {getSuccessMessage().scheduledCall.reasonForSchedule}</p>
            <p className="italics"><span>{getSuccessMessage().mentorName} </span> looks forward to speaking with you.</p>
          </div>
        </SuccessModal>
      )}
    </div>
  );
};

export default Dashboard;
