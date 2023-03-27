import React, { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';
import { Icon } from '@iconify/react';
import "./index.css";
import Diary from "../../components/diary";

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div className="header row">
            
            <div className="col col-start">
                <span className="text">
                    <span className="text month">
                        {format(currentMonth, 'yyyy')}년 
                    </span>
                    {format(currentMonth, 'M')}월
                </span>
            </div>
            <div className="col col-end">
                <Icon icon="bi:arrow-left-circle-fill" onClick={{prevMonth}} />
                <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
            </div>
           
        </div>
    );
};

const RenderDays = () => {
    const days = [];
    const date = ['일', '월', '화', '수', '목', '금', '토'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col" key={i}
                
            
            >
                {date[i]}
                
            </div>,
        );
    }

    return <div className="days row">{days}</div>;
};


const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const [selectedDay, setSelectedDay] = useState(null);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    const formattedSelectedDay = selectedDay ? format(selectedDay, 'yyyy-MM-dd') : '';
    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');
            const cloneDay = day;
            days.push(
                <div
                    className={`col cell ${
                        !isSameMonth(day, monthStart)
                            ? 'disabled'
                            : isSameDay(day, selectedDate)
                            ? 'selected'
                            : 'nonSelected'
                           
                    }`}
                    key={day.toString()}
                    onClick={() => {
                        if (isSameMonth(cloneDay, monthStart)) {
                            setSelectedDay(cloneDay);
                            onDateClick(parse(cloneDay, 'yyyy-MM-dd', new Date()));
                        }
                    }}
                >
                    <span
                        className={
                            format(currentMonth, 'M') !== format(day, 'M')
                                ? 'text not-valid'
                                : ''
                        }
                    >
                        {formattedDate}
                    </span>
                </div>,
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={day}>
                {days}
            </div>,
        );
        days = [];
    }
    return <div className="body">{rows} {selectedDay && <Diary date={formattedSelectedDay} />}</div>;
};



export const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (day) => {
        setSelectedDate(day);
    };
    return (
        <div className="calendar">
            
            <RenderHeader
                currentMonth={currentMonth}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
            <div className='calendarHead'>
            <RenderDays />
            <RenderCells
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onDateClick={onDateClick}
            />
            </div>
        </div>
    );
};

export default Calendar;