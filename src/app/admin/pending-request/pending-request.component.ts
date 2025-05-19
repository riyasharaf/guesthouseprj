import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';

interface PendingRequest {
  id: number;
  employeeName: string;
  guestHouse: string;
  location: string;
  checkInDate: string;
  checkOutDate: string;
  roomNo: number;
  bedNo: number;
  status: string;
}

@Component({
  selector: 'app-admin-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.css']
})
export class AdminPendingRequestComponent implements OnInit {
  displayedColumns: string[] = ['id', 'employeeName', 'guestHouse', 'location', 'checkInDate', 'checkOutDate', 'roomNo', 'bedNo', 'status', 'actions'];
  dataSource: MatTableDataSource<PendingRequest>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  guestHouseFilter = new FormControl('');
  roomFilter = new FormControl('');
  bedFilter = new FormControl('');
  dateRange = new FormControl('');
  employeeFilter = new FormControl('');


  guestHouses: string[] = ['B-404', 'A-104'];
  rooms: number[] = [1, 2, 3];
  beds: number[] = [1, 2, 3];
  locations: string[] = ['Ambica Avenue, Opp Yogi'];

  constructor() {

    const requests: PendingRequest[] = [
      {
        id: 1,
        employeeName: 'Ayushi',
        guestHouse: '24-A',
        location: 'Gotri',
        checkInDate: '2025-05-13',
        checkOutDate: '2025-05-15',
        roomNo: 2,
        bedNo: 1,
        status: 'Pending'
      },
      {
        id: 2,
        employeeName: 'Riya',
        guestHouse: 'B-27',
        location: ' Avenue',
        checkInDate: '2025-05-16',
        checkOutDate: '2025-05-18',
        roomNo: 1,
        bedNo: 1,
        status: 'Pending'
      }
    ];

    this.dataSource = new MatTableDataSource(requests);
  }

  ngOnInit() {
    this.setupFilters();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  setupFilters() {
    this.dataSource.filterPredicate = (data: PendingRequest, filter: string) => {
      const searchStr = JSON.parse(filter);
      const matchesGuestHouse = !searchStr.guestHouse || data.guestHouse === searchStr.guestHouse;
      const matchesRoom = !searchStr.room || data.roomNo === searchStr.room;
      const matchesBed = !searchStr.bed || data.bedNo === searchStr.bed;
      const matchesEmployee = !searchStr.employee || data.employeeName.toLowerCase().includes(searchStr.employee.toLowerCase());
      
      return matchesGuestHouse && matchesRoom && matchesBed && matchesEmployee;
    };

   
    this.guestHouseFilter.valueChanges.subscribe(() => this.applyFilters());
    this.roomFilter.valueChanges.subscribe(() => this.applyFilters());
    this.bedFilter.valueChanges.subscribe(() => this.applyFilters());
    this.dateRange.valueChanges.subscribe(() => this.applyFilters());
    this.employeeFilter.valueChanges.subscribe(() => this.applyFilters());
  }

  applyFilters() {
    const filterValue = {
      guestHouse: this.guestHouseFilter.value,
      room: this.roomFilter.value,
      bed: this.bedFilter.value,
      dateRange: this.dateRange.value,
      employee: this.employeeFilter.value
    };
    this.dataSource.filter = JSON.stringify(filterValue);
  }

  resetFilters() {
    this.guestHouseFilter.reset();
    this.roomFilter.reset();
    this.bedFilter.reset();
    this.dateRange.reset();
    this.employeeFilter.reset();
    this.dataSource.filter = '';
  }

  approveRequest(request: PendingRequest) {

    console.log('Approve request:', request);
  }

  rejectRequest(request: PendingRequest) {

    console.log('Reject request:', request);
  }
} 