import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Medicine } from '@/hooks/useMedicines';
import { 
  Clock, 
  Calendar, 
  Pill, 
  Bell, 
  BellOff, 
  Edit, 
  Trash2, 
  AlertTriangle,
  ExternalLink,
  Info
} from 'lucide-react';
import { format, differenceInDays, parseISO } from 'date-fns';

interface MedicineCardProps {
  medicine: Medicine;
  onEdit: (medicine: Medicine) => void;
  onDelete: (id: string) => void;
  onViewInfo: (medicine: Medicine) => void;
}

const MedicineCard: React.FC<MedicineCardProps> = ({
  medicine,
  onEdit,
  onDelete,
  onViewInfo,
}) => {
  const isExpiringSoon = medicine.expiry_date 
    ? differenceInDays(parseISO(medicine.expiry_date), new Date()) <= 7
    : false;

  const isExpired = medicine.expiry_date 
    ? differenceInDays(parseISO(medicine.expiry_date), new Date()) < 0
    : false;

  const daysUntilExpiry = medicine.expiry_date
    ? differenceInDays(parseISO(medicine.expiry_date), new Date())
    : null;

  const orderLinks = [
    { name: 'Tata 1mg', url: `https://www.1mg.com/search/all?name=${encodeURIComponent(medicine.name)}` },
    { name: 'NetMeds', url: `https://www.netmeds.com/catalogsearch/result?q=${encodeURIComponent(medicine.name)}` },
    { name: 'PharmEasy', url: `https://pharmeasy.in/search/all?name=${encodeURIComponent(medicine.name)}` },
  ];

  return (
    <Card className={`relative transition-all hover:shadow-lg ${isExpired ? 'border-destructive' : isExpiringSoon ? 'border-yellow-500' : ''}`}>
      {(isExpired || isExpiringSoon) && (
        <div className={`absolute top-0 left-0 right-0 px-3 py-1.5 text-xs font-medium text-center ${isExpired ? 'bg-destructive text-destructive-foreground' : 'bg-yellow-500 text-white'}`}>
          <AlertTriangle className="h-3 w-3 inline mr-1" />
          {isExpired ? 'EXPIRED' : `Expires in ${daysUntilExpiry} days`}
        </div>
      )}

      <CardHeader className={`pb-2 ${isExpired || isExpiringSoon ? 'pt-8' : ''}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <Pill className="h-5 w-5 text-primary" />
              {medicine.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{medicine.dosage}</p>
          </div>
          <Badge variant={medicine.reminder_enabled ? 'default' : 'secondary'}>
            {medicine.reminder_enabled ? (
              <><Bell className="h-3 w-3 mr-1" /> On</>
            ) : (
              <><BellOff className="h-3 w-3 mr-1" /> Off</>
            )}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Schedule Times */}
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-wrap gap-1">
            {medicine.schedule_times.length > 0 ? (
              medicine.schedule_times.map((time, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {time}
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">No schedule set</span>
            )}
          </div>
        </div>

        {/* Expiry Date */}
        {medicine.expiry_date && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Expires: {format(parseISO(medicine.expiry_date), 'MMM dd, yyyy')}</span>
          </div>
        )}

        {/* What it's used for */}
        {medicine.used_for && (
          <div className="text-sm">
            <p className="text-muted-foreground mb-1">Used for:</p>
            <p className="line-clamp-2">{medicine.used_for}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewInfo(medicine)}
          >
            <Info className="h-4 w-4 mr-1" />
            Info
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(medicine)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive hover:bg-destructive/10"
            onClick={() => onDelete(medicine.id)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>

        {/* Order Links */}
        <div className="border-t pt-3">
          <p className="text-xs text-muted-foreground mb-2">Order from:</p>
          <div className="flex flex-wrap gap-2">
            {orderLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="sm" className="text-xs">
                  {link.name}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </a>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicineCard;
