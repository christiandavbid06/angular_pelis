import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';
import { Thumbs } from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];
  moviesSlideShow: Movie[] = [];


  @HostListener('window:scroll',['$event'])onScroll(){

    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    // console.log({pos, max});

    if(pos > max){
      // TODO: llamar el servicio
      if(this.peliculasService.cargando){return;}
      this.peliculasService.getCartelera().subscribe( movies => {
        this.movies.push(...movies);
      });
    }

  }

  constructor(private peliculasService: PeliculasService) {
  }

  ngOnInit(): void {
    this.peliculasService.getCartelera()
    .subscribe( movies => {
      this.movies =  movies;
      this.moviesSlideShow = movies;
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.peliculasService.resetCarteleraPage();
  }





}
