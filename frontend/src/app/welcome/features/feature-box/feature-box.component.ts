import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-feature-box',
  templateUrl: './feature-box.component.html',
  styleUrls: ['./feature-box.component.css']
})
export class FeatureBoxComponent {
  @Input() title = '';
  @Input() font_awesome = '';
  @Input() description = '';
}
