import { icourse } from '../Course/course.interface';
export const courseData: icourse[] = [
  { CourseId: 1, CourseName: "Dotnet", IsActive: true, CreatedOn: new Date(), CourseDuration: 30, CourseDescription:"Dummy data 1" },
  { CourseId: 2, CourseName: "PHP", IsActive: true, CreatedOn: new Date(), CourseDuration: 30, CourseDescription: "Dummy data 2"},
  { CourseId: 3, CourseName: "Java", IsActive: false, CreatedOn: new Date(), CourseDuration: 30, CourseDescription: "Dummy data 3"},
  { CourseId: 4, CourseName: "Ruby", IsActive: false, CreatedOn: new Date(), CourseDuration: 30, CourseDescription: "Dummy data 4"},
  { CourseId: 5, CourseName: "Python", IsActive: true, CreatedOn: new Date(), CourseDuration: 30, CourseDescription: "Dummy data 5" },

]
