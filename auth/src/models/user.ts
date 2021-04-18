import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describe the proprieties
// to take advantage of typescript type checking
// not supported by mongoose
interface UserAttrs {
  email: string;
  password: string;
}

// Describes the propos has a user Model
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// Properties of User model (excludes the ones added by Mongo)
interface UserDoc extends mongoose.Document{
  email: string;
  password: string;
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    } 
  }
});

userSchema.pre('save', async function(done) {
  if(this.isModified('password')) {
    const hased = await Password.toHash(this.get('password'));
    this.set('password', hased);
  }
  done();
});

userSchema.statics.build = (attr: UserAttrs) => {
  return new User(attr);
} 

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };