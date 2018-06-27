

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
      .select("displayName, mail, userPrincipalName")
      .get()
      .then ((res => {
        return res;
      } ) )
    );
  }

  getUsers(): Observable<MicrosoftGraph.User> {
    var client = this.getClient();
    return from(client
      .api('users')
      .select("displayName, mail, userPrincipalName")
      .get()
      .then ((res => {
        return res;
      } ) )
    );
  }

  getCalendarEventsForCurrentUser(): Observable<MicrosoftGraph.User> {
    var client = this.getClient();
    return from(client
      .api('me/calendar/events')
      .get()
      .then ((res => {
        return res;
      } ) )
    );
  }

}
