/*
<!-- code by -->
<!-- E-mail: caio.nogueira@fiap.com.br -->
<!-- github: caio-thom -->
<!-- E-mail: gustavo.silveira@fiap.com.br -->
<!-- github: gusta-silveira -->
*/

const form = document.getElementById('form');
const professor= document.getElementById('nome');
const sala = document.getElementById('local');
const problema = document.getElementById('problema');
const obs = document.getElementById('obs');
const btn = document.getElementById('do');

btn.addEventListener('click', function onClick() {
  if(nome.value == '' || problema.value == ''){
    popUpErro();
  }else{
    postTeams();
    postMongo();
  }

});

//PopUp com mensagem de sucesso
 function popUp(){
  alert('A mensagem foi enviada com sucesso');

  // Refresh the page
  location.reload();
}

//PopUp com mensagem de erro
function popUpErro(){
  alert('ERRO: Por gentileza, preencha os campos obrigatórios.');
}

//Realiza o post no TEAMS
 function postTeams(){
    const data = { text: nome.value + " está solicitando ajuda | Local: " + local.value + " | Problema: " + problema.value + " | Obs: " + obs.value};

    fetch("https://fiapcom.webhook.office.com/webhookb2/884f7c1f-22bc-4baa-b06d-aa87e01a6aba@11dbbfe2-89b8-4549-be10-cec364e59551/IncomingWebhook/c5fc39db8d0e430c9a9a8f9b37327fb4/c1f93acb-bcb0-4b8f-ac60-fb9161776450", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Sucesso");
      })
      .catch((error) => {
        console.error("Erro" + error);
      });
 }

 //Realiza o post no MongoDB
 function postMongo(){
  var timestamp = new Date().getTime();
  var dateFormat= new Date(timestamp);
  var dataCerta= ((dateFormat.getDate())+
  "/"+(dateFormat.getMonth()+1)+
  "/"+dateFormat.getFullYear()+
  " "+dateFormat.getHours()+
  ":"+dateFormat.getMinutes()+
  ":"+dateFormat.getSeconds());

  const data = {
    "professor": nome.value,
    "sala": local.value,
    "categoria": problema.value,
    "timestamp": dataCerta
  };

  fetch("https://us-east-1.aws.data.mongodb-api.com/app/chamados-ucgdx/endpoint/insertpaulista", {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Sucesso");
      popUp();
    })
    .catch((error) => {
      console.error("Erro" + error);
    });
 }


