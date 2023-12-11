import { Routes } from '@angular/router';
import { MoviesComponent } from './screens/movies/movies.component';
import { routes as movieRoutes } from './screens/movie/movie.routes';
export const routes: Routes = [

    {
        path: 'movies',
        component: MoviesComponent,
    },
    {
        path: '',
        children: movieRoutes,
    },
    {
        path: '',
        redirectTo: 'movies',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: 'movies',
        pathMatch: 'full',
    },
];
