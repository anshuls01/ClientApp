import { Injectable } from '@angular/core';
import { icourse } from './course.interface';
import { courseData } from '../mock/course.data';


@Injectable({
  providedIn: 'root',
})
export class CourseService {

  //constructor(@Inject('BASE_URL') private baseUrl: string, private httpclient: HttpClient) {
  //}


  get(): icourse[] {
    return courseData;
  }
  getbyId(id:number): icourse {
    return courseData.find(i => i.CourseId === id);
  }

  createCourse(courseModel: icourse) {
     if (courseModel.CourseId > 0) {
       courseData.map(x =>
                                    x.CourseId === courseModel.CourseId ?
                                  { ...courseData, ...courseModel } : x);
    }
    else {
      const courseId: number = Math.max.apply(Math, courseData.map(function (o) { return o.CourseId; }));
      courseModel.CourseId = courseId + 1;
      courseData.push(courseModel);
    }

  }

}

