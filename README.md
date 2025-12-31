# LeafNote - Full MERN Stack Note-Making App

A modern, full-featured note-taking application built with Next.js, MongoDB, Express, React, and Node.js. This application provides a complete CRUD (Create, Read, Update, Delete) interface for managing notes with authentication, search functionality, and tag support.

## Features

- ✅ **User Authentication** - Secure login and signup with JWT tokens
- ✅ **Create Notes** - Add new notes with title, content, and tags
- ✅ **Update Notes** - Edit existing notes
- ✅ **Delete Notes** - Remove notes you no longer need
- ✅ **Pin/Unpin Notes** - Pin important notes to the top
- ✅ **Search Functionality** - Search notes by title, content, or tags
- ✅ **Tag System** - Organize notes with custom tags
- ✅ **Modern UI** - Beautiful, responsive design with green theme

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes (Express-like)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod
- **Icons**: React Icons
- **Date Formatting**: date-fns

## Project Structure

```
LeafNote/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   └── notes/         # Notes CRUD endpoints
│   ├── login/              # Login/Signup page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── TopNav.tsx          # Navigation bar with search
│   ├── NotesPage.tsx       # Main notes page
│   ├── NotesList.tsx       # Notes grid/list
│   ├── NoteCard.tsx        # Individual note card
│   └── NoteDialog.tsx      # Add/Edit note modal
├── lib/                    # Utility libraries
│   ├── db.ts              # MongoDB connection
│   ├── auth.ts            # JWT authentication
│   └── utils.ts           # Helper functions
├── models/                 # Mongoose models
│   ├── User.ts            # User model
│   └── Note.ts            # Note model
├── types/                  # TypeScript types
│   └── index.ts           # Type definitions
└── package.json           # Dependencies

```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd LeafNote
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/leafnote

# For MongoDB Atlas (cloud) - RECOMMENDED for beginners:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/leafnote?retryWrites=true&w=majority

# JWT Secret (use a strong random string in production)
JWT_SECRET=your-secret-key-change-in-production-min-32-chars

# NextAuth URL (for production)
NEXTAUTH_URL=http://localhost:3000
```

**Important**: 
- Replace `your-secret-key-change-in-production` with a strong random string (at least 32 characters)
- **If you get connection errors**, see `MONGODB_SETUP.md` for detailed MongoDB setup instructions
- **For beginners**: We recommend using MongoDB Atlas (cloud) - it's free and easier to set up

### 4. Set Up MongoDB

**📖 IMPORTANT: See `MONGODB_SETUP.md` for complete setup instructions!**

**Quick Options:**

**Option 1: MongoDB Atlas (Cloud) - RECOMMENDED ⭐**
- Free, no installation needed
- Follow the guide in `MONGODB_SETUP.md`

**Option 2: Local MongoDB**
- Requires MongoDB installation
- See `MONGODB_SETUP.md` for installation steps

**If you see connection errors**, check `MONGODB_SETUP.md` for troubleshooting.

### 5. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Usage

### First Time Setup

1. **Start the server** - Run `npm run dev`
2. **Navigate to the app** - Open [http://localhost:3000](http://localhost:3000)
3. **Create an account** - You'll be redirected to the login page. Click "Sign up" to create a new account
4. **Start creating notes** - After logging in, click the green "+" button in the bottom-right corner to add your first note

### Features Guide

- **Add Note**: Click the green "+" button at the bottom-right corner
- **Edit Note**: Click the pencil icon on any note card
- **Delete Note**: Click the trash icon on any note card
- **Pin Note**: Click the pin icon to pin/unpin a note
- **Search**: Use the search bar in the top navigation to search notes
- **Tags**: Add tags when creating/editing notes to organize them
- **Logout**: Click "Logout" in the top-right corner

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Notes

- `GET /api/notes` - Get all notes (with optional search query)
- `POST /api/notes` - Create a new note
- `GET /api/notes/[id]` - Get a specific note
- `PUT /api/notes/[id]` - Update a note
- `DELETE /api/notes/[id]` - Delete a note

## Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running (if using local MongoDB)
- Check your `MONGODB_URI` in `.env.local`
- For MongoDB Atlas, verify your IP is whitelisted and credentials are correct

### Authentication Issues

- Clear browser cookies and try logging in again
- Ensure `JWT_SECRET` is set in `.env.local`
- Check browser console for error messages

### Port Already in Use

If port 3000 is already in use:
```bash
# Kill the process using port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change the port in package.json scripts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please open an issue on the GitHub repository.

---

Built with ❤️ using Next.js and MongoDB
