import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}


export function getBaseURL() {
  // return "http://192.168.1.180:3000"
  return "http://127.0.0.1:3500"

}

export function getBaseImageURL() {
  // return "http://192.168.1.180:3000"
  return "http://127.0.0.1:3500/public"
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseURL, deps: [] },
  { provide: 'BASE_IMAGE_URL', useFactory: getBaseImageURL, deps: [] }
]

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.error(err));
