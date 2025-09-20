import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';
import { IQuestion } from './Question';

export interface IPlayerResult {
  userId: mongoose.Types.ObjectId | IUser;
  username: string;
  score: number;
  correctAnswers: number;
  incorrectAnswers: number;
  rank: number;
}

export interface IQuestionResult {
  questionId: mongoose.Types.ObjectId | IQuestion;
  question: string;
  answer: string;
  playerAnswers: {
    userId: mongoose.Types.ObjectId | IUser;
    username: string;
    answer: string;
    answeredAt: Date;
    isCorrect: boolean;
    responseTimeMs: number;
  }[];
}

export interface IMatchHistory extends Document {
  gameId: mongoose.Types.ObjectId;
  roomCode: string;
  players: IPlayerResult[];
  questions: IQuestionResult[];
  winner: mongoose.Types.ObjectId | IUser;
  startedAt: Date;
  endedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const MatchHistorySchema: Schema = new Schema(
  {
    gameId: { type: Schema.Types.ObjectId, ref: 'Game', required: true },
    roomCode: { type: String, required: true },
    players: [{
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
      username: { type: String },
      score: { type: Number },
      correctAnswers: { type: Number },
      incorrectAnswers: { type: Number },
      rank: { type: Number }
    }],
    questions: [{
      questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
      question: { type: String },
      answer: { type: String },
      playerAnswers: [{
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        username: { type: String },
        answer: { type: String },
        answeredAt: { type: Date },
        isCorrect: { type: Boolean },
        responseTimeMs: { type: Number }
      }]
    }],
    winner: { type: Schema.Types.ObjectId, ref: 'User' },
    startedAt: { type: Date, required: true },
    endedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.MatchHistory || mongoose.model<IMatchHistory>('MatchHistory', MatchHistorySchema);