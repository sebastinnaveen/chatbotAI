import { Component,NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { ChatService } from './ChatService';

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
  constructor (private oService: ChatService) {}
 getResponse()
{
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
