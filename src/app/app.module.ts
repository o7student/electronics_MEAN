import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BannersComponent } from './homesections/banners/banners.component';
import { ClientsComponent } from './homesections/clients/clients.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './homesections/services/services.component';
import { LayoutComponent } from './layout/layout.component';
import { AboutComponent } from './about/about.component';
import { SerComponent } from './ser/ser.component';
import { ProductsComponent } from './products/products.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { TopbarComponent } from './topbar/topbar.component';
import { PaintingsComponent } from './paintings/paintings.component';
import { PaintingDetailsComponent } from './painting-details/painting-details.component';
import { StatuesComponent } from './statues/statues.component';
import { StatueDetailsComponent } from './statue-details/statue-details.component';
import { PotsComponent } from './pots/pots.component';
import { PotDetailsComponent } from './pot-details/pot-details.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CouponComponent } from './coupon/coupon.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';
import { OrderComponent } from './order/order.component';
import { CategoryProductComponent } from './products/category-product/category-product.component';
import { ViewcartComponent } from './cart/viewcart/viewcart.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AddcategoryComponent } from './admin/category/addcategory/addcategory.component';
import { ListcategoryComponent } from './admin/category/listcategory/listcategory.component';
import { EditcategoryComponent } from './admin/category/editcategory/editcategory.component';
import { AdminloginComponent } from './admin/auth/adminlogin/adminlogin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminlayoutComponent } from './admin/adminlayout/adminlayout.component';
import { AdminheaderComponent } from './admin/adminlayout/adminheader/adminheader.component';
import { AdminfooterComponent } from './admin/adminlayout/adminfooter/adminfooter.component';
import { AddsubcategoryComponent } from './admin/subcategory/addsubcategory/addsubcategory.component';
import { ListsubcategoryComponent } from './admin/subcategory/listsubcategory/listsubcategory.component';
import { EditsubcategoryComponent } from './admin/subcategory/editsubcategory/editsubcategory.component';
import { AddproductComponent } from './admin/product/addproduct/addproduct.component';
import { ListproductComponent } from './admin/product/listproduct/listproduct.component';
import { EditproductComponent } from './admin/product/editproduct/editproduct.component';
import { AddcouponComponent } from './admin/product/addcoupon/addcoupon.component';
import { ListcouponComponent } from './admin/product/listcoupon/listcoupon.component';
import { EditcouponComponent } from './admin/product/editcoupon/editcoupon.component';
import { AddadvertiseComponent } from './admin/advertise/addadvertise/addadvertise.component';
import { ListadvertiseComponent } from './admin/advertise/listadvertise/listadvertise.component';
import { SubcategoryComponent } from './layout/subcategory/subcategory.component';
import { ListuserComponent } from './admin/user/listuser/listuser.component';
import { AllorderComponent } from './admin/order/allorder/allorder.component';
import { OrderDetailComponent } from './admin/order/order-detail/order-detail.component';
import { ChangepasswordComponent } from './admin/profile/changepassword/changepassword.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannersComponent,
    ClientsComponent,
    HomeComponent,
    ServicesComponent,
    LayoutComponent,
    AboutComponent,
    SerComponent,
    ProductsComponent,
    ProductsDetailsComponent,
    LoginComponent,
    ContactComponent,
    RegisterComponent,
    TopbarComponent,
    PaintingsComponent,
    PaintingDetailsComponent,
    StatuesComponent,
    StatueDetailsComponent,
    PotsComponent,
    PotDetailsComponent,
    WishlistComponent,
    CouponComponent,
    ProfileComponent,
    UpdatepasswordComponent,
    OrderComponent,
    CategoryProductComponent,
    ViewcartComponent,
    OrderDetailsComponent,
    ForgotPasswordComponent,
    AddcategoryComponent,
    ListcategoryComponent,
    EditcategoryComponent,
    AdminloginComponent,
    DashboardComponent,
    AdminlayoutComponent,
    AdminheaderComponent,
    AdminfooterComponent,
    AddsubcategoryComponent,
    ListsubcategoryComponent,
    EditsubcategoryComponent,
    AddproductComponent,
    ListproductComponent,
    EditproductComponent,
    AddcouponComponent,
    ListcouponComponent,
    EditcouponComponent,
    AddadvertiseComponent,
    ListadvertiseComponent,
    SubcategoryComponent,
    ListuserComponent,
    AllorderComponent,
    OrderDetailComponent,
    ChangepasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
