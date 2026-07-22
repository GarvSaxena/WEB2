/**
 * scripts/seed.ts — Member Seeder
 */

import mongoose from "mongoose";
import path from "path";

// Load .env.local variables using the built-in Node.js mechanism
// (requires Node 20.6+ for process.loadEnvFile, or use tsx --env-file)
// Fallback: load via fs if available
try {
  // Node 20.6+ built-in loader
  process.loadEnvFile(path.resolve(process.cwd(), ".env.local"));
} catch {
  // Older Node: install dotenv and uncomment:
  // require('dotenv').config({ path: '.env.local' });
  console.warn("⚠️  Could not load .env.local automatically. Set MONGODB_URI manually.");
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌  MONGODB_URI not set in .env.local");
  process.exit(1);
}

// ── Inline Member Schema (avoids Next.js hot-reload model cache issues) ───
const MemberSchema = new mongoose.Schema(
  {
    name:            { type: String, required: true },
    profilePicture:   { type: String },
    phoneNumber:      { type: String, required: true, unique: true },
    instituteEmail:   { type: String, required: true, unique: true, lowercase: true },
    department:       { type: String, required: true, enum: ["Designing", "PR", "Social Media", "Volunteering", "Coverage", "Technical"] },
    branch:           { type: String, required: true, enum: ["CSE", "DS", "CY", "IT", "ECE"] },
    year:             { type: Number, required: true, enum: [1, 2, 3, 4] },
    designation:      { type: String, required: true, enum: ["president", "vice president", "Treasurer", "Head", "member"] },
    domain:           { type: String, required: true },
    clerkUserId:      { type: String, required: true, unique: true },
    isApproved:       { type: Boolean, default: false },
    isActive:         { type: Boolean, default: true },

    // Legacy compatibility fields.
    clerkId:          { type: String, unique: true, sparse: true },
    email:            { type: String, lowercase: true },
    avatarUrl:        { type: String },
    role:             { type: String },
    status:           { type: String },
  },
  { timestamps: true }
);

// ── Mock Data ─────────────────────────────────────────────────────────────
export const dummyMembers = [
  {
    name: "Chirag Jain",
    profilePicture: "https://i.pravatar.cc/300?img=1",
    phoneNumber: "8085509019",
    instituteEmail: "23218@iiitu.ac.in",
    department: "Volunteering",
    branch: "ECE",
    year: 4,
    designation: "president",
    domain: "Designing, Video Editing, Management",
    clerkUserId: "user_chirag_dummy_001",
    joinDate: new Date("2024-08-15"),
    isApproved: true,
    isActive: true,
    bio: "President of EPMOC, passionate about design, management, and event execution.",
  },
  {
    name: "Tarsem Singh",
    profilePicture: "https://i.pravatar.cc/300?img=12",
    phoneNumber: "9876543210",
    instituteEmail: "23145@iiitu.ac.in",
    department: "Technical",
    branch: "CSE",
    year: 4,
    designation: "Head",
    domain: "Web Development, Backend, DevOps",
    clerkUserId: "user_tarsem_dummy_002",
    joinDate: new Date("2024-09-01"),
    isApproved: true,
    isActive: true,
    bio: "Technical Head responsible for the club's web platforms and technical initiatives.",
  },
  {
    name: "Ujjal Sharma",
    profilePicture: "https://i.pravatar.cc/300?img=23",
    phoneNumber: "9876543211",
    instituteEmail: "24112@iiitu.ac.in",
    department: "Coverage",
    branch: "IT",
    year: 3,
    designation: "member",
    domain: "Photography, Videography, Content Creation",
    clerkUserId: "user_ujjal_dummy_003",
    joinDate: new Date("2025-01-10"),
    isApproved: true,
    isActive: true,
    bio: "Coverage team member capturing events through photography and videography.",
  },
  {
    name: "Ganika Sharma",
    profilePicture: "https://i.pravatar.cc/300?img=32",
    phoneNumber: "9876543212",
    instituteEmail: "25108@iiitu.ac.in",
    department: "PR",
    branch: "DS",
    year: 2,
    designation: "member",
    domain: "Public Relations, Sponsorship, Communication",
    clerkUserId: "user_ganika_dummy_004",
    joinDate: new Date("2025-08-20"),
    isApproved: true,
    isActive: true,
    bio: "PR team member handling communications and sponsor outreach.",
  },
];

// ── Seed Function ─────────────────────────────────────────────────────────
async function seed() {
  console.log("🌱  Connecting to MongoDB…");
  await mongoose.connect(MONGODB_URI as string);
  console.log("✅  Connected");

  const MemberModel =
    mongoose.models.Member ?? mongoose.model("Member", MemberSchema);

  const normalizedMembers = dummyMembers.map((data) => ({
    ...data,
    clerkId: data.clerkUserId,
    email: data.instituteEmail,
    avatarUrl: data.profilePicture ?? undefined,
    role: data.designation,
    status: data.isActive ? "active" : "inactive",
  }));

  await MemberModel.deleteMany({});
  await MemberModel.insertMany(normalizedMembers, { ordered: true });

  for (const data of normalizedMembers) {
    console.log(`  ✓  ${data.name} (${data.designation})`);
  }

  console.log(`\n🎉  Seeding complete: ${normalizedMembers.length} inserted, 0 skipped`);
  await mongoose.disconnect();
  console.log("🔌  Disconnected from MongoDB");
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err);
  process.exit(1);
});
