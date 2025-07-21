import { Component, input, OnInit, signal } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-image-slider',
  imports: [MatIconModule],
  templateUrl: './image-slider.html',
  styleUrl: './image-slider.css'
})
export class ImageSlider implements OnInit{
  
  currentImageIndex= signal<number>(0);
  visibleImagesIndex = signal<number>(0);
  visibleImages= signal<Array<string>>([]);
  images = input<Array<string>>([]);

  ngOnInit(): void {

    this.visibleImages.set(this.images().slice(0, 4));
  }

  changeImage(current_url:string){
    for (let index = 0; index < this.images().length; index++) {
      const url = this.images()[index];
      if(current_url == url){
        this.currentImageIndex.set(index);
      }
    }
      
  }

  scrollDown() {
    const totalImages = this.images().length;
    const newIndex = (this.visibleImagesIndex() + 1) % totalImages;

    this.visibleImagesIndex.set(newIndex);
    this.updateVisibleImages(newIndex, totalImages);
  }

  scrollUp() {
    const totalImages = this.images().length;
    const newIndex = (this.visibleImagesIndex() - 1 + totalImages) % totalImages;

    this.visibleImagesIndex.set(newIndex);
    this.updateVisibleImages(newIndex, totalImages);
  }

  private updateVisibleImages(startIndex: number, totalImages: number) {
    const maxVisible = Math.min(4, totalImages);
    const visible = [];

    for (let i = 0; i < maxVisible; i++) {
      visible.push(this.images()[(startIndex + i) % totalImages]);
    }

    this.visibleImages.set(visible);
  }
}
