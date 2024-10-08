import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../../../core/services/token-storage.service';
import { AuthService } from '../../../auth/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css',
})
export class UpdateProfileComponent {
  file: string = '';
  userId!: number;
  userData: any;

  userForm = this._formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    photo: [''],
    gender: ['male', [Validators.required]],
  });
  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _authService: AuthService,
    private _tokenStorageService: TokenStorageService
  ) {
    this.userData = this._tokenStorageService.getFromLocalStorage('user');
    console.log(JSON.parse(this.userData));
    let user = JSON.parse(this.userData);
    this.userForm.patchValue(user);
    this.userId = user.id;
    this.file = user.photo;
  }

  public onFileChange(event: any): void {
    const files = event.target.files as FileList;
    if (files.length > 0) {
      let file = files[0];
      let reader = new FileReader();
  
      // Read the file as a DataURL (base64 string)
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        // Get the base64 string without the prefix
        const base64String = (reader.result as string).split(',')[1];  
  
        // Update form control with the base64 string
        this.userForm.controls['photo'].patchValue(base64String);
  
        // For preview purposes, use the full base64 string with the prefix
        this.file = base64String as string;  // This includes 'data:image/jpeg;base64,...'
  
        // Reset the input file field if needed
        this.resetInput();
      };
    }
  }
  
  public resetInput(): void {
    const input = document.getElementById('avatar-input-file') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }

  public onUpdateProfile(): void {
    this._authService.updateProfile(this.userId, this.userForm.value).subscribe(
      (response) => {
        console.log(response);
        this._tokenStorageService.saveToLocalStorage(
          'user',
          JSON.stringify(response.data)
        );
        this._router.navigate(['/animal']);
      },
      (error) => {
        console.log(error);
        this._snackBar.open(
          'updating profile failed! please try again',
          'close',
          {
            panelClass: ['style-error'],
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
          }
        );
      }
    );
  }
}
