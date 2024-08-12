'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Property {
  name: string;
  floorPlans: string[];
  details: string;
  selectedFloorPlan: string | null; // Save the last selected floor plan
}

interface StarredPropertiesContextProps {
  starredProperties: Property[];
  addProperty: (property: Property) => void;
  removeProperty: (name: string) => void;
  updateProperty: (name: string, updates: Partial<Property>) => void;
}

interface StarredPropertiesProviderProps {
  children: ReactNode;
}

const StarredPropertiesContext = createContext<StarredPropertiesContextProps | undefined>(undefined);

export const useStarredProperties = () => {
  const context = useContext(StarredPropertiesContext);
  if (!context) {
    throw new Error('useStarredProperties must be used within a StarredPropertiesProvider');
  }
  return context;
};

export const StarredPropertiesProvider: React.FC<StarredPropertiesProviderProps> = ({ children }) => {
  const [starredProperties, setStarredProperties] = useState<Property[]>([]);

  const addProperty = (property: Property) => {
    setStarredProperties((prev) => [...prev, property]);
  };

  const removeProperty = (name: string) => {
    setStarredProperties((prev) => prev.filter((property) => property.name !== name));
  };

  const updateProperty = (name: string, updates: Partial<Property>) => {
    setStarredProperties((prev) =>
      prev.map((property) =>
        property.name === name ? { ...property, ...updates } : property
      )
    );
  };

  return (
    <StarredPropertiesContext.Provider value={{ starredProperties, addProperty, removeProperty, updateProperty }}>
      {children}
    </StarredPropertiesContext.Provider>
  );
};
