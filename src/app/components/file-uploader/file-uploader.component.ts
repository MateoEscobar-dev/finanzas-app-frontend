import { Component } from '@angular/core'
import {
  DROPZONE_CONFIG,
  DropzoneConfigInterface,
  DropzoneModule,
} from 'ngx-dropzone-wrapper'

interface UploadedFile {
  name: string
  size: number
  type: string
  dataURL?: string
}

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*',
}

@Component({
    selector: 'app-file-uploader',
    imports: [DropzoneModule],
    template: ` <dropzone
      class="dropzone"
      [config]="dropzoneConfig"
      [message]="'Drop files here or click to upload.'"
      (success)="onUploadSuccess($event)"
    ></dropzone>

    <!-- file preview template -->
    @if (uploadedFiles) {
      <div id="uploadPreviewTemplate">
        @for (file of uploadedFiles; track $index) {
          <div class="card mt-1 mb-0 shadow-none border">
            <div class="p-2">
              <div class="row align-items-center">
                <div class="col-auto">
                  <img
                    data-dz-thumbnail
                    [src]="file.dataURL"
                    class="avatar-sm rounded bg-light"
                    alt=""
                  />
                </div>
                <div class="col ps-0">
                  <a
                    href="javascript:void(0);"
                    class="text-muted fw-bold"
                    data-dz-name
                    >{{ file.name }}</a
                  >
                  <p class="mb-0" data-dz-size>{{ file.size }}</p>
                </div>
                <div class="col-auto">
                  <!-- Button -->
                  <a
                    href="javascript:void(0);"
                    class="btn btn-link btn-lg text-muted"
                    (click)="removeFile($index)"
                  >
                    <i class="ri-close-line"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    }
    <!-- end file preview template -->`,
    providers: [
        {
            provide: DROPZONE_CONFIG,
            useValue: DEFAULT_DROPZONE_CONFIG,
        },
    ]
})
export class FileUploaderComponent {
  uploadedFiles: UploadedFile[] = []

  public dropzoneConfig: DropzoneConfigInterface = {
    clickable: true,
    addRemoveLinks: true,
    previewsContainer: false,
  }

  // File Upload
  imageURL: string = ''
  onUploadSuccess(event: UploadedFile[]) {
    setTimeout(() => {
      this.uploadedFiles.push(event[0])
    }, 0)
  }

  // File Remove
  removeFile(index: number) {
    this.uploadedFiles.splice(index, 1)
  }
}
