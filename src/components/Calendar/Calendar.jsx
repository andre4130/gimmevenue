import React, { useState } from 'react';
import Calendar from 'react-calendar';
 
const MyCalendar = props => {

const [date, setDate] = useState({
  date: new Date()
})

const handleChange = date => setDate({date}); console.log(date.date)

return (
  <div>
        <Calendar
          className="calendar"
          calendarType='Hebrew'
          onChange={handleChange}
          value={date.date}
        />
      </div>
)

}

export default MyCalendar