import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

interface DashboardStats {
  availableRooms: number;
  reservations: number;
  pendingRequests: number;
  checkIns: number;
  checkOuts: number;
}

interface BedsStats {
  available: number;
  occupied: number;
  revenue: number;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  currentDate = new Date();
  selectedDate = new Date(2025, 4, 13); // May 13, 2025
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  
  stats: DashboardStats = {
    availableRooms: 27,
    reservations: 0,
    pendingRequests: 0,
    checkIns: 0,
    checkOuts: 0
  };

  bedsStats: BedsStats = {
    available: 62,
    occupied: 0,
    revenue: 10401.00
  };
  
  // Calendar data
  calendarDays: Date[] = [];
  
  constructor() {}

  ngOnInit() {
    this.generateCalendarDays();
    this.setupDateRangeListener();
  }

  setupDateRangeListener() {
    this.range.valueChanges.subscribe(range => {
      if (range.start && range.end) {
        this.updateBedsStats(range.start, range.end);
      }
    });
  }

  updateBedsStats(startDate: Date, endDate: Date) {
    // TODO: Implement API call to get beds stats for date range
    console.log('Fetching beds stats for range:', startDate, endDate);
  }

  generateCalendarDays() {
    const year = this.selectedDate.getFullYear();
    const month = this.selectedDate.getMonth();
    
    // Get first day of month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    this.calendarDays = [];
    
    // Add days from previous month to start from Monday
    const daysFromPrevMonth = (firstDay.getDay() + 6) % 7; // Adjusting for Monday start
    for (let i = daysFromPrevMonth; i > 0; i--) {
      this.calendarDays.push(new Date(year, month, -i + 1));
    }
    
    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      this.calendarDays.push(new Date(year, month, i));
    }
    
    // Add days from next month to complete the calendar
    const remainingDays = 42 - this.calendarDays.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      this.calendarDays.push(new Date(year, month + 1, i));
    }
  }

  previousMonth() {
    this.selectedDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() - 1);
    this.generateCalendarDays();
  }

  nextMonth() {
    this.selectedDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1);
    this.generateCalendarDays();
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.selectedDate.getMonth();
  }

  refreshBedsStats() {
    const range = this.range.value;
    if (range.start && range.end) {
      this.updateBedsStats(range.start, range.end);
    }
  }
} 