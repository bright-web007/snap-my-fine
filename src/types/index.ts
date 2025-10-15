export interface Transaction {
  council: string;
  pcnNumber: string;
  fineAmount: string;
  status: 'success' | 'failed';
}

export interface SavedFine {
  id: string;
  council: string;
  pcnNumber: string;
  vehicleNumber: string;
  fineAmount: string;
  email: string;
  dateSaved: string;
}

export interface FormData {
  council: string;
  pcnNumber: string;
  vehicleNumber: string;
  fineAmount: string;
  email: string;
}

export interface ValidationErrors {
  council: boolean;
  pcnNumber: boolean;
  vehicleNumber: boolean;
  fineAmount: boolean;
  email: boolean;
}