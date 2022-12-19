import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { RegelsFormComponent } from './regels-form/regels-form.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ButtonComponent } from './components/button/button.component';

const toastrConfig = {
  positionClass: 'toast-bottom-right',
  progressBar: true,
  extendedTimeOut: 2000,
  maxOpened: 2,
  autoDismiss: true,
};

@NgModule({
  declarations: [
    AppComponent,
    RegelsFormComponent,
    LoaderComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(toastrConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
