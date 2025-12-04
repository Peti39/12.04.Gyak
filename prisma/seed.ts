/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PrismaClient } from "../generated/prisma/client"
import { faker } from '@faker-js/faker'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  await prisma.$transaction(async tx =>{
    
    const teamIds: number [] = []

    //Creates the teams
    for(let i = 0;i<3;i++){
      const xTeam = await tx.team.create({
        data:{
          country: faker.location.country(),
        }
      })
      teamIds.push(xTeam.id) //Saves the created team id
    }

    //Creates the players
    for(let i = 0; i <10; i++){
      await tx.player.create({
        data:{
          name: faker.person.fullName(),
          goalCount: faker.number.int(100),
          birthDate: faker.date.birthdate({mode:'age',min: 18, max: 65}),
          teamId: faker.helpers.arrayElement(teamIds) //Assigns them to a random team
        }
      })
    }
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
