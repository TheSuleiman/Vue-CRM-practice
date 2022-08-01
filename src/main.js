import {createApp} from 'vue'
import App from './App.vue'
import messagePlugin from '@/utils/message.plugin'
import {initializeApp} from "firebase/app";
import {createMetaManager} from 'vue-meta'
import router from './router'
import store from './store'
import plugins from '@/plugins'
import Paginate from 'vuejs-paginate-next'
import Loader from '@/components/app/Loader'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

firebase.initializeApp({
    apiKey: "AIzaSyAhieROnn2IAivh1FGdVqA2Ag0410N8k1g",
    authDomain: "vue-practice-su-crm.firebaseapp.com",
    projectId: "vue-practice-su-crm",
    storageBucket: "vue-practice-su-crm.appspot.com",
    messagingSenderId: "647857069307",
    appId: "1:647857069307:web:9b50ff268f320a7056e45e",
    measurementId: "G-JFRD2LGRC8",
    databaseURL: "https://vue-practice-su-crm-default-rtdb.europe-west1.firebasedatabase.app/"
});

let app

firebase.auth().onAuthStateChanged(() => {
if (!app) {
    app = createApp(App)
        .use(store)
        .use(router)
        .use(messagePlugin)
        .use(plugins)
        .use(createMetaManager())
        .component('paginate', Paginate)
        .component('Loader', Loader)
        .mount('#app')

}
})