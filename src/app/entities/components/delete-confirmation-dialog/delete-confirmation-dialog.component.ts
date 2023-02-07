import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss']
})

export class DeleteConfirmationDialogComponent {
  @Input()
  public text: string = '';

  @Output()
  public close: EventEmitter<null> = new EventEmitter<null>();

  @Output()
  public delete: EventEmitter<null> = new EventEmitter<null>();

  /**
   * Удаление героя
   */
  public deleteHero = () => {
    this.delete.emit();
    this.close.emit();
  }

  /**
   * Закрыть окно подтверждения удаления
   */
  public closeDialog = () => {
    this.close.emit();
  }
}

