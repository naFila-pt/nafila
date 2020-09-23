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
          "onboarding#intro_welcome": "Bem-vindo!",
          "onboarding#intro_pitch": "na<b>fila</b>. Sem filas.",
          "onboarding#store_title": "É simples!",
          "onboarding#register_site_title": "Prefere tirar senha no site?",
          "onboarding#register_site_description":
            "Visite <b>nafila.pt</b>, insira <b>o código da fila</b> e <b>o seu telemóvel</b>, para ser notificado.",
          "onboarding#phone_number": "Número de Telemóvel",
          "onboarding#store_description":
            "Verifique o <b>Código da Fila</b> para esse dia, que estará <b>afixado à entrada da loja.</b>",
          "onboarding#useCode_title": "Utilize o código",
          "onboarding#three_ways": "3 maneiras",
          "onboarding#signup_ways":
            "Pode inscrever-se na<b>fila</b> através de <b>SMS</b>, <b>Email</b> ou com o <b>seu Nome</b>.",
          "onboarding#one_sms": "Basta uma SMS!",
          "onboarding#register_nafila":
            "Para tirar uma senha, envie uma <b>SMS grátis</b> para o 4902 com <b>nafila</b> (espaço) <b>Código da Fila</b>.",
          "onboarding#difficulties":
            "Se tiver alguma dificuldade, fale com o colaborador de loja.",
          "onboarding#prefer_register_site": "Prefere tirar senha no site?",
          "onboarding#insertCodeEmail":
            "<b>Use o QR Code</b> ou visite <b>nafila.pt</b>, insira o <b>Código da Fila</b> e o <b>seu telemóvel</b> para ser notificado.",
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
            '<b>Ao carregar em "Continuar"</b>, confirma que leu e compreendeu os ',
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
          Os presentes Termos e Condições estabelecem as regras que regulam o acesso e utilização do website e aplicação naFila (“naFila”). NaFila resultou do esforço de voluntários associados ao Movimento Tech4Covid19.<br/>
          Estes Termos e Condições são complementados e integrados, em tudo o que não estiver previsto neste documento, pela Notificação de Privacidade que pode também ser consultada no website.<br/>
          A aplicação reside em ambiente de website, não sendo necessário instalar qualquer ficheiro no smartphone. naFila destina-se a pessoas singulares, residentes em Portugal e maiores de idade (“Utilizador” ou “Utilizadores”), sendo a sua utilização regulada pelos Termos e Condições, disponíveis à data de cada acesso ao naFila pelos Utilizadores, implicando a sua utilização uma aceitação pelo Utilizador.<br/>
          Para utilizar naFila, o Utilizador:<br/>
          <b>Se possuir smartphone e plano de dados</b><br/>
          Dirige-se à loja, consulta o código da fila na vitrine e vai a nafila.pt e regista o código e email. Posteriormente, recebe 2 emails: o primeiro com a senha e o segundo quando for a sua vez para entrar na loja.<br/>
          <b>Se possuir telemóvel, mas sem plano de dados (ou existir impedimento técnico)</b><br/>
          Dirige-se ao gestor da fila, dá o número de telemóvel. Posteriormente, recebe 2 sms: a primeira com a senha e a segunda, quando for a sua vez, para entrar na loja.<br/><br/>
          Dirige-se ao Lojista e fornece o seu nome. Ser-lhe-á atribuído um número de senha, sendo chamado posteriormente pelo gestor da fila pelo nome providenciado.<br/>
          Caso não concorde com o disposto nos Termos e Condições, pedimos-lhe que não utilize naFila, uma vez que qualquer utilização que faça da mesma ou dos conteúdos nela disponibilizados implicará a sua aceitação.<br/>
          naFila pode, a qualquer momento, modificar os estes Termos e Condições, notificando sempre o Utilizador através de um banner. Caso o Utilizador continue a utilizar naFila, considera-se que aceita os termos e condições alterados.<br/>
          naFila tem o direito exclusivo de, a todo o tempo, suspender, bloquear, interromper ou fazer cessar parcial ou totalmente, o acesso a naFila, em especial nas operações de gestão, manutenção, reparação, alteração ou modernização ou encerrar, definitiva ou temporariamente, parcial ou totalmente, a qualquer momento, de acordo com a sua vontade, naFila, sem aviso prévio.<br/>
          O Utilizador reconhece e aceita que o conteúdo apresentado no naFila (textos, imagens, gráficos, som e animação e todas as outras informações disponibilizadas) está protegido por direitos de propriedade intelectual.</br>
          naFila concede ao Utilizador uma licença pessoal, intransferível, mundial, não passível de sub-licenciamento, não exclusiva, livre, revogável de acesso e utilização do naFila, conforme necessário para aceder e utilizar a mesma, desde que o Utilizador cumpra os presentes Termos e Condições.<br/>
          A informação disponibilizada no website naFila não pretende substituir qualquer serviço, recomendação, conselho ou dado emitido ou disponibilizado por uma entidade governamental, administrativa ou estadual, assim como entidades privadas do setor da saúde ou profissionais de saúde, familiarizados com o historial clínico e situação concreta do Utilizador.<br/>
          naFila irá empregar os seus melhores esforços para que exista a menor possibilidade de qualquer tipo de malwarevírus ou outro código malicioso. No entanto, uma vez que naFila não controla integralmente a circulação de informação através da Internet, não consegue garantir que na Fila não contém qualquer tipo de vírus ou outros elementos que possam danificar o seu equipamento.<br/>
          naFila tem ainda o direito exclusivo de, a todo o tempo, encerrar, definitiva ou temporariamente, parcial ou totalmente, a qualquer momento, de acordo com a sua vontade, o naFila ou qualquer uma das suas funcionalidades sem aviso prévio.<br/>
          Se alguma parte ou disposição dos presentes Termos e Condições não for executável ou estiver em conflito com a lei aplicável, a validade das restantes partes ou disposições não será afetada.<br/>
          Caso tenha alguma questão sobre os presentes Termos e Condições, por favor envie-nos o seu pedido de esclarecimento através do e-mail geral.nafila.pt@gmail.com.
          Estes Termos e Condições são regidos pela lei portuguesa e, em caso de litígio na interpretação ou aplicação dos presentes Termos e Condições, será competente em exclusivo o foro da Comarca do Porto(ou Lisboa? - a definir), com expressa renúncia a qualquer outro.<br/><br/>       
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

          // About Us
          "about_us#title_about_us": "Sobre",
          "about_us#title_what": "O que é?",
          "about_us#text_what":
            "O na<b>fila</b> é uma solução de senhas virtuais que visa ajudar comerciantes e consumidores a tornar as compras essenciais mais cómodas e seguras. Através de um sistema 100% gratuito, qualquer pessoa pode dirigir-se a uma loja aderente nafila e introduzir o código da fila com o telemóvel, recebendo de seguida uma senha virtual que irá permitir aguardar a sua vez em segurança e longe das outras pessoas.",
          "about_us#title_why": "Porquê?",
          "about_us#text_why":
            "O na<b>fila</b> é um <b>projecto do #movimentotech4covid19</b>, um esforço voluntário de procura de soluções contra a recente epidemia. O projecto na<b>fila</b> foi pensado para reduzir o risco de contágio em filas à porta de comércio essencial como supermercados ou farmácias.",
          "about_us#title_team": "A equipa",
          "about_us#text_team": `
          O ano de 2020 ficará para a história como o ano em que a Terra parou. Em que a humanidade necessitou de se adaptar e ajustar a uma escala sem precedentes. Apesar de todas as dificuldades vividas, esta também será uma época que ficará recordada pela resiliência humana, pela solidariedade e espírito de sacrifício.
          <br><br>
          O <b>Movimento Tech4Covid19</b> e, em particular, o projeto na<b>fila</b> é um exemplo disso. Em pouco mais que 2 semanas, formámos uma equipa que conta hoje com mais de 40 voluntários que, sem se conhecerem de lado algum, uniram-se com um tremendo sentido de missão e decidiram dedicar o seu tempo e recursos para desenvolver em tempo recorde esta solução. <b>O nafila procura mitigar o contágio do Covid-19, protegendo os consumidores através de um sistema de gestão de filas touchless</b> (sem toque), de livre acesso a todos os empresários e consumidores portugueses.
          <br><br>
          É ainda importante deixar <b>uma palavra de agradecimento às empresas que apoiam esta iniciativa</b>. A MyTurn e a MobiQueue que contribuíram com inputs valiosos, partilhando a sua experiência, enquanto empresas fornecedoras de sistemas de gestão de filas com anos de presença no mercado, e também a NOS, e a Google, <b>que permitiram tornar possível o ambicioso objetivo de oferecer uma solução totalmente livre de custos aos empresários e consumidores portugueses</b>.
          <br><br>
          A todos um enorme obrigado. Juntos conseguimos. 💪
          <br><br>
          <b>Nuno Góis</b> Coordenação do na<b>fila</b>`,
          "about_us#title_collaboration": "Colaboração",
          "about_us#title_partners": "Parceiros",
          "about_us#title_contact": "Contacto",
          "about_us#button_label_contact": "Enviar mensagem",
          "about_us#text_support":
            "Para saber mais sobre o projeto, entre em contacto connosco.",
          "about_us#title_illustrations": "Ilustrações",
          "about_us#text_illustrations":
            "As ilustrações usadas foram adaptadas, com base no Projecto <b><a href='https://www.humaaans.com/' target='_blank' rel='noopener noreferrer'>humaaans</a></b>, de Pablo Stanley, sob a <b>licença <a href='https://creativecommons.org/licenses/by/4.0/deed.pt' target='_blank' rel='noopener noreferrer'>CC BY 4.0</a></b>.",
          "about_us#title_github": "Github",
          "about_us#text_github":
            "Board do projeto naFila. Código fonte <b><a href='https://github.com/naFila-pt/nafila'> naFila.pt no Github</a></b>",
          "about_us#title_support": "Suporte para lojistas",
          "about_us#title_support_instructions": "Cartaz de instruções",
          "about_us#text_support_instructions":
            "Faça aqui o <b>download do cartaz de instruções</b> (<b><a href='{{filepathColorful}}' target='_blank' rel='noopener noreferrer'>versão a cores</a></b> ou <b><a href='{{filepathBlackWhite}}' target='_blank' rel='noopener noreferrer'>versão a preto e branco</a></b>) para colocar à porta do seu estabelecimento.",
          "about_us#title_support_implementation_kit": "Guia de implementação",
          "about_us#text_support_implementation_kit":
            "Faça <b><a href='{{filepath}}' target='_blank' rel='noopener noreferrer'>download do guia de implementação</a></b> do na<b>fila</b> onde poderá ver passo-a-passo como utilizar o nosso sistema de senhas.",
          "about_us#column_title_coordination": "Coordenação",
          "about_us#column_title_design": "Design",
          "about_us#column_title_dev": "Desenvolvimento",
          "about_us#column_title_qa": "Qualidade",
          "about_us#column_title_comunication": "Comunicação",
          "about_us#column_title_support": "Suporte",

          "leave#title": "Saiu da Fila",
          "leave#title-failed": "Senha não encontrada",
          "leave#description":
            "Já não está inscrito na Fila.<br/>O próximo Cliente agradece.",
          "leave#bye": "Até breve!",
          "leave#goBack": "Voltar",

          // Admin translations
          "admin#intro_welcome": "Bem-vindo!",
          "admin#intro_pitch": "na<b>fila</b>. Sem filas.",
          "admin#intro_login": "Entrar",
          "admin#register": "Registo de Loja",

          // Admin onboarding
          "admin#onboarding_firstText":
            "<b>Tem uma loja</b> ou trabalha num serviço de atendimento ao público? Gostava de utilizar o nafila na sua loja?",
          "admin#onboarding_firstText_mobile":
            "<h1>Tem uma loja</h1> <p>ou trabalha num serviço de atendimento ao público? <br/>  <div>Gostava de utilizar o nafila na sua loja?</div> </p>",
          "admin#onboarding_secondText":
            "Registe <b>a sua Loja para começar a usar o nafila</b> imediatamente.",
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
            "<b>E já está!</b> <br/> O seu Cliente é atendido em segurança.",

          // Admin SignUp
          "admin#signup_title": "Introduza os dados de Registo",
          "admin#signup_weakPassword":
            "A sua password deve ter pelo menos 6 caracteres.",
          "admin#signup_emailInUse": "Email já se encontra registrado",
          "admin#signup_invalidEmail": "O email que inseriu não é válido",
          "admin#signup_operationNotAllowed": "Operação não permitida",
          "admin#signup_checkYourEmail":
            "Aceda ao seu email para verificar a sua conta.",
          "admin#signup_failed": "Registo de conta falhou",
          "admin#signup_nameLabel": "Nome/Local da Loja",
          "admin#signup_emailLabel": "Email do Lojista",
          "admin#signup_passwordLabel": "Password",
          "admin#signup_register": "Novo registo",
          "admin#signup_successTitle":
            "O seu registo foi efetuado com sucesso!",
          "admin#signup_successHeroText":
            "Verifique a sua caixa de email e confirme o registo, para poder começar a usar o na<b>fila</b>.",
          "admin#signup_helperPassword": "Mínimo 6 caracteres",

          // Admin Login
          "admin#login_title": "Introduza os dados da Loja",
          "admin#login_email": "Email do Lojista",
          "admin#login_password": "Password",
          "admin#login_recover_password": "Recuperar Password",
          "admin#login_failed": "Login falhou",
          "admin#login_wrongPassword":
            "Dados de autenticação incorrectos. Tente novamente.",
          "admin#login_invalidEmail": "Email inválido",
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
            " Siga as instruções para recuperar a sua password.",
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
          "main#addConsumerName_title": "Insira o Nome\ndo Cliente",
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
          "admin#queueManagement_warning_message":
            "Atingiu a lotação máxima definida.",

          // End Queue
          "main#endQueue_title": "Pretende terminar a Fila actual?",
          "main#endQueue_yes": "Sim",
          "main#endQueue_no": "Não",

          //End Queue Success
          "main#endQueueSuccess_title": "Fila terminada.",
          "main#endQueueSuccess_text": "A sua fila foi terminada.",
          "main#endQueueSuccess_second_text": "Até Amanhã!",
          "main#endQueueSuccess_back": "Voltar ao Início",

          // Queue Poster
          "admin#queuePoster_queueCode": "Código da Fila",
          "admin#queuePoster_enterQueueWith":
            "Entre &nbsp <b>nafila</b> &nbsp com...",
          "admin#queuePoster_brandSlogan": "<b>naFila</b>, sem filas.",
          "admin#queuePoster_mark_your_time_in_queue":
            "MARQUE A SUA VEZ NA FILA",
          "admin#send_free_sms_queue":
            "Envie <b>SMS GRÁTIS</b> com <b><span class='larger'> nafila {{queueCode}}</span></b> para o <b>4902</b>",

          // Queue Status
          "admin#queueStatus_securityLabel": "<b>Para sua segurança: </b>",
          "admin#queueStatus_securityText": "Use o sistema de senhas virtuais.",
          "admin#queueStatus_ticketLabel": "<b>Não consegue tirar senha?</b>",
          "admin#queueStatus_ticketText": "Peça ajuda ao colaborador.",
          "admin#queueStatus_naFilaLabel":
            "<span> na<b>fila.</b> Sem filas.</span><span>www.nafila.pt</span>",

          //Create Queue
          "admin#createQueue_title": "Painel de Gestão do Ecrã Público",
          "admin#createQueue_description":
            "Adicione emails das lojas para obter o espaço multiloja com o estado das suas filas.",
          "admin#add_queue_button": "ADICIONAR FILA",
          "admin#add_queue_button_placeholder":
            "Inserir email ou código de lojista",
          "admin#table_column_1_name": "Nome da Loja",
          "admin#table_column_2_name": "Apagar",
          "admin#create_status_screen": "Criar novo ecrã",

          //burger menu
          "burger#your_store": "A sua Loja",
          "burger#poster": "Cartaz da Fila",
          "burger#end_queue": "Terminar Fila",
          "burger#logout": "Sair",
          "burger#how_it_works": "Como funciona?",
          "burger#about_us": "Sobre",
          "burger#login": "Entrar",
          "burger#lojista": "É Lojista?",
          "burger#criar-status": "Ecrã de loja(s)",
          "burger#faqs": "FAQ",

          //faqs page
          "faq#lojista_label": "Lojista",
          "faq#consumidor_label": "Consumidor",
          // faqs lojista
          "faq#lojista_question_1": "Como posso registar a minha loja?",
          "faq#lojista_answer_1": `Para poder registar a sua loja terá de seguir os seguintes passo: <br/>
            <ol>
              <li>Entrar em <a target="_blank" href='https://nafila.pt'>https://nafila.pt</a> </li>
              <li>Carregar em "É lojista?" e de seguida em "Registo de loja" </li>
            </ol>
            Na página de registo de loja terá de inserir a seguinte informação:
            <ul>
              <li>Nome/local da loja</li>
              <li>Email do lojista</li>
              <li>Password</li>
            </ul>
            De seguida, clique em registar e irá receber um email de confirmação da criação da loja. Após a validação do email estará pronto para criar as suas filas virtuais. <br/>
            Para esclarecer este e outros temas pode também consultar o nosso <a target="_blank" href='https://nafila.pt/naFila_Guia_Implementacao.pdf'>guia de implementação.</a>
            `,
          "faq#lojista_question_2": "Como fazer o login na solução?",
          "faq#lojista_answer_2": `Para poder fazer login e dar início à tua fila, tudo o que tem de fazer é entrar em <a target="_blank" href='https://nafila.pt'>https://nafila.pt</a> e utilizar os seus dados: <br/> 
              Entrar em <a target="_blank" href='https://nafila.pt'>https://nafila.pt</a>,
              <ol>
                <li>Carregar em "É lojista?"</li>
                <li>Inserir os seus dados de acesso (email e password)</li>
                <li>Clicar em "Entrar"</li>
              </ol>
              Pronto para dar início a uma nova fila! <br/>
              Para esclarecer este e outros temas pode também consultar o nosso <a target="_blank" href='https://nafila.pt/naFila_Guia_Implementacao.pdf'>guia de implementação.</a>
            `,
          "faq#lojista_question_3": "Como iniciar uma fila?",
          "faq#lojista_answer_3": `Para poder dar início a uma fila deve primeiro entrar em <a target="_blank" href='https://nafila.pt'>https://nafila.pt</a> e utilizar o seu email e password para fazer o login.<br/>
            Após o login deverá seguir os seguintes passos:
            <ul>
              <li>Verificar ou alterar o nome da fila</li>
              <li>Inserir o a lotação máxima para a loja</li>
              <li>Clicar em "COMEÇAR"</li>
            </ul>
            De seguida, receberá no seu email um link para o poster com o código da fila que acabou de criar. Após imprimir, deve colocar o poster de forma visível para que os clientes possam tirar a respetiva senha.<br/>
            E já está. Pronto para começar a atender clientes.
            `,
          "faq#lojista_question_4": "Como inserir pessoas na fila?",
          "faq#lojista_answer_4": `Para inserir clientes na fila de espera deverá clicar em "GERAR SENHA" no menu de gestão de senhas e selecionar uma das seguintes opções: <br/>
            <ul>
              <li>"TELEMÓVEL": ao colocar o número de telemóvel do cliente, o mesmo irá receber uma SMS com a senha</li>
              <li>"NOME": para clientes que não usem telemóvel, poderá colocar o nome do cliente de forma a ser chamado quando chegar a sua vez</li>
            </ul>
            Em ambos os casos, terá acesso à senha criada. Assim que for a vez de chamar o cliente, aparecerá uma notificação a alertá-lo para a chamada pelo respetivo nome. <br/>
            Assim, já está pronto para continuar o processo de atendimento. <br/>
            Para esclarecer este e outros temas pode também consultar o nosso <a target="_blank" href='https://nafila.pt/naFila_Guia_Implementacao.pdf'>guia de implementação.</a>
          `,
          "faq#lojista_question_5": "Como chamar o próximo cliente?",
          "faq#lojista_answer_5": `Para poder chamar o próximo cliente basta clicar em "PRÓXIMO nafila" no menu de gestão de atendimento e já está. Pronto para mais um atendimento. <br/>
            Para esclarecer este e outros temas pode também consultar o nosso <a target="_blank" href='https://nafila.pt/naFila_Guia_Implementacao.pdf'>guia de implementação.</a>
          `,
          "faq#lojista_question_6": "Como terminar/encerrar a fila?",
          "faq#lojista_answer_6": `Para poder encerrar a fila deverá clicar em "TERMINAR nafila" no menu de gestão de atendimento. <br/>
            De forma a garantir que não carregou por engano na opção anterior, será questionado se "Pretende terminar a Fila atual?". Caso tenha a certeza, por favor clique "SIM". <br/>
            <b>NOTA:</b> Após carregar em "SIM" de "TERMINAR nafila" não será possível:
            <ul>
              <li>Existirem novas entradas na fila virtual;</li>
              <li>Atender mais clientes (muito embora possam ter tirado a sua senha).</li>
            </ul>
          `,
          "faq#lojista_question_7": "Como recuperar a password?",
          "faq#lojista_answer_7": `Para poder recuperar a sua password deverá clicar em "recuperar password" no menu de login em <a target="_blank" href='https://nafila.pt'>https://nafila.pt</a> e:
            <ul>
              <li>Inserir o seu email</li>
              <li>Clicar em "RECUPERAR"</li>
              <li>Verificar o email e clicar no link de recuperação de password</li>
            </ul>
            Após redefinir a sua password será direcionado para o menu de login e já está. Pronto para fazer login e começar a chamar clientes. </br>
            Para esclarecer este e outros temas pode também consultar o nosso <a target="_blank" href='https://nafila.pt/naFila_Guia_Implementacao.pdf'>guia de implementação.</a>
          `,
          "faq#lojista_question_8":
            "Qual o horário de afixação das instruções e código de fila?",
          "faq#lojista_answer_8": `No contexto atual, pode existir o caso de os clientes se dirigirem à loja antes da sua abertura de forma a garantirem o lugar. Dado que os colaboradores da loja chegam ao local antes da sua abertura, recomendamos que a impressão e afixação do código da fila do dia seja das primeiras coisas a fazer. </br>
            Caso os clientes cheguem antes da afixação do código da loja, deve-se recomendar que estes façam uma fila:
            <ul>
              <li>entrando na loja os primeiros clientes (de acordo com os limites de entrada em vigor)</li>
              <li>pedindo aos restantes para ordenadamente fazerem o registo naFila</li>
            </ul>
          `,
          "faq#lojista_question_9":
            "Onde afixar as instruções e o código de fila?",
          "faq#lojista_answer_9": `Estas informações devem ser colocadas de forma a que os clientes da loja as consigam visualizar de forma confortável, diminuindo a aglomeração de pessoas no mesmo espaço. Para tal, dependendo da dimensão da loja, pode fazer sentido colocar mais do que um exemplar na montra nos casos em que existam: <br/> 
            <ul>
              <li>frentes amplas e ou</li>
              <li>mais do que uma frente</li>
            </ul>
            Para esclarecer este e outros temas pode também consultar o nosso <a target="_blank" href='https://nafila.pt/naFila_Guia_Implementacao.pdf'>guia de implementação.</a>
          `,
          "faq#lojista_question_10":
            "Posso usar o mesmo email para duas filas?",
          "faq#lojista_answer_10": `Para registar uma loja será necessário a utilização de um único email e como tal não é possível usar o mesmo email para duas ou mais filas de espera simultâneas. </br>
            Para esclarecer este e outros temas pode também consultar o nosso <a target="_blank" href='https://nafila.pt/naFila_Guia_Implementacao.pdf'>guia de implementação.</a>
          `,
          "faq#lojista_question_11":
            "Como posso criar um ecrã com o status da fila ?",
          "faq#lojista_answer_11": `Ainda que os seus clientes possam facilmente consultar o estado da fila em <a target="_blank" href='https://nafila.pt'>https://nafila.pt</a>, é possível a sua loja dispor o número da última senha chamada num Tablet ou Smart TV. Para isso basta aceder a <a target="_blank" href='http://www.nafila.pt/create-queue'>http://www.nafila.pt/create-queue</a>, introduzir o email da sua conta, clicar em "Adicionar Fila" e de seguida em "Criar Novo Ecrã". </br>
            Irá ser gerado um URL único que pode utilizar em qualquer navegador de Internet. </br>
            Para esclarecer este e outros temas pode também consultar o nosso <a target="_blank" href='https://nafila.pt/naFila_Guia_Implementacao.pdf'>guia de implementação.</a>
          `,
          "faq#lojista_question_12": "Como devo utilizar o contador ?",
          "faq#lojista_answer_12": `Quando criar uma fila pode, opcionalmente, definir qual é numero máximo de pessoas que pode por lei ter dentro da sua loja. Quando estiver a chamar alguém, e à medida que os clientes entrarem e sair na loja, poderá carregar em “+” ou “-” de acordo com o número de pessoas que entrem ou saiam para garantir que controla o número total de clientes. </br>
            Para esclarecer este e outros temas pode também consultar o nosso <a target="_blank" href='https://nafila.pt/naFila_Guia_Implementacao.pdf'>guia de implementação.</a>
          `,
          "faq#lojista_question_13": "Pretendo usar o nafila, e agora ?",
          "faq#lojista_answer_13": `Para dar início à utilização da solução, deve seguir o documento do link abaixo que indica os principais passos a seguir para poder criar filas virtuais: </br>
            <a target="_blank" href='https://nafila.pt/naFila_Guia_Implementacao.pdf'>Guia de Implementação.</a>
          `,
          "faq#lojista_question_14":
            "Estou a tentar fazer o registo e no final recebo sempre a mensagem 'Registo de Conta Falhou'",
          "faq#lojista_answer_14": `Quando existe o registo de uma nova loja no naFila, o utilizador recebe um email com pedido de confirmação do novo registo. Esse e-mail contém um link que deverá ser carregado para assim ativar a conta. <br/>
            Deverá validar que recebeu este email e que carregou no link de confirmação. </br>
            Para esclarecer este e outros temas pode também consultar o nosso <a target="_blank" href='https://nafila.pt/naFila_Guia_Implementacao.pdf'>guia de implementação.</a>
          `,
          // faqs consumidor
          "faq#consumidor_question_1": "Como me registo numa fila ?",
          "faq#consumidor_answer_1": `Para se poder registar na fila de uma loja deve primeiro identificar o código da fila do dia que se encontra afixado na loja.</br>
            De seguida, terá quatro opções: </br></br>
            <b>Aceder a <a target="_blank" href='https://nafila.pt'>https://nafila.pt</a></b></br>
            Ao aceder a nafila.pt, pode registar o código da fila e inserir o seu número de telemóvel. De seguida, irá receber uma SMS com  a sua senha. </br></br>
            <b>Utilizar o QR Code do poster da fila</b></br>
            Ao utilizar o QR Code será encaminhado para o website do naFila já com o registo do código que pretende utilizar. Bastará apenas inserir o seu número de telemóvel e, de seguida, irá receber uma SMS com  a sua senha. </br></br>
            <b>Enviar SMS</b></br>
            Pode enviar uma SMS para o 4902 com o código da fila, recebendo de seguida uma SMS com a sua senha. </br></br>
            <b>Solicitar ajuda ao funcionário da loja </b></br>
            Poderá ainda solicitar o apoio do funcionário da loja para o registar na fila com o seu nome ou número de telemóvel, recebendo de seguida o seu número da senha. Para obter este apoio, deve permanecer num local visível ao funcionário e com as distâncias recomendadas face a outras pessoas. Conforme o seu tipo de inscrição na fila, será chamado através de uma SMS ou pela voz do funcionário. </br>
          `,
          "faq#consumidor_question_2":
            "Registei-me na fila mas não recebi qualquer aviso",
          "faq#consumidor_answer_2": `Podem existir os seguintes motivos para não receber a sua senha virtual: </br></br>
            <b>1. Registo do número errado da fila</b> </br>
            Caso indique o código da fila errado (em <a target="_blank" href='https://nafila.pt'>https://nafila.pt</a> ou por sms) receberá um aviso sobre a inexistência dessa fila. Deve voltar a observar o código da fila e obter de novo a sua senha. </br></br>
            <b>2. Caixa de sms cheia </b></br>
            Pode-se dar o caso de não estar a receber a senha virtual devido à inexistência de espaço na sua caixa de sms. </br></br>
            <b>3. Loja encerrada </b></br>
            Receberá um aviso semelhante ao observado no primeiro ponto.
          `,
          "faq#consumidor_question_3": "Onde devo esperar pela minha vez ?",
          "faq#consumidor_answer_3": ` A obtenção de uma senha virtual permite que possa aguardar pela sua vez num local seguro e/ou diferente da loja. Ainda assim, recomendamos que esse local (exemplo: carro) se situe perto da loja para que possa chegar rapidamente quando se der a sua chamada. </br>
            Nos casos em que a senha obtida não é através de sms, recomendamos que permaneça num local visível ao funcionário e com as distâncias recomendadas face a outras pessoas.
          `,
          "faq#consumidor_question_4":
            "Como serei chamado para a loja aquando da minha vez?",
          "faq#consumidor_answer_4": `A sua chamada à loja dependerá do seu método de inscrição na fila: </br></br>
              <b>Inscrição via <a target="_blank" href='https://nafila.pt'>https://nafila.pt</a></b></br>
            Receberá um email com o aviso de que chegou a sua vez. </br></br>
              <b>Inscrição via número de telemóvel</b></br>
            Receberá um email com o aviso de que chegou a sua vez. </br></br>
              <b>Inscrição por parte do funcionário da loja</b></br>
            Caso o funcionário o tenha inscrito pelo seu nome, deverá permanecer à espera da sua vez em local próximo da loja para que consiga ouvir a sua chamada. Caso a sua inscrição tenha sido realizada através do número de telemóvel, observar-se-á o mesmo que o ponto anterior. </br>
          `,
          "faq#consumidor_question_5":
            "A loja irá fechar e ainda tenho a minha senha ... e agora ?",
          "faq#consumidor_answer_5": `Ao retirar uma senha virtual deve observar o horário de funcionamento da loja. Dependendo do tamanho da fila, podem-se dar 2 casos:
            <ol>
              <li>A sua chamada apenas ser apenas possível em horário após o encerramento da loja.</li>
              <li>A fila ser encerrada pela loja.</li>
            </ol>
            Em ambos os casos, poderá não ser atendido e ter de voltar à loja noutro dia. </br>
          `,
          "faq#consumidor_question_6": "Como faço para sair da fila ?",
          "faq#consumidor_answer_6": `A saída de uma fila dependerá do seu método de inscrição: </br></br>
            <b>Inscrição via número de telemóvel</b></br>
            Enviar uma sms para o 4902 com o "Código da Fila" + "sair" </br></br>
            <b>Inscrição, com o nome, por parte do funcionário da loja</b></br>
            Avisar o funcionário da sua intenção de saída.
          `
        }
      }
    },
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
