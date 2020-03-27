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
          "global#return_button": "Retroceder",

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
          "home#insertCode_inputPlaceholder": "Código naFila da loja",
          "home#insertCode_button": "entrar na<b>fila</b>",
          "home#ticket_store": "Loja",
          "home#ticket_current": "Agora",
          "home#ticket_queue": "na<b>fila</b>",
          "home#ticket_button": "Tirar senha",
          "home#notification_description": "Insere o teu email para receberes a <b>notificação</b>",
          "home#notification_inputPlaceholder": "Email",
          "home#notification_terms": "<b>Ao carregar em \"Continuar\"</b>, confirmas que leste e entendeste os <u>termos e condições da proteção de dados</u>",
          "home#notification_button": "Continuar",
          "home#end_title": "Obrigado!",
          "home#end_description": "Vamos avisar-te quando estiver a chegar a tua vez.",
          "home#end_staysafe": "Evita o contacto. <b>Protege a tua saúde e a dos outros.</b>",
          "home#end_closeWindow": "Podes fechar o ecrã",

          // Admin translations
          "admin#intro_welcome": "Bem vindo!",
          "admin#intro_pitch": "na<b>fila</b>. Sem filas.",
          "admin#intro_login": "Entrar",
          "admin#intro_signup": "Registo de Loja",

          // Admin SignUp
          "admin#signup_weakPassword": "A password tem que ter mais de 6 caracteres",
          "admin#signup_emailInUse": "Email já se encontra registrado",
          "admin#signup_invalidEmail": "O email que inseriu não é válido",
          "admin#signup_operationNotAllowed": "Operação não permitida",
          "admin#signup_checkYourEmail": "Aceda ao seu email para verificar a sua conta.",
          "admin#signup_emailLabel": "Email do Lojista",
          "admin#signup_passwordLabel": "Password",
          "admin#signup_register": "Registar",
          "admin#signup_successTitle": "O seu registo foi efetuado com sucesso!",
          "admin#signup_successHeroText": "Verifique a sua caixa de email e confirme o registo, para poder começar a usar o na<b>fila</b>.",

          // Admin Login
          "admin#login_title": "Introduza os dados da Loja",
          "admin#login_email": "Email do Lojista",
          "admin#login_password": "Password",
          "admin#login_recover_password": "recuperar password",

          // Admin Dashboard
          "admin#dashboard_redirectToStoreQueue": "Vai ser encaminhado para o ecrã da na<b>fila</b> da sua loja.",
          "admin#dashboard_emailSent": "O email com o código na<b>fila</b> já foi enviado.",
          "admin#dashboard_thanks": "Obrigado!",
          "admin#dashboard_yourCode": "<b>O seu código</b> na<b>fila é</b>",
          "admin#dashboard_queueName": "Nome da Fila",
          "admin#dashboard_queueCode": "Código naFila",
          "admin#dashboard_sendToEmail": "Enviar para o email?",
          "admin#dashboard_yes": "Sim",
          "admin#dashboard_no": "Não",
        }
      }
    },
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
