import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegelService } from '../services/regel.service';
import { Regels } from '../types/regels';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-regels-form',
  templateUrl: './regels-form.component.html',
  styleUrls: ['./regels-form.component.scss']
})
export class RegelsFormComponent {
  public regels?: Regels[];
  public loading = false;
  public regelsForm = this.formBuilder.group({
    datum: ['', Validators.required],
    leeftijd: ['58', Validators.required],
    plaats: ['Utrecht', Validators.required],
    inkomen: ['1000', Validators.required],
    woonkosten: ['650', Validators.required],
    vermogen: ['400', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private regelService: RegelService, private toastr: ToastrService) { }

  onSubmit(): void {
    this.loading = true;
    this.regelService.getByParams(this.formatSearchParams()).subscribe((regels : Regels[]) => {
      this.regels = regels
      this.loading = false;
      this.toastr.success(
        'Het ophalen van de regels is goed verlopen',
        'Gelukt!'
      );
    }, error => {
      console.log(error);
      this.toastr.error(
        'Er was een fout opgetreden tijdens het ophalen van de regels',
        'Fout bij het ophalen!'
      );
    });
  }

  executeRegels(): void {
    if(this.regels) {
      this.regelService.executeRegels(this.regels, this.regelsForm).subscribe((response: any) => {
        console.log(response);
        this.toastr.success(
          'Het opsturen van de regels is goed verlopen',
          'Gelukt!'
        );
      }, error => {
        console.log(error);
        this.toastr.error(
          'Er was een fout opgetreden tijdens het versturen van de regels',
          'Fout bij het opsturen!'
        );
      })
    }
  }

  formatSearchParams(): HttpParams {
    let params = new HttpParams();
    params = params.append('datum', this.regelsForm.value.datum || '');
    params = params.append('leeftijd', this.regelsForm.value.leeftijd || '');
    params = params.append('plaats', this.regelsForm.value.plaats || '');
    params = params.append('inkomen', this.regelsForm.value.inkomen || '');
    params = params.append('woonkosten', this.regelsForm.value.woonkosten || '');
    params = params.append('vermogen', this.regelsForm.value.vermogen || '');
    return params
  }
}
