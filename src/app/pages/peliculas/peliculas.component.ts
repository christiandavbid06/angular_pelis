import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieResponse } from '../../interfaces/movie-response';
import { Location } from '@angular/common';
import { Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  public pelicula: MovieResponse;
  public cast: Cast[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private peliculasService: PeliculasService,
              private location: Location,
              private router: Router) { } // Location importar de angular/common

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.params.id;
    // Se puede usar destructuracion, por ejemplo si hay mas de un parametro
    //const { id, texto, buscar } = this.activatedRoute.snapshot.params;

    combineLatest([
      this.peliculasService.getPeliculaDetalle(id),
      this.peliculasService.getCast(id)

    ]).subscribe( ([movie, cast]) =>{
      if(!movie){
        this.router.navigateByUrl('/home');
        return;
      }
      this.pelicula = movie;
      this.cast = cast.filter( actor => actor.profile_path !== null );

    });


    //ES LO MISMO QUE LO DE AQUI ABAJO, pero arriba esta combinado y destructurado en el subscribe


    /* this.peliculasService.getPeliculaDetalle(id).subscribe(movie => {
      if(!movie){
        this.router.navigateByUrl('/home');
        return;
      }
    this.pelicula = movie;

    });

    this.peliculasService.getCast(id).subscribe(cast => {
      console.log(cast);
      this.cast = cast.filter( actor => actor.profile_path !== null );
    }); */

  }


  onRegresar(){
    this.location.back();
  }

}
