import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {ToDo} from '../../interfaces/to-do';
import {ToDoService} from '../../services/to-do.service';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.scss']
})
export class ToDoItemComponent implements OnInit {
  @Input() todo: ToDo;

  constructor(private todoService: ToDoService) {
  }

  ngOnInit() {
  }

}
