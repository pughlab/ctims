export interface CtimsFormComponentProps {
  onSpecialButtonClick: (formData: any, id: string) => void;
  onRjsfFormChange: (data: any, id: any) => void;
  schema: any;
  formData? : any;
}
