import App from './App.vue';
import { createApp } from 'vue';
import primevue from  'primevue/config';
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import myToast from "primevue/toast";
import ToastService from "primevue/toastservice";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import router from './router'
import ConfirmPopup from 'primevue/confirmpopup';
import Dialog from 'primevue/dialog';
import Textarea from 'primevue/textarea';

import 'primevue/resources/themes/saga-blue/theme.css'    //theme
import 'primeflex/primeflex.css'
import 'primevue/resources/primevue.min.css'               //core css
import 'primeicons/primeicons.css'                        //icons


const app = createApp(App);
app.use(primevue);
app.use(router);
app.use(ToastService);

app.component('MyTextarea',Textarea)
app.component('MyDialog',Dialog);
app.component('InputText', InputText);
app.component('MyButton', Button);
app.component('MyToast', myToast);
app.component('DataTable', DataTable);
app.component('AppColumn', Column);
app.component('ConfirmPopup',ConfirmPopup)
app.mount('#app')

