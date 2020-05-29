import { Component, OnInit } from '@angular/core';
import { SecretsService } from '../services/secrets.service';

@Component({
  selector: 'app-secrets',
  templateUrl: './secrets.component.html',
  styleUrls: ['./secrets.component.scss'],
})
export class SecretsComponent implements OnInit {
  matchedSecrets = [];
  searchText = '';
  addSecretValue = '';
  addSecretKey = '';

  constructor(public secretsService: SecretsService) {}

  ngOnInit(): void {
    this.secretsService.getSecrets();
  }

  addSecret() {
    this.secretsService.addSecret(this.addSecretKey, this.addSecretValue);
    this.addSecretValue = '';
    this.addSecretKey = '';
  }
}
