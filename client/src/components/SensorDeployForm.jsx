// components/SensorDeployForm.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const SensorDeployForm = ({ sensorData, isSubmitting, setIsSubmitting, onSuccess }) => {
  const [formData, setFormData] = useState({
    adminName: '',
    institutionName: '',
    adminId: '',
    location: ''
  });

  // Generate a unique ID when component mounts
  useEffect(() => {
    const generateUniqueId = () => {
      const timestamp = Date.now().toString(36);
      const randomStr = Math.random().toString(36).substring(2, 8);
      return `${timestamp}-${randomStr}`.toUpperCase();
    };
    
    setFormData(prev => ({
      ...prev,
      adminId: generateUniqueId()
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!sensorData) {
      toast.error('Please scan a QR code first');
      return;
    }
    
    if (!formData.adminName || !formData.institutionName || !formData.location) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const payload = {
        ...formData,
        sensorData
      };
      
      console.log('Submitting deployment data:', payload);
      
      // Send data to backend API
       const response = await fetch('http://localhost:8000/api/storeSensorData', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
      
      const result = await response.json();
      
      if (response.ok) {
        toast.success('Sensor deployed successfully!');
        console.log('Deployment successful:', result);
        
        // Reset form
        setFormData({
          adminName: '',
          institutionName: '',
          adminId: formData.adminId, // Keep the same generated ID
          location: ''
        });
        
        onSuccess();
      } else {
        toast.error(result.message || 'Failed to deploy sensor');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Admin Name *
        </label>
        <input
          type="text"
          name="adminName"
          value={formData.adminName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="Enter your full name"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Institution Name *
        </label>
        <input
          type="text"
          name="institutionName"
          value={formData.institutionName}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="Enter institution name"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Admin ID
        </label>
        <input
          type="text"
          name="adminId"
          value={formData.adminId}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
        />
        <p className="text-xs text-gray-500 mt-1">Auto-generated unique identifier</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Deployment Location *
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="Enter deployment location"
        />
      </div>
      
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting || !sensorData}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            isSubmitting || !sensorData
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isSubmitting ? 'Deploying...' : 'Deploy Sensor'}
        </button>
      </div>
      
      {sensorData && (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <p className="text-sm font-medium text-gray-700">Scanned Sensor Data:</p>
          <p className="text-xs font-mono break-all mt-1">{sensorData}</p>
        </div>
      )}
    </form>
  );
};

export default SensorDeployForm;