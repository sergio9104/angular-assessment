import { Component, Input } from '@angular/core';
import { FormGroup} from '@angular/forms';

@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.css']
  
})
export class JobTitleComponent{
  @Input() group: FormGroup;
  jobTitles: Array<string>
  constructor() {
    this.jobTitles = ["Manager", "Host", "Tuttofare", "Waitress", "Dinnig room manage"];
   }

  jobTitlesValue(area){
    if(area === "Services"){  
      this.jobTitles = ["Manager", "Host", "Tuttofare", "Waitress", "Dinnig room manage"];
      this.group.get('jobTitle').setValue(null);
    }else if (area === "Kitchen"){  
      this.jobTitles = ["Chef", "Sous Chef", "Dishwasher", "Cook"];
      this.group.get('jobTitle').setValue(null);
    }else{
      this.jobTitles = [];
    }
  }

}
