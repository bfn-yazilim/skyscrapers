import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Apartman, Hint } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  Model: Apartman = {} as Apartman;
  SavedModel: Apartman;
  SolvedModel: Apartman;
  Hint: Hint = {} as Hint;
  title = 'Apartman Oyunu';
  isSuccess: boolean = false;
  activeNumber?: string;
  isShowPanel: boolean = false;
  isInfo: boolean = false;
  message: string;

  ngOnInit(): void {
    this.GenerateGame();
  }

  Save() {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    this.SavedModel = JSON.parse(JSON.stringify(this.Model));
    this.message = 'It was recorded in memory.';
    setTimeout(() => {
      this.message = null;
    }, 2000);
  }

  Load() {
    this.Model = JSON.parse(JSON.stringify(this.SavedModel));
    this.message = 'Restored from memory.';
    setTimeout(() => {
      this.message = null;
    }, 2000);
  }

  OpenPanel(prop: string) {
    console.log('OpenPanel', this.activeNumber);
    this.isShowPanel = true;
    // if (this.activeNumber == null) {
    this.activeNumber = prop;
    // }
  }

  ChangeValue(prop: string, value: any) {
    if (value == 0) {
      this.Model[prop] = null;
      this.activeNumber = null;
      this.isShowPanel = false;
      return;
    }
    console.log('ChangeValue', this.activeNumber);
    this.Model[prop] = value;
    this.activeNumber = null;
    this.isShowPanel = false;
    this.IsSolved();
  }

  GiveAHint() {
    if (this.IsSolved()) {
      return;
    }

    let randowColumn = Math.ceil(Math.random() * 4);
    let randowRow = Math.ceil(Math.random() * 4);
    let prop = `r${randowRow}c${randowColumn}`;

    while (this.Model[prop] != null) {
      randowColumn = Math.ceil(Math.random() * 4);
      randowRow = Math.ceil(Math.random() * 4);
      prop = `r${randowRow}c${randowColumn}`;
    }

    this.Model[prop] = this.SolvedModel[prop];

    this.IsSolved();
  }

  IsSolved() {
    if (
      this.Model.r1c1 === this.SolvedModel.r1c1 &&
      this.Model.r1c2 === this.SolvedModel.r1c2 &&
      this.Model.r1c3 === this.SolvedModel.r1c3 &&
      this.Model.r1c4 === this.SolvedModel.r1c4 &&
      this.Model.r2c1 === this.SolvedModel.r2c1 &&
      this.Model.r2c2 === this.SolvedModel.r2c2 &&
      this.Model.r2c3 === this.SolvedModel.r2c3 &&
      this.Model.r2c4 === this.SolvedModel.r2c4 &&
      this.Model.r3c1 === this.SolvedModel.r3c1 &&
      this.Model.r3c2 === this.SolvedModel.r3c2 &&
      this.Model.r3c3 === this.SolvedModel.r3c3 &&
      this.Model.r3c4 === this.SolvedModel.r3c4 &&
      this.Model.r4c1 === this.SolvedModel.r4c1 &&
      this.Model.r4c2 === this.SolvedModel.r4c2 &&
      this.Model.r4c3 === this.SolvedModel.r4c3 &&
      this.Model.r4c4 === this.SolvedModel.r4c4
    ) {
      this.isSuccess = true;
      this.SavedModel = null;
      this.isInfo = false;
      return true;
    }

    return false;
  }

  GenerateHint() {
    this.Hint.Top1 = this.FindBuild(
      this.Model.r1c1,
      this.Model.r2c1,
      this.Model.r3c1,
      this.Model.r4c1
    );
    this.Hint.Top2 = this.FindBuild(
      this.Model.r1c2,
      this.Model.r2c2,
      this.Model.r3c2,
      this.Model.r4c2
    );
    this.Hint.Top3 = this.FindBuild(
      this.Model.r1c3,
      this.Model.r2c3,
      this.Model.r3c3,
      this.Model.r4c3
    );
    this.Hint.Top4 = this.FindBuild(
      this.Model.r1c4,
      this.Model.r2c4,
      this.Model.r3c4,
      this.Model.r4c4
    );

    this.Hint.Left1 = this.FindBuild(
      this.Model.r1c1,
      this.Model.r1c2,
      this.Model.r1c3,
      this.Model.r1c4
    );
    this.Hint.Left2 = this.FindBuild(
      this.Model.r2c1,
      this.Model.r2c2,
      this.Model.r2c3,
      this.Model.r2c4
    );
    this.Hint.Left3 = this.FindBuild(
      this.Model.r3c1,
      this.Model.r3c2,
      this.Model.r3c3,
      this.Model.r3c4
    );
    this.Hint.Left4 = this.FindBuild(
      this.Model.r4c1,
      this.Model.r4c2,
      this.Model.r4c3,
      this.Model.r4c4
    );

    this.Hint.Right1 = this.FindBuild(
      this.Model.r1c4,
      this.Model.r1c3,
      this.Model.r1c2,
      this.Model.r1c1
    );
    this.Hint.Right2 = this.FindBuild(
      this.Model.r2c4,
      this.Model.r2c3,
      this.Model.r2c2,
      this.Model.r2c1
    );
    this.Hint.Right3 = this.FindBuild(
      this.Model.r3c4,
      this.Model.r3c3,
      this.Model.r3c2,
      this.Model.r3c1
    );
    this.Hint.Right4 = this.FindBuild(
      this.Model.r4c4,
      this.Model.r4c3,
      this.Model.r4c2,
      this.Model.r4c1
    );

    this.Hint.Bottom1 = this.FindBuild(
      this.Model.r4c1,
      this.Model.r3c1,
      this.Model.r2c1,
      this.Model.r1c1
    );
    this.Hint.Bottom2 = this.FindBuild(
      this.Model.r4c2,
      this.Model.r3c2,
      this.Model.r2c2,
      this.Model.r1c2
    );
    this.Hint.Bottom3 = this.FindBuild(
      this.Model.r4c3,
      this.Model.r3c3,
      this.Model.r2c3,
      this.Model.r1c3
    );
    this.Hint.Bottom4 = this.FindBuild(
      this.Model.r4c4,
      this.Model.r3c4,
      this.Model.r2c4,
      this.Model.r1c4
    );
  }

  FindBuild(a: number, b: number, c: number, d: number) {
    let result = 1;
    if (b > a) {
      result = 2;
    }

    if (c > b && c > a) {
      result++;
    }

    if (d > c && d > b && d > a) {
      result++;
    }
    return result;
  }

  GenerateFirstNumber() {
    return Math.ceil(Math.random() * 4);
  }

  GenerateNumber(...numbers) {
    let olabilecekSayilar: number[] = [];
    for (let i = 1; i < 5; i++) {
      if (!numbers.includes(i)) {
        olabilecekSayilar.push(i);
      }
    }
    let indexNumber = Math.floor(Math.random() * olabilecekSayilar.length);
    return olabilecekSayilar[indexNumber];
  }

  GenerateGame() {
    this.isSuccess = false;
    this.Model = {} as Apartman;
    this.Model.r1c1 = this.GenerateFirstNumber();
    this.Model.r1c2 = this.GenerateNumber(this.Model.r1c1);
    this.Model.r1c3 = this.GenerateNumber(this.Model.r1c1, this.Model.r1c2);
    this.Model.r1c4 = this.GenerateNumber(
      this.Model.r1c1,
      this.Model.r1c2,
      this.Model.r1c3
    );

    // 2. Satır
    this.Model.r2c1 = this.GenerateNumber(this.Model.r1c1);
    this.Model.r2c2 = this.GenerateNumber(this.Model.r1c2, this.Model.r2c1);
    this.Model.r2c3 = this.GenerateNumber(
      this.Model.r1c3,
      this.Model.r2c1,
      this.Model.r2c2
    );
    this.Model.r2c4 = this.GenerateNumber(
      this.Model.r1c4,
      this.Model.r2c1,
      this.Model.r2c2,
      this.Model.r2c3
    );

    while (
      this.Model.r2c1 == null ||
      this.Model.r2c2 == null ||
      this.Model.r2c3 == null ||
      this.Model.r2c4 == null
    ) {
      this.Model.r2c1 = this.GenerateNumber(this.Model.r1c1);
      this.Model.r2c2 = this.GenerateNumber(this.Model.r1c2, this.Model.r2c1);
      this.Model.r2c3 = this.GenerateNumber(
        this.Model.r1c3,
        this.Model.r2c1,
        this.Model.r2c2
      );
      this.Model.r2c4 = this.GenerateNumber(
        this.Model.r1c4,
        this.Model.r2c1,
        this.Model.r2c2,
        this.Model.r2c3
      );
    }

    // 3. Satır
    this.Model.r3c1 = this.GenerateNumber(this.Model.r1c1, this.Model.r2c1);
    this.Model.r3c2 = this.GenerateNumber(
      this.Model.r1c2,
      this.Model.r2c2,
      this.Model.r3c1
    );
    this.Model.r3c3 = this.GenerateNumber(
      this.Model.r1c3,
      this.Model.r2c3,
      this.Model.r3c1,
      this.Model.r3c2
    );
    this.Model.r3c4 = this.GenerateNumber(
      this.Model.r1c4,
      this.Model.r2c4,
      this.Model.r3c1,
      this.Model.r3c2,
      this.Model.r3c3
    );

    while (
      this.Model.r3c1 == null ||
      this.Model.r3c2 == null ||
      this.Model.r3c3 == null ||
      this.Model.r3c4 == null
    ) {
      this.Model.r3c1 = this.GenerateNumber(this.Model.r1c1, this.Model.r2c1);
      this.Model.r3c2 = this.GenerateNumber(
        this.Model.r1c2,
        this.Model.r2c2,
        this.Model.r3c1
      );
      this.Model.r3c3 = this.GenerateNumber(
        this.Model.r1c3,
        this.Model.r2c3,
        this.Model.r3c1,
        this.Model.r3c2
      );
      this.Model.r3c4 = this.GenerateNumber(
        this.Model.r1c4,
        this.Model.r2c4,
        this.Model.r3c1,
        this.Model.r3c2,
        this.Model.r3c3
      );
    }

    // 4. Satır
    this.Model.r4c1 = this.GenerateNumber(
      this.Model.r1c1,
      this.Model.r2c1,
      this.Model.r3c1
    );
    this.Model.r4c2 = this.GenerateNumber(
      this.Model.r1c2,
      this.Model.r2c2,
      this.Model.r3c2,
      this.Model.r4c1
    );
    this.Model.r4c3 = this.GenerateNumber(
      this.Model.r1c3,
      this.Model.r2c3,
      this.Model.r3c3,
      this.Model.r4c1,
      this.Model.r4c2
    );
    this.Model.r4c4 = this.GenerateNumber(
      this.Model.r1c4,
      this.Model.r2c4,
      this.Model.r3c4,
      this.Model.r4c1,
      this.Model.r4c2,
      this.Model.r4c3
    );

    while (
      this.Model.r4c1 == null ||
      this.Model.r4c2 == null ||
      this.Model.r4c3 == null ||
      this.Model.r4c4 == null
    ) {
      // 4. Satır
      this.Model.r4c1 = this.GenerateNumber(
        this.Model.r1c1,
        this.Model.r2c1,
        this.Model.r3c1
      );
      this.Model.r4c2 = this.GenerateNumber(
        this.Model.r1c2,
        this.Model.r2c2,
        this.Model.r3c2,
        this.Model.r4c1
      );
      this.Model.r4c3 = this.GenerateNumber(
        this.Model.r1c3,
        this.Model.r2c3,
        this.Model.r3c3,
        this.Model.r4c1,
        this.Model.r4c2
      );
      this.Model.r4c4 = this.GenerateNumber(
        this.Model.r1c4,
        this.Model.r2c4,
        this.Model.r3c4,
        this.Model.r4c1,
        this.Model.r4c2,
        this.Model.r4c3
      );
    }

    if (
      this.Model.r1c4 === this.Model.r2c3 ||
      this.Model.r1c4 === this.Model.r3c2 ||
      this.Model.r1c4 === this.Model.r4c1 ||
      this.Model.r2c3 === this.Model.r3c2 ||
      this.Model.r2c3 === this.Model.r4c1 ||
      this.Model.r3c1 === this.Model.r4c1
    ) {
      this.GenerateGame();
      return;
    }

    this.SolvedModel = this.Model;
    this.GenerateHint();
    this.Model = {} as Apartman;
  }

  Close() {
    this.isInfo = false;
  }
}
