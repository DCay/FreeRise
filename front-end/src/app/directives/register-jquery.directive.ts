import { Directive, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Directive({
    selector: '[register-jquery]'
})
export class RegisterJqueryDirective implements OnInit {
    constructor() { }

    ngOnInit(): void {
        $(function () {

            $('#client-form-link').click(function (e) {
                $("#client-form").delay(100).fadeIn(100);
                $("#freelancer-form").fadeOut(100);
                $('#freelancer-form-link').removeClass('active');
                $(this).addClass('active');
                e.preventDefault();
            });
            $('#freelancer-form-link').click(function (e) {
                $("#freelancer-form").delay(100).fadeIn(100);
                $("#client-form").fadeOut(100);
                $('#client-form-link').removeClass('active');
                $(this).addClass('active');
                e.preventDefault();
            });

        });
    }
}