import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminlayoutComponent } from './admin/adminlayout/adminlayout.component';
import { AddadvertiseComponent } from './admin/advertise/addadvertise/addadvertise.component';
import { ListadvertiseComponent } from './admin/advertise/listadvertise/listadvertise.component';
import { AdminloginComponent } from './admin/auth/adminlogin/adminlogin.component';
import { AddcategoryComponent } from './admin/category/addcategory/addcategory.component';
import { EditcategoryComponent } from './admin/category/editcategory/editcategory.component';
import { ListcategoryComponent } from './admin/category/listcategory/listcategory.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AllorderComponent } from './admin/order/allorder/allorder.component';
import { OrderDetailComponent } from './admin/order/order-detail/order-detail.component';
import { AddcouponComponent } from './admin/product/addcoupon/addcoupon.component';
import { AddproductComponent } from './admin/product/addproduct/addproduct.component';
import { EditcouponComponent } from './admin/product/editcoupon/editcoupon.component';
import { EditproductComponent } from './admin/product/editproduct/editproduct.component';
import { ListcouponComponent } from './admin/product/listcoupon/listcoupon.component';
import { ListproductComponent } from './admin/product/listproduct/listproduct.component';
import { AddsubcategoryComponent } from './admin/subcategory/addsubcategory/addsubcategory.component';
import { EditsubcategoryComponent } from './admin/subcategory/editsubcategory/editsubcategory.component';
import { ListsubcategoryComponent } from './admin/subcategory/listsubcategory/listsubcategory.component';
import { ListuserComponent } from './admin/user/listuser/listuser.component';
import { ViewcartComponent } from './cart/viewcart/viewcart.component';
import { ContactComponent } from './contact/contact.component';
import { CouponComponent } from './coupon/coupon.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { SubcategoryComponent } from './layout/subcategory/subcategory.component';
import { LoginComponent } from './login/login.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderComponent } from './order/order.component';
import { PaintingDetailsComponent } from './painting-details/painting-details.component';
import { PaintingsComponent } from './paintings/paintings.component';
import { PotDetailsComponent } from './pot-details/pot-details.component';
import { PotsComponent } from './pots/pots.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { CategoryProductComponent } from './products/category-product/category-product.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SerComponent } from './ser/ser.component';
import { StatueDetailsComponent } from './statue-details/statue-details.component';
import { StatuesComponent } from './statues/statues.component';
import { UpdatepasswordComponent } from './updatepassword/updatepassword.component';

const routes: Routes = [
  { path: '', redirectTo: 'layout/home', pathMatch: 'full' },
  {
    path: 'layout', component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'services', component: SerComponent },
      { path: 'subcategory/:id', component: SubcategoryComponent },
      { path: 'allproducts', component: ProductsComponent },
      { path: 'products/:id', component: CategoryProductComponent },
      { path: 'products-info/:id', component: ProductsDetailsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forgot', component: ForgotPasswordComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'coupons', component: CouponComponent },
      { path: 'orders', component: OrderComponent },
      { path: 'orders-detail/:id', component: OrderDetailsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'update-password', component: UpdatepasswordComponent },
      { path: 'paintings', component: PaintingsComponent },
      { path: 'painting-details', component: PaintingDetailsComponent },
      { path: 'statues', component: StatuesComponent },
      { path: 'statue-details', component: StatueDetailsComponent },
      { path: 'pots', component: PotsComponent },
      { path: 'pot-details', component: PotDetailsComponent },
      { path: 'viewcart', component: ViewcartComponent },

    ]
  },
  { path: 'admin', redirectTo: 'admin/login', pathMatch: 'full' },
  {
    path: 'admin/login', component: AdminloginComponent
  },
  {
    path: 'adminlayout', component: AdminlayoutComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'addcategory', component: AddcategoryComponent },
      { path: 'listcategory', component: ListcategoryComponent },
      { path: 'editcategory/:id', component: EditcategoryComponent },
      { path: 'addsubcategory', component: AddsubcategoryComponent },
      { path: 'listsubcategory', component: ListsubcategoryComponent },
      { path: 'editsubcategory/:id', component: EditsubcategoryComponent },
      { path: 'addproduct', component: AddproductComponent },
      { path: 'listproduct', component: ListproductComponent },
      { path: 'editproduct/:id', component: EditproductComponent },
      { path: 'addcoupon', component: AddcouponComponent },
      { path: 'listcoupon', component: ListcouponComponent },
      { path: 'addadvertise', component: AddadvertiseComponent },
      { path: 'listadvertise', component: ListadvertiseComponent },
      { path: 'listuser', component: ListuserComponent },
      { path: 'listorder', component: AllorderComponent },
      { path: 'orderdetail/:id', component: OrderDetailComponent },

    ]
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
