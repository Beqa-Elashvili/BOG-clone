export interface UserType {
  balance: number;
  createdAt: string;
  email: string;
  id: string;
  name: string;
  personalNumber: string;
  phoneNumber: string;
  points: number;
}

export interface storyTypes {
  id: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}
