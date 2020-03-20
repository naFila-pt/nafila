import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "home#intro": "na fila. sem fila!",
          "home#searchStoreCode": "procura o codigo na loja",
          "home#storeCode": "insere o código da loja",
          "home#insertEmail": "insere email",
          "home#status": "status",
        }
      }
    },
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;