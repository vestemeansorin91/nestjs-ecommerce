import { Document } from 'mongoose';
import { Address } from './interfaces/address.interface';

export interface User extends Document {
  username: string;
  readonly password: string;
  seller: boolean;
  address: Address;
  created: Date;
}
