export type SavedAddress = {
  id: string;
  fullName: string;
  phone: string;
  house: string;
  street: string;
  city: string;
  district: string;
  state: string;
  landmark: string;
  pinCode: string;
  addressType: "Home" | "Office" | "Other";
};