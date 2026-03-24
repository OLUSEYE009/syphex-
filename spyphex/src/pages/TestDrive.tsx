import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Car, CheckCircle, User } from 'lucide-react';

const TestDrivePage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem('syphex-testdrive-step');
    return saved ? Number(saved) : 1;
  });
  const [bookingRef] = useState(() => {
    const storedRef = localStorage.getItem('syphex-testdrive-ref');
    if (storedRef) return storedRef;
    const generated = `TD-${Date.now().toString().slice(-6)}`;
    localStorage.setItem('syphex-testdrive-ref', generated);
    return generated;
  });
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('syphex-testdrive-formData');
    return saved
      ? JSON.parse(saved)
      : {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          preferredCar: '',
          testDriveDate: '',
          testDriveTime: '',
          location: 'main-showroom',
          notes: '',
        };
  });

  const cars = [
    { id: 'x1', name: 'SYPHEX X1', price: '$89,000' },
    { id: 'v7', name: 'SYPHEX V7', price: '$129,000' },
    { id: 'gtr', name: 'SYPHEX GT-R', price: '$69,000' },
  ];

  const locations = [
    { id: 'main-showroom', name: 'Main Showroom', address: '123 Innovation Drive, Tech City, TC 12345' },
    { id: 'downtown', name: 'Downtown Location', address: '456 Urban Street, Metro City, MC 67890' },
    { id: 'airport', name: 'Airport Experience Center', address: '789 Aviation Blvd, Airport City, AC 13579' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const updated = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(updated);
    localStorage.setItem('syphex-testdrive-formData', JSON.stringify(updated));
  };

  const saveStep = (newStep: number) => {
    setStep(newStep);
    localStorage.setItem('syphex-testdrive-step', String(newStep));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      saveStep(step + 1);
      return;
    }

    // Demo submit to ProForms API endpoint
    const payload = {
      formName: 'SYPHEX Test Drive Booking',
      bookingRef,
      ...formData,
    };

    try {
      await fetch('https://app.proforms.top/f/prf5fae9f1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      console.log('ProForms submission payload:', payload);
    } catch (error) {
      console.warn('ProForms submit failed (demo):', error);
    }

    setStep(4); // Success step
    localStorage.removeItem('syphex-testdrive-formData');
    localStorage.removeItem('syphex-testdrive-step');
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((stepNum) => (
        <div key={stepNum} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= stepNum
                ? 'bg-[#3b82f6] text-white'
                : 'bg-[#1e2330] text-gray-400'
            }`}
          >
            {step > stepNum ? <CheckCircle className="w-4 h-4" /> : stepNum}
          </div>
          {stepNum < 3 && (
            <div
              className={`w-12 h-0.5 mx-2 ${
                step > stepNum ? 'bg-[#3b82f6]' : 'bg-[#1e2330]'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderPersonalInfo = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-2 mb-6">
        <User className="w-5 h-5 text-[#3b82f6]" />
        <h3 className="text-xl font-bold">Personal Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-[#1e2330] border border-[#3b82f6]/20 rounded-lg focus:border-[#3b82f6] focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-[#1e2330] border border-[#3b82f6]/20 rounded-lg focus:border-[#3b82f6] focus:outline-none"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-[#1e2330] border border-[#3b82f6]/20 rounded-lg focus:border-[#3b82f6] focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-[#1e2330] border border-[#3b82f6]/20 rounded-lg focus:border-[#3b82f6] focus:outline-none"
          required
        />
      </div>
    </motion.div>
  );

  const renderCarSelection = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-2 mb-6">
        <Car className="w-5 h-5 text-[#3b82f6]" />
        <h3 className="text-xl font-bold">Choose Your Test Drive Vehicle</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cars.map((car) => (
          <label
            key={car.id}
            className={`block p-4 bg-[#1e2330] border-2 rounded-lg cursor-pointer transition-all ${
              formData.preferredCar === car.id
                ? 'border-[#3b82f6] bg-[#3b82f6]/10'
                : 'border-[#3b82f6]/20 hover:border-[#3b82f6]/50'
            }`}
          >
            <input
              type="radio"
              name="preferredCar"
              value={car.id}
              checked={formData.preferredCar === car.id}
              onChange={handleInputChange}
              className="sr-only"
            />
            <div className="text-center">
              <h4 className="font-bold text-lg mb-2">{car.name}</h4>
              <p className="text-[#3b82f6] font-semibold">{car.price}</p>
            </div>
          </label>
        ))}
      </div>
    </motion.div>
  );

  const renderScheduleSelection = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-2 mb-6">
        <Calendar className="w-5 h-5 text-[#3b82f6]" />
        <h3 className="text-xl font-bold">Schedule Your Test Drive</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Preferred Date</label>
          <input
            type="date"
            name="testDriveDate"
            value={formData.testDriveDate}
            onChange={handleInputChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 bg-[#1e2330] border border-[#3b82f6]/20 rounded-lg focus:border-[#3b82f6] focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Preferred Time</label>
          <select
            name="testDriveTime"
            value={formData.testDriveTime}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-[#1e2330] border border-[#3b82f6]/20 rounded-lg focus:border-[#3b82f6] focus:outline-none"
            required
          >
            <option value="">Select time</option>
            <option value="9:00">9:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="13:00">1:00 PM</option>
            <option value="14:00">2:00 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="16:00">4:00 PM</option>
            <option value="17:00">5:00 PM</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Test Drive Location</label>
        <select
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-[#1e2330] border border-[#3b82f6]/20 rounded-lg focus:border-[#3b82f6] focus:outline-none"
        >
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
        <p className="text-sm text-gray-400 mt-2">
          {locations.find(loc => loc.id === formData.location)?.address}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Additional Notes (Optional)</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          placeholder="Any specific requirements or questions..."
          rows={3}
          className="w-full px-4 py-3 bg-[#1e2330] border border-[#3b82f6]/20 rounded-lg focus:border-[#3b82f6] focus:outline-none resize-none"
        />
      </div>
    </motion.div>
  );

  const renderBookingSummary = () => {
    const selectedCar = cars.find(car => car.id === formData.preferredCar);
    const selectedLocation = locations.find(loc => loc.id === formData.location);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1e2330] rounded-2xl p-6"
      >
        <h3 className="text-xl font-bold mb-6">Test Drive Summary</h3>

        <div className="space-y-4">
          {selectedCar && (
            <div className="flex justify-between">
              <span>Vehicle</span>
              <span className="font-bold">{selectedCar.name}</span>
            </div>
          )}

          {formData.testDriveDate && formData.testDriveTime && (
            <div className="flex justify-between">
              <span>Date & Time</span>
              <span className="font-bold">
                {new Date(formData.testDriveDate).toLocaleDateString()} at {formData.testDriveTime}
              </span>
            </div>
          )}

          {selectedLocation && (
            <div className="flex justify-between">
              <span>Location</span>
              <span className="font-bold text-right max-w-48">{selectedLocation.name}</span>
            </div>
          )}

          <div className="border-t border-gray-600 pt-4">
            <div className="text-sm text-gray-400">
              Duration: Approximately 45-60 minutes
            </div>
            <div className="text-sm text-gray-400 mt-1">
              Our test drive specialist will guide you through all features and answer your questions.
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderSuccess = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
      <h2 className="text-3xl font-bold mb-4">Test Drive Booked!</h2>
      <p className="text-gray-400 mb-8">
        Thank you for your interest in SYPHEX. Your test drive has been scheduled successfully.
      </p>
      <div className="space-y-4">
        <div className="bg-[#1e2330] rounded-lg p-4 max-w-md mx-auto">
          <p className="text-sm text-gray-500 mb-2">Booking Reference</p>
          <p className="font-bold">{bookingRef}</p>
        </div>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/')}
            className="bg-[#3b82f6] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#2563eb] transition-colors"
          >
            Return to Home
          </button>
          <button
            onClick={() => navigate('/checkout')}
            className="bg-[#1e2330] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#2a3441] transition-colors"
          >
            Configure & Order
          </button>
        </div>
      </div>
    </motion.div>
  );

  if (step === 4) {
    return (
      <div className="min-h-screen bg-[#0f1117] text-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {renderSuccess()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1117] text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
          <h1 className="text-2xl font-bold">Book Test Drive</h1>
        </div>

        {renderStepIndicator()}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {step === 1 && renderPersonalInfo()}
              {step === 2 && renderCarSelection()}
              {step === 3 && renderScheduleSelection()}

              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 bg-[#1e2330] text-white rounded-lg hover:bg-[#2a3441] transition-colors"
                  >
                    Previous
                  </button>
                )}
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-colors ml-auto"
                >
                  {step === 3 ? 'Book Test Drive' : 'Next'}
                </button>
              </div>
            </form>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            {renderBookingSummary()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDrivePage;