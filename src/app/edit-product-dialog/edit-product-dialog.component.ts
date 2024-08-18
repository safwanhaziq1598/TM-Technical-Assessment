import { Component, Inject } from '@angular/core';

//Models
import { NewProduct, ProductDetails } from '../../models/product';

//Services
import { ProductService } from '../../service/product.service';

//Angular Material
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-product-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './edit-product-dialog.component.html',
  styleUrl: './edit-product-dialog.component.scss'
})
export class EditProductDialogComponent {

  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDetails
  ) {

    this.productForm = this.fb.group({
      id: data.id,
      productName: [data.productName || '', Validators.required],
      url: [data.url || '', Validators.required]
    })
  }


  onUpdate(): void {
    this.dialogRef.close({ action: 'update', data: this.productForm.value});
  }

  onRemove(): void {
    this.dialogRef.close({ action: 'remove', data: this.data });
  }
}
