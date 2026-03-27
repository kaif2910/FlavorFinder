import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: 'img[appImageFallback]'
})
export class ImageFallbackDirective {
  @Input() appImageFallback: string = 'https://via.placeholder.com/300x200?text=No+Image';

  constructor(private el: ElementRef) {}

  @HostListener('error')
  onError() {
    this.el.nativeElement.src = this.appImageFallback;
  }
}
