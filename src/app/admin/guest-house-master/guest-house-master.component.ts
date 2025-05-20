import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';

interface GuestHouse {
  srNo: number;
  guestHouseName: string;
  location: string;
  room: number;
  bed: number;
  isActive: boolean;
}

@Component({
  selector: 'app-guest-house-master',
  templateUrl: './guest-house-master.component.html',
  styleUrls: ['./guest-house-master.component.css']
})
export class GuestHouseMasterComponent implements OnInit {
  guestHouseDetailsForm!: FormGroup;
  roomDetailsForm!: FormGroup;
  bedDetailsForm!: FormGroup;
  isLinear = true;
  displayedColumns: string[] = ['srNo', 'guestHouseName', 'location', 'room', 'bed', 'isActive', 'actions'];
  dataSource!: MatTableDataSource<GuestHouse>;
  searchKey: string = '';
  

  availableRooms: number[] = [];
  availableBeds: { [roomNumber: number]: number[] } = {};
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('stepper') stepper!: MatStepper;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.initializeForms();
    this.initializeDataSource();
    this.setupFormSubscriptions();
  }

  private initializeForms() {
    this.guestHouseDetailsForm = this.fb.group({
      guestHouseName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      isActive: [true]
    });

    this.roomDetailsForm = this.fb.group({
      totalRooms: ['', [Validators.required, Validators.min(1)]],
      selectedRooms: [[], Validators.required],
      roomType: ['', Validators.required]
    });

    this.bedDetailsForm = this.fb.group({
      bedsPerRoom: ['', [Validators.required, Validators.min(1)]],
      selectedBeds: [[], Validators.required],
      bedType: ['', Validators.required]
    });
  }

  private initializeDataSource() {
    this.dataSource = new MatTableDataSource<GuestHouse>([
      {
        srNo: 1,
        guestHouseName: 'Abc',
        location: 'Krishna Residency, Beside Saffron Tower, Nr VIP Road, Karelibaug, Vadodara, 390018',
        room: 7,
        bed: 0,
        isActive: false
      },
      {
        srNo: 2,
        guestHouseName: 'Def',
        location: 'Lotus Nest, Behind Sunrise Mall, Nr Greenfield Society, Gotri, Vadodara, 390021',
        room: 3,
        bed: 1,
        isActive: true
      },
      {
        srNo: 3,
        guestHouseName: 'Ghi',
        location: 'Harmony Stay, Opp Sardar Patel Park, Nr Akota Stadium, Akota, Vadodara, 390020',
        room: 1,
        bed: 2,
        isActive: true
      }
    ]);
  }

  private setupFormSubscriptions() {
    // Subscribe to totalRooms changes
    this.roomDetailsForm.get('totalRooms')?.valueChanges.subscribe(total => {
      if (total && total > 0) {
        this.generateRoomNumbers(total);
      }
    });

    // Subscribe to bedsPerRoom changes
    this.bedDetailsForm.get('bedsPerRoom')?.valueChanges.subscribe(total => {
      if (total && total > 0) {
        this.generateBedNumbers(total);
      }
    });

    // Subscribe to selectedRooms changes
    this.roomDetailsForm.get('selectedRooms')?.valueChanges.subscribe(() => {
      const bedsPerRoom = this.bedDetailsForm.get('bedsPerRoom')?.value;
      if (bedsPerRoom > 0) {
        this.generateBedNumbers(bedsPerRoom);
      }
    });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.setupFilter();
  }

  private generateRoomNumbers(total: number) {
    this.availableRooms = Array.from({ length: total }, (_, i) => i + 1);
    this.roomDetailsForm.get('selectedRooms')?.setValue([]);
  }

  private generateBedNumbers(bedsPerRoom: number) {
    const selectedRooms = this.roomDetailsForm.get('selectedRooms')?.value || [];
    this.availableBeds = {};
    
    selectedRooms.forEach((roomNumber: number) => {
      this.availableBeds[roomNumber] = Array.from({ length: bedsPerRoom }, (_, i) => i + 1);
    });
    
    this.bedDetailsForm.get('selectedBeds')?.setValue([]);
  }

  onRoomSelectionChange() {
    const bedsPerRoom = this.bedDetailsForm.get('bedsPerRoom')?.value;
    if (bedsPerRoom > 0) {
      this.generateBedNumbers(bedsPerRoom);
    }
  }

  private setupFilter() {
    this.dataSource.filterPredicate = (data: GuestHouse, filter: string) => {
      return data.guestHouseName.toLowerCase().includes(filter) ||
             data.location.toLowerCase().includes(filter);
    };
  }

  applyFilter(eventOrValue: Event | string) {
    let filterValue: string;
    if (typeof eventOrValue === 'string') {
      filterValue = eventOrValue;
    } else {
      filterValue = (eventOrValue.target as HTMLInputElement).value;
    }
    
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSubmit() {
    if (this.guestHouseDetailsForm.valid && this.roomDetailsForm.valid && this.bedDetailsForm.valid) {
     
      this.showSuccessMessage('Bed created successfully!');
      this.resetForms();
      this.stepper.reset();
    }
  }

  resetForms() {
    this.guestHouseDetailsForm.reset({ isActive: true });
    this.roomDetailsForm.reset();
    this.bedDetailsForm.reset();
    this.availableRooms = [];
    this.availableBeds = {};
  }

  deleteGuestHouse(srNo: number) {
    if (confirm('Are you sure you want to delete this guest house?')) {
      this.dataSource.data = this.dataSource.data.filter(item => item.srNo !== srNo);
      this.showSuccessMessage('Guest house deleted successfully!');
    }
  }

  private showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }
} 