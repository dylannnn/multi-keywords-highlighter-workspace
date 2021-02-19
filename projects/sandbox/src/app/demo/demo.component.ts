import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DynamicComponent } from '../dynamic-component/dynamic.component';
import { Info } from '../models/info.class';
import { PeriodicElement } from '../models/periodic-element.interface';
import { MOCK_PERIODIC_ELEMENT_DATA } from './periodic-element.mock';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  dataSource: MatTableDataSource<PeriodicElement>;
  columnsToDisplay = ['position', 'name', 'weight', 'symbol'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dynamicComponent = DynamicComponent;
  dynamicComponentInjector: Injector;
  dynamicComponentContent = [
    [document.createTextNode('Dynamic component in ngComponentOutlet')]
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private injector: Injector
  ) {

    this.dynamicComponentInjector = Injector.create({
      providers: [
        {
          provide: Info, deps: [],
          useValue: {title: 'New title'}
        }],
      parent: injector
    });

    this.activatedRoute.data.subscribe(data => {
      console.log('[DEMO] DemoComponent: Activated Route Data: ', data);
    });
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = MOCK_PERIODIC_ELEMENT_DATA;
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.activatedRoute.data.subscribe(data => {
      console.log('[DEMO] DemoComponent Init: Activated Route Data: ', data);
    });
  }

  sortData(sort: Sort): void {
    const data = MOCK_PERIODIC_ELEMENT_DATA.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'position': return this.compare(a.position, b.position, isAsc);
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'weight': return this.compare(a.weight, b.weight, isAsc);
        case 'symbol': return this.compare(a.symbol, b.symbol, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
