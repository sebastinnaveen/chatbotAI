import { Component,NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { ChatService } from './ChatService';
import { Result } from './result.interface';


//import {ApiAiClient, ApiAiStreamClient} from "api-ai-javascript";
import {ApiAiClient} from "api-ai-javascript/ApiAiClient"



@NgModule({
  imports: [CommonModule]
})
class ChatInformation {

    public description:string;
    public userInput:string;
    public name:string;
    public action:string;
    public url:string;
  constructor() {}
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./styles.css'],
  providers : [ChatService]

})
export class AppComponent {

  chatResponseVoice='';
  txtChat:string;
  public Loading = false;
  public LoadingMic = false;
  chatInfo = [ ];
  public result1 : Result;
  constructor (private oService: ChatService) {}
 getResponse()
{
	console.log('11');
	

const client = new ApiAiClient({accessToken: '51f029f2bf914cb1bd56d5ca8dee3d80'});
//const client = new ApiAiClient({accessToken: '51f029f2bf914cb1bd56d5ca8dee3d80', streamClientClass: ApiAiStreamClient});
//var result1 = { action: '', resolvedQuery: '', speech: '', fulfillment: { speech: '' } }


client
.textRequest('Hello!')
    .then((response) => {
	//var jsonRes = JSON.parse(response.to);
//	console.log('test',result1);
	console.log('resp=',response.result);
	//result1 = response.result;
	//console.log('resp=',result1);
	}) 
    .catch((error) => {console.log('33');})

	
	
    let oChatInformation = new ChatInformation();
    console.log(this.txtChat);

   if(this.txtChat) {

     oChatInformation.userInput = this.txtChat;

     this.Loading = true;
     //Calling restful service

     console.log('before service');

     oChatInformation.name = "Fios Offers";
     oChatInformation.url= "http://www.verizon.com/";
     oChatInformation.description = "Fios triple play offers $69.99 /mo"

     

//       this.oService.getChatPeople(this.txtChat).subscribe(result => {
//           console.log('sucess', result);
//           oChatInformation.name = result.name, oChatInformation.phoneNumber = result.offphoneno, oChatInformation.description = "Calling " + oChatInformation.name + " " + oChatInformation.phoneNumber
//           ,oChatInformation.action="Calling";
//         },
//         error => console.log('error', error));


     this.chatInfo.push(oChatInformation);

     this.txtChat = '';
     this.chatResponseVoice = '';
     this.Loading = false;
   }
}

  getLoading()
  {
     console.log('in loading');
    this.Loading =true;

  }
getResponseVoice()
{
  this.LoadingMic =true;

}


}
