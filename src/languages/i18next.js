import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import es from "./es.json";

i18next.use( initReactI18next ).init( {
    resources: {
        en: {
            translation: en,
        },
        es: {
            translation: es,
        },
    },
    lng: localStorage.getItem( "lng" ) || "en",
} );

export default i18next;