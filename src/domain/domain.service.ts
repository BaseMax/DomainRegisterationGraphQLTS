import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDomainInput } from './dto/register-domain.input';
import { UpdateDomainInput } from './dto/update-domain.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DomainService {
  constructor(private readonly prisma: PrismaService) {}

  searchDomains(keyword: string) {
    return this.prisma.domain.findMany({
      where: {
        name: {
          contains: keyword,
        },
      },
      include: { registrant: true },
    });
  }

  async checkAvailability(domainName: string) {
    const domain = await this.prisma.domain.findFirst({
      where: { name: domainName },
      include: {
        registrant: true,
      },
    });

    if (!domain) throw new NotFoundException('domain not found!');

    return domain;
  }

  myDomains(id: number) {
    return this.prisma.domain.findMany({
      where: {
        userId: id,
      },
      include: { registrant: true },
    });
  }

  async create(registerDomainInput: RegisterDomainInput) {
    const domain = await this.prisma.domain.findUnique({
      where: { name: registerDomainInput.name },
    });

    if (domain) throw new BadRequestException('domain already registered!');

    return this.prisma.domain.create({
      data: {
        name: registerDomainInput.name,
        expirationDate: registerDomainInput.expirationDate,
        dnsRecords: registerDomainInput.dnsRecords,
        registrant: {
          connect: { id: registerDomainInput.userId },
        },
      },
      include: { registrant: true },
    });
  }

  async transferDomain(id: number, username: string) {
    const user = await this.prisma.user.findFirst({ where: { username } });

    if (!user) throw new NotFoundException('user not found!');

    return this.prisma.domain.update({
      where: { id },
      data: {
        registrant: { connect: { id: user.id } },
      },
      include: { registrant: true },
    });
  }

  findAll() {
    return this.prisma.domain.findMany({
      include: { registrant: true },
    });
  }

  findOne(id: number) {
    return this.prisma.domain.findUnique({
      where: { id },
      include: { registrant: true },
    });
  }

  update(id: number, updateDomainInput: UpdateDomainInput) {
    return this.prisma.domain.update({
      where: { id },
      data: updateDomainInput,
      include: { registrant: true },
    });
  }

  updateDns(id: number, dns: string[]) {
    return this.prisma.domain.update({
      where: { id },
      data: {
        dnsRecords: dns,
      },
      include: { registrant: true },
    });
  }

  remove(id: number) {
    return this.prisma.domain.delete({
      where: { id },
      include: { registrant: true },
    });
  }
}
