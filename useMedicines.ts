import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Medicine {
  id: string;
  user_id: string;
  name: string;
  dosage: string;
  schedule_times: string[];
  expiry_date: string | null;
  barcode: string | null;
  description: string | null;
  used_for: string | null;
  precautions: string | null;
  reminder_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface MedicineInput {
  name: string;
  dosage: string;
  schedule_times: string[];
  expiry_date?: string | null;
  barcode?: string | null;
  description?: string | null;
  used_for?: string | null;
  precautions?: string | null;
  reminder_enabled?: boolean;
}

export const useMedicines = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchMedicines = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('medicines')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMedicines(data || []);
    } catch (error) {
      console.error('Error fetching medicines:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch medicines',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addMedicine = async (medicine: MedicineInput) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('medicines')
        .insert({
          ...medicine,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      
      setMedicines(prev => [data, ...prev]);
      toast({
        title: 'Success',
        description: 'Medicine added successfully',
      });
      return data;
    } catch (error) {
      console.error('Error adding medicine:', error);
      toast({
        title: 'Error',
        description: 'Failed to add medicine',
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateMedicine = async (id: string, medicine: Partial<MedicineInput>) => {
    try {
      const { data, error } = await supabase
        .from('medicines')
        .update(medicine)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setMedicines(prev => prev.map(m => m.id === id ? data : m));
      toast({
        title: 'Success',
        description: 'Medicine updated successfully',
      });
      return data;
    } catch (error) {
      console.error('Error updating medicine:', error);
      toast({
        title: 'Error',
        description: 'Failed to update medicine',
        variant: 'destructive',
      });
      return null;
    }
  };

  const deleteMedicine = async (id: string) => {
    try {
      const { error } = await supabase
        .from('medicines')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setMedicines(prev => prev.filter(m => m.id !== id));
      toast({
        title: 'Success',
        description: 'Medicine deleted successfully',
      });
      return true;
    } catch (error) {
      console.error('Error deleting medicine:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete medicine',
        variant: 'destructive',
      });
      return false;
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, [user]);

  return {
    medicines,
    loading,
    addMedicine,
    updateMedicine,
    deleteMedicine,
    refetch: fetchMedicines,
  };
};
