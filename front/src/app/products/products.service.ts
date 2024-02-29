import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product.class';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

    private static productslist: Product[] = null;
    private products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

    constructor(private http: HttpClient) { }

    private apiUrl = 'http://localhost:5000/api/products';

    getProducts(): Observable<Product[]> {
        if( ! ProductsService.productslist )
        {
            this.http.get<any>(this.apiUrl).subscribe(data => {
                ProductsService.productslist = data.data;

                this.products$.next(ProductsService.productslist);
            });
        }
        else
        {
            this.products$.next(ProductsService.productslist);
        }

        return this.products$;
    }

    create(prod: Product): Observable<Product> {
      console.log("Creating product:", prod,);

      return this.http.post<Product>(this.apiUrl, prod, { headers: { 'Content-Type': 'application/json' } }).pipe(
        tap((product: any) => {
          // Mise à jour de la liste des produits avec le nouveau produit
          console.log('prod', product.data);

          ProductsService.productslist.push(product.data);
          this.products$.next(ProductsService.productslist);
        })
      );
    }
  

    update(prod: Product): Observable<Product[]>{
      const url = `${this.apiUrl}/${prod.id}`;
      console.log("Updating product:", prod);

      return this.http.put<Product>(url, prod, { headers: { 'Content-Type': 'application/json' } }).pipe(
        tap((updatedProduct: any) => {
          //Mettre à jour la liste des produits
          const index = ProductsService.productslist.findIndex(item => item.id === prod.id);

          if(index !== -1)
          {
            ProductsService.productslist[index] = updatedProduct.data;
            this.products$.next([...ProductsService.productslist]);
          }
          else
          {
            console.error("Product not found in the local list");
          }
        })
      );
    }

    delete(id: number): Observable<void> {
      const url = `${this.apiUrl}/${id}`;
      console.log("Deleting product with ID:", id);

      return this.http.delete<void>(url).pipe(
        tap(() => {
          //Supprimer le produit de la liste des produits
          const index = ProductsService.productslist.findIndex(item => item.id === id);

          if(index !== -1)
          {
            ProductsService.productslist.splice(index, 1);
            this.products$.next([...ProductsService.productslist]);
          }
          else
          {
            console.error("Product not found in the local list");
          }
        })
      );
    }

}