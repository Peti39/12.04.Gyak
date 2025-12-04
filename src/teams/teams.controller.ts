/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { UpdatePlayerDto } from 'src/players/dto/update-player.dto';


@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  getTeams(){
    return this.teamsService.findAll();
  }

  @Get('/players')
  getTeamsWithTheirPlayers(){
    return this.teamsService.findTeamsWithTheirPlayers();
  }

  @Post('/:teamId/addPlayer/:playerId')
  addPlayerToTeam(@Param('teamId') teamId : string,@Param('playerId') playerId : string){
    return this.teamsService.addPToTeam(+teamId,+playerId);
  }
}
