import React from 'react'
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { events } from '@/constants';

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const today = new Date();

const styles = {
  container: {
    width: "80wh",
    height: "80vh",
  },
  calendar: {
    padding: "2em",
    backgroundColor: "#242526",
    color: "#E4E6EB",
    borderRadius: "20px",
    borderColor: "#242526",
  },
  timeSlot: {
    background: "#242526",
    borderColor: "#242526",
  },
  
};

const combinedStyles = {
  ...styles.container,
  ...styles.calendar,
  ...styles.timeSlot,
};


const CustomTimetable = () => {
  return (
    <div style={combinedStyles}>
      <BigCalendar
        selectable
        localizer={localizer}
        events={events}
        defaultView={Views.DAY}
        views={[Views.DAY, Views.WEEK, Views.MONTH]}
        step={30}
        defaultDate={today}
        resourceIdAccessor="resourceId"
        resourceTitleAccessor="resourceTitle"
        min={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0, 0)}
        max={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17, 0, 0)}
      />
    </div>
  );
}

export default CustomTimetable