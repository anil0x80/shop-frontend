import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search implements OnInit {
  private route = inject(ActivatedRoute);
  search:string = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.search = params['search'];
    });
  }

}
