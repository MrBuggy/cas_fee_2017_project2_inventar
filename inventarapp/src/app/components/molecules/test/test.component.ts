import { Component, OnInit } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map'

export type Item = { id: number, name: string };

@Component({
  selector: "test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"]
})
export class TestComponent implements OnInit {
  items: Array<Item>;

  constructor(private http: Http) {}

  ngOnInit() {
    this.http
      .get("/assets/mock/test/test.json")
      .map(data => data.json() as Array<Item>)
      .subscribe(data => {
        this.items = data;
        console.log(data);
      });
  }
}
