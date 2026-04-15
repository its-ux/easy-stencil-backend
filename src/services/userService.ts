import { db } from '../config/firebase';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class UserService {
  // Register a new user
  static async registerUser(email: string, password: string, name: string) {
    try {
      const usersRef = db.collection('users');
      const existingUser = await usersRef.where('email', '==', email).get();

      if (!existingUser.empty) {
        throw new Error('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = {
        email,
        password: hashedPassword,
        name,
        role: 'user',
        isActive: true,
        stencilCount: 0,
        stencils: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await usersRef.add(newUser);
      return { id: result.id, ...newUser };
    } catch (error) {
      throw error;
    }
  }

  // Login user
  static async loginUser(email: string, password: string) {
    try {
      const usersRef = db.collection('users');
      const userQuery = await usersRef.where('email', '==', email).get();

      if (userQuery.empty) {
        throw new Error('User not found');
      }

      const userDoc = userQuery.docs[0];
      const userData = userDoc.data();

      const isPasswordValid = await bcrypt.compare(password, userData.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      if (!userData.isActive) {
        throw new Error('User account is disabled');
      }

      const token = jwt.sign(
        { id: userDoc.id, email: userData.email, role: userData.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return {
        token,
        user: {
          id: userDoc.id,
          email: userData.email,
          name: userData.name,
          role: userData.role,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // Get user by ID
  static async getUserById(userId: string) {
    try {
      const userDoc = await db.collection('users').doc(userId).get();
      if (!userDoc.exists) {
        throw new Error('User not found');
      }
      return { id: userDoc.id, ...userDoc.data() };
    } catch (error) {
      throw error;
    }
  }

  // Update user
  static async updateUser(userId: string, updateData: any) {
    try {
      await db.collection('users').doc(userId).update({
        ...updateData,
        updatedAt: new Date(),
      });
      return await this.getUserById(userId);
    } catch (error) {
      throw error;
    }
  }
}