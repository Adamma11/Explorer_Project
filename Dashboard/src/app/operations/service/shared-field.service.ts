import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedFieldService {

  private sharedFieldsSource = new BehaviorSubject<any>({});
  sharedFields$ = this.sharedFieldsSource.asObservable();

  // Update a specific shared field
  updateSharedField(fieldName: string, value: any) {
    const currentFields = this.sharedFieldsSource.value;
    currentFields[fieldName] = value;
    this.sharedFieldsSource.next(currentFields);
  }

  // Get the current value of a specific field
  getFieldValue(fieldName: string): any {
    return this.sharedFieldsSource.value[fieldName];
  }
}