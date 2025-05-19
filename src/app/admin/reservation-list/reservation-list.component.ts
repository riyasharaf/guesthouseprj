import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';

interface Reservation {
  id: number;
  employeeName: string;
  guestHouse: string;
  checkInDate: string;
  checkOutDate: string;
  roomNo: number;
  bedNo: number;
}

@Component({
  selector: 'app-admin-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class AdminReservationListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'employeeName', 'guestHouse', 'checkInDate', 'checkOutDate', 'roomNo', 'bedNo', 'actions'];
  dataSource: MatTableDataSource<Reservation>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Filters
  guestHouseFilter = new FormControl('');
  roomFilter = new FormControl('');
  bedFilter = new FormControl('');
  dateRange = new FormControl('');

  // Filter options
  guestHouses: string[] = ['B-404', 'A-104'];
  rooms: number[] = [1, 2, 3];
  beds: number[] = [1, 2, 3];

  constructor() {
    // Sample data
    const reservations: Reservation[] = [
      {
        id: 1,
        employeeName: 'Ayushi Panchall',
        guestHouse: 'A-24',
        checkInDate: '2024-10-17',
        checkOutDate: '2024-10-17',
        roomNo: 1,
        bedNo: 1
      },
       {
        id: 1,
        employeeName: 'Riya Sharaf',
        guestHouse: 'A-24',
        checkInDate: '2024-10-17',
        checkOutDate: '2024-10-17',
        roomNo: 1,
        bedNo: 1
      }
    
    ];

    this.dataSource = new MatTableDataSource(reservations);
  }

  ngOnInit() {
    this.setupFilters();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  setupFilters() {
    this.dataSource.filterPredicate = (data: Reservation, filter: string) => {
      const searchStr = JSON.parse(filter);
      const matchesGuestHouse = !searchStr.guestHouse || data.guestHouse === searchStr.guestHouse;
      const matchesRoom = !searchStr.room || data.roomNo === searchStr.room;
      const matchesBed = !searchStr.bed || data.bedNo === searchStr.bed;
      
      
      
      return matchesGuestHouse && matchesRoom && matchesBed;
    };

    
    this.guestHouseFilter.valueChanges.subscribe(() => this.applyFilters());
    this.roomFilter.valueChanges.subscribe(() => this.applyFilters());
    this.bedFilter.valueChanges.subscribe(() => this.applyFilters());
    this.dateRange.valueChanges.subscribe(() => this.applyFilters());
  }

  applyFilters() {
    const filterValue = {
      guestHouse: this.guestHouseFilter.value,
      room: this.roomFilter.value,
      bed: this.bedFilter.value,
      dateRange: this.dateRange.value
    };
    this.dataSource.filter = JSON.stringify(filterValue);
  }

  resetFilters() {
    this.guestHouseFilter.reset();
    this.roomFilter.reset();
    this.bedFilter.reset();
    this.dateRange.reset();
    this.dataSource.filter = '';
  }

  editReservation(reservation: Reservation) {

    console.log('Edit reservation:', reservation);
  }

  deleteReservation(reservation: Reservation) {
   
    console.log('Delete reservation:', reservation);
  }
} 