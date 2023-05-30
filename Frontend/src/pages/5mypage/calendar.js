import React, { useState,useEffect } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse, parseISO } from 'date-fns';
import { Icon } from '@iconify/react';
import "./calendar.css";
import axios from "axios";

import Diary from "../../components/diary";

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div className="header row">
             <div className='prevMonth'>   <Icon icon="bi:arrow-left-circle-fill" onClick={prevMonth} /></div>

            <div className="col col-start">
               
                <span className="text">
                    <span className="textMonth">
                        {format(currentMonth, 'yyyy')}년 
                    </span>
                    {format(currentMonth, 'M')}월
                </span>
                <div className="nextMonth">
                <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth} />
            </div>
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
    const [mySchedule, setMySchedule] = useState([]); //일정 보기
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        const fetchData = async () => {
          try {
            const response = await axios.get("http://3.36.144.128:8080/api/mypage/schedule/");
            
            console.log(response.data)
            setMySchedule(response.data)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);
      
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
            const filteredSchedules = mySchedule.filter((schedule) =>
            isSameDay(parseISO(schedule.targetDate), cloneDay)
          );
    
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
                    {filteredSchedules.length > 0 && (
            <div className="schedule-list_">
              {filteredSchedules.map((schedule) => (
                <div key={schedule.id} className="dailySchedule_">
                  {schedule.title}
                </div>
              ))}
            </div>
          )}
        </div>
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