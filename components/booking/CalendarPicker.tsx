
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface CalendarPickerProps {
  onSelect: (date: string, time: string) => void;
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const TIME_SLOTS = ['09:00', '10:30', '12:00', '14:30', '16:00', '18:30'];

const CalendarPicker: React.FC<CalendarPickerProps> = ({ onSelect }) => {
  const days = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i + 1); // start from tomorrow
      return {
        day: DAY_NAMES[d.getDay()],
        date: d.getDate().toString(),
        month: MONTH_NAMES[d.getMonth()],
        fullDate: d,
      };
    });
  }, []);

  const currentMonth = days[0].month;
  const [selectedDate, setSelectedDate] = useState(days[0].date);
  const [selectedTime, setSelectedTime] = useState('');

  const selectedDay = days.find(d => d.date === selectedDate);
  const formattedDate = selectedDay
    ? `${selectedDay.month} ${selectedDay.date}`
    : `${currentMonth} ${selectedDate}`;

  return (
    <div className="space-y-10">
      <div className="text-center">
        <h2 className="font-serif text-3xl italic mb-2">Select Time</h2>
        <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400">Available slots for {currentMonth}</p>
      </div>

      {/* Horizontal Date Picker */}
      <div className="flex overflow-x-auto no-scrollbar snap-x space-x-3 px-1">
        {days.map((d) => (
          <button
            key={d.date}
            onClick={() => setSelectedDate(d.date)}
            className={`flex flex-col items-center justify-center min-w-[64px] h-20 snap-center border transition-all
              ${selectedDate === d.date ? 'border-medimoi-black bg-medimoi-black text-white' : 'border-neutral-100 bg-white text-neutral-400'}`}
          >
            <span className="text-[8px] uppercase tracking-widest mb-2">{d.day}</span>
            <span className="text-sm font-bold tracking-widest">{d.date}</span>
          </button>
        ))}
      </div>

      {/* Grid of Times */}
      <div className="grid grid-cols-2 gap-3">
        {TIME_SLOTS.map(slot => (
          <button
            key={slot}
            onClick={() => setSelectedTime(slot)}
            className={`h-14 border text-[12px] tracking-widest uppercase transition-all
              ${selectedTime === slot ? 'border-medimoi-gold bg-medimoi-gold text-white' : 'border-neutral-100 bg-white'}`}
          >
            {slot}
          </button>
        ))}
      </div>

      <div className="pt-6">
        <button
          disabled={!selectedTime}
          onClick={() => onSelect(formattedDate, selectedTime)}
          className="w-full h-16 bg-medimoi-black text-white text-[11px] uppercase tracking-[0.4em] font-bold disabled:opacity-20 shadow-xl"
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  );
};

export default CalendarPicker;
