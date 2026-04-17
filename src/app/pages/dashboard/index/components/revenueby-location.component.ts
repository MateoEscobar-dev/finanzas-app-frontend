import { Component, OnInit } from '@angular/core'
import { CardTitleComponent } from '@component/card-title.component'
import { NgApexchartsModule } from 'ng-apexcharts'
import { WorldVectorMapComponent } from '@component/vector-maps/world-vector-map.component'
import 'jsvectormap'
import "jsvectormap/dist/maps/world"
// Import world map data

@Component({
    selector: 'app-revenue-location',
    imports: [CardTitleComponent, NgApexchartsModule, WorldVectorMapComponent],
    template: ` <div class="card">
      <card-title
        classname="d-flex card-header justify-content-between align-items-center"
        title="Revenue By Location"
        [menuItems]="[
          { label: 'Sales Report' },
          { label: 'Export Report' },
          { label: 'Profit' },
          { label: 'Action' }
        ]"
      ></card-title>

      <div class="card-body pt-0">
        <div class="mb-4 mt-3">
          <app-world-vector-map
            mapId="world-map-markers"
            type="world"
            [options]="worldMapConfig"
            height="217px"
          ></app-world-vector-map>
          <!-- <div id="world-map-markers" style="height: 217px"></div> -->
        </div>

        <h5 class="mb-1 mt-0 fw-normal">New York</h5>
        <div class="progress-w-percent">
          <span class="progress-value fw-bold">72k </span>
          <div class="progress progress-sm">
            <div
              class="progress-bar"
              role="progressbar"
              style="width: 72%"
              aria-valuenow="72"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>

        <h5 class="mb-1 mt-0 fw-normal">San Francisco</h5>
        <div class="progress-w-percent">
          <span class="progress-value fw-bold">39k </span>
          <div class="progress progress-sm">
            <div
              class="progress-bar"
              role="progressbar"
              style="width: 39%"
              aria-valuenow="39"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>

        <h5 class="mb-1 mt-0 fw-normal">Sydney</h5>
        <div class="progress-w-percent">
          <span class="progress-value fw-bold">25k </span>
          <div class="progress progress-sm">
            <div
              class="progress-bar"
              role="progressbar"
              style="width: 39%"
              aria-valuenow="39"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>

        <h5 class="mb-1 mt-0 fw-normal">Singapore</h5>
        <div class="progress-w-percent mb-0">
          <span class="progress-value fw-bold">61k </span>
          <div class="progress progress-sm">
            <div
              class="progress-bar"
              role="progressbar"
              style="width: 61%"
              aria-valuenow="61"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
      <!-- end card-body-->
    </div>
    <!-- end card-->`,
    styles: ``
})
export class RevenueByLocationComponent implements OnInit {
  worldMapConfig = {
    selector: '#world-map-markers',
    backgroundColor: 'transparent',
    regionStyle: {
      initial: {
        fill: 'rgba(145, 166, 189, 0.25)',
      },
    },
    markers: [
      { coords: [37.77, -122.41], name: 'San Francisco' },
      { coords: [40.71, -74.0], name: 'New York' },
      { coords: [-33.86, 151.2], name: 'Sydney' },
      { coords: [1.3, 103.8], name: 'Singapore' },
    ],
    markerStyle: {
      initial: {
        r: 9,
        fill: '#727cf5',
        'fill-opacity': 0.9,
        stroke: '#fff',
        'stroke-width': 7,
        'stroke-opacity': 0.4,
      },
      hover: {
        fill: '#727cf5',
        stroke: '#fff',
        'fill-opacity': 1,
        'stroke-width': 1.5,
      },
    },
  }

  ngOnInit(): void {}
}
