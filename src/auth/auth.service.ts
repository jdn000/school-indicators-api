import { Inject, Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { config } from 'node:process';
import { db } from 'src/db';
import { User, UserInputDTO } from 'src/interfaces/User';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import argon2 from 'argon2';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class AuthService {
  constructor(


  ) { }

  public async signUp(userInputDTO: User): Promise<{ user: User; token: string; }> {
    try {
      const salt = crypto.randomBytes(32);
      const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
      const userRecord = userInputDTO;
      userRecord.salt = salt.toString('hex');
      userRecord.password = hashedPassword;
      const user: User = await db.user.add(userRecord);
      const token: string = this.generateToken(user);

      if (!userRecord) {
        throw new Error('User cannot be created');
      }

      delete user.password;
      delete user.salt;
      return { user, token };
    } catch (e) {
      throw e;
    }
  }

  public async signIn(user: UserInputDTO): Promise<{ user: User; token: string; }> {
    const userRecord = await db.user.findByUsername(user.username);
    if (!userRecord) {
      throw new Error('User not registered');
    }
    /**
     * We use verify from argon2 to prevent 'timing based' attacks
     */
    const validPassword = await argon2.verify(userRecord.password, user.password);
    if (validPassword) {
      const token = this.generateToken(userRecord);
      const user = userRecord;
      delete user.password;
      delete user.salt;
      return { user, token };
    } else {
      throw new Error('Invalid Password');
    }
  }

  private generateToken(user: User) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is public and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */
    return jwt.sign(
      {
        id: user.id, // We are gonna use this in the middleware 'isAuth'
        roleId: user.roleId,
        user: user.username,
        exp: exp.getTime() / 1000,
        status: user.status
      },
      process.env.JWT_SECRET,
    );
  }
  public async resetPassword(userInfo: User): Promise<User> {
    try {
      const salt = crypto.randomBytes(32);
      const hashedPassword = await argon2.hash(userInfo.password, { salt });
      const userRecord = userInfo;
      userRecord.salt = salt.toString('hex');
      userRecord.password = hashedPassword;

      const user: User = await db.user.updatePassword(userRecord);
      // this.logger.silly('Generating JWT');
      // const token: string = this.generateToken(user);
      if (!userRecord) {
        throw new Error('User cannot be created');
      }
      // this.eventDispatcher.dispatch(events.user.signUp, { user: user });
      // delete user.password;
      // delete user.salt;
      return user;
    } catch (e) {
      throw e;
    }
  }
}
