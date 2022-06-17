import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getAddedBooks()
  }
  num:number = 1
  output:any
  getAddedBooks(): void{
    this.output = JSON.parse(localStorage.getItem('to-cart') || '{}')
  }
}
