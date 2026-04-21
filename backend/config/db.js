// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`❌ MongoDB Connection Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// mongoose.connection.on('disconnected', () => {
//   console.log('⚠️  MongoDB disconnected');
// });

// process.on('SIGINT', async () => {
//   await mongoose.connection.close();
//   console.log('MongoDB connection closed on app termination');
//   process.exit(0);
// });

// module.exports = connectDB;


const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Removed useNewUrlParser and useUnifiedTopology — deprecated since driver v4
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

