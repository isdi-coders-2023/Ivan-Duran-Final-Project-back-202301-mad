import { model, Schema } from 'mongoose';
import AikidoUser from '../../students/domain/aikido.user';

const aikidoUserSchema = new Schema<AikidoUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  techsLearnt: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tech',
    },
  ],
  techsInProgress: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tech',
    },
  ],
  role: {
    type: String,
  },
  timePracticing: {
    type: String,
  },
  principalSensei: {
    type: Schema.Types.ObjectId,
    ref: 'Aikido_User',
  },
  mainUke: {
    type: Schema.Types.ObjectId,
    ref: 'Aikido_User',
  },
  avatar: {
    type: String,
  },
  age: {
    type: String,
  },
});

aikidoUserSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

export const AikidoUserModel = model(
  'Aikido_User',
  aikidoUserSchema,
  'aikido_users'
);
