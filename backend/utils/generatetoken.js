// // import jwt from "jsonwebtoken"
// // import dotenv from "dotenv"
// // dotenv.config();

// // const generateTokenAndSetCookie=(userid,res)=>{
// //     const token=jwt.sign({userid},process.env.JWT_SECRET,{
// //         expiresIn:'15d'
// //     })
// //     res.cookie("jwt",token,{
// //         maxAge:15*24*60*60*1000,
// //         httpOnly:true,
// //         sameSite:true,
// //         secure:process.env.NODE_ENV!=="development",
// //     });
// // }

// // export default generateTokenAndSetCookie;

// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();

// const generateTokenAndSetCookie = (userid, res) => {
//     const token = jwt.sign({ userid }, process.env.JWT_SECRET, {
//         expiresIn: '15d', // Token expires in 15 days
//     });

//     res.cookie("jwt", token, {
//         maxAge: 15 * 24 * 60 * 60 * 1000, // Cookie expires in 15 days
//         httpOnly: true, // Helps prevent XSS attacks
//         sameSite: "lax", // Set sameSite to "lax" or "strict" or "none"
//         secure: process.env.NODE_ENV !== "development", // Only send cookies over HTTPS in production
//     });
// };

// export default generateTokenAndSetCookie;


// import jwt from 'jsonwebtoken';

// const generateTokenAndSetCookie = (userId, res) => {
//     // Create the token
//     const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     // Set token as a cookie in the response
//     res.cookie("jwt", token, { httpOnly: true, secure: true, maxAge: 3600000 }); // 1 hour expiry

//     // Return the token to the caller
//     return token;
// };

// export default generateTokenAndSetCookie;

import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 3600000,
    sameSite: "lax"
  });

  return token;
};

export default generateTokenAndSetCookie;
