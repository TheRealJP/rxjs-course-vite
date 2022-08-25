import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Item } from '../../constants';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements OnInit {

  @Input() collection: Item[] = []
  @Input() title = '';
  @Input() showBackArrow = true;

  constructor(private navigate: NavigationService) { }

  ngOnInit(): void {
  }

  back() {
    this.navigate.back()
  }

}
