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
          "appTitle": "na<b>fila</b>",

          "onboarding#intro_welcome": "Bem Vindo!",
          "onboarding#intro_pitch": "na<b>fila</b>. Sem filas.",
          "onboarding#store_title": "É simples!",
          "onboarding#store_description": "A tua Loja Favorita afixa <b>um código por dia</b>, que deves utilizar para <b>entrares</b> na<b>fila</b>.",
          "onboarding#useCode_title": "Usa o código",
          "onboarding#useCode_description": "Insere o código no campo na<b>fila</b> e carrega ENTRAR na<b>fila</b>",
          "onboarding#useCode_sampleCode": "LojaCodigo123",
          "onboarding#useCode_instruction": "inserir código da loja",
          "onboarding#useCode_button": "Validar Código",
          "onboarding#insertEmail_title": "Insere o email",
          "onboarding#insertEmail_description": "Insere o teu email <b>para receberes uma notificação.</b>",
          "onboarding#insertEmail_done": "E já está!",
          "onboarding#insertEmail_notification": "Recebes um aviso quando a tua vez estiver a chegar.",
          "onboarding#insertEmail_button": "Entrar na<b>fila</b>",

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