import { Component, OnInit } from '@angular/core';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';


@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setInterval(() => this.loadTwitterFeed(), 5000)
  }

  ngAfterViewInit(): void {
    this.loadTwitterFeed();
    this.loadTwitterFeed();
    this.loadTwitterFeed();
    this.loadTwitterFeed();
    this.loadTwitterFeed();
    this.loadTwitterFeed();
    this.loadTwitterFeed();
  }
  

  loadTwitterFeed(){
    (<any>window).twttr.widgets.load();
  }

}
