import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { GenericValidator } from '../shared/validators/generic.validator';
import { CourseService } from './course.service';
import { icourse } from './course.interface';

/* rxJs */
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html'
})
export class CourseComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public isCreateOn: boolean = false;
  public isCourseAdded: boolean = false
  public selectedcourse: icourse = null;
  public courseList: icourse[] = [];
  public courseForm: FormGroup;
  public displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  constructor(private courseService: CourseService,
    private fb: FormBuilder) {
    this.validationMessages = {
      name: {
        required: 'Course Name required.',
      },
      description: { required: 'Course description required.', },
      duration: {
        required: 'Course duration required.',
        min: "course duration  required +ve number"
      },

    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngAfterViewInit(): void {
    try {
      // Watch for the blur event from any input element on the form.
      const controlBlurs: Observable<any>[] = this.formInputElements
        .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

      // Merge the blur event observable with the valueChanges observable
      Observable.merge(this.courseForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
        this.displayMessage = this.genericValidator.processMessages(this.courseForm);
      });
    }
    catch (e) {
      console.log('Error: ' + e);
      //this.toastService.error(e.toString(), 'Course-Error', {
      //  timeOut: 3000,
      //});
    }

  }
  ngOnInit(): void {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      duration: [0, [Validators.required, Validators.min(1)]],
      isactive: [false]
    });
    this.getCourseList();
  }

  getCourseList(): void {
    this.courseList = this.courseService.get();
  }

  CreateCourse(): void {
    try {
      this.isCourseAdded = true;
      const courseModel: icourse = {
        CourseId: this.selectedcourse ? this.selectedcourse.CourseId: 0,
        CourseName: this.getCourseName.value,
        CourseDescription: this.getCourseDescription.value,
        CourseDuration: this.getCourseDuration.value,
        IsActive: this.getisActive.value,
        CreatedOn: new Date(),
      }

      if (courseModel
        && courseModel.CourseName.length > 0
        && courseModel.CourseDescription.length > 0
        && courseModel.CourseDuration > 0
      ) {
        let message: string = this.selectedcourse ? 'Are you sure to edit Course' : 'Are you sure to create Course';
        if (window.confirm(message)) {
          if (!this.selectedcourse)
            this.courseList.push(courseModel);
          else {
            if (this.selectedcourse.CourseId > 0) {
              const index = this.courseList.findIndex((obj => obj.CourseId === this.selectedcourse.CourseId));
              this.courseList[index].CourseName = this.getCourseName.value;
              this.courseList[index].CourseDescription = this.getCourseDescription.value;
              this.courseList[index].CourseDuration = this.getCourseDuration.value;
              this.courseList[index].IsActive = this.getisActive.value;

              //this.courseList = this.courseList.map(x =>
              //  x.CourseId === this.selectedcourse.CourseId ?
              //    { ...this.courseList, ...this.selectedcourse } : x);
              this.selectedcourse = null;
            }
          }
         // this.getCourseList();
          this.isCourseAdded = false;
          this.isCreateOn = false;

         // this.courseService.createCourse(courseModel);

          //this.courseService.createCourse(courseModel).subscribe(result => {
          //  console.log(result);

          //  //this.toastService.success('Course creation is done', 'Course - Creation', {
          //  //  timeOut: 3000,
          //  //});
          //  this.getCourseList();
          //},
          //  error => {
          //    console.error(error);
          //    //this.toastService.error(`course creation fail, ${error.toString()}`, 'course - creation', {
          //    //  timeOut: 3000,
          //    //});

          //  })
        }
      }
      else {
        //this.toastService.warning("Input(s) are missing.", 'Course - Creation', {
        //  timeOut: 3000,
        //});
        this.isCourseAdded = false;
        this.isCreateOn = true;
        console.log("Input(s) are missing.");
      }
    }
    catch (e) {
      console.log(e);
      this.isCourseAdded = false;
      this.isCreateOn = true;

      }
  }

  deleteCourse(courseId: number) {
    this.courseList = this.courseList.filter(item => item.CourseId !== courseId);
  }
  AddCourse() {
    this.isCreateOn = true;
    this.selectedcourse = null;
    this.setCourseName = '';
    this.setCourseDescription = '';
    this.setCourseDuration = 0;
    this.setisActive = false;
  }
  editCourse(courseId: number) {
    if (courseId > 0) {
      //this.selectedcourse = this.courseService.getbyId(courseId);
      this.selectedcourse = this.courseList.find(i => i.CourseId === courseId);
      this.isCreateOn = true;
      this.setCourseName = this.selectedcourse.CourseName;
      this.setCourseDescription = this.selectedcourse.CourseDescription;
      this.setCourseDuration = this.selectedcourse.CourseDuration;
      this.setisActive = this.selectedcourse.IsActive;

    }
  }

  Back() {
    this.selectedcourse = null;
    this.isCreateOn = false;
  }
/*properties */
  set setCourseName(Name: string) {
      try {
        this.getCourseName.setValue(Name);
      }
      catch (e) {
        console.log('Error: ' + e);
        //this.toastService.error(e.toString(), 'Course-Error', {
        //  timeOut: 3000,
        //});
      }
    }
    get getCourseName(): AbstractControl {
      try {
        return this.courseForm.get('name');
      }
      catch (e) {
        console.log('Error: ' + e);
        //this.toastService.error(e.toString(), 'Course-Error', {
        //  timeOut: 3000,
        //});
      }
    }

    set setCourseDescription(Description: string) {
      try {
        this.getCourseDescription.setValue(Description);
      }
      catch (e) {
        console.log('Error: ' + e);
        //this.toastService.error(e.toString(), 'Course-Error', {
        //  timeOut: 3000,
        //});
      }
    }
    get getCourseDescription(): AbstractControl {
      try {
        return this.courseForm.get('description');
      }
      catch (e) {
        console.log('Error: ' + e);
        //this.toastService.error(e.toString(), 'Course-Error', {
        //  timeOut: 3000,
        //});
      }
    }


    set setCourseDuration(Duration: number) {
      try {
        this.getCourseDuration.setValue(Duration);
      }
      catch (e) {
        console.log('Error: ' + e);
        //this.toastService.error(e.toString(), 'Course-Error', {
        //  timeOut: 3000,
        //});
      }
    }
    get getCourseDuration(): AbstractControl {
      try {
        return this.courseForm.get('duration');
      }
      catch (e) {
        console.log('Error: ' + e);
        //this.toastService.error(e.toString(), 'Course-Error', {
        //  timeOut: 3000,
        //});
      }
    }


    set setisActive(isActive: boolean) {
      try {
        this.getisActive.setValue(isActive);
      }
      catch (e) {
        console.log('Error: ' + e);
        //this.toastService.error(e.toString(), 'Course-Error', {
        //  timeOut: 3000,
        //});
      }
    }
    get getisActive(): AbstractControl {
      try {
        return this.courseForm.get('isactive');
      }
      catch (e) {
        console.log('Error: ' + e);
        //this.toastService.error(e.toString(), 'Course-Error', {
        //  timeOut: 3000,
        //});
      }
    }

  }
