// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   fullname: {
//     type: String,
//     required: [true, 'fullname is required'],
//     unique: true,
//     trim: true,
//     minlength: 3,
//     maxlength: 20
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     trim: true,
//     lowercase: true
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//     minlength: 6
//   }
// }, { timestamps: true });

// const User = mongoose.model('User', userSchema);

// export default User;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true }, // ✅ REQUIRED!
  password: { type: String, required: true },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
