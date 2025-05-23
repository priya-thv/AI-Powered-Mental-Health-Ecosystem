
// import jwt from "jsonwebtoken";
// import User from "../models/User.models.js";
// import dotenv from "dotenv";
// dotenv.config();

// const protectRoute = async (req, res, next) => {
//     try {
//         console.log("🔹 Checking for token in cookies:", req.cookies);

//         const token = req.cookies.jwt;
//         if (!token) {
//             return res.status(401).json({ error: "Unauthorized - No token found" });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("🔹 Decoded token:", decoded);

//         const user = await User.findById(decoded.userid).select("-password");
//         if (!user) {
//             return res.status(401).json({ error: "Unauthorized - User not found" });
//         }

//         req.user = user; // ✅ Ensure req.user is set
//         console.log("✅ User authenticated:", user);

//         next();
//     } catch (error) {
//         console.error("❌ Error in protectRoute:", error.message);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };

// export default protectRoute;

// import jwt from 'jsonwebtoken';

// const auth = (req, res, next) => {
//   // Get the token from Authorization header
//   const token = req.headers.authorization?.split(' ')[1]; // `Bearer token`

//   if (!token) {
//     return res.status(403).json({ error: "No token provided, access denied" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach user information to the request object
//     next();
//   } catch (err) {
//     return res.status(500).json({ error: "Failed to authenticate token" });
//   }
// };

// export default auth;

// import jwt from 'jsonwebtoken';

// const auth = (req, res, next) => {
//   const token = req.headers['authorization']?.split(' ')[1]; // "Bearer <token>"
//   if (!token) return res.status(401).json({ error: 'No token provided' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(403).json({ error: 'Failed to authenticate token' });

//     req.user = decoded; // decoded contains the user info (e.g., id)
//     next();
//   });
// };

// export default auth;
// import jwt from 'jsonwebtoken';

// const auth = (req, res, next) => {
//   const token = req.headers['authorization']?.split(' ')[1]; // "Bearer <token>"
  
//   if (!token) {
//     console.log("🔴 Token not found in request headers");
//     return res.status(401).json({ error: 'No token provided' });
//   }

//   console.log("🔹 Verifying token:", token); // Log the token to check if it's being passed correctly

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       console.error("❌ Failed to authenticate token:", err.message);
//       return res.status(403).json({ error: 'Failed to authenticate token' });
//     }

//     console.log("✅ Token decoded successfully:", decoded);
//     req.user = decoded; // decoded contains the user info (e.g., id)
//     next();
//   });
// };

// export default auth;

import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    console.log("🔴 Token not found in request headers");
    return res.status(401).json({ error: 'No token provided' });
  }

  console.log("🔹 Verifying token:", token);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("❌ Failed to authenticate token:", err.message);
      return res.status(403).json({ error: 'Failed to authenticate token' });
    }

    console.log("✅ Token decoded successfully:", decoded);
    req.user = decoded; // decoded contains userId
    next();
  });
};

export default auth;
