import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../withdrawal/user-profile.component';
import { TypographyComponent } from '../../news/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { RigsComponent } from 'app/rigs/rigs.component';
import { StatisticsComponent } from 'app/statistics/statistics.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'withdrawal',   component: UserProfileComponent },
    { path: 'rigs',   component: RigsComponent },
    { path: 'news',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'statistics',          component: StatisticsComponent },
];
