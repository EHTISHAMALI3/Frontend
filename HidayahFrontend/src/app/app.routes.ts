import { Routes } from '@angular/router';
import { SignInComponent } from './Auth/sign-in/sign-in.component';
import { AuthGuard } from './AuthGuard/auth.guard';
import { HomeLayoutComponent } from './Layout/home-layout/home-layout.component';
import { AdminLayoutComponent } from './Layout/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './Layout/user-layout/user-layout.component';
import { UserProfileComponent } from './Modules/user-panel/user-profile/user-profile.component';
import { AdminAuthGuard } from './AuthGuard/admin.guard';

export const routes: Routes = [
    {path:'',pathMatch:'full',redirectTo:'sign-in'},
    {
        path:'admin',
        component:AdminLayoutComponent,
        canActivate: [AdminAuthGuard],
        children:[
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'add-institute'
              },
            {
                path:'add-institute',
                loadComponent: ()=> import('./Modules/admin-panel/institution-management/add-institute/add-institute.component').then(c=>c.AddInstituteComponent)
            },
            {
                path:'add-branch',
                loadComponent: ()=> import('./Modules/admin-panel/institution-management/add-branch/add-branch.component').then(c=>c.AddBranchComponent)
            },
            {
                path:'add-lab',
                loadComponent: ()=> import('./Modules/admin-panel/institution-management/add-lab/add-lab.component').then(c=>c.AddLabComponent)
            },
            {
                path:'add-user',
                loadComponent: ()=> import('./Modules/admin-panel/users-management/add-user/add-user.component').then(c=>c.AddUserComponent)
            },
            {
                path:'access-management',
                loadComponent: ()=> import('./Modules/admin-panel/users-management/access-management/access-management.component').then(c=>c.AccessManagementComponent)
            },
            {
                path:'browser-list',
                loadComponent: ()=> import('./Modules/admin-panel/institution-management/browser-list/browser-list.component').then(c=>c.BrowserListComponent)
            },
            {
                path:'bulk-users-import',
                loadComponent: ()=> import('./Modules/admin-panel/users-management/bulk-users-import/bulk-users-import.component').then(c=>c.BulkUsersImportComponent)
            },
            {
                path:'users-list',
                loadComponent: ()=> import('./Modules/admin-panel/users-management/users-list/users-list.component').then(c=>c.UsersListComponent)
            },
            {
                path:'add-individual-board-content',
                loadComponent: ()=> import('./Modules/admin-panel/developer-portal/add-individual-board-content/add-individual-board-content.component').then(c=>c.AddIndividualBoardContentComponent)
            },
            {
                path:'add-compound-board-content',
                loadComponent: ()=> import('./Modules/admin-panel/developer-portal/add-compound-board-content/add-compound-board-content.component').then(c=>c.AddCompoundBoardContentComponent)
            }
        ]
    },
    {
    path:'user',
    component:UserLayoutComponent,
    children:[
        {
            path:'user-profile',
            component:UserProfileComponent
        }
    ]
    },
    {path:'sign-in',component:SignInComponent},
    {
        path:'hidayah',
        component:HomeLayoutComponent,
        canActivate: [AuthGuard],
        children:[
            {
                path:'home',
                loadComponent: () =>
                    import('./Modules/holy-quran/hidayah-home/hidayah-home.component').then(c=>c.HidayahHomeComponent),
            },
            {
                path:'holyQuran',
                loadComponent: ()=>
                    import('./Modules/holy-quran/hidayah-quran/hidayah-quran.component').then(c=>c.HidayahQuranComponent)
            },
            {
                path:'nooraniPrimer',
                loadComponent: ()=>
                    import('./Modules/holy-quran/hidayah-noorani-primer/hidayah-noorani-primer.component').then(c=>c.HidayahNooraniPrimerComponent)
            },
            {
                path:'individual-letters',
                loadComponent: ()=>
                    import('./Modules/holy-quran/individual-letters/individual-letters.component').then(c=>c.IndividualLettersComponent)
            },
            {
                path:'compound-letters',
                loadComponent: ()=>
                    import('./Modules/holy-quran/compound-letters/compound-letters.component').then(c=>c.CompoundLettersComponent)
            }
        ]
    }
];
