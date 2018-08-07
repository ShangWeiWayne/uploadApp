import { Component, ApplicationRef, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'uploadApp';
  constructor(private applicationRef: ApplicationRef) {
  }
  ngOnInit() {

    this.applicationRef.isStable.subscribe((s) => { // #1
      if (s) { // #2
        setInterval( t => {console.log('Ping'); } , 500);
      } // #3
    }); // #4
    // If you uncomment 1-4 - service-worker will not run

    this.applicationRef.isStable.subscribe(t => {
      console.log('App stable: ' + t);
    });
  }
}
