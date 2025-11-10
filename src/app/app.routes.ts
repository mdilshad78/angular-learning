import { Routes } from '@angular/router';
import { Home } from './user/pages/home/home';
import { Login } from './admin/pages/login/login';
import { About } from './user/pages/about/about';
import { Service } from './user/pages/service/service';
import { Contact } from './user/pages/contact/contact';
import { Dashboard } from './admin/pages/dashboard/dashboard';
import { AdminModule } from './admin/admin-module';
import { UserModule } from './user/user-module';
import { Users } from './admin/pages/users/users';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'about', component: About },
    { path: 'service', component: Service },
    { path: 'contact', component: Contact },

    { path: 'admin/login', component: Login },
    { path: 'admin/dashboard', component: Dashboard },
    { path: 'admin/user', component: Users }
];

// export const routes: Routes = [
//     {
//         path: '',
//         component: UserModule,
//         children: [
//             { path: '', component: Home },
//             { path: 'about', component: About },
//             // other user routes
//         ],
//     },
//     {
//         path: 'admin',
//         component: AdminModule,
//         children: [
//             { path: 'login', component: Login },
//             { path: 'users', component: Dashboard },
//             // other admin routes
//         ],
//     },
// ];
