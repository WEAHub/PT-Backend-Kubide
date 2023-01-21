import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const lines = [
      'Kubide Social API <3',
      'Pulsa <a href="/api">aqui</a> para acceder a Swagger o espera 5 segundos.',
      '<script>setTimeout(() => document.location = "/api", 5000)</script>'
    ]
    return lines.join('<br/>');
  }
}
