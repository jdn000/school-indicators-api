import { Injectable, Inject } from '@nestjs/common';
import { CreateAlumnDto } from './dto/create-alumn.dto';
import { UpdateAlumnDto } from './dto/update-alumn.dto';
import { NEST_PGPROMISE_CONNECTION } from 'nestjs-pgpromise';
import { IDatabase } from 'pg-promise';
import { Alumn } from '../interfaces/Alumn';
import { db } from '../db';
@Injectable()
export class AlumnService {
  constructor(@Inject(NEST_PGPROMISE_CONNECTION) private readonly pg: IDatabase<any>) { }
  async create(createAlumnDto: CreateAlumnDto): Promise<Alumn> {
    try {
      return await db.alumn.add(createAlumnDto);
    } catch (error) {
      throw error;
    }

  }

  async findAll(): Promise<Alumn[]> {
    //   return `This action returns all alumn`;
    try {
      const data = await db.alumn.getAll();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} alumn`;
  }

  update(id: number, updateAlumnDto: UpdateAlumnDto) {
    return `This action updates a #${id} alumn`;
  }

  remove(id: number) {
    return `This action removes a #${id} alumn`;
  }
}
