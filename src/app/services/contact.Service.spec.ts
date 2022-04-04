import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IContact } from '../models/IContact';
import { IGroup } from '../models/IGroup';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private serverUrl: string = `http://localhost:9000`;
  constructor(private HttpClient: HttpClient) {}

  // GET all Contacts
  public getAllContacts(): Observable<IContact[]> {
    let dataUrl: string = `${this.serverUrl}/contacts`;
    return this.HttpClient.get<IContact[]>(dataUrl).pipe(
      catchError(this.handleError)
    );
  }

  // GET Single Contact

  public getContact(contactId: string): Observable<IContact> {
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.HttpClient.get<IContact>(dataUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Create a Contact

  public createContact(contact: IContact): Observable<IContact> {
    let dataUrl: string = `${this.serverUrl}/contacts`;
    return this.HttpClient.post<IContact>(dataUrl, contact).pipe(
      catchError(this.handleError)
    );
  }

  // Update Contact
  public updateContact(
    contact: IContact,
    contactId: string
  ): Observable<IContact> {
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.HttpClient.put<IContact>(dataUrl, contact).pipe(
      catchError(this.handleError)
    );
  }
  // Delete Contact
  public deleteContact(contactId: string): Observable<{}> {
    let dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
    return this.HttpClient.delete<{}>(dataUrl).pipe(
      catchError(this.handleError)
    );
  }

  // GET All Groups
  public getAllGroups(): Observable<IGroup[]> {
    let dataUrl: string = `${this.serverUrl}/groups`;
    return this.HttpClient.get<IGroup[]>(dataUrl).pipe(
      catchError(this.handleError)
    );
  }

  // GET Single Group

  public getGroup(contact: IContact): Observable<IGroup> {
    let dataUrl: string = `${this.serverUrl}/groups/${contact.groupId}`;
    return this.HttpClient.get<IGroup>(dataUrl).pipe(
      catchError(this.handleError)
    );
  }
  // ERROR HANDLING
  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      // client Error
      errorMessage = `Error : ${error.error.message}`;
    } else {
      // server error
      errorMessage = `Status : ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
