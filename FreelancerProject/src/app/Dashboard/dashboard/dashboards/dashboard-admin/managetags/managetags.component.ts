import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Tag } from 'src/app/Models/tag.model';
import { TagService } from 'src/app/Services/tag.service';

@Component({
  selector: 'app-managetags',
  templateUrl: './managetags.component.html',
  styleUrls: ['./managetags.component.scss']
})
export class ManagetagsComponent implements OnInit {
  success: boolean;
  successInfo: string;
  registerError: string;
  error: boolean;
  tag: Tag;
  tags: Tag[];
  existingTags: Tag[];
  createForm = this.fb.group({
    TagName: [''],
  })
  editForm = this.fb.group({
    TagName: [''],
    Tag: [''],
  })
  deleteForm = this.fb.group({
    Tag: [''],
  })

  constructor(private fb: FormBuilder, private tagservice: TagService) { }

  ngOnInit() {
    this.tags = [];
    this.tagservice.getTags().subscribe(e => {
      this.existingTags = e;
      console.log(this.existingTags);
    })
    this.error = false;
    this.success = false;
    this.successInfo = "";
    this.registerError = "";
  }

  onChange(deviceValue) {
    this.success = false;
    this.editForm.controls["TagName"].setValue(this.existingTags.find(x => x.tagID == deviceValue).tagName);
  }

  onDeleteChange(deviceValue) {
    this.success = false;
  }


  deleteTag() {
    this.tagservice.deleteTag(this.deleteForm.value.Tag).subscribe((res: any) => {
      this.success = true;
      this.successInfo = "Successfully removed!"
      this.tagservice.getTags().subscribe(e => {
        this.existingTags = e;
      })
    },
      e => {
        this.registerError = 'Error deleting tag';
        this.error = true;
      });
  }

  createTag() {
    if (this.createForm.value.TagName != " ") {
      this.tag = new Tag(0, this.createForm.value.TagName);
      if (this.tags.find(x => x.tagName == this.tag.tagName) == null) {
        this.tags.push(this.tag);
        this.error = false;
        this.registerError = "";
      }
      else {
        this.error = true;
        this.registerError = "Tag already added";
      }
    }
  }
  createAllTags() {
    this.tags.forEach(t => {
      this.tagservice.postTag(t).subscribe((res: any) => {
        this.success = true;
        this.successInfo += t.tagName + " created successfully. "
      },
        e => {
          console.log(e);
          if (e.status == 404) {
            this.registerError += t.tagName + ' already exists! ';
          }
          else {
            this.registerError = 'Something went wrong, please try again later.';
          }
          this.error = true;
        });
    });
    this.tags = [];
  };

  reset() {
    this.tags = [];
    this.error = false;
    this.success = false;
    this.successInfo = "";
    this.registerError = "";
  }

  saveTag() {
    this.tag = new Tag(this.editForm.value.Tag, this.editForm.value.TagName);
    this.tagservice.updateTag(this.tag).subscribe((res: any) => {
      this.success = true;
      this.successInfo = "Successfully updated!"
      this.tagservice.getTags().subscribe((res: any) => {
        this.existingTags = res;
      })
    },

      e => {
        this.registerError = 'Something went wrong, please try again later.';
        this.error = true;
      });
  };
}
