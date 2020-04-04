import { MediaMatcher } from "@angular/cdk/layout";
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  ViewEncapsulation
} from "@angular/core";
import { MatSidenav } from "@angular/material";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnDestroy, AfterViewInit {
  @ViewChild("snav", { static: false }) public sidenav: MatSidenav;

  mobileQuery: MediaQueryList;
  nonMobile = true;

  private _mobileQueryListener: () => void;

  constructor(
      private changeDetectorRef: ChangeDetectorRef, 
      private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");

    this._mobileQueryListener = () => changeDetectorRef.detectChanges();

    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.sideNavDisplay(this.mobileQuery.matches);
      this.mobileQuery.addEventListener("change", e => {
        this.sideNavDisplay(e.matches);
      });
    }, 500);
   
  }

  sideNavDisplay(matches: boolean) {
    if (matches) {
      this.nonMobile = false;
      this.sidenav.close();
    } else {
      this.nonMobile = true;
      this.sidenav.open();
    }
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
