import React, { useEffect, useState } from "react";
import fireStore from "../../../utils/fireStore";
import { Calendar, Badge } from 'antd';
import LocaStorage from '../../../utils/localStorage';
import * as dayjs from 'dayjs';

const BookingMonth= () => {

  const [bookingList, setBookingList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [tableList, setTableList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [calendarMode, setCalendarMode] = useState('month');

  useEffect(() => {
    fetchLocationList();
    fetchTableList();
  }, []);

  useEffect(() => {
    fetchBookingList();
  }, [locationList, tableList, selectedDate, calendarMode]);

  const fetchLocationList = async () => {
    const locationRes = await fireStore.getByQuery("locations", []);
    setLocationList(locationRes.docs);
  }

  const fetchTableList = async () => {
    const tableRes = await fireStore.getByQuery("tables", []);
    setTableList(tableRes.docs);
  }

  const fetchBookingList = async () => {
    if (locationList.length && tableList.length && selectedDate && !calendarVisible) {
      const selectedYear = `${selectedDate.year()}`.padStart(4, '0');
      let startDate;
      let endDate;
      if (calendarMode === 'month') {
        const selectedMonth = `${selectedDate.month() + 1}`.padStart(2, '0');
        startDate = `${selectedYear}-${selectedMonth}-01`;
        endDate = `${selectedYear}-${selectedMonth}-${dayjs(startDate).daysInMonth()}`;
      } else {
        startDate = `${selectedYear}-01-01`;
        endDate = `${selectedYear}-12-31`;
      }

      const res = await fireStore.getByQuery("bookings", [{
        propertyName: "userId",
        operation: "==",
        value: LocaStorage.getItem('userId')
      }, {
        propertyName: "date",
        operation: ">=",
        value: startDate
      }, {
        propertyName: "date",
        operation: "<=",
        value: endDate
      }]);
      let responseBookingList = res.docs.map((doc) => {
        const bookingData = doc.data();
        const location = locationList
          .find((loc) => loc.id == bookingData.locationId)
          .data();
        const table = tableList
          .find((tbl) => tbl.id == bookingData.tableId)
          .data();
        return {
          data: bookingData,
          bookingId: doc.id,
          location: location,
          table: table,
        };
      });
      setBookingList(responseBookingList);
      setCalendarVisible(true);
    }
  };

  const onPanelChange = (value, mode) => {
    if (mode != calendarMode) {
      setCalendarVisible(false);
    }
    setSelectedDate(value);
    setCalendarMode(mode);
  };

  const onSelectedDateChange = (newDate) => {
    if (newDate.month() === selectedDate.month() && newDate.year() === selectedDate.year()) {
      setSelectedDate(newDate);
    } else {
      setCalendarVisible(false);
      setSelectedDate(newDate);
    }
  }

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const getListData = (value) => {
    let listData = [];
    bookingList
      .filter(b => b.data.date === value.format('YYYY-MM-DD'))
      .forEach(b => {
        listData.push({
          type: getTypeFromStatus(b.data.status),
          content: formatContent(b)
        })
      })
    return listData;
  };

  const getTypeFromStatus = (status) => {
    if (status === 'Booked') {
      return 'processing';
    } else if (status === 'Confirmed') {
      return 'success';
    } else if (status === 'Cancelled') {
      return 'error';
    } else {
      return 'warning';
    }
  }

  const formatContent = (booking) => {
    return `Bld: ${booking.location.name} / Fl: ${booking.data.level} / Tb No: ${booking.table.name}`;
  }
  
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>Total {num} Bookings</section>
      </div>
    ) : null;
  };

  const getMonthData = (value) => {
    return bookingList
      .filter(b => {
        const bookingDate = dayjs(b.data.date);
        return bookingDate.month() == value.month() && bookingDate.year() == value.year()
      }).length
  };

  return (
    calendarVisible && 
    <Calendar 
      cellRender={cellRender} 
      onPanelChange={onPanelChange} 
      defaultValue={selectedDate} 
      value={selectedDate} 
      onChange={onSelectedDateChange} 
      mode={calendarMode}
    />
  );
};



export default BookingMonth;
