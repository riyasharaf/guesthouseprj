export interface GuestHouse {
  id: number;
  name: string;
  location: string;
  totalRooms: number;
  totalBeds: number;
  amenities: string[];
  status: 'Active' | 'Inactive';
  description?: string;
  contactNumber?: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GuestHouseFilter {
  location?: string;
  status?: 'Active' | 'Inactive';
  searchTerm?: string;
} 