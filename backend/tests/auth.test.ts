import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import router from '../src/auth'; // Adjust the import as needed
import User from '../src/models/User';
import request from 'supertest';
// Set up environment variables

// Mock User model for controlled testing
jest.mock('../src/models/User');

const app = express();
app.use(express.json());
app.use('/', router);

describe('Auth API', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks to avoid test pollution
  });

  describe('POST /register', () => {
    it('should register a new user successfully', async () => {
      // Arrange
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (User.prototype.save as jest.Mock).mockResolvedValueOnce(null);

      // Act
      const response = await request(app)
        .post('/register')
        .send({ username: 'newUser', password: 'securePassword' });

      // Assert
      expect(response.status).toBe(201);
      expect(response.text).toBe('Kayıt başarılı.');
      expect(User.findOne).toHaveBeenCalledWith({ username: 'newUser' });
      expect(User.prototype.save).toHaveBeenCalled();
    });

    it('should fail if the username already exists', async () => {
      // Arrange
      (User.findOne as jest.Mock).mockResolvedValueOnce({ username: 'existingUser' });

      // Act
      const response = await request(app)
        .post('/register')
        .send({ username: 'existingUser', password: 'anotherPassword' });

      // Assert
      expect(response.status).toBe(400);
      expect(response.text).toBe('Kullanıcı zaten mevcut.');
      expect(User.findOne).toHaveBeenCalledWith({ username: 'existingUser' });
      expect(User.prototype.save).not.toHaveBeenCalled();
    });

    it('should handle server errors gracefully', async () => {
      // Arrange
      (User.findOne as jest.Mock).mockRejectedValueOnce(new Error('DB Error'));

      // Act
      const response = await request(app)
        .post('/register')
        .send({ username: 'userError', password: 'passwordError' });

      // Assert
      expect(response.status).toBe(500);
      expect(response.text).toBe('Bir hata oluştu.');
    });
  });

  describe('POST /login', () => {
    it('should log in with valid credentials', async () => {
      // Arrange
      const mockUser = { username: 'validUser', password: await bcrypt.hash('validPassword', 10) };
      (User.findOne as jest.Mock).mockResolvedValueOnce(mockUser);

      // Act
      const response = await request(app)
        .post('/login')
        .send({ username: 'validUser', password: 'validPassword' });

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
      expect(() => jwt.verify(response.body.token, process.env.JWT_SECRET as string)).not.toThrow();
      expect(User.findOne).toHaveBeenCalledWith({ username: 'validUser' });
    });

    it('should fail if username is incorrect', async () => {
      // Arrange
      (User.findOne as jest.Mock).mockResolvedValueOnce(null);

      // Act
      const response = await request(app)
        .post('/login')
        .send({ username: 'wrongUser', password: 'somePassword' });

      // Assert
      expect(response.status).toBe(400);
      expect(response.text).toBe('Geçersiz giriş.');
    });

    it('should fail if password is incorrect', async () => {
      // Arrange
      const mockUser = { username: 'validUser', password: await bcrypt.hash('validPassword', 10) };
      (User.findOne as jest.Mock).mockResolvedValueOnce(mockUser);

      // Act
      const response = await request(app)
        .post('/login')
        .send({ username: 'validUser', password: 'wrongPassword' });

      // Assert
      expect(response.status).toBe(400);
      expect(response.text).toBe('Geçersiz giriş.');
    });

    it('should handle server errors gracefully during login', async () => {
      // Arrange
      (User.findOne as jest.Mock).mockRejectedValueOnce(new Error('DB Error'));

      // Act
      const response = await request(app)
        .post('/login')
        .send({ username: 'errorUser', password: 'anyPassword' });

      // Assert
      expect(response.status).toBe(500);
      expect(response.text).toBe('Bir hata oluştu.');
    });
  });
});
