export interface UserType {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  personalNumber: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface storyTypes {
  id: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}
