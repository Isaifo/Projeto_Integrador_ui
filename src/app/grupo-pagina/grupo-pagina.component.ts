import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Grupo } from '../model/Grupo';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { GrupoService } from '../service/grupo.service';
import { PostagemService } from '../service/postagem.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-grupo-pagina',
  templateUrl: './grupo-pagina.component.html',
  styleUrls: ['./grupo-pagina.component.css']
})
export class GrupoPaginaComponent implements OnInit {

  idGrupo: number
  grupo: Grupo = new Grupo()

  idUser = environment.idUsuario
  usuario: Usuario = new Usuario()

  postagem: Postagem = new Postagem()
  listaPostagem: Postagem[]

  constructor(
    private router: Router,
    private route: ActivatedRoute,

    private grupoService: GrupoService,
    private usuarioService: UsuarioService,
    private postagemService: PostagemService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if(environment.tokenUsuario == ""){
      this.router.navigate(['/entrar'])
    }

    this.idGrupo = this.route.snapshot.params['id']
    this.findGrupoById(this.idGrupo)
  }

  findGrupoById(id: number){
    this.grupoService.getByIdGrupo(id).subscribe((resp: Grupo) => {
      this.grupo = resp
    })
  }

  findUsuarioById(){
    this.usuarioService.getByIdUsuario(this.idUser).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  publicarPostagem(){
    this.postagemService.postPostagem(this.postagem, this.idGrupo, this.idUser).subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem realizada com sucesso')
      this.postagem = new Postagem()
    })
  }

}
