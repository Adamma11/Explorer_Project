import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: Blob, type: string): SafeResourceUrl {
    const url = URL.createObjectURL(value);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
