import React from 'react';
import { Plus, Heart, Clock, Check } from 'lucide-react';
import type { User, Pet, AdoptionApplication } from '../types';

interface UserDashboardProps {
  user: User;
  pets: Pet[];
  applications: AdoptionApplication[];
  onAddPet: () => void;
}

export default function UserDashboard({ user, pets, applications, onAddPet }: UserDashboardProps) {
  const userPets = pets.filter(pet => pet.ownerId === user.id);
  const userApplications = applications.filter(app => app.adopterId === user.id);

  if (user.role === 'owner') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">My Listed Pets</h2>
          <button
            onClick={onAddPet}
            className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Pet</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPets.map(pet => (
            <div key={pet.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={pet.imageUrl}
                alt={pet.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{pet.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    pet.status === 'available' ? 'bg-green-100 text-green-800' :
                    pet.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {pet.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{pet.breed}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">My Applications</h2>
      <div className="space-y-4">
        {userApplications.map(app => {
          const pet = pets.find(p => p.id === app.petId);
          if (!pet) return null;

          return (
            <div key={app.id} className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
              <img
                src={pet.imageUrl}
                alt={pet.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{pet.name}</h3>
                <p className="text-gray-600 text-sm">{pet.breed}</p>
              </div>
              <div className="flex items-center space-x-2">
                {app.status === 'pending' && <Clock className="h-5 w-5 text-yellow-500" />}
                {app.status === 'approved' && <Check className="h-5 w-5 text-green-500" />}
                {app.status === 'rejected' && <Heart className="h-5 w-5 text-red-500" />}
                <span className={`text-sm font-medium ${
                  app.status === 'pending' ? 'text-yellow-500' :
                  app.status === 'approved' ? 'text-green-500' :
                  'text-red-500'
                }`}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}