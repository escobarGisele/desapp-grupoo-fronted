import { Component, OnInit,Input } from '@angular/core';

@Component({
    selector: 'locations',
    template:  `<select ng-model="selectedValue">
                    <option *ngFor="let c of countries" value="c.id">{{c.name}}</option>
                </select>`
})
export class SelectComponent  implements OnInit{
    @Input() name: string;
    countries = [
        {id: 1, name: "United States"},
        {id: 2, name: "Australia"},
        {id: 3, name: "Canada"},
        {id: 4, name: "Brazil"},
        {id: 5, name: "England"}
    ];
    ngOnInit(): void { }
}