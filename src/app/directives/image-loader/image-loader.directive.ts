import { 
  Directive, 
  Input, 
  ElementRef, 
  Renderer2, 
  AfterContentInit, 
  OnDestroy, 
  HostBinding, 
} from '@angular/core';

@Directive({
  selector: '[image-loader]',
  host: {
    '(error)' : 'updateUrl()',
    '[src]': 'src',
  }
})
export class ImageLoaderDirective implements AfterContentInit, OnDestroy {
  private nativeElement: HTMLElement;
  private cancelOnLoad: Function;
  private loaderImg;

  @Input() src: string;
  @Input() default: string;
  @Input() image: string;
  @Input() imgClass: string;
  @HostBinding ('class') className;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  updateUrl() {
    this.src = this.default;
    this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
  }

  ngAfterContentInit() {
    this.nativeElement = this.el.nativeElement;

    this.renderer.setStyle(this.el.nativeElement, 'width', '100%');
    this.renderer.setStyle(this.el.nativeElement, 'filter', 'blur(50px)');

    this.onLoad = this.onLoad.bind(this);
    this.cancelOnLoad = this.renderer.listen(this.nativeElement, 'load', this.onLoad);
  }

  private removeOnLoadEvent() {
    if (this.cancelOnLoad) {
        this.cancelOnLoad();
    }
  }

  private onLoad() {
    this.removeOnLoadEvent();
    this.loaderImg = new Image();
    this.loaderImg.src = this.image;
    this.loaderImg.onload = () => {
      this.renderer.removeStyle(this.el.nativeElement, 'filter');
      console.log(this.imgClass);
      this.renderer.setAttribute(this.nativeElement, 'src', this.loaderImg.src);
      this.renderer.setAttribute(this.nativeElement, 'class', this.imgClass);
      
    }
  }


  ngOnDestroy() {
    this.removeOnLoadEvent()
  }
 
}
