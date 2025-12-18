import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CaseUploadService } from 'src/app/upload/service/case-upload.service'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HistoryService } from 'src/app/shared/service/history.service';

// Updated interface
interface ChatEntry {
  type: 'COMMENT' | 'HISTORY';
  user: string | null;   // comments have user.name, history may not
  date: Date;
  text: string;          // common text field (comment text or operation)
  colorType: string | null; // only comments have colorType
}

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {

  name!: string;
  comment!: string;
  comments: ChatEntry[] = [];   // use unified interface
  colorType: string = "";
  dataFromParent: any;

  commentDetailsForm = new FormGroup({
    noteComments: new FormControl('', [Validators.required]),
    colorType: new FormControl('', [Validators.required]),
  })

  constructor(
    private caseUpoadService: CaseUploadService,
    public dialogRef: MatDialogRef<ChatboxComponent>,
    private snackBar: MatSnackBar,
    private historyService: HistoryService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dataFromParent = data;
  }

  ngOnInit(): void {
    console.log("caseId", this.dataFromParent.case_id);

    // Fetch comments
    this.caseUpoadService.findAllComments(this.dataFromParent.case_id).subscribe(
      (comments: any[]) => {
        const formattedComments: ChatEntry[] = comments.map(c => ({
          type: 'COMMENT',
          user: c.user?.name || null,
          date: new Date(c.date),
          text: c.comment,
          colorType: c.colorType
        }));

        // Fetch history
        this.historyService.getCaseHistoryWithoutComponent(this.dataFromParent.case_id).subscribe(
          (history: any[]) => {
            const formattedHistory: ChatEntry[] = history.map(h => ({
              type: 'HISTORY',
              user: null,
              date: new Date(h.date),
              text: h.operation,
              colorType: null
            }));

            // merge and sort (latest first)
            this.comments = [...formattedComments, ...formattedHistory].sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );

            console.log("merged data", this.comments);
          }
        );
      }
    );
  }

  @ViewChild('commentBox') commentBox!: ElementRef;

  cancelButtonClicked() {
    this.dialogRef.close();
  }

  showMessage(msg: string) {
    this.snackBar.open(msg, 'Info', { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
  }

  showError(msg: string) {
    this.snackBar.open(msg, 'Error', { duration: 4000, horizontalPosition: 'end', verticalPosition: 'top' });
  }

  statusSelectionChanged(event: { value: string }) {
    this.colorType = event.value;
    console.log("color type: ", event.value);
  }

  addComment() {
    this.caseUpoadService.addcomment(this.dataFromParent.case_id, this.comment, this.colorType).subscribe(
      response => {
        this.showMessage("Note Added");
        this.dialogRef.close();
      },
      error => {
        console.log(error);
        this.showError(error.error.message);
      }
    );
  }
}

