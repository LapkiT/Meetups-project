import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    return selectedDate < currentDate ? { 'futureDate': true } : null;
  };
}

export function timeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const timeValue = control.value;
    if (!timeValue) return null;


    const currentDate = new Date();
    const currentTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;


    const currentTimeInMinutes = timeToMinutes(currentTime);
    const selectedTimeInMinutes = timeToMinutes(timeValue);

    if (selectedTimeInMinutes < currentTimeInMinutes && currentDate.toDateString() === new Date().toDateString()) {
      return { 'timeInvalid': true };
    }

    return null;
  };
}

function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}
