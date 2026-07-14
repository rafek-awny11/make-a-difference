import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'studentDetails/:slug /:id',
    renderMode: RenderMode.Server
  },  
  {
    path: 'update-meeting/:slug /:id',
    renderMode: RenderMode.Server
  },
  {
    path:'show-details/:slug /:id' ,
    renderMode: RenderMode.Server
  },
    {
    path: 'details-meeting/:slug /:id',
    renderMode: RenderMode.Server
  },  {
    path: 'details/:slug/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'update/:slug /:id',
    renderMode: RenderMode.Server
  },
  
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
