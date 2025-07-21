import { Component, input } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  imports: [],
  templateUrl: './image-slider.html',
  styleUrl: './image-slider.css'
})
export class ImageSlider {
  images = input<Array<string>>([]);
}
