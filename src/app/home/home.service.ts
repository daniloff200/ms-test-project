

import * as MicrosoftGraph from "@microsoft/microsoft-graph-types"
import * as MicrosoftGraphClient from "@microsoft/microsoft-graph-client"
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs';

import { HttpService } from '../shared/http.service';

@Injectable()
export class HomeService {

  constructor(
    private http: Http,
    private httpService: HttpService) {
  }

  getClient(): MicrosoftGraphClient.Client
  {
    var client = MicrosoftGraphClient.Client.init({
      authProvider: (done) => {
        done(null, this.httpService.getAccessToken());
      }
    });
    return client;
  }

  getMe(): Observable<MicrosoftGraph.User> {
    var client = this.getClient();
    return from(client
      .api('me')
      .select("displayName, mail, userPrincipalName, calendars")
      .get()
      .then ((res => {
        return res;
      } ) )
    );
  }

  sendMail(mail: MicrosoftGraph.Message) {
    var client = this.getClient();
    return from(client
      .api('me/sendmail')
      .post({message: mail})
    );
  }


  getUsers(): Observable<MicrosoftGraph.User>
  {
    var client = this.getClient();
    return from(client
      .api('users')
      .select("displayName,givenName,postalCode")
      .get()
      .then ((res => {
        return res;
      } ) )
    );
  }

}
