'use client'
import React, { useEffect, useState } from 'react'
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getAllLectures } from '@/app/(server)/firebase/firestore/lecture.firestore';
import Button from './Button';

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
  },
  timeSlot: {
    background: "#242526",
  },
  
};

const combinedStyles = {
  ...styles.container,
  ...styles.calendar,
  ...styles.timeSlot,
};

const CustomTimetable = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchAndSetEvents() {
      try {
        const lectures = await getAllLectures();

        const lectureEvents = lectures.map((lecture) => ({
          start: moment(lecture.startTime).toDate(),
          end: moment(lecture.endTime).toDate(),
          title: `${lecture.moduleCode} ${lecture.batch} ${lecture.lecturer} ${lecture.lectureHall}`,
        }));

        setEvents(lectureEvents as any);
      } catch (error) {
        console.error('Error fetching lectures:', error);
      }
    }

    fetchAndSetEvents();
  }, []);
  
  return (
    <div style={combinedStyles}>
      <BigCalendar
        selectable
        localizer={localizer}
        events={events}
        defaultView={Views.WEEK}
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