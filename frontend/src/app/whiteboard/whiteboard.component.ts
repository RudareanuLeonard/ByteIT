import { Component } from '@angular/core';
import { KonvaEventListener } from 'konva/lib/Node';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Stage } from 'konva/lib/Stage';
import { Layer } from 'konva/lib/Layer';
import { Transformer } from 'konva/lib/shapes/Transformer';
@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.css']
})
export class WhiteboardComponent {
  shapes: any = [];
  stage!: Stage;
  layer!: Layer;
  inkColor: string = '#000000';
  selectedButton: any = {
    'line': false,
    'eraser': false
  }
}
