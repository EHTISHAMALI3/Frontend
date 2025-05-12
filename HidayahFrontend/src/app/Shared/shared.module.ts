import { NgModule } from "@angular/core";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SafeHtmlPipe } from "./pipes/SafeHtmlPipe";




@NgModule({
    declarations:[
        SafeHtmlPipe
    ],
    imports:[
        ToastrModule.forRoot({
            preventDuplicates: true,
            timeOut: 2000 
          }),
          SweetAlert2Module.forRoot(),
          NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
    ],
    exports:[
        SafeHtmlPipe
    ],
    providers:[]
})
export class SharedModule {}