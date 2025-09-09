// App.jsx
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import NavBar from './components/NavBar';
import QrScannerView from './components/QrScanner';
import SensorDeployForm from './components/SensorDeployForm';
import Sound from './assets/success.mp3';

function App() {
  const [sensorData, setSensorData] = useState('');
  const [scanning, setScanning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);

  // Play success sound when QR is scanned
  const playSuccessSound = () => {
    const audio = new Audio(Sound);
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  const handleScanSuccess = (result) => {
    if (hasScanned) return; // Prevent multiple scans

    console.log('QR Code scanned:', result);
    setSensorData(result);
    setHasScanned(true);
    setScanning(false); // Turn off camera immediately
    playSuccessSound();
    // Show success toast
    toast.success('QR Code scanned successfully!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleScanError = (error) => {
    console.error('QR Scanner error:', error);
    toast.error(`Scanner error: ${error.message || 'Unknown error'}`);
  };

  const handleResetScan = () => {
    setSensorData('');
    setScanning(true);
    setHasScanned(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Sensor Deployment Portal
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Scan your sensor QR code and complete the deployment information
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* QR Scanner Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Scan Sensor QR Code
              </h2>
              
              {scanning ? (
                <div className="flex flex-col items-center">
                  <QrScannerView
                    onDecode={handleScanSuccess}
                    onError={handleScanError}
                  />
                  <button
                    onClick={() => {
                      setScanning(false);
                      setHasScanned(false);
                    }}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Cancel Scanning
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  {sensorData ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center justify-center text-green-600 mb-2">
                        <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span className="font-medium">QR Code Scanned Successfully</span>
                      </div>
                      <p className="text-sm text-gray-700 break-all bg-gray-100 p-2 rounded mt-2">
                        {sensorData}
                      </p>
                      <button
                        onClick={handleResetScan}
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Scan Again
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-600 mb-4">Scanner is inactive</p>
                      <button
                        onClick={() => setScanning(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Start Scanning
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Deployment Form Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Deployment Information
              </h2>
              <SensorDeployForm 
                sensorData={sensorData}
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                onSuccess={handleResetScan}
              />
            </div>
          </div>
        </motion.div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;