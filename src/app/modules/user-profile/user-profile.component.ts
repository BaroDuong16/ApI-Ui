import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { AuthService } from 'app/core/auth/auth.service';
@Component({
    selector   : 'user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls  : ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit
{
    userForm: FormGroup;
    user: User;

    constructor(
        private _formBuilder: FormBuilder,
        private _userService: UserService,
        private _authService: AuthService
    ) {}

    ngOnInit(): void
    {
        // Tạo form trống
        this.userForm = this._formBuilder.group({
            name: [''],
            email: [''],
            company: ['']
        });

        // Lấy dữ liệu user
        this._userService.get().subscribe((user: User) => {
            this.user = user;
            this.userForm.patchValue(user); // đưa dữ liệu vào form
        });
    }

    updateUser(): void
    {
        if (this.userForm.valid)
        {
            const updatedUser = {
                ...this.user,
                ...this.userForm.value
            };

            this._userService.update(updatedUser).subscribe(() => {
                alert('User updated successfully');
            });
        }
    }

    deleteAccount(): void {
    if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
        this._userService.delete().subscribe({
            next: () => {
                alert('Account deleted successfully.');
                this._authService.signOut(); // or navigate to login
            },
            error: (err) => {
                console.error('Error deleting account:', err);
                alert('Failed to delete account.');
            }
        });
    }
}

}

