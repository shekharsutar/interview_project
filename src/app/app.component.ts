import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  formdata: any;
  id = 0;
  title = 'interview_project';
  result: any;
  displaystyle = "none";

  constructor(private api: ApiService, private router: Router) {

  }

  ngOnInit(): void {
    this.load();
  }
  load() {
    this.id = 0;
    this.displaystyle = "none";
    this.api.get("name").subscribe((result: any) => {
      this.result = result;
    });
  }


  openpopup() {
    this.displaystyle = "block";
    this.id = 0;
    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required]))
    });
  }

  closepopup() {
    this.displaystyle = "none";
  }

  edit(id:number){
    this.id = id;
    this.api.get("name/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        name: result.name
      });
      this.displaystyle = "block";
    })
  }

  delete(id: number): void {
    if (confirm("Sure to delete?")) {
      this.api.delete("name/" + id).subscribe((result: any) => {
        this.load();
      })
    }
  }
  save(data: any) {
    if(this.id == 0){
      this.api.post("name", data).subscribe((result: any) => {
        this.load();
      })
    }
    else{
    this.api.put("name/" + this.id, data).subscribe((result: any) => {
      this.load();
    })
    }
  }
}
