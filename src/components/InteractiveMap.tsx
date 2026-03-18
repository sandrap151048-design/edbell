'use client';

import { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, ExternalLink, Navigation } from 'lucide-react';

interface MapProps {
  address?: string;
  phone?: string;
  hours?: string;
  className?: string;
}

const InteractiveMap = ({ 
  address = "15/382, Calicut Tower, Kozhikode Road, Wayanad, Kerala, India",
  phone = "+91 XXX XXX XXXX",
  hours = "Mon-Fri: 9AM-6PM",
  className = ""
}: MapProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Ensure component is mounted before rendering interactive elements
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Coordinates for Wayanad, Kerala - Kozhikode Road area
  const latitude = 11.6854;
  const longitude = 76.1320;
  
  // Static Google Maps embed URL to avoid hydration issues
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15648.494!2d76.1320!3d11.6854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba87c6b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sKozhikode%20Rd%2C%20Wayanad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1640995200000!5m2!1sen!2sin`;
  
  // Google Maps directions URL
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  
  // WhatsApp URL
  const whatsappUrl = `https://wa.me/91XXXXXXXXX?text=Hi, I would like to visit your office. Can you provide directions?`;

  const handleMapLoad = () => {
    setIsLoaded(true);
  };

  const handleGetDirections = () => {
    if (typeof window !== 'undefined') {
      window.open(directionsUrl, '_blank');
    }
  };

  const handleOpenInMaps = () => {
    if (typeof window !== 'undefined') {
      window.open(`https://maps.google.com/?q=${latitude},${longitude}`, '_blank');
    }
  };

  const handleWhatsApp = () => {
    if (typeof window !== 'undefined') {
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleCall = () => {
    if (typeof window !== 'undefined') {
      window.open(`tel:${phone.replace(/\s/g, '')}`, '_self');
    }
  };

  // Show loading state until mounted
  if (!isMounted) {
    return (
      <div className={`relative ${className}`}>
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Map Container */}
      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg">
        {/* Loading State */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading interactive map...</p>
            </div>
          </div>
        )}
        
        {/* Google Maps Embed */}
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="EdBell Edusolutions Office Location - Interactive Map"
          className="w-full h-full"
          onLoad={handleMapLoad}
          onError={() => {
            console.log('Map failed to load, showing fallback');
            setIsLoaded(true);
          }}
        />
        
        {/* Fallback for when map fails to load */}
        {isLoaded && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
              <p className="text-xs text-gray-600">📍 Wayanad, Kerala</p>
            </div>
          </div>
        )}
        
        {/* Map Overlay Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={handleGetDirections}
            className="bg-white hover:bg-gray-50 p-2 rounded-lg shadow-md transition-colors duration-200 group"
            title="Get Directions"
          >
            <Navigation className="h-5 w-5 text-gray-700 group-hover:text-blue-600" />
          </button>
          <button
            onClick={handleOpenInMaps}
            className="bg-white hover:bg-gray-50 p-2 rounded-lg shadow-md transition-colors duration-200 group"
            title="Open in Google Maps"
          >
            <ExternalLink className="h-5 w-5 text-gray-700 group-hover:text-blue-600" />
          </button>
        </div>
      </div>
      
      {/* Map Information Panel */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-sm mb-1">Our Address</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{address}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-sm mb-1">Call Us</h4>
              <a 
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="text-xs text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                {phone}
              </a>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 text-sm mb-1">Office Hours</h4>
              <p className="text-xs text-gray-600">{hours}</p>
              <p className="text-xs text-gray-500 mt-1">Saturday: 9AM-4PM</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleGetDirections}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
        >
          <Navigation className="mr-2 h-4 w-4" />
          Get Directions
        </button>
        
        <button
          onClick={handleWhatsApp}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
        >
          <Phone className="mr-2 h-4 w-4" />
          WhatsApp Us
        </button>
        
        <button
          onClick={handleCall}
          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center"
        >
          <Phone className="mr-2 h-4 w-4" />
          Call Now
        </button>
      </div>
      
      {/* Additional Info */}
      <div className="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-100">
        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-blue-900 text-sm mb-1">Visit Us</h4>
            <p className="text-sm text-blue-800 leading-relaxed">
              Our office is easily accessible by public transport and has parking facilities available. 
              We're located on the main Kozhikode Road, making it convenient for students from across Wayanad district.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
