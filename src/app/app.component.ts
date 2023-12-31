import { Component, OnInit } from '@angular/core';
import { AuthService } from './pages/auth/core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ingresoEgresoApp';
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe();
  }
}
