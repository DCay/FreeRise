import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    $(document).ready(function () {
      setInterval(checkScroll, 10);
    });
    function checkScroll() {
      const nav = $('.navbar-white').first();

      if ($(document).scrollTop() > 0 && !nav.hasClass('scrolling')) {
        nav.addClass('scrolling');
      } else if ($(document).scrollTop() === 0 && nav.hasClass('scrolling')) {
        nav.removeClass('scrolling');
      }
    }
  }
}
