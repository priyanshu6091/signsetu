import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';
import { IQuestion } from './Question';

export interface IPlayerScore {
  userId: mongoose.Types.ObjectId | IUser;
  score: number;
  correctAnswers: number;
  incorrectAnswers: number;
}

export interface IGameQuestion {
  questionId: mongoose.Types.ObjectId | IQuestion;
  startedAt: Date;
  endedAt?: Date;
  playerAnswers: {
    userId: mongoose.Types.ObjectId | IUser;
    answer: string;
    answeredAt: Date;
    isCorrect: boolean;
  }[];
}

export interface IGame extends Document {
  roomCode: string;
  status: 'waiting' | 'active' | 'completed';
  createdBy: mongoose.Types.ObjectId | IUser;
  players: mongoose.Types.ObjectId[] | IUser[];
  questions: IGameQuestion[];
  currentQuestionIndex: number;
  scores: IPlayerScore[];
  startedAt?: Date;
  endedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const GameSchema: Schema = new Schema(
  {
    roomCode: { type: String, required: true, unique: true },
    status: { 
      type: String, 
      required: true, 
      enum: ['waiting', 'active', 'completed'],
      default: 'waiting'
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    players: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    questions: [{
      questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
      startedAt: { type: Date },
      endedAt: { type: Date },
      playerAnswers: [{
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        answer: { type: String },
        answeredAt: { type: Date },
        isCorrect: { type: Boolean }
      }]
    }],
    currentQuestionIndex: { type: Number, default: 0 },
    scores: [{
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
      score: { type: Number, default: 0 },
      correctAnswers: { type: Number, default: 0 },
      incorrectAnswers: { type: Number, default: 0 }
    }],
    startedAt: { type: Date },
    endedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Game || mongoose.model<IGame>('Game', GameSchema);