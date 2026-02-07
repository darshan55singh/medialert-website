import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Medicine, MedicineInput } from '@/hooks/useMedicines';
import { useMedicineInfo } from '@/hooks/useMedicineInfo';
import BarcodeScanner from './BarcodeScanner';
import { Loader2, QrCode, Search, X, Plus } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(1, 'Medicine name is required'),
  dosage: z.string().min(1, 'Dosage is required'),
  expiry_date: z.string().optional(),
  barcode: z.string().optional(),
  description: z.string().optional(),
  used_for: z.string().optional(),
  precautions: z.string().optional(),
  reminder_enabled: z.boolean(),
});

interface MedicineFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (medicine: MedicineInput) => Promise<any>;
  editMedicine?: Medicine | null;
}

const MedicineForm: React.FC<MedicineFormProps> = ({
  open,
  onClose,
  onSubmit,
  editMedicine,
}) => {
  const [showScanner, setShowScanner] = useState(false);
  const [scheduleTimes, setScheduleTimes] = useState<string[]>([]);
  const [newTime, setNewTime] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const { searchMedicine, searchByBarcode, loading: infoLoading, error: infoError, clearError } = useMedicineInfo();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      dosage: '',
      expiry_date: '',
      barcode: '',
      description: '',
      used_for: '',
      precautions: '',
      reminder_enabled: true,
    },
  });

  useEffect(() => {
    if (editMedicine) {
      form.reset({
        name: editMedicine.name,
        dosage: editMedicine.dosage,
        expiry_date: editMedicine.expiry_date || '',
        barcode: editMedicine.barcode || '',
        description: editMedicine.description || '',
        used_for: editMedicine.used_for || '',
        precautions: editMedicine.precautions || '',
        reminder_enabled: editMedicine.reminder_enabled,
      });
      setScheduleTimes(editMedicine.schedule_times || []);
    } else {
      form.reset();
      setScheduleTimes([]);
    }
  }, [editMedicine, form, open]);

  const handleAddTime = () => {
    if (newTime && !scheduleTimes.includes(newTime)) {
      setScheduleTimes([...scheduleTimes, newTime].sort());
      setNewTime('');
    }
  };

  const handleRemoveTime = (time: string) => {
    setScheduleTimes(scheduleTimes.filter(t => t !== time));
  };

  const handleSearchInfo = async () => {
    const name = form.getValues('name');
    if (!name) return;

    const info = await searchMedicine(name);
    if (info) {
      form.setValue('used_for', info.purpose);
      form.setValue('precautions', info.warnings);
      if (!form.getValues('description')) {
        form.setValue('description', info.dosage_and_administration);
      }
    }
  };

  const handleBarcodeScan = async (barcode: string) => {
    setShowScanner(false);
    form.setValue('barcode', barcode);
    
    const info = await searchByBarcode(barcode);
    if (info) {
      form.setValue('name', info.name);
      form.setValue('used_for', info.purpose);
      form.setValue('precautions', info.warnings);
      form.setValue('description', info.dosage_and_administration);
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    try {
      await onSubmit({
        name: values.name,
        dosage: values.dosage,
        reminder_enabled: values.reminder_enabled,
        schedule_times: scheduleTimes,
        expiry_date: values.expiry_date || null,
        barcode: values.barcode || null,
        description: values.description || null,
        used_for: values.used_for || null,
        precautions: values.precautions || null,
      });
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editMedicine ? 'Edit Medicine' : 'Add New Medicine'}
          </DialogTitle>
        </DialogHeader>

        {showScanner ? (
          <BarcodeScanner
            onScan={handleBarcodeScan}
            onClose={() => setShowScanner(false)}
          />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              {/* Barcode Scanner Button */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowScanner(true)}
                  className="w-full"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  Scan Barcode
                </Button>
              </div>

              {/* Name Field with Search */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medicine Name *</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input placeholder="Enter medicine name" {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleSearchInfo}
                        disabled={infoLoading}
                      >
                        {infoLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Search className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {infoError && (
                <div className="text-sm text-yellow-600 bg-yellow-50 p-2 rounded">
                  {infoError}
                </div>
              )}

              {/* Dosage */}
              <FormField
                control={form.control}
                name="dosage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dosage *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 500mg, 1 tablet" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Schedule Times */}
              <div className="space-y-2">
                <Label>Reminder Times</Label>
                <div className="flex gap-2">
                  <Input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-auto"
                  />
                  <Button type="button" variant="outline" onClick={handleAddTime}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {scheduleTimes.map((time) => (
                    <Badge key={time} variant="secondary" className="px-3 py-1">
                      {time}
                      <button
                        type="button"
                        onClick={() => handleRemoveTime(time)}
                        className="ml-2 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Expiry Date */}
              <FormField
                control={form.control}
                name="expiry_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Barcode */}
              <FormField
                control={form.control}
                name="barcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Barcode (auto-filled from scan)</FormLabel>
                    <FormControl>
                      <Input placeholder="Barcode number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Used For */}
              <FormField
                control={form.control}
                name="used_for"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Used For</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What is this medicine used for?"
                        className="resize-none"
                        rows={2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Precautions */}
              <FormField
                control={form.control}
                name="precautions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precautions & Warnings</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any warnings or precautions?"
                        className="resize-none"
                        rows={2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional notes..."
                        className="resize-none"
                        rows={2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Reminder Toggle */}
              <FormField
                control={form.control}
                name="reminder_enabled"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <FormLabel>Enable Reminders</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Get browser notifications at scheduled times
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting} className="flex-1">
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  {editMedicine ? 'Update Medicine' : 'Add Medicine'}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MedicineForm;
