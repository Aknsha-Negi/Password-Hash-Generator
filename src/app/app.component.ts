import { Component } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import * as CryptoJS from "crypto-js";
import { HashService } from './hash.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _password!: string;
  md5!: string;
  sha1!: string;
  sha256!: string;
  output1!: string;
  output2!: string;
  output3!: string;
  visible!: string;

  constructor(private hashService: HashService){}

  get password(){
    return this._password;
  }

  set password(p: string){
    this._password = p;
  }

  hashFunction(p: string){
    this.md5 = CryptoJS.MD5(p).toString();
    this.sha1 = CryptoJS.SHA1(p).toString();
    this.sha256 = CryptoJS.SHA256(p).toString();
  }

  check(md: string, sha1: string, sha256: string){
    if(this.md5 === md){
      this.output1 = "fa-regular fa-circle-check";
    }else{
      this.output1 = "fa-regular fa-circle-xmark";
    }
    if(this.sha1 === sha1){
      this.output2 = "fa-regular fa-circle-check";
    }else{
      this.output2 = "fa-regular fa-circle-xmark";
    }
    if(this.sha256 === sha256){
      this.output3 = "fa-regular fa-circle-check";
    }else{
      this.output3 = "fa-regular fa-circle-xmark";
    }
    this.visible = "display";
  }
  
  submit(){
    this.hashFunction(this._password);
    this.hashService.getHash(this._password).subscribe(
      (h) =>{
        this.check(h["md"], h["sha1"], h["sha256"]);
      }
    );
  }
}
