import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  supabaseId: string;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  stats: {
    gamesPlayed: number;
    gamesWon: number;
    totalPoints: number;
  };
}

const UserSchema: Schema = new Schema(
  {
    supabaseId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    stats: {
      gamesPlayed: { type: Number, default: 0 },
      gamesWon: { type: Number, default: 0 },
      totalPoints: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);