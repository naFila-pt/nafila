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
          appTitle: "na<b>fila</b>",
          "global#return_button": "Retroceder",
          "global#wait_please": "Aguarde ...",

          "onboarding#intro_welcome": "Bem Vindo!",
          "onboarding#intro_pitch": "na<b>fila</b>. Sem filas.",
          "onboarding#store_title": "É simples!",
          "onboarding#store_description":
            "A sua Loja Favorita afixa <b>um código por dia</b>, que deve utilizar para <b>entrar</b> na<b>fila</b>.",
          "onboarding#useCode_title": "Utilize o código",
          "onboarding#useCode_description":
            "Insira o código de loja no campo<br/>abaixo e clique em<br/>VALIDAR CÓDIGO para entrar na<b>fila</b>",
          "onboarding#useCode_inputPlaceholder": "LojaCodigo123",
          "onboarding#useCode_instruction": "inserir código da loja",
          "onboarding#useCode_button": "Validar Código",
          "onboarding#insertEmail_title": "Indique-nos o seu email",
          "onboarding#insertEmail_description":
            "Insira o seu email para<br/><b>receber uma notificação quando for a sua vez</b>.",
          "onboarding#insertEmail_notification":
            "<b>E já está!</b><br/>Receberá um aviso quando a sua vez estiver a chegar.",
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
          "home#notification_description":
            "Indique-nos o seu email para receber a <b>notificação</b>.",
          "home#notification_inputPlaceholder": "Email",
          "home#notification_terms":
            '<b>Ao carregar em "Tirar Senha"</b>, confirma que leu e compreendeu os',
          "home#notification_termsLink":
            "termos e condições da proteção de dados",
          "home#notification_button": "Tirar Senha",
          "home#ticket_store": "Loja",
          "home#ticket_turn": "A sua vez",
          "home#ticket_currentQueue": "Agora",
          "home#ticket_length": "À sua frente",
          "home#ticket_notification":
            "Receberá um email quando estiver a chegar a sua vez.",

          "terms#title": "Termos e Condições",
          "terms#subtitle": "Texto de exemplo/not compliant",
          "terms#text": `
Bem-vindo à Na Fila.
 
Os presentes Termos e Condições estabelecem as regras que regulam o acesso e utilização do website e aplicação naFila (“naFila”).

NaFila resultou do esforço de voluntários associados ao Movimento Tech4Covid19.

Estes Termos e Condições são complementados e integrados, em tudo o que não estiver previsto neste documento, pela Notificação de Privacidade que pode também ser consultada no website.

A aplicação reside em ambiente de website, não sendo necessário instalar qualquer ficheiro no smartphone.
naFila destina-se a pessoas singulares, residentes em Portugal e maiores de idade (“Utilizador” ou “Utilizadores”), sendo a sua utilização regulada pelos Termos e Condições, disponíveis à data de cada acesso ao naFila pelos Utilizadores, implicando a sua utilização uma aceitação pelo Utilizador.

Para utilizar naFila, o Utilizador:

<b>Se possuir smartphone e plano de dados</b>
  Dirige-se à loja, consulta o código da fila na vitrine e vai a nafila.pt e regista o código e email.

  Posteriormente, recebe 2 emails: o primeiro com a senha e o segundo quando for a sua vez para entrar na loja.
<b>Se possuir telemóvel, mas sem plano de dados (ou existir impedimento técnico)</b>
  Dirige-se ao gestor da fila, dá o nº de telemóvel.

  Posteriormente, recebe 2 sms: a primeira com a senha e a segunda quando for a sua vez para entrar na loja.
<b>Se não possuir telefone móvel</b>
  Dirige-se ao Lojista e fornece o seu nome. Ser-lhe-á atribuído um número de senha, sendo chamado posteriormente pelo gestor da fila pelo nome providenciado.

Caso não concorde com o disposto nos Termos e Condições, pedimos-lhe que não utilize aFila, uma vez que qualquer utilização que faça da mesma ou dos conteúdos nela disponibilizados implicará a sua aceitação.

naFila pode, a qualquer momento, modificar os estes Termos e Condições, notificando sempre o Utilizador através de um banner.

Caso o Utilizador continue a utilizar naFila, considera-se que aceita os termos e condições alterados.

naFila tem o direito exclusivo de, a todo o tempo, suspender, bloquear, interromper ou fazer cessar parcial ou totalmente, o acesso a naFila, em especial nas operações de gestão, manutenção, reparação, alteração ou modernização ou encerrar, definitiva ou temporariamente, parcial ou totalmente, a qualquer momento, de acordo com a sua vontade, naFila, sem aviso prévio.

O Utilizador reconhece e aceita que o conteúdo apresentado no naFila (textos, imagens, gráficos, som e animação e todas as outras informações disponibilizadas) está protegido por direitos de propriedade intelectual.

naFila concede ao Utilizador uma licença pessoal, intransferível, mundial, não passível de sublicenciamento, não exclusiva, livre, revogável de acesso e utilização do naFila, conforme necessário para aceder e utilizar a mesma, desde que o Utilizador cumpra os presentes Termos e Condições.

A informação disponibilizada no website naFila não pretende substituir qualquer serviço, recomendação, conselho ou dado emitido ou disponibilizado por uma entidade governamental, administrativa ou estadual, assim como entidades privadas do setor da saúde ou profissionais de saúde, familiarizados com o historial clínico e situação concreta do Utilizador.

naFila irá empregar os seus melhores esforços para que exista a menor possibilidade de qualquer tipo de malwarevírus ou outro código malicioso. No entanto, uma vez que naFila não controla integralmente a circulação de informação através da Internet, não consegue garantir que na Fila não contém qualquer tipo de vírus ou outros elementos que possam danificar o seu equipamento.

naFila tem ainda o direito exclusivo de, a todo o tempo, encerrar, definitiva ou temporariamente, parcial ou totalmente, a qualquer momento, de acordo com a sua vontade, a Na Fila ou qualquer uma das suas funcionalidades sem aviso prévio.

Se alguma parte ou disposição dos presentes Termos e Condições não for executável ou estiver em conflito com a lei aplicável, a validade das restantes partes ou disposições não será afetada.

Caso tenha alguma questão sobre os presentes Termos e Condições, por favor envie-nos o seu pedido de esclarecimento através do e-mail <a href="mailto:geral.nafila.pt@gmail.com">geral.nafila.pt@gmail.com</a>.

Estes Termos e Condições são regidos pela lei portuguesa e, em caso de litígio na interpretação ou aplicação dos presentes Termos e Condições, será competente em exclusivo o foro da Comarca do Porto, com expressa renúncia a qualquer outro
  
  
Porto, 10 Abril 2020
            `,
          "terms#close_button": "Fechar",

          "leave#title": "Saiu da Fila",
          "leave#title-failed": "Senha não encontrada",
          "leave#description":
            "Já não está inscrito na Fila.<br/>O próximo Cliente agradece.",
          "leave#bye": "Até breve!",
          "leave#goBack": "Voltar",

          // Admin translations
          "admin#intro_welcome": "Bem vindo!",
          "admin#intro_pitch": "na<b>fila</b>. Sem filas.",
          "admin#intro_login": "Entrar",
          "admin#intro_signup": "Registo de Loja",

          // Admin SignUp
          "admin#signup_title": "Introduza os dados de Registo",
          "admin#signup_weakPassword":
            "A password tem que ter mais de 6 caracteres",
          "admin#signup_emailInUse": "Email já se encontra registrado",
          "admin#signup_invalidEmail": "O email que inseriu não é válido",
          "admin#signup_operationNotAllowed": "Operação não permitida",
          "admin#signup_checkYourEmail":
            "Aceda ao seu email para verificar a sua conta.",
          "admin#signup_failed": "Registo de conta falhou",
          "admin#signup_nameLabel": "Nome/Local da Loja",
          "admin#signup_emailLabel": "Email do Lojista",
          "admin#signup_passwordLabel": "Password",
          "admin#signup_register": "Registar",
          "admin#signup_successTitle":
            "O seu registo foi efetuado com sucesso!",
          "admin#signup_successHeroText":
            "Verifique a sua caixa de email e confirme o registo, para poder começar a usar o na<b>fila</b>.",

          // Admin Login
          "admin#login_title": "Introduza os dados da Loja",
          "admin#login_email": "Email do Lojista",
          "admin#login_password": "Password",
          "admin#login_recover_password": "Recuperar Password",
          "admin#login_failed": "Login falhou",
          "admin#login_wrongPassword": "Password incorrecta",
          "admin#signout_button": "Terminar sessão",

          // Recover Password
          "admin#recoverPassword_title": "Recuperar a Password",
          "admin#recoverPassword_text1":
            "Introduza o seu email para recuperar a password",
          "admin#recoverPassword_email": "Email",
          "admin#recoverPassword_recover": "Recuperar",
          "admin#recoverPassword_back": "Retroceder",
          "admin#recoverPassword_serverFail":
            "Houve um erro, por favor tente novamente",
          "admin#recoverPassword_wrongEmail":
            "O email que inseriu é inválido. Corrija e tente de novo.",

          // Recover Password Success
          "admin#recoverPasswordSuccess_title": "Email enviado com sucesso!",
          "admin#recoverPasswordSuccess_text1": "Foi enviado um email para ",
          "admin#recoverPasswordSuccess_text2":
            ". Siga as instruções para recuperar a sua password.",
          "admin#recoverPasswordSuccess_return": "Voltar",

          // Recover Password Change
          "admin#recoverPasswordChange_title": "Redefinição de password",
          "admin#recoverPasswordChange_text1":
            "Digite uma nova senha associada ao email ",
          "admin#recoverPasswordChange_textbox1": "Nova password",
          "admin#recoverPasswordChange_textbox2": "Confirmar nova password",
          "admin#recoverPasswordChange_button": "Mudar",
          "admin#recoverPasswordChange_errorMessage":
            "As passwords que introduziu não coincidem. Por favor tente de novo.",

          // Recover Password Change Success
          "admin#recoverPasswordChangeSuccess_title":
            "Mudança de password bem sucedida!",
          "admin#recoverPasswordChangeSuccess_text1":
            "Agora já pode aceder à sua conta com a nova password. Carregue no botão para voltar ao Login",
          "admin#recoverPasswordChangeSuccess_button": "Entrar",

          // AfterLogin Add Consumer 1st page
          "main#addConsumer_title": "Escolha o método de notificação",
          "main#addConsumer_byPhone": "Telemóvel",
          "main#addConsumer_byName": "Nome",
          "main#addConsumer_back": "Retroceder",
          "main#addConsumer_generateTicket": "Gerar Senha",

          // AfterLogin Add Consumer Phone
          "main#addConsumerPhone_title":
            "Insira o número de Telemóvel do cliente",
          "main#addConsumerPhone_placeholder": "Número de Telemóvel",

          // AfterLogin Add Consumer Name
          "main#addConsumerName_title": "Insira o Nome\ndo cliente",
          "main#addConsumerName_placeholder": "Nome",

          // AfterLogin Add Consumer Success
          "main#addConsumerSuccess_button": `Voltar na<b>fila</b>`,
          "main#addConsumerSuccess_title": "Nova Senha gerada",

          // AfterLogin Add Consumer Phone Success
          "main#addConsumerPhoneSuccess_text":
            "Foi enviada uma SMS para o telemóvel do Cliente.",

          // AfterLogin Add Consumer Name Success
          "main#addConsumerNameSuccess_text": "Forneça este número ao Cliente.",

          // Admin Pre Queue
          "admin#preQueue_whatToDo": "O que quer fazer?",
          "admin#preQueue_goToExistingQueue": "Ver fila iniciada",
          "admin#preQueue_endExistingQueue": "Terminar fila",

          // Admin Queue Management
          "admin#queueManagement_letsStart": "Vamos iniciar a fila?",
          "admin#queueManagement_queueName": "Nome da Fila",
          "admin#queueManagement_emailWithCode":
            "O email com o <strong>código</strong> da sua fila vai ser enviado para o seu email. <strong>Imprima o documento e afixe-o em local visível.</strong>",
          "admin#queueManagement_startQueue": "Começar",
          "admin#queueManagement_creatingQueue": "A criar fila ...",
          "admin#queueManagement_queueCode": "Código da Fila",
          "admin#queueManagement_call": "Chamar",
          "admin#queueManagement_nextInQueue": `Próximo <span class="logo">na<b>fila</b></span>`,
          "admin#queueManagement_createTicket": "Gerar senha",
          "admin#queueManagement_endQueue": `Terminar <span class="logo">na<b>fila</b></span>`,
          "admin#queueManagement_remaining": "Restantes",
          "admin#queueManagement_wait": "Aguarde ...",

          // End Queue
          "main#endQueue_title": "Pretende terminar a Fila actual?",
          "main#endQueue_yes": "Sim",
          "main#endQueue_no": "Não",

          //End Queue Success
          "main#endQueueSuccess_title": "Fila terminada.",
          "main#endQueueSuccess_text":
            "A sua fila foi terminada.<br/>Até Amanhã!",
          "main#endQueueSuccess_back": "Voltar ao Início",

          // Queue Poster
          "admin#queuePoster_queueCode": "Código da Fila",
          "admin#queuePoster_enterQueueWith": "Entre <b>nafila</b> com...",
          "admin#queuePoster_brandSlogan": "<b>naFila</b>, sem filas."
        }
      }
    },
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
