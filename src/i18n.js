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
          "onboarding#useCode_description": "Insere o código no campo na<b>fila</b> e carrega<br/>ENTRAR na<b>fila</b>",
          "onboarding#useCode_sampleCode": "LojaCodigo123",
          "onboarding#useCode_instruction": "inserir código da loja",
          "onboarding#useCode_button": "Validar Código",
          "onboarding#insertEmail_title": "Insere o email",
          "onboarding#insertEmail_description": "Insere o teu email <b>para receberes uma notificação.</b>",
          "onboarding#insertEmail_notification": "<b>E já está!</b><br/>Recebes um aviso quando a tua vez estiver a chegar.",
          "onboarding#insertEmail_button": "Entrar na<b>fila</b>",

          "home#insertCode_title": "Insere o código da tua loja",
          "home#insertCode_inputPlaceholder": "Código nafila da loja",
          "home#insertCode_button": "entrar na<b>fila</b>",
          "home#ticket_store": "Loja",
          "home#ticket_current": "Agora",
          "home#ticket_queue": "na<b>fila</b>",
          "home#ticket_button": "Tirar senha",
          "home#notification_description": "Insere o teu email para receberes a <b>notificação</b>",
          "home#notification_inputPlaceholder": "Email",
          "home#notification_description": "<b>Ao carregar em \"Continuar\"</b>, confirmas que leste e entendeste os <u>termos e condições da proteção de dados</u>",
          "home#notification_button": "Continuar",
          "home#end_title": "Obrigado!",
          "home#end_description": "Vamos avisar-te quando estiver a chegar a tua vez.",
          "home#end_staysafe": "Evita o contacto. <b>Protege a tua saúde e a dos outros.</b>",
          "home#end_closeWindow": "Podes fechar o ecrã"

        }
      }
    },
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;