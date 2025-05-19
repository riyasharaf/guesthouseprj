import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';

interface Report {
  id: number;
  employeeName: string;
  location: string;
  guestHouse: string;
  checkInDate: string;
  checkOutDate: string;
  roomNo: number;
  bedNo: number;
  status: string;
}

@Component({
  selector: 'app-admin-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class AdminReportComponent implements OnInit {
  displayedColumns: string[] = ['id', 'employeeName', 'location', 'guestHouse', 'checkInDate', 'checkOutDate', 'roomNo', 'bedNo'];
  dataSource: MatTableDataSource<Report>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Filters
  locationFilter = new FormControl('');
  guestHouseFilter = new FormControl('');
  statusFilter = new FormControl('');
  dateRange = new FormControl('');

  // Filter options
  locations: string[] = ['Ambica Avenue, Opp Yogi'];
  guestHouses: string[] = ['B-404', 'A-104'];
  statuses: string[] = ['Pending', 'Accepted', 'Rejected'];

  constructor() {
    // Sample data
    const reports: Report[] = [
      {
        id: 1,
        employeeName: 'Rinal',
        location: 'Abc',
        guestHouse: 'C-89',
        checkInDate: '2025-05-16',
        checkOutDate: '2025-05-18',
        roomNo: 1,
        bedNo: 1,
        status: 'Pending'
      },
      {
        id: 2,
        employeeName: 'Dhruv',
        location: 'Abc',
        guestHouse: 'C-89',
        checkInDate: '2025-05-13',
        checkOutDate: '2025-05-15',
        roomNo: 2,
        bedNo: 1,
        status: 'Pending'
      },
      {
        id: 3,
        employeeName: 'Dhruv',
        location: 'Abc',
        guestHouse: 'C-90',
        checkInDate: '2025-04-18',
        checkOutDate: '2025-04-19',
        roomNo: 1,
        bedNo: 1,
        status: 'Rejected'
      }
    ];

    this.dataSource = new MatTableDataSource(reports);
  }

  ngOnInit() {
    this.setupFilters();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  setupFilters() {
    this.dataSource.filterPredicate = (data: Report, filter: string) => {
      const searchStr = JSON.parse(filter);
      const matchesLocation = !searchStr.location || data.location === searchStr.location;
      const matchesGuestHouse = !searchStr.guestHouse || data.guestHouse === searchStr.guestHouse;
      const matchesStatus = !searchStr.status || data.status === searchStr.status;
      
     
      
      return matchesLocation && matchesGuestHouse && matchesStatus;
    };

   
    this.locationFilter.valueChanges.subscribe(() => this.applyFilters());
    this.guestHouseFilter.valueChanges.subscribe(() => this.applyFilters());
    this.statusFilter.valueChanges.subscribe(() => this.applyFilters());
    this.dateRange.valueChanges.subscribe(() => this.applyFilters());
  }

  applyFilters() {
    const filterValue = {
      location: this.locationFilter.value,
      guestHouse: this.guestHouseFilter.value,
      status: this.statusFilter.value,
      dateRange: this.dateRange.value
    };
    this.dataSource.filter = JSON.stringify(filterValue);
  }

  resetFilters() {
    this.locationFilter.reset();
    this.guestHouseFilter.reset();
    this.statusFilter.reset();
    this.dateRange.reset();
    this.dataSource.filter = '';
  }

  exportReport() {
    
    console.log('Export report');
  }
} 