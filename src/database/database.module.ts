import { Module } from '@nestjs/common';
import { PRISMA_SERVICE_KEY } from 'src/shared/prisma/prisma.providers';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
  imports: [],
  providers: [
    {
      provide: PRISMA_SERVICE_KEY,
      useClass: PrismaService,
    },
  ],
})
export class DatabaseModule {}
