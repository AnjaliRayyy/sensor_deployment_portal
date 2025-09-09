// components/QrScanner.jsx
import React from 'react';
import { QrScanner } from '@yudiel/react-qr-scanner';

const QrScannerView = ({ onDecode, onError }) => {
  return (
    <div className="relative overflow-hidden rounded-lg h-80 w-80">
      <QrScanner
        onDecode={onDecode}
        onError={onError}
        constraints={{ facingMode: 'environment' }}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div className="absolute inset-0 border-4 border-blue-500 border-dashed rounded-lg pointer-events-none"></div>
    </div>
  );
};

export default QrScannerView;
