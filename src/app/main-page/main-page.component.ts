import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';

export interface Book {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}
export interface SearchResponse {
  error: string;
  total: string;
  page: string;
  books: Book[];
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit ,OnChanges{
  query:string = 'Angular'
  constructor(
    private http: HttpClient,
    ) { }
  book:Book[] | undefined
  page:number = 1
  prevPage(){
    this.page--
    this.getBooks(this.page,this.query)
  }
  nextPage(){
    this.page++
    this.getBooks(this.page,this.query)
  }
  ngOnInit(): void {
    this.getBooks(this.page,this.query)
  }
  ngOnChanges():void{
    this.getBooks(this.page,this.query)
  }
  showLoader = false
  showCart = true
  onSubmit(){
    this.showLoader = true
    this.showCart = false
    this.http.get<any>(`https://api.itbook.store/1.0/search/${this.query}/${this.page}`)
    .subscribe(
      response => {
        console.log(response.books);
        this.book = response.books
        this.showCart = true
        this.showLoader = false
      }
    )
  }
  
  
  getBooks(page:number = 1,query:string = this.query){
    this.http.get<any>(`https://api.itbook.store/1.0/search/${query}/${page}`)
    .subscribe(
      response => {
        this.book = response.books
        this.page = response.page
      }
    )
  }
  
  modalImage:string = ''
  modalTitle:string = ''
  modalSubtitle:string = ''
  modalPrice:string = ''
  modalUrl:string = ''
  modal:any
  checkIfAdded = false
  viewBook(item:any){
    this.modalTitle = item.title
    this.modalImage = item.image
    this.modalSubtitle = item.subtitle
    this.modalPrice = item.price
    this.modalUrl = item.url
    this.modal = item
  }
  id:any;
  added:any[] = []
  addToCart(modal:any){
    if(this.added.includes(modal)){
      alert('Already added!')
    }else{
      this.added.push(modal)
      localStorage.setItem('to-cart',JSON.stringify(this.added))
    }
  }
  
  
}

