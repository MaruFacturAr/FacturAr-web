import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy, registerLocaleData } from '@angular/common';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './_guards/auth.guards';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { UsuarioService } from './_services/usuario.service';
import { AuthenticationService } from './_services/authentication.service';
import { LoaderService } from './_services/loader.service';
import { LoginComponent } from './views/login/login.component';
import { NavigationService } from './_services/navigation.service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { AppRoutingModule } from './app.routing';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { RoutingState } from './_services/routing.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { FullLayoutComponent } from './containers/full-layout/full-layout.component';
import { AppAsideComponent } from './components/app-aside/app-aside.component';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppSidebarComponent } from './components/app-sidebar/app-sidebar.component';
import { LoaderComponent } from './components/app-loader/app-loader.component';
import { AsideToggleDirective, Aside_TOGGLE_DIRECTIVES } from './directives/aside/aside.directive';
import { ReplaceDirective } from './directives/replace/replace.directive';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './directives/sidebar/sidebar.directive';
import { TableDateComponent } from './components/TableDate/TableDate.component';
import { AppBreadcrumbsComponent } from './components/app-breadcrumbs/app-breadcrumbs.component';
import { AmountComponent } from './components/Amount/Amount.component';
import { TableDateTimeComponent } from './components/TableDateTime/TableDateTime.component';
import { TableClienteComponent } from './components/TableCliente/TableCliente.component';
import { CUITPipe } from './pipes/cuit.pipe';
import locale from '@angular/common/locales/es-AR';
import { AppAppliedFiltersModule } from './components/app-applied-filters/app-applied-filters.module';
import { AppPaginationModule } from './components/app-pagination/pagination.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MomentModule } from 'ngx-moment';
import { ExcelService } from './_services/excel.service';
import { NgDragDropModule } from 'ng-drag-drop';
//import { AppPdfViewerModule } from './components/advanced/app-pdf-viewer/app-pdf-viewer.module';
import { AppModalModule } from './components/app-modal/app-modal.module';
import { LOCATION_INITIALIZED } from '@angular/common';
import { PaisAfipService } from './_services/pais.afip.service';
import { FileUploadModule } from 'ng2-file-upload';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PerfilConsultaComponent } from './views/perfil/perfil-consulta/perfil-consulta.component';
import { AyudaComponent } from './views/ayuda/ayuda.component';
import { ExistUserValidatorDirective } from './directives/usuario/exist-user-directive';
import { HasRoleDirective } from './directives/access/has-role-directive';
import { NumericDirective } from './directives/numeric/numeric.directive';
import { AppHelpComponent } from './components/app-help/app-help.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { ClipboardModule } from 'ngx-clipboard';
import { AppMenuComponent } from './components/app-menu/app-menu.component';
import { ChartsModule } from 'ng2-charts';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { CMXStorageService } from './_services/cmx.storage.service';
//import { ServicioMoaNoDelegadoComponent } from './components/NewsComponents/servicio-moa-no-delegado/servicio-moa-no-delegado.component';
import { UserRegisterComponent } from './views/login/user-register/user-register.component';
import { NgxAsideModule } from './components/advanced/aside/aside.module';
import { ProvinceService } from './_services/province.service';
import { CompanyComponent } from './views/company/company.component';
import { CompanyService } from './_services/company.service';
import { TaxpayerTypeService } from './_services/taxpayer.type.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { defineLocale, esLocale } from 'ngx-bootstrap/chronos';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {PopoverModule} from 'ngx-bootstrap/popover';



defineLocale('es-ar', esLocale);
registerLocaleData(locale, 'es-AR');

// Internacionalización 2
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

export function moduleInitializer(translate: TranslateService, injector: Injector) {
    return () => new Promise<any>((resolve: any) => {
      const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
      locationInitialized.then(() => {
        translate.use('es').subscribe(() => {resolve(null)});
      });
    });
  }

const NGX_BOOTSTRAP_COMPONENTS = [
  ModalModule.forRoot(),
  BsDropdownModule.forRoot(),
  BsDatepickerModule.forRoot(),
  TooltipModule.forRoot(),
  ProgressbarModule.forRoot(),
  AccordionModule.forRoot(),
  TabsModule.forRoot()
]
 
const APP_PERFIL_COMPONENTS = [
  PerfilConsultaComponent,
  DashboardComponent 
]

const APP_AYUDA_COMPONENTS = [
  AyudaComponent,
  AppHelpComponent
]


const PROVIDERS_SERVICES = [
  AuthenticationService,
  PaisAfipService,
  ExcelService,
  UsuarioService,
  LoaderService,
  ProvinceService,
  CompanyService,
  TaxpayerTypeService
]

const DIRECTIVES = [
  HasRoleDirective,
  NumericDirective,
  ExistUserValidatorDirective
]

@NgModule({
  imports: [
    BrowserModule,
    SnotifyModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppModalModule,
    AppRoutingModule,
    AppAppliedFiltersModule,
    AppPaginationModule,
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    NgxWebstorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    FileUploadModule,
    NgDragDropModule.forRoot(),
    PopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxSpinnerModule,
    ...NGX_BOOTSTRAP_COMPONENTS,
    NgxJsonViewerModule,
    ClipboardModule,
    ChartsModule,
    DeviceDetectorModule.forRoot(),
    NgxAsideModule
  ],
  declarations: [
    AppComponent,
    AppAsideComponent,
    AppBreadcrumbsComponent,
    AppFooterComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    FullLayoutComponent,
    LoaderComponent,
    AsideToggleDirective,
    ReplaceDirective,
    SIDEBAR_TOGGLE_DIRECTIVES,
    Aside_TOGGLE_DIRECTIVES,
    LoginComponent,
    TableDateComponent,
    TableDateTimeComponent,
    TableClienteComponent,
    AmountComponent,
    CUITPipe,
    ...APP_PERFIL_COMPONENTS,
    ...APP_AYUDA_COMPONENTS,
    ...DIRECTIVES,
    AppMenuComponent,
   // ServicioMoaNoDelegadoComponent,
    UserRegisterComponent,
   CompanyComponent
    
  ],
  entryComponents: [
    AmountComponent, 
    TableDateComponent,
    TableDateTimeComponent, 
    TableClienteComponent, 
    //ServicioMoaNoDelegadoComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: APP_INITIALIZER, useFactory: moduleInitializer, deps: [TranslateService, Injector], multi: true },
    AuthGuard,    
    NavigationService,
    SnotifyService,
    RoutingState,
    CMXStorageService,
    ...PROVIDERS_SERVICES
  ],
  exports: [ 
    TranslateModule,
    AppAsideComponent,
    AppHelpComponent, 
    ...DIRECTIVES
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
