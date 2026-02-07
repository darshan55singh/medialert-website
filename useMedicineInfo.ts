import { useState } from 'react';

export interface MedicineInfo {
  name: string;
  purpose: string;
  warnings: string;
  dosage_and_administration: string;
  active_ingredients: string[];
}

export const useMedicineInfo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchMedicine = async (query: string): Promise<MedicineInfo | null> => {
    setLoading(true);
    setError(null);

    try {
      // Search OpenFDA API for drug information
      const response = await fetch(
        `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${encodeURIComponent(query)}"+openfda.generic_name:"${encodeURIComponent(query)}"&limit=1`
      );

      if (!response.ok) {
        // Try a more lenient search
        const fallbackResponse = await fetch(
          `https://api.fda.gov/drug/label.json?search=${encodeURIComponent(query)}&limit=1`
        );
        
        if (!fallbackResponse.ok) {
          throw new Error('Medicine not found in database');
        }
        
        const fallbackData = await fallbackResponse.json();
        return parseFDAResponse(fallbackData, query);
      }

      const data = await response.json();
      return parseFDAResponse(data, query);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch medicine information';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const parseFDAResponse = (data: any, query: string): MedicineInfo | null => {
    if (!data.results || data.results.length === 0) {
      setError('Medicine not found in database');
      return null;
    }

    const result = data.results[0];
    const openfda = result.openfda || {};

    return {
      name: openfda.brand_name?.[0] || openfda.generic_name?.[0] || query,
      purpose: result.purpose?.[0] || result.indications_and_usage?.[0] || 'Information not available',
      warnings: result.warnings?.[0] || result.warnings_and_cautions?.[0] || 'No specific warnings listed',
      dosage_and_administration: result.dosage_and_administration?.[0] || 'Consult your healthcare provider',
      active_ingredients: openfda.substance_name || result.active_ingredient || [],
    };
  };

  const searchByBarcode = async (barcode: string): Promise<MedicineInfo | null> => {
    setLoading(true);
    setError(null);

    try {
      // First try to get product info from UPC database
      const response = await fetch(
        `https://api.fda.gov/drug/ndc.json?search=product_ndc:"${barcode}"+package_ndc:"${barcode}"&limit=1`
      );

      if (!response.ok) {
        // If NDC search fails, try generic search
        return searchMedicine(barcode);
      }

      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const product = data.results[0];
        const brandName = product.brand_name || product.generic_name || barcode;
        
        // Now search for detailed information
        return searchMedicine(brandName);
      }

      setError('Product not found. Try entering the medicine name manually.');
      return null;
    } catch (err) {
      setError('Failed to lookup barcode. Try entering the medicine name manually.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    searchMedicine,
    searchByBarcode,
    loading,
    error,
    clearError: () => setError(null),
  };
};
