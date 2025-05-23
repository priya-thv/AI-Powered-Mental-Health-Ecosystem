import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, 'fullname is required'],
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   fullname: {
//     type: String,
//     required: [true, 'fullname is required'],
//     unique: true,
//     trim: true,
//     minlength: [3, 'Full name must be at least 3 characters long'],
//     maxlength: [20, 'Full name cannot exceed 20 characters']
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     trim: true,
//     lowercase: true,
//     match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please provide a valid email']
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//     minlength: 6,
//     validate: {
//       validator: function(value) {
//         // Password must contain at least one uppercase letter, one lowercase letter, one number
//         return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/.test(value);
//       },
//       message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number.'
//     }
//   }
  
// }, { timestamps: true });

// const User = mongoose.model('User', userSchema);

// export default User;
