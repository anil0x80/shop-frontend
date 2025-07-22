import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-wrapper',
  templateUrl: './section-wrapper.component.html',
  styleUrls: ['./section-wrapper.component.css']
})
export class SectionWrapperComponent {
  @Input() header!: string;
}
