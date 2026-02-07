import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Medicine } from '@/hooks/useMedicines';
import { useMedicineInfo, MedicineInfo } from '@/hooks/useMedicineInfo';
import { Loader2, AlertTriangle, Pill, FileText, ShieldAlert, ExternalLink } from 'lucide-react';

interface MedicineInfoDialogProps {
  medicine: Medicine | null;
  open: boolean;
  onClose: () => void;
}

const MedicineInfoDialog: React.FC<MedicineInfoDialogProps> = ({
  medicine,
  open,
  onClose,
}) => {
  const { searchMedicine, loading, error } = useMedicineInfo();
  const [info, setInfo] = useState<MedicineInfo | null>(null);

  useEffect(() => {
    if (open && medicine) {
      // First check if medicine already has stored info
      if (medicine.used_for || medicine.precautions) {
        setInfo({
          name: medicine.name,
          purpose: medicine.used_for || 'Not available',
          warnings: medicine.precautions || 'No specific warnings',
          dosage_and_administration: medicine.description || 'Consult your doctor',
          active_ingredients: [],
        });
      } else {
        // Fetch from API
        searchMedicine(medicine.name).then(result => {
          setInfo(result);
        });
      }
    }
  }, [open, medicine]);

  const orderLinks = medicine ? [
    { name: 'Tata 1mg', url: `https://www.1mg.com/search/all?name=${encodeURIComponent(medicine.name)}` },
    { name: 'NetMeds', url: `https://www.netmeds.com/catalogsearch/result?q=${encodeURIComponent(medicine.name)}` },
    { name: 'PharmEasy', url: `https://pharmeasy.in/search/all?name=${encodeURIComponent(medicine.name)}` },
  ] : [];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-primary" />
            {medicine?.name}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Fetching medicine information...</span>
          </div>
        ) : error && !info ? (
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
            <p className="text-muted-foreground">{error}</p>
            <p className="text-sm text-muted-foreground mt-2">
              The medicine information could not be found in the database.
            </p>
          </div>
        ) : info ? (
          <div className="space-y-4">
            {/* Purpose */}
            <div>
              <div className="flex items-center gap-2 text-sm font-medium mb-2">
                <FileText className="h-4 w-4 text-primary" />
                What it's used for
              </div>
              <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                {info.purpose}
              </p>
            </div>

            <Separator />

            {/* Warnings */}
            <div>
              <div className="flex items-center gap-2 text-sm font-medium mb-2">
                <ShieldAlert className="h-4 w-4 text-yellow-500" />
                Warnings & Precautions
              </div>
              <p className="text-sm text-muted-foreground bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                {info.warnings}
              </p>
            </div>

            <Separator />

            {/* Dosage */}
            <div>
              <div className="flex items-center gap-2 text-sm font-medium mb-2">
                <Pill className="h-4 w-4 text-primary" />
                Dosage Information
              </div>
              <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                {info.dosage_and_administration}
              </p>
            </div>

            {/* Active Ingredients */}
            {info.active_ingredients.length > 0 && (
              <>
                <Separator />
                <div>
                  <div className="text-sm font-medium mb-2">Active Ingredients</div>
                  <div className="flex flex-wrap gap-2">
                    {info.active_ingredients.map((ingredient, index) => (
                      <Badge key={index} variant="outline">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}

            <Separator />

            {/* Order Links */}
            <div>
              <div className="text-sm font-medium mb-2">Order This Medicine</div>
              <div className="flex flex-wrap gap-2">
                {orderLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="secondary" size="sm">
                      {link.name}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        <div className="pt-4">
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MedicineInfoDialog;
