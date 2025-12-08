/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlayersService {
  constructor(private readonly db: PrismaService){}
  create(createPlayerDto: CreatePlayerDto) {
    return this.db.player.create({
      data: {
        ...createPlayerDto,
        birthDate: new Date(createPlayerDto.birthDate)
      }
    })
  }

  findAll() {
    return this.db.player.findMany()
  }

  async findOne(id: number) {
    try {
     const xplay = await this.db.player.findUnique({
      where:{id}
    })
    if(!xplay){
      throw new Error (`ErrorPlayer not found on ID: ${id}` )
    }
    return xplay
    } catch (e) {
      return {error: `${e}`}
    }
    /*
    return this.db.player.findFirstOrThrow({
      where:{id}
    })
    */
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    try {
     const xplay = await this.db.player.update({
        where:{id},
        data:{
          ...updatePlayerDto,
          birthDate: updatePlayerDto.birthDate? new Date(updatePlayerDto.birthDate) : undefined
        }
      })
      if(!xplay){
      throw new Error (`Player not found on ID: ${id}` )
    }
    return xplay
    } catch (e) {
      return {error: `${e}`}
    }


  }

  remove(id: number) {
    return this.db.player.delete({
      where:{id}
    })
  }
}
