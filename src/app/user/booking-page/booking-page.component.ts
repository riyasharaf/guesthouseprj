import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.css']
})
export class BookingPageComponent {
  bookingForm: FormGroup;

  guestHouses = ['A-27', 'B-40'];
  locations = ['Lotus Park', 'Gotri'];
  rooms = [1, 2, 3];
  beds = [1, 2, 3];

  constructor(private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      guestHouse: ['', Validators.required],
      location: ['', Validators.required],
      roomNo: ['', Validators.required],
      bedNo: ['', Validators.required],
      purpose: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      alert('Booking submitted successfully!');
      console.log(this.bookingForm.value);
      this.bookingForm.reset();
    } else {
      this.bookingForm.markAllAsTouched();
    }
  }
}
