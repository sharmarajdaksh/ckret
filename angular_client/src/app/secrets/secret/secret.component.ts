import { Component, OnInit, Input } from '@angular/core';
import { SecretsService } from 'src/app/services/secrets.service';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.scss'],
})
export class SecretComponent implements OnInit {
  @Input() secret: any;
  showPassword = false;
  isEditMode = false;

  constructor(public secretService: SecretsService) {}

  ngOnInit(): void {}

  toggleEditMode(event) {
    event.stopPropagation();
    this.isEditMode = !this.isEditMode;
  }

  deleteSecret(event) {
    event.stopPropagation();
    this.secretService.deleteSecret(this.secret.id);
  }

  updateSecret(event) {
    event.stopPropagation();
    this.secretService.updateSecret(
      this.secret.id,
      this.secret.key,
      this.secret.value
    );
  }

  copySecret(event) {
    event.stopPropagation();
    navigator.clipboard.writeText(this.secret.value).catch((err) => {
      console.log(err);
    });
  }
}