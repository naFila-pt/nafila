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
          "onboarding#store_description": "A sua Loja Favorita afixa <b>um código por dia</b>, que deve utilizar para <b>entrar</b> na<b>fila</b>.",
          "onboarding#useCode_title": "Utilize o código",
          "onboarding#useCode_description": "Insira o código de loja no campo<br/>abaixo e clique em<br/>VALIDAR CÓDIGO para entrar na<b>fila</b>",
          "onboarding#useCode_inputPlaceholder": "LojaCodigo123",
          "onboarding#useCode_instruction": "inserir código da loja",
          "onboarding#useCode_button": "Validar Código",
          "onboarding#insertEmail_title": "Indique-nos o seu email",
          "onboarding#insertEmail_description": "Insira o seu email para<br/><b>receber uma notificação quando for a sua vez</b>.",
          "onboarding#insertEmail_notification": "<b>E já está!</b><br/>Receberá um aviso quando a sua vez estiver a chegar.",
          "onboarding#insertEmail_button": "Entrar na<b>fila</b>",

          "home#intro_welcome": "Bem Vindo!",
          "home#intro_pitch": "na<b>fila</b>. Sem filas.",
          "home#intro_button": "entrar",
          "home#insertCode_title": "Insira o código da sua loja",
          "home#insertCode_inputPlaceholder": "Código naFila da loja",
          "home#insertCode_button": "entrar na<b>fila</b>",
          "home#queue_store": "Loja",
          "home#queue_length": "À sua frente",
          "home#queue_people": "pessoas",
          "home#queue_button": "Continuar",
          "home#notification_description": "Indique-nos o seu email para receber a <b>notificação</b>.",
          "home#notification_inputPlaceholder": "Email",
          "home#notification_terms": "<b>Ao carregar em \"Continuar\"</b>, confirma que leu e compreendeu os <u>termos e condições da proteção de dados</u>",
          "home#notification_button": "Tirar Senha",
          "home#ticket_store": "Loja",
          "home#ticket_turn": "A sua vez",
          "home#ticket_currentQueue": "Agora",
          "home#ticket_length": "À sua frente",
          "home#ticket_notification": "Receberá um email quando estiver a chegar a sua vez.",

          "terms#title": "Termos e Condições",
          "terms#subtitle": "Texto de exemplo/not compliant",
          "terms#paragraph1": "<b>1. Informação Geral</b><br/>Esta aplicação existe para gerir filas na situação de emergência sanitária do COVID 19.",
          "terms#paragraph2": "<b>2. Âmbito de aplicação</b><br/>A nafila será usada para gerir o fluxo das filas nos estabelecimentos que aderirem.",
          "terms#paragraph3": "<b>3. Acesso</b><br/>O Acesso faz-se através do website nafila.pt, onde o consumidor introduz o código da loja (providenciado e exposto pela loja na frente de loja) e através do seu email para ser notificado.",
          "terms#paragraph4": "<b>4. Privacidade</b><br/>Nenhum dado é pedido aos consumidores além daqueles que os utlizadores quiserem fornecer. Os dados não são mantidos na nossa base de dados.",
          "terms#paragraph5": "<b>5. Uso dos dados</b><br/>Os dados introduzidos a cada dia serão eliminados diariamente, com o término da fila.",
          "terms#close_button": "Fechar",

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
        }
      }
    },
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
