import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

interface Booking {
  bookingId: number;
  guestHouse: string;
  location: string;
  roomNo: number;
  bedNo: number;
  checkIn: string;
  checkOut: string;
  purpose: string;
  status: string;
}

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.css']
})
export class MybookingsComponent {
  displayedColumns: string[] = ['bookingId', 'guestHouse', 'location', 'roomNo', 'bedNo', 'checkIn', 'checkOut', 'purpose', 'status', 'actions'];
  dataSource = new MatTableDataSource<Booking>(MY_BOOKINGS);


  guestHouses = ['A-104', 'B-404'];
  locations = ['Ambica Avenue', 'Bhayli'];
  statuses = ['Confirmed', 'Pending', 'Cancelled'];

  filter = {
    guestHouse: '',
    location: '',
    status: '',
    global: ''
  };

  constructor() {
    this.dataSource.filterPredicate = this.createFilter();
  }

  applyGlobalFilter(event: Event) {
    this.filter.global = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filter);
  }

  applyDropdownFilter() {
    this.dataSource.filter = JSON.stringify(this.filter);
  }

  createFilter() {
    return (data: Booking, filter: string): boolean => {
      const search = JSON.parse(filter);

      const globalMatch = Object.values(data)
        .some(val => val != null && val.toString().toLowerCase().includes(search.global));

      const guestMatch = !search.guestHouse || data.guestHouse === search.guestHouse;
      const locationMatch = !search.location || data.location === search.location;
      const statusMatch = !search.status || data.status === search.status;

      return globalMatch && guestMatch && locationMatch && statusMatch;
    };
  }

  cancelBooking(id: number) {
    alert(`Cancel booking with ID: ${id}`);
    
  }
}

const MY_BOOKINGS: Booking[] = [
  {
    bookingId: 101,
    guestHouse: 'A-104',
    location: 'Ambica Avenue',
    roomNo: 1,
    bedNo: 2,
    checkIn: '2025-05-20',
    checkOut: '2025-05-22',
    purpose: 'Business',
    status: 'Confirmed'
  },
  {
    bookingId: 102,
    guestHouse: 'B-404',
    location: 'Bhayli',
    roomNo: 2,
    bedNo: 1,
    checkIn: '2025-06-01',
    checkOut: '2025-06-03',
    purpose: 'Vacation',
    status: 'Pending'
  }
];

