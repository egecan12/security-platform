import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from './models/User'; // Import the User model

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret'; // Use a fallback if not found

router.post('/register', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists in MongoDB
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).send('Kullanıcı zaten mevcut.');
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user in MongoDB
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).send('Kayıt başarılı.');
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).send('Bir hata oluştu.');
  }
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Find the user in MongoDB
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).send('Geçersiz giriş.');
      return;
    }

    // Generate a JWT token
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Bir hata oluştu.');
  }
});

export default router;
