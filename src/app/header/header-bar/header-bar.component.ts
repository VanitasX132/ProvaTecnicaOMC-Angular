import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {
  @Output() onFeatureSelected = new EventEmitter<string>();

  onFeatureClicked(feature: string) {
    this.onFeatureSelected.emit(feature);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
