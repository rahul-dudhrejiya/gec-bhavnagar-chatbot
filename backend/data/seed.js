require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Branch = require('../models/Branch');
const { PlacementStats, Holiday, Notice, GTUInfo } = require('../models/OtherModels');
const { branchesData, placementData, holidayData, gtuInfoData, noticesData } = require('./gecData');

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('🌱 Starting database seeding...\n');

    // Clear existing data
    await Branch.deleteMany({});
    await PlacementStats.deleteMany({});
    await Holiday.deleteMany({});
    await Notice.deleteMany({});
    await GTUInfo.deleteMany({});
    console.log('✅ Cleared existing data');

    // Seed Branches
    const branches = await Branch.insertMany(branchesData);
    console.log(`✅ Inserted ${branches.length} branches: ${branches.map(b => b.code).join(', ')}`);

    // Seed Placements
    await PlacementStats.create(placementData);
    console.log('✅ Inserted placement statistics');

    // Seed Holidays
    await Holiday.create(holidayData);
    console.log('✅ Inserted holiday calendar for 2025-26');

    // Seed Notices
    const notices = await Notice.insertMany(noticesData);
    console.log(`✅ Inserted ${notices.length} notices`);

    // Seed GTU Info
    const gtuInfo = await GTUInfo.insertMany(gtuInfoData);
    console.log(`✅ Inserted ${gtuInfo.length} GTU information entries`);

    console.log('\n🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
