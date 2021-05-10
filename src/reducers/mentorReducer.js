import { MentorConstants } from "../constants";
import { getDaySlots } from "../helpers/calendarHelper";

export const mentorReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case MentorConstants.SHOW_CALENDAR: {
      const showCalendar = !state.showCalendar;
      return {
        ...state,
        showCalendar,
        mentorId: showCalendar ? payload.mentorId : null
      };
    }
    case MentorConstants.GET_MENTOR_SLOT: {
        const { slots, day, month, year } = payload;
        
      return {
        ...state,
        isLoading: false,
        mentorCalendar: slots,
        day,
        year,
        month
      };
    }

    case MentorConstants.GET_MENTOR_DAY_SLOT: {
        const { monthSlots } = payload;

        let groupedSlots = { ...state.groupedSlots };
        const dateYear = state.year;
        const dateMonth = state.month;
        
        if(!groupedSlots[dateYear]) {
            groupedSlots[dateYear] = {};
        }
        const currentDate = state.day;

        if(!groupedSlots[dateYear][dateMonth]) {
            groupedSlots[dateYear][dateMonth] = {};
        }
        groupedSlots[dateYear] = {
            ...groupedSlots[dateYear],
            [dateMonth]: {
                ...groupedSlots[dateYear][dateMonth],
                [currentDate] : getDaySlots(monthSlots.dates, dateMonth, currentDate)
            }
         }
        
      return {
        ...state,
        groupedSlots
      };
    }

    case MentorConstants.SET_DATE: {
        const { type, value } = payload;
      return {
        ...state,
        [type]: value
      };
    }

    case MentorConstants.SHOW_TIME_SLOTS: {
      return {
        ...state,
        showSlots: true
      };
    }

    case MentorConstants.SAVE_SCHEDULE: {
      const { data } = payload;
      return {
        ...state,
        showSlots: false,
        schedules: [
          ...state.schedules,
          data
        ],
        mentorCalendar: {
          ...state.mentorCalendar,
          calendar: [
            ...state.mentorCalendar.calendar,
            {date_time: data.date_time}
          ]
        },
        showCalendar: false,
        showSuccess: true
      };
    }

    case MentorConstants.SCHEDULE_SUCCESS: {
      return {
        ...state,
        showSlots: false,
        mentorCalendar: {},
        mentorId: null,
        showCalendar: false,
        showSuccess: false,
        day: null,
        year: null,
        month: null
      };
    }
    default: {
      return state;
    }
  }
};
