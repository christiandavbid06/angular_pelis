import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Swiper } from 'swiper';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[];
  mySwiper: Swiper;

  constructor(private router: Router) { }


  ngAfterViewInit(): void {
     this.mySwiper = new Swiper('.swiper-container', {
      // Optional parameters
      loop: true,

      /* // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      }, */
    });

    // this.mySwiper.slideNext();
  }

  ngOnInit(): void {

    console.log(this.movies);

  }

  onSlideNext(){
    this.mySwiper.slideNext();
  }

  onSlidePrev(){
    this.mySwiper.slidePrev();
  }

  onMovieClick(movie: Movie[]){
    console.log(movie);

    this.router.navigate(['/pelicula', movie['id']]);
  }

}
