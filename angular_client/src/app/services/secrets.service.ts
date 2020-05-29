import { Injectable } from '@angular/core';
import axios from 'axios';

import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

const apiUrl = `${environment.apiUrl}/secrets`;

@Injectable({
  providedIn: 'root',
})
export class SecretsService {
  secrets = [];

  constructor(private authService: AuthService) {}

  getSecrets() {
    axios
      .get(`${apiUrl}/${this.authService.authUsername}`, {
        headers: {
          Authorization: this.authService.authToken,
        },
      })
      .then((res) => {
        this.secrets = res.data.secrets;
        this.secrets.sort((a, b) => {
          return a.id - b.id;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addSecret(key: string, value: string) {
    axios
      .post(
        `${apiUrl}/${this.authService.authUsername}`,
        { key, value },
        {
          headers: {
            Authorization: this.authService.authToken,
          },
        }
      )
      .then((res) => {
        this.getSecrets();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteSecret(secretId: string) {
    axios
      .delete(`${apiUrl}/${this.authService.authUsername}/${secretId}`, {
        headers: {
          Authorization: this.authService.authToken,
        },
      })
      .then((res) => {
        this.getSecrets();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateSecret(secretId: string, key: string, value: string) {
    axios
      .put(
        `${apiUrl}/${this.authService.authUsername}/${secretId}`,
        { key, value },
        {
          headers: {
            Authorization: this.authService.authToken,
          },
        }
      )
      .then((res) => {
        this.getSecrets();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getSecretsList(searchText = '') {
    if (searchText === '') {
      return [...this.secrets];
    } else {
      return this.secrets.filter((secret) => {
        return secret.key.toLowerCase().includes(searchText.toLowerCase());
      });
    }
  }
}
