import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  public formGroup: FormGroup;
  public CONTROLS = {
    NAME: 'name',
    EMAIL: 'email',
    PHONE: 'phone'
  };

  constructor(
    private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this._createForm();
    this._resetForm();

  }

  public fieldIsInvalid(controlName: string): boolean {
    return this.formGroup.get(`${ controlName }`).invalid && this.formGroup.get(`${ controlName }`).touched;
  }

  public send(): void {
    if (this._formGroupValidate(this.formGroup)) {
      this._resetForm();
    }
  }

  public cancel(): void {
    this._resetForm();
  }

  private _createForm(): void {
    this.formGroup = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      phone: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]]
    }, {

    });
  }

  private _resetForm(): void {
    this.formGroup.reset({
      name: '',
      email: '',
      phone: ''
    });
  }

  private _formGroupValidate(formGroup: FormGroup): boolean {
    if (formGroup.invalid) {
      Object.values(formGroup.controls).forEach(x => {

        if (x instanceof FormGroup) {
          this._formGroupValidate(x);
        }

        x.markAsTouched();
      });
      return false;
    }

    return true;
  }
}
