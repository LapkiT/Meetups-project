import {AbstractControl, ValidationErrors} from "@angular/forms";


export function dateTimeInvalid(control: AbstractControl): ValidationErrors | null {
  const dateControl = control.get('date');
  const timeControl = control.get('time_code');
  if (!dateControl || !timeControl) {
    return null; // или возвращаем ошибку, если требуется
  }

  const dateValue = dateControl.value;
  const timeValue = timeControl.value;


  if (!dateValue || !timeValue) {
    return null;
  }

  const selectedDateTime = new Date(`${dateValue}T${timeValue}`);
  const currentDateTime = new Date();


  if (selectedDateTime < currentDateTime) {
    return { dateTimeInvalid: true };
  }

  return null;
}

