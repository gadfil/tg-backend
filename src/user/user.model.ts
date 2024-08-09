import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
