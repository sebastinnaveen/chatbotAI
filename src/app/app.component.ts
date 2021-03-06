import {Pipe, PipeTransform, Component,NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { ChatService } from './ChatService';
import { ApiAiResult } from './result.interface';
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';



//import {ApiAiClient, ApiAiStreamClient} from "api-ai-javascript";
import {ApiAiClient} from "api-ai-javascript/ApiAiClient"

/*@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizationService) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}*/

@NgModule({
  imports: [CommonModule]/*,
  declarations: [ SafePipe ]*/
})
class ChatInformation {

    public description:string;
    public userInput:string;
    public name:string;
    public action:string;
    public url:string;
	 public fileType:string;
	
  constructor() {}
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./styles.css'],
  providers : [ChatService]

})
export class AppComponent {
public sUrl:string;
public fType:string;
  chatResponseVoice='';
  txtChat:string;
  public Loading = false;
  public LoadingMic = false;
  chatInfo = [ ];
  apiairesult = new ApiAiResult();
  public sanitize;
  //var result1 = {};
   //public urltr:SafeResourceUrl;
  constructor (private oService: ChatService, private sanitizer: DomSanitizer) {
	  this.sanitize = sanitizer;
	   /*result1 = {
		  action: '',
		resolvedQuery: '',
		score: 	0,
		source: '',
		fulfillment: {
			speech: ''
		},
		metadata:{},
		parameters: {
			simplified: ''
		}
	  }*/
	   //this.urltr = sanitizer.bypassSecurityTrustResourceUrl('http://plnkr.co/img/plunker.png');
  }
 getResponse()
{
	console.log('11');
	

const client = new ApiAiClient({accessToken: 'a5edd3dc5fda4aafa9c03886a9babc71','sessionId':'666'});
//const client = new ApiAiClient({accessToken: '51f029f2bf914cb1bd56d5ca8dee3d80', streamClientClass: ApiAiStreamClient});
//var result1 = { action: '', resolvedQuery: '', speech: '', fulfillment: { speech: '' } }

   if(this.txtChat) {

    

     this.Loading = true;
     //Calling restful service

     console.log('before service');

    let oChatInformation = new ChatInformation();
    console.log(this.txtChat);
	 oChatInformation.userInput = this.txtChat;
client
.textRequest(this.txtChat)
    .then((response) => {
	//var jsonRes = JSON.parse(response.to);
	//console.log('test',result1);
	//console.log('resp=', JSON.stringify(response.result)); 
	var jsonStr = JSON.stringify(response.result);
	var jsonObj = JSON.parse(jsonStr);
	console.log('new=',jsonStr);
	
	//oChatInformation.name = "Fios Offers";
     //oChatInformation.url= "http://www.verizon.com/";
     oChatInformation.description = jsonObj.fulfillment.speech;
	  oChatInformation.action="";
	  oChatInformation.url ="";
	  
	 if(jsonObj.fulfillment.data)
	 {
		 oChatInformation.action="final";
		 oChatInformation.name="Please find your details...";
		console.log("data text =",jsonObj.fulfillment.data.text);
		oChatInformation.description = jsonObj.fulfillment.data.text;
		
		if(jsonObj.fulfillment.data.url){
			//oChatInformation.url = this.sanitizer.bypassSecurityTrustResourceUrl(jsonObj.fulfillment.data.url);
			oChatInformation.url = jsonObj.fulfillment.data.url;
			this.getSafeUrl(jsonObj.fulfillment.data.url,jsonObj.fulfillment.data.filetype)
		}
		if(jsonObj.fulfillment.data.filetype){
			
			oChatInformation.fileType = jsonObj.fulfillment.data.filetype;
			this.getFileType(jsonObj.fulfillment.data.filetype);
			
		}
	 }
	 
	 
	//this.apiairesult = response.result.fulfillment;
	//result1 = response.result;
	//console.log('resp=',result1);
	}) 
    .catch((error) => {console.log(error);})

     
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

 getSafeUrl(url,fileType) {
	//var url = 'https://www.youtube.com/embed/4AXOCUCac4U';
	console.log('sanitize URL: ', url);
	if(fileType==="youtube")
	{
		this.sUrl =this.sanitize.bypassSecurityTrustResourceUrl(url);
	}
	}
	getFileType(fileType) {
	//var url = 'https://www.youtube.com/embed/4AXOCUCac4U';
	console.log('file type: ',fileType);
    this.fType = fileType;
	}
getResponseVoice()
{
  this.LoadingMic =true;

}



}
