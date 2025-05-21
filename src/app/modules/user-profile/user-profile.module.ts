import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { SharedModule } from 'app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { userProfileRoutes } from './user-profile.routing';
@NgModule({
    declarations: [UserProfileComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(userProfileRoutes)
    ]
})
export class UserProfileModule {}
