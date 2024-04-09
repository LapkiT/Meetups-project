import { Injectable } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ErrorProcessingService {
  public processError(error: HttpErrorResponse | any): string {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 400) {
        return `Ошибка: ${error.error.message || 'Некорректный запрос.'}`;
      } else if (error.status === 401) {
        return 'Неверный логин или пароль.';
      } else if (error.status === 404) {
        return 'Запрошенный ресурс не найден.';
      } else {
        return `Ошибка сервера: ${error.message}. Пожалуйста, попробуйте позже.`;
      }
    } else {
      return error.message || 'Неизвестная ошибка. Пожалуйста, попробуйте снова.';
    }
  }
}
