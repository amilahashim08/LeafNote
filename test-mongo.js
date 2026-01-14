import mongoose from 'mongoose';
const uri = 'mongodb+srv://amilahashim07_db_user:VJCuawu0YS6NjMQ0@cluster0.rnp8iud.mongodb.net/leafnote?retryWrites=true&w=majority';
mongoose.connect(uri).then(() => {
  console.log('Connected!');
  process.exit(0);
}).catch((err) => {
  console.error('Connection failed:', err.message || err);
  process.exit(1);
});