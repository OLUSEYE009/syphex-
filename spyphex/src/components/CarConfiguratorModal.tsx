import { motion, AnimatePresence } from 'framer-motion';
import { X, Palette, Settings } from 'lucide-react';
import { useState } from 'react';

interface CarConfiguratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: {
    name: string;
    image: string;
    price: string;
    stats: { acceleration: string; range: string; power: string };
  };
}

const COLORS = [
  { name: 'Midnight Black', hex: '#000000' },
  { name: 'Pearl White', hex: '#FFFFFF' },
  { name: 'Electric Blue', hex: '#3b82f6' },
  { name: 'Crimson Red', hex: '#dc2626' },
  { name: 'Forest Green', hex: '#16a34a' },
];

const FEATURES = [
  {
    id: 'sideMirrors',
    name: 'Side Mirrors',
    options: [
      { name: 'Standard Mirrors', price: 0 },
      { name: 'Camera Mirrors', price: 2500 },
    ],
  },
  {
    id: 'sunroof',
    name: 'Sunroof',
    options: [
      { name: 'No Sunroof', price: 0 },
      { name: 'Panoramic Sunroof', price: 3500 },
    ],
  },
  {
    id: 'audio',
    name: 'Audio System',
    options: [
      { name: 'Standard Audio', price: 0 },
      { name: 'Premium Audio Package', price: 2000 },
    ],
  },
  {
    id: 'wheels',
    name: 'Wheels',
    options: [
      { name: 'Standard Wheels', price: 0 },
      { name: 'Sport Wheels', price: 1500 },
    ],
  },
];

const CarConfiguratorModal = ({ isOpen, onClose, car }: CarConfiguratorModalProps) => {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedFeatures, setSelectedFeatures] = useState<Record<string, number>>({});

  const calculateTotalPrice = () => {
    const basePrice = parseInt(car.price.replace(/[$,]/g, ''));
    const featurePrice = Object.values(selectedFeatures).reduce((sum, index) => {
      const feature = FEATURES.find(f => f.id === Object.keys(selectedFeatures).find(k => selectedFeatures[k] === index));
      return sum + (feature?.options[index]?.price || 0);
    }, 0);
    return basePrice + featurePrice;
  };

  const handleFeatureChange = (featureId: string, optionIndex: number) => {
    setSelectedFeatures(prev => ({
      ...prev,
      [featureId]: optionIndex,
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#0f1117] rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col lg:flex-row flex-1 min-h-0">
              {/* Car Image Section */}
              <div className="lg:w-1/2 p-4 sm:p-6 flex-shrink-0">
                <div className="relative">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-xl sm:rounded-2xl"
                    style={{
                      filter: selectedColor.hex === '#FFFFFF' ? 'brightness(1.1)' : `hue-rotate(${selectedColor.hex === '#dc2626' ? '0deg' : selectedColor.hex === '#16a34a' ? '120deg' : selectedColor.hex === '#3b82f6' ? '210deg' : '0deg'})`,
                    }}
                  />
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black/70 text-white px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm">
                    {selectedColor.name}
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 text-center">
                  <h3 className="text-xl sm:text-2xl font-bold">{car.name}</h3>
                  <p className="text-2xl sm:text-3xl font-bold text-[#3b82f6] mt-1 sm:mt-2">${calculateTotalPrice().toLocaleString()}</p>
                </div>
              </div>

              {/* Configuration Section */}
              <div className="lg:w-1/2 flex flex-col min-h-0">
                <div className="p-4 sm:p-6 border-b border-[#1e2330] lg:border-b-0">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg sm:text-2xl font-bold pr-4">Configure Your {car.name}</h2>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-[#1e2330] rounded-full transition-colors flex-shrink-0"
                    >
                      <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  {/* Color Selection */}
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                      <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-[#3b82f6]" />
                      <h3 className="text-base sm:text-lg font-semibold">Exterior Color</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                      {COLORS.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color)}
                          className={`p-2 sm:p-3 rounded-lg border-2 transition-all ${
                            selectedColor.name === color.name
                              ? 'border-[#3b82f6] bg-[#3b82f6]/10'
                              : 'border-[#1e2330] hover:border-[#3b82f6]/50'
                          }`}
                        >
                          <div
                            className="w-full h-6 sm:h-8 rounded mb-1 sm:mb-2"
                            style={{ backgroundColor: color.hex }}
                          ></div>
                          <span className="text-xs sm:text-sm font-medium leading-tight">{color.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Features Selection */}
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                      <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-[#3b82f6]" />
                      <h3 className="text-base sm:text-lg font-semibold">Features & Options</h3>
                    </div>
                    <div className="space-y-4 sm:space-y-6">
                      {FEATURES.map((feature) => (
                        <div key={feature.id}>
                          <h4 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">{feature.name}</h4>
                          <div className="space-y-2">
                            {feature.options.map((option, index) => (
                              <label
                                key={option.name}
                                className="flex items-center justify-between p-2 sm:p-3 bg-[#1e2330] rounded-lg cursor-pointer hover:bg-[#1e2330]/80 transition-colors"
                              >
                                <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                                  <input
                                    type="radio"
                                    name={feature.id}
                                    checked={selectedFeatures[feature.id] === index}
                                    onChange={() => handleFeatureChange(feature.id, index)}
                                    className="w-4 h-4 text-[#3b82f6] bg-[#1e2330] border-[#3b82f6] focus:ring-[#3b82f6] flex-shrink-0"
                                  />
                                  <span className="font-medium text-sm sm:text-base truncate">{option.name}</span>
                                </div>
                                {option.price > 0 && (
                                  <span className="text-[#3b82f6] font-semibold text-sm sm:text-base flex-shrink-0 ml-2">
                                    +${option.price.toLocaleString()}
                                  </span>
                                )}
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Order Button - Fixed at bottom */}
                <div className="p-4 sm:p-6 border-t border-[#1e2330] lg:border-t-0">
                  <button className="w-full bg-[#3b82f6] text-white py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-[#2563eb] transition-colors">
                    Order Now - ${calculateTotalPrice().toLocaleString()}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CarConfiguratorModal;