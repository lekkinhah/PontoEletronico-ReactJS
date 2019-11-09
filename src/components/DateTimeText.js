import React from 'react'

const Options = {
  date: { day: 'numeric', month: 'long', year: 'numeric' },
  time: { hour: 'numeric', minute: 'numeric', second: 'numeric' },
}

const DateTimeText = ({ dateTimeString, mode = 'date' }) => {

  let text;

  if (mode == 'date')
    text = new Date(dateTimeString).toLocaleDateString('pt-br', Options.date)
  if (mode == 'time')
    text = new Date(dateTimeString).toLocaleTimeString('pt-br', Options.time)

  return (
    <span>{text}</span>
  );
}

export default DateTimeText;