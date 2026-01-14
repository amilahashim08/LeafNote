import dbConnect from '@/lib/db';
import User from '@/models/User';

async function seed() {
  try {
    await dbConnect();

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@local.test';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';
    const adminName = process.env.ADMIN_NAME || 'Admin';

    let admin = await User.findOne({ email: adminEmail }).select('+password');
    if (admin) {
      console.log('Admin user already exists:', adminEmail);
      process.exit(0);
    }

    admin = new User({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: 'admin',
    });

    await admin.save();
    console.log('Admin user created:', adminEmail);
    process.exit(0);
  } catch (err) {
    console.error('Failed to seed admin user:', err);
    process.exit(1);
  }
}

seed();