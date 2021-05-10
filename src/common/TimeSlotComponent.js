import React from "react";

const TimeSlotComponent = ({ showTime, userTimeZone, slots = [], selectedTime, handleBookedClick, handleSelectTime, error }) => {
    return (
        <>
        {showTime ? (
            <div className="timeslot-wrapper">
              <h4>
                {`Select a time `}(<span>{`UTC${userTimeZone}`}</span>)
              </h4>
              <div className="wrapper-time">
                {slots.map((slot, i) => {
                  return (
                    <div
                      key={i}
                      className={`timeslot ${
                        slot.olderTime ? "oldTime" : slot.booked ? "booked" : ""
                      } ${selectedTime === slot.time ? "book" : ""}`}
                      onClick={
                        slot.olderTime
                          ? () => {} 
                          : slot.booked ? () => handleBookedClick(slot.olderTime) : () => handleSelectTime(slot.time)
                      }
                    >
                      {slot.time}
                    </div>
                  );
                })}
              </div>
              {error && <span className="error">{error}</span>}
            </div>
          ) : null}
        </>
    )
};

export default TimeSlotComponent;