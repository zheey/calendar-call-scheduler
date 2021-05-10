export const UserMentors = [
  {
    id: 1,
    firstName: "Alexandra",
    lastName: "Graham-Dutch",
    email: "alexandra@CF.com",
    course: "ReactJS"
  }
];

export const MentorConstants = {
  SHOW_CALENDAR: "SHOW_CALENDAR",
  GET_MENTOR_SLOT: "GET_MENTOR_SLOT",
  GET_MENTOR_DAY_SLOT: "GET_MENTOR_DAY_SLOT",
  SET_DATE: "SET_DATE",
  SHOW_TIME_SLOTS: "SHOW_TIME_SLOTS",
  SAVE_SCHEDULE: "SAVE_SCHEDULE",
  SCHEDULE_SUCCESS: "SCHEDULE_SUCCESS"
};

export const MentorInitialState = {
  showCalendar: false,
  groupedSlots: {},
  mentorCalendar: {},
  schedules: [],
  isLoading: true
};
