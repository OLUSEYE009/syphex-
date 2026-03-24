import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, MapPin, Calendar, CheckCircle } from 'lucide-react';

const CheckoutPage = () => {
  const location = useLocation();
  const [orderRef] = useState(() => {
    const storedRef = localStorage.getItem('syphex-checkout-orderRef');
    if (storedRef) return storedRef;
    const newRef = `SPX-${Date.now().toString().slice(-6)}`;
    localStorage.setItem('syphex-checkout-orderRef', newRef);
    return newRef;
  });
  const navigate = useNavigate();
  const [step, setStep] = useState(() => {
    const saved = localStorage.getItem('syphex-checkout-step');
    return saved ? Number(saved) : 1;
  });
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('syphex-checkout-formData');
    return saved
      ? JSON.parse(saved)
      : {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          testDriveDate: '',
          testDriveTime: '',
        };
  });

  // Get car configuration from location state (passed from configurator)
  const carConfig = location.state?.carConfig || {
    car: { name: 'SYPHEX X1', price: '$89,000' },
    selectedColor: { name: 'Midnight Black' },
    selectedFeatures: {},
    totalPrice: 89000,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const updated = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(updated);
    localStorage.setItem('syphex-checkout-formData', JSON.stringify(updated));
  };

  const saveStep = (newStep: number) => {
    setStep(newStep);
    localStorage.setItem('syphex-checkout-step', String(newStep));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      saveStep(step + 1);
      return;
    }

    const payload = {
      formName: 'SYPHEX Checkout Order',
      orderRef,
      ...formData,
      carConfig,
    };

    try {
      await fetch('https://app.proforms.top/f/prf5fae9f1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      console.log('ProForms checkout payload:', payload);
    } catch (error) {
      console.warn('ProForms checkout submit failed (demo):', error);
    }

    console.log('Order submitted:', { formData, carConfig });
    setStep(4); // Success step
    localStorage.removeItem('syphex-checkout-formData');
    localStorage.removeItem('syphex-checkout-step');
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

  const renderAddressInfo = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-2 mb-6">
        <MapPin className="w-5 h-5 text-[#3b82f6]" />
        <h3 className="text-xl font-bold">Delivery Address</h3>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Street Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-[#1e2330] border border-[#3b82f6]/20 rounded-lg focus:border-[#3b82f6] focus:outline-none"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-[#1e2330] border border-[#3b82f6]/20 rounded-lg focus:border-[#3b82f6] focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-[#1e2330] border border-[#3b82f6]/20 rounded-lg focus:border-[#3b82f6] focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">ZIP Code</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-[#1e2330] border border-[#3b82f6]/20 rounded-lg focus:border-[#3b82f6] focus:outline-none"
            required
          />
        </div>
      </div>
    </motion.div>
  );

  const renderTestDriveBooking = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center space-x-2 mb-6">
        <Calendar className="w-5 h-5 text-[#3b82f6]" />
        <h3 className="text-xl font-bold">Book Test Drive (Optional)</h3>
      </div>

      <p className="text-gray-400 mb-4">
        Experience your configured {carConfig.car.name} before making your final decision.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Preferred Date</label>
          <input
            type="date"
            name="testDriveDate"
            value={formData.testDriveDate}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-[#1e2330] border border-[#3b82f6]/20 rounded-lg focus:border-[#3b82f6] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Preferred Time</label>
          <select
            name="testDriveTime"
            value={formData.testDriveTime}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-[#1e2330] border border-[#3b82f6]/20 rounded-lg focus:border-[#3b82f6] focus:outline-none"
          >
            <option value="">Select time</option>
            <option value="9:00">9:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="13:00">1:00 PM</option>
            <option value="14:00">2:00 PM</option>
            <option value="15:00">3:00 PM</option>
            <option value="16:00">4:00 PM</option>
          </select>
        </div>
      </div>
    </motion.div>
  );

  const renderOrderSummary = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1e2330] rounded-2xl p-6"
    >
      <h3 className="text-xl font-bold mb-6">Order Summary</h3>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span>{carConfig.car.name}</span>
          <span className="font-bold">{carConfig.car.price}</span>
        </div>

        <div className="flex justify-between text-sm text-gray-400">
          <span>Color: {carConfig.selectedColor.name}</span>
          <span>$0</span>
        </div>

        {Object.keys(carConfig.selectedFeatures).length > 0 && (
          <div className="text-sm text-gray-400">
            <div className="mb-2">Additional Features:</div>
            {Object.entries(carConfig.selectedFeatures).map(([feature]) => (
              <div key={feature} className="flex justify-between ml-4">
                <span>• {feature}</span>
                <span>$2,500</span> {/* This would need to be dynamic */}
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-gray-600 pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-[#3b82f6]">${carConfig.totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderSuccess = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
      <h2 className="text-3xl font-bold mb-4">Order Confirmed!</h2>
      <p className="text-gray-400 mb-8">
        Thank you for choosing SYPHEX. Your order has been submitted successfully.
      </p>
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          Order Reference: {orderRef}
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-[#3b82f6] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#2563eb] transition-colors"
        >
          Return to Home
        </button>
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
          <h1 className="text-2xl font-bold">Checkout</h1>
        </div>

        {renderStepIndicator()}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {step === 1 && renderPersonalInfo()}
              {step === 2 && renderAddressInfo()}
              {step === 3 && renderTestDriveBooking()}

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
                  {step === 3 ? 'Complete Order' : 'Next'}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            {renderOrderSummary()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;