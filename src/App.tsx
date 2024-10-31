import React, { useState } from 'react';
import { Heart, PawPrint, Search, Mail, Phone, Home, LogOut, UserCircle } from 'lucide-react';
import type { Pet, User, AdoptionApplication } from './types';
import AuthModal from './components/AuthModal';
import UserDashboard from './components/UserDashboard';

// Extended mock data with more pets
const initialPets: Pet[] = [
  {
    id: '1',
    name: 'Luna',
    type: 'dog',
    breed: 'Golden Retriever',
    age: 2,
    description: 'Luna is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks.',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=612',
    ownerId: 'owner1',
    status: 'available',
    gender: 'female',
    vaccinated: true,
    size: 'large',
  },
  {
    id: '2',
    name: 'Oliver',
    type: 'cat',
    breed: 'British Shorthair',
    age: 3,
    description: 'Oliver is a calm and affectionate cat who enjoys lounging in sunny spots and gentle pets.',
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=580',
    ownerId: 'owner2',
    status: 'available',
    gender: 'male',
    vaccinated: true,
    size: 'medium',
  },
  {
    id: '3',
    name: 'Bella',
    type: 'dog',
    breed: 'Beagle',
    age: 1,
    description: 'Bella is a curious and loving puppy looking for an active family to call her own.',
    imageUrl: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=80&w=612',
    ownerId: 'owner1',
    status: 'pending',
    gender: 'female',
    vaccinated: true,
    size: 'medium',
  },
  {
    id: '4',
    name: 'Rio',
    type: 'bird',
    breed: 'Blue and Gold Macaw',
    age: 5,
    description: 'Rio is a vibrant and talkative macaw who loves to sing and interact with people.',
    imageUrl: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&q=80&w=600',
    ownerId: 'owner3',
    status: 'available',
    gender: 'male',
    vaccinated: true,
    size: 'medium',
  },
  {
    id: '5',
    name: 'Bubbles',
    type: 'fish',
    breed: 'Betta Fish',
    age: 1,
    description: 'Bubbles is a stunning betta fish with flowing fins and a peaceful temperament.',
    imageUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=600',
    ownerId: 'owner4',
    status: 'available',
    gender: 'male',
    vaccinated: false,
    size: 'small',
  },
  {
    id: '6',
    name: 'Thumper',
    type: 'rabbit',
    breed: 'Holland Lop',
    age: 2,
    description: 'Thumper is a gentle rabbit who loves fresh vegetables and being petted.',
    imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=600',
    ownerId: 'owner2',
    status: 'available',
    gender: 'male',
    vaccinated: true,
    size: 'small',
  },
  {
    id: '7',
    name: 'Pip',
    type: 'hamster',
    breed: 'Syrian Hamster',
    age: 1,
    description: 'Pip is an active hamster who loves running on his wheel and collecting treats.',
    imageUrl: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&q=80&w=600',
    ownerId: 'owner5',
    status: 'available',
    gender: 'female',
    vaccinated: false,
    size: 'small',
  },
  {
    id: '8',
    name: 'Charlie',
    type: 'bird',
    breed: 'Cockatiel',
    age: 3,
    description: 'Charlie is a friendly cockatiel who loves to whistle tunes and sit on shoulders.',
    imageUrl: 'https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?auto=format&fit=crop&q=80&w=600',
    ownerId: 'owner3',
    status: 'available',
    gender: 'male',
    vaccinated: true,
    size: 'small',
  }
];

function App() {
  const [pets, setPets] = useState<Pet[]>(initialPets);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [applications, setApplications] = useState<AdoptionApplication[]>([]);
  const [filterType, setFilterType] = useState<string>('all');

  const filteredPets = pets.filter(pet => {
    const matchesSearch = 
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || pet.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAuth = (userData: { email: string; role: 'adopter' | 'owner' }) => {
    setCurrentUser({
      id: Math.random().toString(36).substr(2, 9),
      name: userData.email.split('@')[0],
      email: userData.email,
      role: userData.role,
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleAdoptionSubmit = (application: Partial<AdoptionApplication>) => {
    if (!currentUser || !selectedPet) return;

    const newApplication: AdoptionApplication = {
      id: Math.random().toString(36).substr(2, 9),
      petId: selectedPet.id,
      adopterId: currentUser.id,
      status: 'pending',
      message: application.message || '',
      createdAt: new Date(),
    };

    setApplications([...applications, newApplication]);
    setPets(pets.map(pet => 
      pet.id === selectedPet.id ? { ...pet, status: 'pending' } : pet
    ));
    setSelectedPet(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Rest of the component remains the same */}
      {/* ... Header section ... */}
      
      {currentUser ? (
        <UserDashboard
          user={currentUser}
          pets={pets}
          applications={applications}
          onAddPet={() => {}}
        />
      ) : (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Companion</h2>
              <p className="text-lg text-gray-600 mb-8">Every pet deserves a loving home. Start your journey here.</p>
              
              <div className="max-w-xl mx-auto space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or breed..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  {['all', 'dog', 'cat', 'bird', 'rabbit', 'hamster', 'fish'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        filterType === type
                          ? 'bg-orange-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-orange-100'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPets.map(pet => (
                <div
                  key={pet.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
                >
                  <img
                    src={pet.imageUrl}
                    alt={pet.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">{pet.name}</h3>
                      <span className="text-sm font-medium text-orange-500">{pet.age} years old</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{pet.breed}</p>
                    <div className="flex gap-2 mb-4">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                        {pet.gender}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                        {pet.size}
                      </span>
                      {pet.vaccinated && (
                        <span className="px-2 py-1 bg-green-100 rounded-full text-xs font-medium text-green-600">
                          Vaccinated
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-4">{pet.description}</p>
                    <button
                      onClick={() => setSelectedPet(pet)}
                      className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300 flex items-center justify-center space-x-2"
                      disabled={pet.status !== 'available'}
                    >
                      <Heart className="h-5 w-5" />
                      <span>{pet.status === 'available' ? 'Adopt Me' : 'Already in Process'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuth}
      />

      {/* ... Adoption Modal ... */}
      {/* ... Footer ... */}
    </div>
  );
}

export default App;