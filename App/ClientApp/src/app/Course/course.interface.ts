import {iQualification } from '../shared/Qualification.interface';

export interface icourse

{
  CourseId: number;
  CourseName: string;
  CourseDuration: number;
  CourseDescription: string;
  IsActive: boolean;
  CreatedOn: Date;
  //teacherPrereq: iQualification[];
  //studentPrereq: iQualification[];
}
