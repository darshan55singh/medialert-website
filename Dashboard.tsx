import React, { useState } from 'react';
import AppNavbar from '@/components/app/AppNavbar';
import MedicineCard from '@/components/app/MedicineCard';
import MedicineForm from '@/components/app/MedicineForm';
import MedicineInfoDialog from '@/components/app/MedicineInfoDialog';
import { useMedicines, Medicine, MedicineInput } from '@/hooks/useMedicines';
import { useReminders } from '@/hooks/useReminders';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, Search, Pill, Bell, AlertTriangle, Loader2 } from 'lucide-react';
import { differenceInDays, parseISO } from 'date-fns';

const Dashboard: React.FC = () => {
  const { medicines, loading, addMedicine, updateMedicine, deleteMedicine } = useMedicines();
  const [formOpen, setFormOpen] = useState(false);
  const [editMedicine, setEditMedicine] = useState<Medicine | null>(null);
  const [infoMedicine, setInfoMedicine] = useState<Medicine | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Enable reminders
  useReminders(medicines);

  // Filter medicines by search query
  const filteredMedicines = medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.dosage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Count medicines expiring soon
  const expiringCount = medicines.filter((m) => {
    if (!m.expiry_date) return false;
    const days = differenceInDays(parseISO(m.expiry_date), new Date());
    return days >= 0 && days <= 7;
  }).length;

  // Count expired medicines
  const expiredCount = medicines.filter((m) => {
    if (!m.expiry_date) return false;
    return differenceInDays(parseISO(m.expiry_date), new Date()) < 0;
  }).length;

  // Count active reminders
  const activeReminders = medicines.filter((m) => m.reminder_enabled && m.schedule_times.length > 0).length;

  const handleAdd = () => {
    setEditMedicine(null);
    setFormOpen(true);
  };

  const handleEdit = (medicine: Medicine) => {
    setEditMedicine(medicine);
    setFormOpen(true);
  };

  const handleFormSubmit = async (input: MedicineInput) => {
    if (editMedicine) {
      await updateMedicine(editMedicine.id, input);
    } else {
      await addMedicine(input);
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      await deleteMedicine(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />

      <main className="container mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Medicines</h1>
            <p className="text-muted-foreground mt-1">Manage your medications and reminders</p>
          </div>
          <Button onClick={handleAdd} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Medicine
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl p-4 border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Pill className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{medicines.length}</p>
                <p className="text-sm text-muted-foreground">Total Medicines</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-4 border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Bell className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeReminders}</p>
                <p className="text-sm text-muted-foreground">Active Reminders</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-4 border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{expiringCount}</p>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-4 border shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{expiredCount}</p>
                <p className="text-sm text-muted-foreground">Expired</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search medicines..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Medicines Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredMedicines.length === 0 ? (
          <div className="text-center py-12">
            <Pill className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">
              {searchQuery ? 'No medicines found' : 'No medicines yet'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? 'Try a different search term'
                : 'Add your first medicine to get started'}
            </p>
            {!searchQuery && (
              <Button onClick={handleAdd} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Medicine
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedicines.map((medicine) => (
              <MedicineCard
                key={medicine.id}
                medicine={medicine}
                onEdit={handleEdit}
                onDelete={(id) => setDeleteId(id)}
                onViewInfo={setInfoMedicine}
              />
            ))}
          </div>
        )}
      </main>

      {/* Add/Edit Form Dialog */}
      <MedicineForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditMedicine(null);
        }}
        onSubmit={handleFormSubmit}
        editMedicine={editMedicine}
      />

      {/* Medicine Info Dialog */}
      <MedicineInfoDialog
        medicine={infoMedicine}
        open={!!infoMedicine}
        onClose={() => setInfoMedicine(null)}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Medicine?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this medicine and all its reminders. This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;
