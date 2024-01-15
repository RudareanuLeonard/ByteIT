import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.css'],
  animations: [
    trigger('fadeAnimation', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('0ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class WhiteboardComponent implements AfterViewInit{


  constructor(private router: Router) {}
  @ViewChild('whiteboardCanvas', { static: false }) whiteboardCanvas!: ElementRef<HTMLCanvasElement>;

  private context!: CanvasRenderingContext2D; // Non-null assertion operator (!)

  ngAfterViewInit() {
    this.context = this.whiteboardCanvas.nativeElement.getContext('2d')!;
  }

  eraseContent(event: MouseEvent) {
    console.log("ERASER");
    // Check if the button is pressed before erasing
    if (event.buttons !== 1) {
      return;
    }

    // Get the position where the mouse is hovering
    const x = event.offsetX;
    const y = event.offsetY;

    // Use the context to draw with a background color (erase)
    this.context.fillStyle = 'white'; // You can set any color you want
    this.context.fillRect(x - 5, y - 5, 10, 10);
  }


  refreshPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }





}
