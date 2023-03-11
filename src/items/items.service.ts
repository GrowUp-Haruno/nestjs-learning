import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsService {
  findall(): string {
    return 'this is findAll()';
  }
}
