export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  pricing: {
    basic: number;
    standard: number;
    premium: number;
  };
  features: string[];
  category: string;
}

const services: Service[] = [
  {
    id: 'appliance-repair',
    name: 'Appliance Repair',
    shortDescription: 'Expert repair for all household appliances',
    description: 'Our appliance repair service covers everything from refrigerators and washing machines to ovens and microwaves. Our skilled technicians diagnose and fix issues quickly to minimize disruption to your daily routine.',
    imageUrl: 'https://images.pexels.com/photos/4108714/pexels-photo-4108714.jpeg',
    pricing: {
      basic: 49,
      standard: 79,
      premium: 129
    },
    features: [
      'Same-day service available',
      'Experienced technicians',
      '90-day repair guarantee',
      'Genuine replacement parts'
    ],
    category: 'Home Maintenance'
  },
  {
    id: 'bricklayer',
    name: 'Bricklayer',
    shortDescription: 'Professional masonry and bricklaying services',
    description: 'Our expert bricklayers bring years of experience to every project, from garden walls and home extensions to complete new builds. We pride ourselves on precise workmanship and attention to detail.',
    imageUrl: 'https://images.pexels.com/photos/2760241/pexels-photo-2760241.jpeg',
    pricing: {
      basic: 150,
      standard: 250,
      premium: 450
    },
    features: [
      'Free consultation and quote',
      'High-quality materials',
      'Structural calculations',
      'Clean and tidy workmanship'
    ],
    category: 'Construction'
  },
  {
    id: 'carpenter',
    name: 'Carpenter',
    shortDescription: 'Skilled woodworking and carpentry solutions',
    description: 'From custom furniture and cabinetry to structural repairs and installations, our carpentry team delivers excellent craftsmanship for all your woodworking needs.',
    imageUrl: 'https://images.pexels.com/photos/3637837/pexels-photo-3637837.jpeg',
    pricing: {
      basic: 120,
      standard: 220,
      premium: 380
    },
    features: [
      'Custom design service',
      'Premium wood selection',
      'Detailed finishing',
      'In-home consultations'
    ],
    category: 'Craftsmanship'
  },
  {
    id: 'electrician',
    name: 'Electrician',
    shortDescription: 'Licensed electrical services for home and business',
    description: 'Our certified electricians handle everything from rewiring and electrical repairs to new installations and safety inspections. All work is completed to current regulations with proper certification.',
    imageUrl: 'https://images.pexels.com/photos/8961438/pexels-photo-8961438.jpeg',
    pricing: {
      basic: 85,
      standard: 150,
      premium: 280
    },
    features: [
      '24/7 emergency service',
      'Fully licensed and insured',
      'Safety certificates provided',
      'Modern equipment and techniques'
    ],
    category: 'Electrical'
  },
  {
    id: 'gardener',
    name: 'Gardener',
    shortDescription: 'Professional garden maintenance and landscaping',
    description: 'Transform and maintain your outdoor space with our comprehensive gardening services. From routine maintenance to complete landscape redesigns, our gardeners bring creativity and expertise to every project.',
    imageUrl: 'https://images.pexels.com/photos/6231990/pexels-photo-6231990.jpeg',
    pricing: {
      basic: 45,
      standard: 85,
      premium: 180
    },
    features: [
      'Seasonal planting schemes',
      'Garden design consultation',
      'Regular maintenance packages',
      'Sustainable gardening practices'
    ],
    category: 'Outdoor'
  },
  {
    id: 'painter',
    name: 'Painter',
    shortDescription: 'Interior and exterior painting services',
    description: 'Our skilled painters deliver flawless results for both interior and exterior projects. We use high-quality paints and techniques to ensure a beautiful, long-lasting finish for your home or business.',
    imageUrl: 'https://images.pexels.com/photos/6368889/pexels-photo-6368889.jpeg',
    pricing: {
      basic: 130,
      standard: 220,
      premium: 380
    },
    features: [
      'Free color consultation',
      'Premium paint options',
      'Surface preparation',
      'Clean and detailed work'
    ],
    category: 'Home Improvement'
  }
];

export const getAllServices = (): Service[] => {
  return services;
};

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};

export const getServicesByCategory = (category: string): Service[] => {
  return services.filter(service => service.category === category);
};

export const searchServices = (query: string): Service[] => {
  const searchTerm = query.toLowerCase();
  return services.filter(
    service => 
      service.name.toLowerCase().includes(searchTerm) || 
      service.description.toLowerCase().includes(searchTerm) ||
      service.category.toLowerCase().includes(searchTerm)
  );
};

// Alphabetical list for A-Z display
export const getAlphabeticalServiceList = (): Record<string, string[]> => {
  const alphabeticalList: Record<string, string[]> = {};
  
  // Initialize with all letters
  for (let charCode = 65; charCode <= 90; charCode++) {
    const letter = String.fromCharCode(charCode);
    alphabeticalList[letter] = [];
  }
  
  // Populate with service names
  services.forEach(service => {
    const firstLetter = service.name.charAt(0).toUpperCase();
    if (alphabeticalList[firstLetter]) {
      alphabeticalList[firstLetter].push(service.name);
    }
  });
  
  return alphabeticalList;
};