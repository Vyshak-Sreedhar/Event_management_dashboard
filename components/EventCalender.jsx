import { Calendar } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function EventCalendar({ events, onEventClick }) {
  const calendarEvents = events.map(event => ({
    id: event._id,
    title: event.name,
    start: event.date,
    end: event.date,
    extendedProps: {
      description: event.description,
      location: event.location
    }
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <Calendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents}
        eventClick={onEventClick}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek'
        }}
      />
    </div>
  );
}