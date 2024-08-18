import { Component, Inject, inject, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

//Models
import { NewProduct } from '../../models/product';

//Services
import { ProductService } from '../../service/product.service';

//Angular Material
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './add-product-dialog.component.html',
  styleUrl: './add-product-dialog.component.scss',
})
export class AddProductDialogComponent implements OnInit {

  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewProduct
  ) {

    this.productForm = this.fb.group({
      id: Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      productName: ['', Validators.required],
      url: ['', Validators.required]
    })
  }

  ngOnInit() {}

  onSubmit(){
    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);
    }
  }
}
