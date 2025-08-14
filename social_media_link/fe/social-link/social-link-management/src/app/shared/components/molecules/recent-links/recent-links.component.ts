import { Component, OnInit } from '@angular/core';
import { RecentLinksService } from '../../../actions/states/services/recent-links.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recent-links',
  standalone:true,
  template: `
<div class="recent-links">
  <h3>Recent visited links</h3>
  <ul>
    <li *ngFor="let link of recentLinks">
      <a style="color: black;" [href]="link" target="_blank">{{ link }}</a>
    </li>
  </ul>
</div>

  `,
  styleUrl: './recent-links.component.css',
  imports:[CommonModule]
})
export class RecentLinksComponent implements OnInit {
  recentLinks: string[] = [];

  constructor(private recentLinksService: RecentLinksService) { }

  ngOnInit(): void {
    this.recentLinks = this.recentLinksService.getLinks();
  }
}
