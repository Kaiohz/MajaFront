import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Vue globale',  icon: 'dashboard', class: '' },
    { path: '/rigs', title: 'Rigs',  icon: 'power', class: '' },
    { path: '/withdrawal', title: 'Virements',  icon:'local_atm', class: '' },
    { path: '/news', title: 'Twitter',  icon:'library_books', class: '' },
    { path: '/statistics', title: 'Statistiques',  icon:'query_stats', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
