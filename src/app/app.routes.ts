import { Routes } from '@angular/router';
import { Home } from './user/pages/home/home';
import { About } from './user/pages/about/about';
import { Service } from './user/pages/service/service';
import { Contact } from './user/pages/contact/contact';
import { AuthGuard } from './auth-guard';
import { UserLogin } from './user/auth/user-login/user-login';
import { UserRegister } from './user/auth/user-register/user-register';
import { Profile } from './user/auth/profile/profile';

import { Login } from './admin/pages/login/login';
import { Dashboard } from './admin/pages/dashboard/dashboard';
import { Users } from './admin/pages/users/users';
import { ProfileEdit } from './user/edit/profile-edit/profile-edit';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'about', component: About },
    { path: 'service', component: Service },
    { path: 'contact', component: Contact },
    { path: 'login', component: UserLogin },
    { path: 'register', component: UserRegister },
    { path: 'profile', component: Profile },
    { path: 'edit-profile', component: ProfileEdit },

    { path: 'admin/login', component: Login },
    { path: 'admin/dashboard', component: Dashboard, canActivate: [AuthGuard] },
    { path: 'admin/user', component: Users, canActivate: [AuthGuard] }
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
