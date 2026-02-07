import React, { useEffect, useRef, useState } from 'react';
import Quagga from '@ericblade/quagga2';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, X, Loader2 } from 'lucide-react';

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
  onClose: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan, onClose }) => {
  const scannerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!scannerRef.current) return;

    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          target: scannerRef.current,
          constraints: {
            width: { min: 640 },
            height: { min: 480 },
            facingMode: 'environment',
          },
        },
        locator: {
          patchSize: 'medium',
          halfSample: true,
        },
        numOfWorkers: navigator.hardwareConcurrency || 4,
        decoder: {
          readers: [
            'ean_reader',
            'ean_8_reader',
            'upc_reader',
            'upc_e_reader',
            'code_128_reader',
            'code_39_reader',
          ],
        },
        locate: true,
      },
      (err) => {
        if (err) {
          console.error('Quagga init error:', err);
          setError('Camera access denied or not available. Please check your permissions.');
          setLoading(false);
          return;
        }
        Quagga.start();
        setLoading(false);
      }
    );

    Quagga.onDetected((result) => {
      if (result.codeResult.code) {
        Quagga.stop();
        onScan(result.codeResult.code);
      }
    });

    return () => {
      Quagga.stop();
      Quagga.offDetected();
    };
  }, [onScan]);

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-0">
        <div className="absolute top-2 right-2 z-10">
          <Button
            variant="secondary"
            size="icon"
            onClick={onClose}
            className="rounded-full bg-background/80 backdrop-blur-sm"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Starting camera...</p>
            </div>
          </div>
        )}

        {error ? (
          <div className="p-8 text-center">
            <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        ) : (
          <div
            ref={scannerRef}
            className="w-full aspect-video bg-black"
            style={{ minHeight: 300 }}
          />
        )}

        <div className="p-4 text-center bg-muted/50">
          <p className="text-sm text-muted-foreground">
            Point your camera at a medicine barcode
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarcodeScanner;
