import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { LoaderState } from 'src/app/core/contracts/loaderState';

@Component({
  selector: 'app-carewellloader',
  templateUrl: './carewellloader.component.html',
  styleUrls: ['./carewellloader.component.css']
})
export class CarewellloaderComponent implements OnInit {
  show = false;
  subscription: Subscription;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.show = false;
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
