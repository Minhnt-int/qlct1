import { Component, HostListener, OnInit } from '@angular/core';
import { AppState } from './services/app.state';
import { Store } from '@ngrx/store';
import { getdatas, getfield } from './services/store/data.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  scrollTimeout: any;
  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    this.isCollapsed = false;
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
    this.scrollTimeout = setTimeout(() => {
      this.isCollapsed = true;
    }, 1000);
  }
  isCollapsed = true;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getfield());
    this.store.dispatch(getdatas());
  }
  onMouseEnter() {
    this.isCollapsed = false;
  }

  onMouseLeave() {
    this.isCollapsed = true;
  }
  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
