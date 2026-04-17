import { CommonModule } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { Column, TableInstance } from './table.model'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
    selector: 'app-table',
    imports: [CommonModule, NgbRatingModule, FormsModule, NgApexchartsModule],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class TableComponent<T> implements OnInit {
  @Input() tableClass!: string
  @Input() theadClass!: string
  @Input() isSelectable!: boolean
  @Input() columns: Column<T>[] = []
  @Input() data: T[] = []
  @Input() itemsPerPage!: number // Default page size options
  @Input() searchable: boolean = true
  @Input() pagination: boolean = true

  sortConfig = { key: '', direction: '' }
  activePage = 1
  startIndex: number = 1
  endIndex: number = this.itemsPerPage
  pageSize!: number
  searchQuery = ''
  totalPages: number = 0

  paginatedData: any[] = []
  sortedData: any[] = []
  filteredData: any[] = []
  masterSelected!: boolean

  tableInstance!: TableInstance<T>

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.pageSize = this.itemsPerPage
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage)
    // Initialize table instance
    this.tableInstance = {
      columns: this.columns,
      data: this.data,
    }

    this.updateTable()
  }

  // Use this method to sanitize and set the HTML
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html)
  }

  isAccessorFunction(accessor: string): boolean {
    return typeof accessor === 'function'
  }

  PageChange() {
    if (this.pageSize != -1) {
      this.itemsPerPage = this.pageSize
    } else {
      this.itemsPerPage = this.tableInstance.data.length
    }
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage)
    this.updateTable()
  }

  changePage(page: number): void {
    this.activePage = page
    this.updateTable()
  }

  generatePageNumbers(totalPages: number): number[] {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  handleSort(key: string) {
    let direction = 'ascending'
    if (
      this.sortConfig.key === key &&
      this.sortConfig.direction === 'ascending'
    ) {
      direction = 'descending'
    }
    this.sortConfig = { key: key, direction: direction }
    this.updateTable()
  }

  updateTable() {
    this.startIndex = (this.activePage - 1) * this.itemsPerPage
    this.endIndex = this.startIndex + this.itemsPerPage
    this.paginatedData = this.data.slice(this.startIndex, this.endIndex)

    if (!this.sortConfig.key) {
      this.sortedData = this.paginatedData
    } else {
      const sortedArray = [...this.paginatedData]
      sortedArray.sort((a, b) => {
        const key = this.sortConfig.key // Store the key in a variable
        if (key) {
          if (a[key] < b[key]) {
            return this.sortConfig.direction === 'ascending' ? -1 : 1
          }
          if (a[key] > b[key]) {
            return this.sortConfig.direction === 'ascending' ? 1 : -1
          }
        }
        return 0
      })

      this.sortedData = sortedArray
    }

    this.filteredData = this.sortedData
  }

  searchTerm() {
    if (this.searchQuery) {
      this.filteredData = this.sortedData.filter((item) =>
        Object.values(item).some((value: any) =>
          value
            .toString()
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
        )
      )
    } else {
      this.filteredData = this.sortedData
    }
  }

  // Multiple Select
  checkedValGet: number[] = []
  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: Event): void {
    this.filteredData = this.filteredData.map((x: { states: any }) => ({
      ...x,
      states: (ev.target as HTMLInputElement).checked,
    }))
  }
}
