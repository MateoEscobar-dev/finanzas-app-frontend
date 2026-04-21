import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { Subject } from 'rxjs'
import { IFormField } from '@/app/shared/base-component/base-component'

@Component({
  selector: 'app-generic-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './generic-modal.component.html',
  styleUrl: './generic-modal.component.scss',
})
export class GenericModalComponent implements OnInit, OnDestroy, OnChanges {
  private fb = inject(FormBuilder)
  private destroy$ = new Subject<void>()

  // Inputs
  @Input() isVisible = false
  @Input() mode: 'create' | 'edit' | 'view' = 'create'
  @Input() fields: IFormField[] = []
  @Input() data: any = null
  @Input() isSubmitting = false

  // Outputs
  @Output() close = new EventEmitter<void>()
  @Output() formSubmit = new EventEmitter<any>()

  form!: FormGroup

  ngOnInit(): void {
    this.buildForm()
    this.watchDataChanges()
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Cuando cambian los fields, reconstruir el formulario
    if (changes['fields'] && !changes['fields'].firstChange && this.form) {
      this.buildForm()
      // Después de reconstruir, aplicar los datos si existen
      setTimeout(() => {
        this.watchDataChanges()
      }, 0)
    }

    // Cuando cambian los datos, actualizar el formulario
    if (changes['data'] && this.form) {
      this.watchDataChanges()
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  /**
   * Construye el FormGroup basado en los fields
   */
  private buildForm(): void {
    const groupConfig: any = {}

    this.fields.forEach((field) => {
      const validators = []

      if (field.required) {
        validators.push(Validators.required)
      }

      if (field.type === 'email') {
        validators.push(Validators.email)
      }

      // Multiselect inicia con array vacío
      const initialValue = field.type === 'multiselect' ? [] : null
      groupConfig[field.name] = [initialValue, validators]
    })

    this.form = this.fb.group(groupConfig)
  }

  /**
   * Maneja el cambio en un campo multiselect nativo
   */
  onMultiselectChange(fieldName: string, event: Event): void {
    const select = event.target as HTMLSelectElement
    const selected = Array.from(select.selectedOptions).map((opt) => opt.value)
    this.form.get(fieldName)?.setValue(selected)
    this.form.get(fieldName)?.markAsTouched()
  }

  /**
   * Verifica si un valor está seleccionado en un multiselect
   */
  isOptionSelected(fieldName: string, value: any): boolean {
    const current = this.form.get(fieldName)?.value
    if (!Array.isArray(current)) return false
    return current.map(String).includes(String(value))
  }

  /**
   * Observa cambios en @Input data para llenar el formulario
   */
  private watchDataChanges(): void {
    // Solo llenar si el formulario existe
    if (!this.form) return

    // Llenar formulario si hay datos
    if (this.data) {
      // Asegurarse de que todos los campos tengan su valor
      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.get(key)
        const value = this.data[key]
        const field = this.fields.find((f) => f.name === key)

        if (control) {
          if (field?.type === 'multiselect') {
            // Para multiselect siempre asignar array
            control.setValue(Array.isArray(value) ? value.map(String) : [])
          } else if (value !== undefined && value !== null && value !== '') {
            control.setValue(value)
            control.markAsTouched()
          } else {
            control.setValue(null)
            control.markAsUntouched()
          }
        }
      })
    } else {
      // Si no hay datos, limpiar el formulario
      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.get(key)
        const field = this.fields.find((f) => f.name === key)
        if (control) {
          control.setValue(field?.type === 'multiselect' ? [] : null)
          control.markAsUntouched()
        }
      })
    }

    // En modo view, deshabilitar todos los campos
    if (this.mode === 'view') {
      this.form.disable()
    } else {
      // En create/edit, habilitar los campos
      this.form.enable()
    }
  }

  /**
   * Verifica si un campo es inválido y tocado
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName)
    return !!(field && field.invalid && field.touched)
  }

  /**
   * Obtiene el mensaje de error para un campo
   */
  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName)
    if (!field) return ''

    if (field.hasError('required')) {
      return `${fieldName} es requerido`
    }

    if (field.hasError('email')) {
      return 'Email inválido'
    }

    return 'Campo inválido'
  }

  /**
   * Marca todos los campos como touched para mostrar errores
   */
  private markFormGroupTouched(group: FormGroup): void {
    Object.keys(group.controls).forEach((key) => {
      const control = group.get(key)
      control?.markAsTouched()

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control)
      }
    })
  }

  /**
   * Envía el formulario
   */
  submit(): void {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form)
      return
    }

    this.formSubmit.emit(this.form.getRawValue())
  }

  /**
   * Cierra la modal
   */
  closeModal(): void {
    this.close.emit()
  }
}
