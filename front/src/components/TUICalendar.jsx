import React from "react";
import Calendar from "@toast-ui/react-calendar";
import '@toast-ui/calendar/dist/toastui-calendar.min.css'

const MyCalendar = () => {
  const events = [
    {
      id: "1",
      calendarId: "1",
      title: "Appointment",
      category: "time",
      start: "2025-01-15T10:00:00",
      end: "2025-01-15T11:00:00",
    },
  ];

  return (
    <Calendar
      height="800px"
      usageStatistics={false}
      calendars={[]}
      events={events}
    />
  );
};

export default MyCalendar;
