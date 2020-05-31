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
          "global#cookie_banner": "Ao utilizar este website, aceita a nossa",
          "global#cookie_bannerLink": " política de privacidade.",
          "onboarding#justOneSMS": "Basta uma SMS!",
          "onboarding#intro_welcome": "Bem Vindo!",
          "onboarding#intro_pitch": "na<b>fila</b>. Sem filas.",
          "onboarding#store_title": "É simples!",
          "onboarding#register_site_title": "Prefere registar-se no site?",
          "onboarding#register_site_description":
            "Visite <b>nafila.pt</b>, insira <b>o código da fila</b> e <b>o seu telemóvel</b>, para ser notificado.",
          "onboarding#phone_number": "Número de Telemóvel",
          "onboarding#store_description":
            "A sua Loja Favorita afixa <b>um código por dia</b>, que deve utilizar para <b>entrar</b> na<b>fila</b>.",
          "onboarding#useCode_title": "Utilize o código",
          "onboarding#three_ways": "3 maneiras",
          "onboarding#signup_ways":
            "Pode inscrever-se na<b>fila</b> através de <b>SMS</b>, <b>Email</b> ou com o <b>seu Nome</b>.",
          "onboarding#one_sms": "Basta uma SMS!",
          "onboarding#register_nafila":
            "Registe-se na<b>fila</b> enviando uma <b>SMS grátis</b> para o 4902 com: <b>nafila {código da Fila}",
          "onboarding#difficulties":
            "Se tiver alguma dificuldade, fale com o colaborador de loja.",
          "onboarding#prefer_register_site": "Prefere registar-se no site?",
          "onboarding#insertCodeEmail":
            "Visite <b>nafila.pt</b>, insira o <b>código da fila</b> e <b>o seu email</b> para ser notificado.",
          "onboarding#prefer_name": "Prefere ser chamado pelo Nome?",
          "onboarding#ask_colaborator_register":
            "Peça ao colaborador de loja para registar <b>o seu Nome.</b>",
          "onboarding#name_register_extra_info":
            "Vai ser <b>chamado pelo nome</b>. Aguarde próximo da loja mas em segurança.",
          "onboarding#its_done": "E já está!",
          "onboarding#your_turn_notification":
            "Quando <b>chegar a sua vez</b>, será notificado e pode entrar na loja.",
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

          "home#intro_welcome": "Bem-Vindo!",
          "home#intro_text":
            "<b>nafila.pt</b> é um sistema de senhas virtuais que permite aguardar pela sua vez em segurança.",
          "home#intro_pitch": "na<b>fila</b>. Sem filas.",
          "home#intro_button": "entrar",
          "home#insertCode_title": "Insira o código da sua loja",
          "home#insertCode_inputPlaceholder": "Código naFila da loja",
          "home#insertCode_button": "entrar na<b>fila</b>",
          "home#queue_store": "Loja",
          "home#queue_length": "À sua frente",
          "home#queue_people": "pessoas",
          "home#queue_button": "Tirar senha",
          "home#notification_description":
            "Indique-nos o seu telemóvel para receber a <b>notificação</b>.",
          "home#notification_inputPlaceholder": "Número de telemóvel",
          "home#notification_terms":
            '<b>Ao carregar em "Continuar"</b>, confirma que leu e compreendeu os',
          "home#notification_termsLink":
            "termos e condições da proteção de dados",
          "home#notification_button": "Continuar",
          "home#ticket_store": "Loja",
          "home#ticket_turn": "A sua vez",
          "home#ticket_currentQueue": "Agora",
          "home#ticket_length": "À sua frente",
          "home#ticket_notification":
            "Acompanhe neste ecrã o progresso da fila.",
          "home#help_label": "Ver como funciona",
          "home#lojista_label": "É lojista ?",
          "home#consumidor_label": "É consumidor ?",
          "home#atualizar": "Atualizar",
          "home#sair_da_fila": "Sair da fila",
          "terms#title": "Termos e Condições",
          "terms#privacy": "Privacidade",
          "terms#contact": "Contatos",
          "terms#subtitle": "Texto de exemplo/not compliant",
          "terms#text": `
          Os presentes Termos e Condições estabelecem as regras que regulam o acesso e utilização do website e aplicação naFila (“naFila”). NaFila resultou do esforço de voluntários associados ao Movimento Tech4Covid19.

          Estes Termos e Condições são complementados e integrados, em tudo o que não estiver previsto neste documento, pela Notificação de Privacidade que pode também ser consultada no website.
          
          A aplicação reside em ambiente de website, não sendo necessário instalar qualquer ficheiro no smartphone. naFila destina-se a pessoas singulares, residentes em Portugal e maiores de idade (“Utilizador” ou “Utilizadores”), sendo a sua utilização regulada pelos Termos e Condições, disponíveis à data de cada acesso ao naFila pelos Utilizadores, implicando a sua utilização uma aceitação pelo Utilizador.
          
          Para utilizar naFila, o Utilizador:
          
          <b>Se possuir smartphone e plano de dados</b>
          Dirige-se à loja, consulta o código da fila na vitrine e vai a nafila.pt e regista o código e email. Posteriormente, recebe 2 emails: o primeiro com a senha e o segundo quando for a sua vez para entrar na loja.
          
          <b>Se possuir telemóvel, mas sem plano de dados (ou existir impedimento técnico)</b>
          Dirige-se ao gestor da fila, dá o número de telemóvel. Posteriormente, recebe 2 sms: a primeira com a senha e a segunda, quando for a sua vez, para entrar na loja.
          
          
          Dirige-se ao Lojista e fornece o seu nome. Ser-lhe-á atribuído um número de senha, sendo chamado posteriormente pelo gestor da fila pelo nome providenciado.
          
          Caso não concorde com o disposto nos Termos e Condições, pedimos-lhe que não utilize naFila, uma vez que qualquer utilização que faça da mesma ou dos conteúdos nela disponibilizados implicará a sua aceitação.
          
          naFila pode, a qualquer momento, modificar os estes Termos e Condições, notificando sempre o Utilizador através de um banner. Caso o Utilizador continue a utilizar naFila, considera-se que aceita os termos e condições alterados.
          
          naFila tem o direito exclusivo de, a todo o tempo, suspender, bloquear, interromper ou fazer cessar parcial ou totalmente, o acesso a naFila, em especial nas operações de gestão, manutenção, reparação, alteração ou modernização ou encerrar, definitiva ou temporariamente, parcial ou totalmente, a qualquer momento, de acordo com a sua vontade, naFila, sem aviso prévio.
          
          O Utilizador reconhece e aceita que o conteúdo apresentado no naFila (textos, imagens, gráficos, som e animação e todas as outras informações disponibilizadas) está protegido por direitos de propriedade intelectual.
          
          naFila concede ao Utilizador uma licença pessoal, intransferível, mundial, não passível de sub-
          -licenciamento, não exclusiva, livre, revogável de acesso e utilização do naFila, conforme necessário para aceder e utilizar a mesma, desde que o Utilizador cumpra os presentes Termos e Condições.
          
          A informação disponibilizada no website naFila não pretende substituir qualquer serviço, recomendação, conselho ou dado emitido ou disponibilizado por uma entidade governamental, administrativa ou estadual, assim como entidades privadas do setor da saúde ou profissionais de saúde, familiarizados com o historial clínico e situação concreta do Utilizador.
          
          naFila irá empregar os seus melhores esforços para que exista a menor possibilidade de qualquer tipo de malwarevírus ou outro código malicioso. No entanto, uma vez que naFila não controla integralmente a circulação de informação através da Internet, não consegue garantir que na Fila não contém qualquer tipo de vírus ou outros elementos que possam danificar o seu equipamento.

          naFila tem ainda o direito exclusivo de, a todo o tempo, encerrar, definitiva ou temporariamente, parcial ou totalmente, a qualquer momento, de acordo com a sua vontade, o naFila ou qualquer uma das suas funcionalidades sem aviso prévio.
          
          Se alguma parte ou disposição dos presentes Termos e Condições não for executável ou estiver em conflito com a lei aplicável, a validade das restantes partes ou disposições não será afetada.
          
          Caso tenha alguma questão sobre os presentes Termos e Condições, por favor envie-nos o seu pedido de esclarecimento através do e-mail geral.nafila.pt@gmail.com.
          Estes Termos e Condições são regidos pela lei portuguesa e, em caso de litígio na interpretação ou aplicação dos presentes Termos e Condições, será competente em exclusivo o foro da Comarca do Porto(ou Lisboa? - a definir), com expressa renúncia a qualquer outro.
           
           
          Porto, 10 Abril 2020`,
          "terms#close_button": "Fechar",

          "privacy#title": "Política de privacidade",
          "privacy#text": `<b>Introdução</b>
          Esta Política de Privacidade compreende todas as informações relevantes relativas ao tratamento de dados pessoais do website naFila (“Website e WebApp”) pelo Movimento Tech4Covid, na qualidade de responsável pelo tratamento. 
           
          <b>Que dados pessoais recolhemos?</b>
          Quando usa a nossa WebApp, perguntamos o seu nome, número de telefone ou endereço de e-mail. Estes dados são necessários para usar  a aplicação, pois sem ele não seríamos capazes de prestar o serviço.  
          
          <b>O que fazemos com os seus dados?</b>
          Desempenho do Serviço. Nós só tratamos os seus dados para prestar o serviço como descrito nos Termos e Condições da WebApp. 
          
          Ao dar-nos o seu e-mail e número de telefone, sabe que lhe vamos enviar uma mensagem (em formato email ou sms) para vir à loja / farmácia relevante, assim que a sua hora chegar. 
          
          Não guardaremos os seus dados pessoais para qualquer outro fim que não seja o de lhe prestar o serviço e prestar assistência na utilização da WebApp. Devido a limitações técnicas, guardaremos os seus dados por um período não superior a 24 horas, a partir do término do serviço. 
          
          <b>Como Pode Proteger a sua Privacidade</b>
          Garantimos que todos os dados pessoais são apagados, o mais tardar, 24 horas após a realização destes serviços. Não partilhamos os seus dados com terceiros.   
          
          <b>Transferimos os seus dados para terceiros?</b>
          Não. 
          
          <b>Alterações à Notificação de Privacidade</b>
          Qualquer alteração à Política de Privacidade será publicada aqui e num banner no site nafila.pt.
           
          <b>Os seus direitos</b>
          Tem o direito de aceder, rectificar ou apagar os dados que temos sobre si, limitar o processamento, ou opor-se ao seu processamento. 
          
          Se, por algum motivo, considerar necessário, pode sempre preencher uma reclamação junto da Comissão Nacional de Protecção de Dados (CNPD).`,

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
          "admin#register": "Pré-registo",

          // Admin onboarding
          "admin#onboarding_firstText":
            "<b>Tem uma loja</b> ou trabalha num serviço de atendimento ao público? Gostava de utilizar o nafila na sua loja?",
          "admin#onboarding_firstText_mobile":
            "<h1>Tem uma loja</h1> <p>ou trabalha num serviço de atendimento ao público? <br/>  <div>Gostava de utilizar o nafila na sua loja?</div> </p>",
          "admin#onboarding_secondText":
            "Faça o <b>pré-registo</b> e será contactado pela nossa equipa de suporte. Assim que receber o contacto do Suporte, <b>poderá começar a usar o nafila.</b>",
          "admin#onboarding_secondTitle": "É simples!",
          "admin#onboarding_thirdTitle": "Tirar uma Senha",
          "admin#onboarding_thirdText":
            "Os Clientes <b>tiram a Senha</b> e recebem uma notificação por <b>SMS</b>. Pode <b>ajudar o seu Cliente</b>, registando-o com o Nome ou o Número de Telemóvel.",
          "admin#onboarding_autonomous": "Registo do cliente",
          "admin#onboarding_shopkeeper": "Com o lojista",
          "admin#onboarding_site": "Site",
          "admin#onboarding_sms": "SMS",
          "admin#onboarding_call": "Nome",
          "admin#onboarding_phone": "Telemóvel",
          "admin#onboarding_code": "Código da Fila",
          "admin#onboarding_remaining": "Restantes",
          "admin#onboarding_nextInQueue": `PRÓXIMO <span class="logo">na<b>fila</b></span>`,
          "admin#onboarding_fourthTitle": "A fila na palma da mão",
          "admin#onboarding_fourthText":
            "Gira a sua fila e chame os seus Clientes com o nafila.",
          "admin#onboarding_fifthTitle": "Notificações seguras",
          "admin#onboarding_fifthText":
            "O seu Cliente <b>recebe a notificação,</b> enquanto aguarda em segurança.",
          "admin#onboarding_sixthTitle": "O Cliente entra na Loja na sua vez.",
          "admin#onboarding_sixthText":
            "<b>E já está!</b> O seu Cliente é atendido em segurança.",

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
          "admin#queueManagement_storeCapacity": "Lotação Máxima Simultânea",
          "admin#queueManagement_storeCapacity_placeholder":
            "Preencha com a lotação máxima",
          "admin#queueManagement_emailWithCode":
            "Depois de receber o <strong>código de fila</strong> no seu email, <strong>imprima-o e coloque-o num lugar visível ao público.</strong>",
          "admin#queueManagement_startQueue": "Começar",
          "admin#queueManagement_creatingQueue": "A criar fila ...",
          "admin#queueManagement_queueCode": "Nome e código da Fila",
          "admin#queueManagement_call": "Chamar",
          "admin#queueManagement_callByName": "Chame o Cliente pelo Nome",
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
          "admin#queuePoster_enterQueueWith":
            "Entre &nbsp <b>nafila</b> &nbsp com...",
          "admin#queuePoster_brandSlogan": "<b>naFila</b>, sem filas.",
          "admin#queuePoster_mark_your_time_in_queue":
            "MARQUE A SUA VEZ NA FILA",
          "admin#send_free_sms_queue":
            "Envie <b>SMS GRÁTIS</b> com <b><span class='larger'> nafila {{queueCode}}</span></b> para o <b>4902</b>"
        }
      }
    },
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
