export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'bird' | 'rabbit' | 'hamster' | 'fish';
  breed: string;
  age: number;
  description: string;
  imageUrl: string;
  ownerId: string;
  status: 'available' | 'pending' | 'adopted';
  size?: 'small' | 'medium' | 'large';
  gender: 'male' | 'female';
  vaccinated: boolean;
  specialNeeds?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'adopter' | 'owner';
  phone?: string;
  address?: string;
  profileImage?: string;
}

export interface AdoptionApplication {
  id: string;
  petId: string;
  adopterId: string;
  status: 'pending' | 'approved' | 'rejected';
  message: string;
  createdAt: Date;
}