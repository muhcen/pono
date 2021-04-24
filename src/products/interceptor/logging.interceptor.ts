import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        console.log('before...');

        const now = Date.now();

        return next.handle().pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
    }
}
