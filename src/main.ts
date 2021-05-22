import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { CMXConfig } from 'config/config';

if (CMXConfig.environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
