import { applyDecorators } from '@nestjs/common';
import { ApiConsumes, ApiProduces } from '@nestjs/swagger';

export function MimeTypes(mimeType: string) {
  return applyDecorators(ApiConsumes(mimeType), ApiProduces(mimeType));
}
