const token = 'xxxx';
const sheetId = 'xxx';
const googleWEBAppURL = 'https://script.google.com/macros/s/AKfycbzUwJX7l7K5KbtI7rrtvrYwZLMo_i_ftcPOR_MUUvldiL2aCFx6pS9uDF1xmK4IdkDm/exec';
const chatIdi = '-1001889966760'

function setWebhook(){
  const url = 'https://api.telegram.org/bot'+token+'/setWebhook?url=' + googleWEBAppURL;
  const response =  UrlFetchApp.fetch(url);
  console.log(response.getContentText());
}

function sendMessage(chatIdi,frase){

  const url1 = 'https://api.telegram.org/bot'+token+'/sendMessage?chat_id='+chatIdi+'&text='+encodeURIComponent(frase);
  return  UrlFetchApp.fetch(url1)

}

function data(a){

  const enej = new Date('2023-09-14T03:00:00Z');
  const hoje = new Date();
  const dif = new Object();
    dif.dia = (enej - hoje)/(1000*3600*24);
    dif.hora = Math.trunc((dif.dia - Math.trunc(dif.dia))*24);    
    dif.data = Math.trunc(dif.dia);

  if(a==1){
    const frase = '[ATUALIZAÇÃO - '+ hoje.getDate()+'/'+(hoje.getMonth()+1)+']\n';
    return frase;
  }else if(a==2){
    const frasenej = '\nFaltam ' + dif.data+' dias pro ENEJ';
    return frasenej;
  }  

} 

function lembrete(){
  const mensagem = '[LEMBRETE]\nAo finalizar as vendas do dia, porfavor atualize a planilha :)';
  sendMessage(chatIdi, mensagem);
}

function lerPlanilha(){
  const sheet = SpreadsheetApp.openById(sheetId).getSheets()[2];

  const saldo = sheet.getDataRange().getCell(3,15).getValue();

  const mensagem = data(1) + '\nSaldo atual: '+saldo+' reais.'+ data(2);

  sendMessage(chatIdi, mensagem); 
}
function doPost(e){
  var data = JSON.parse(e.postData.contents);
  JSON.stringify(data);
  var aux = Array.from(data.message.text);
  
   if(aux[0] == '/' && aux[1]=='p' && aux[2]=='i' && aux[3]=='x'){

     sendMessage(chatIdi, '+5561991714519');
   
   }else if(aux[0]=='/' && aux[1]=='p' && aux[2]=='l' && aux[3]=='a' && aux[4]=='n'){

    
     sendMessage(chatIdi, 'https://docs.google.com/spreadsheets/d/1_tAfJJerfyaaXd0r1IynYkfsmmBt6G0uGq6Wo5khwHQ/edit#gid=0');
  
   }

}
