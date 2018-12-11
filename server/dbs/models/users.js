import mongoose from 'mongoose';

const Shema = mongoose.Schema;
const UserShema = new Shema({
  username: {
    type: String,
    // 唯一的
    unique: true,
    // 必须的
    require: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  }
})

export default mongoose.model('User', UserShema)
