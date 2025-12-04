/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Injectable } from '@nestjs/common';
import { UpdatePlayerDto } from 'src/players/dto/update-player.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TeamsService {
  constructor(private readonly db: PrismaService){}
  findAll() {
    return this.db.team.findMany()
  }
  findTeamsWithTheirPlayers() {
    return this.db.team.findMany({
      include:{
        players:true
      }
    })
  }
  addPToTeam(teamId: number, playerId: number) {
    return this.db.team.update({
      where:{id:teamId},
      data:{
        players:{
          connect:{id:playerId}
        }
      }
    })
  }
}
