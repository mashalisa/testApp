import type { ReactNode } from "react";

export type userType = {
  id: string;
  name?: string
  email: string;
  role: "teacher" | "student" | "admin",
  username: string
}
export type AuthContextType = {
  user: userType | null;
  token: string | null,
  loginToken: (token: string, user: userType) => void,
  fetchUser: (token: string) => Promise<void>,
  loading: boolean
  logoutToken: () => void


}
export type AuthLayoutProps = {
  children: ReactNode;
  isLoading?: boolean;
};
export type InputProps = {
  name: string;
  type: string;
  value: string;
  label_name: string;
  placeholder?: string;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export type ChildrenProviderProps = {
  children: ReactNode;
};
export type RegistrationFormType = {
  id?: string,
  username: string;
  password: string;
  name: string;
  email: string;
  address?: string;
  phoneNumber?: string;
  role: "student";
};
export type HeaderProps = {
  teacherName?: string;
};
export type HeaderStudentProps = {
  studentName?: string;
};
export type ProtectedType = {
  children: ReactNode,
  role: "teacher" | "student" | "admin"
}

export type LoginDataType = {
  loginData: {
    'password': string,
    'username': string
  },
  path: string
}
export type UserRole = "teacher" | "student" | "admin";
export type LoginResponse = {
  success: boolean;
  message?: string;
  data?: {
    token: string;
    user: {
      id: string;
      username: string;
      role: UserRole;
      email: string
    }
  }
}

export type RegistrationResponse = {
  success: boolean;
  message?: string;
  data?: {
    user: {
      id: string;
      username: string;
      email: string
      role: UserRole;
    }
  }
}
export type NameResponse = {
  id: string
  name: string
  correctAnswer?: boolean
}
export type GetResponse = {
  success: boolean;
  message?: string;
  data?: NameResponse
}
export type GetAllResponse = {
  success: boolean;
  message?: string;
  data?: NameResponse[]
}
export type UpdateResponse = {
  success: boolean;
  message?: string;
}
export type GradeResponse = {
  success: boolean;
  message?: string;
  id: string;
  name: string;
};
export type AllStudentsResponse = RegistrationFormType[];

export type StudentsResponse = {
  success: boolean;
  message?: string;
  data?: {
    id: string;
    student: RegistrationFormType;
  };
};
export type TeacherStudentType = {
  student_id: string;
  teacher_id: string;
  createdAt: string;
  updatedAt: string;
};
export type StudentUI = {
  id: string;
  name: string;
  username: string;
  email: string;
};
export type AssignStudentsResponse = {
  success: boolean;
  message?: string;
  data?: {
    id: string;
    TeacherStudent: TeacherStudentType;
    student: RegistrationFormType;
  }
}

export type TeacherStudentsResponse = {
  success: boolean;
  message?: string;
  data?: (RegistrationFormType & {
    TeacherStudent: TeacherStudentType;
  })[];
}

// export type TeacherStudentsResponse = {
//   success: boolean;
//   message?: string;
//   data?: (RegistrationFormType & {
//     TeacherStudent: TeacherStudentType;
//     student: RegistrationFormType
//   })[];
// }
export type TeacherType = {
  username: string;
  password: string;
  name: string;
  email: string;
  address?: string;
  phoneNumber?: string;
  role: "teacher";
};
export type TeacherInfoResponse = {
  success: boolean;
  message?: string;
  data?: {
    coreSubjects: NameResponse[];
    grades: NameResponse[];
    subjects: NameResponse[],
    user: TeacherType

  }
}
export type TeacherData = {
  grades: NameResponse[];
  coreSubjects: NameResponse[];
  subjects: NameResponse[];
};
export type SelectProps = {
  options: NameResponse[];
  value: string;
  name: string;
  className?: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;

};
export type InputType = {
  testData: string,
  handleUserInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
  subTitleName: string,
  stepError?: string

};
export type CheckboxType = {
  checked: boolean,
  setChecked: (e: React.ChangeEvent<HTMLInputElement>) => void;

};
export type SelectType = {
  testData: NameResponse,
  teacherData: any[],
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  nextStep: () => void;
  prevStep: () => void;
  subTitleName: string,
  name: string,
  stepError?: string

};

export type TestForm = {
  name: string;
  gradeId: NameResponse;
  coreSubjectId: NameResponse;
  subjectId: NameResponse;
};
export type QuestionType = {
  id: string;
  name: string;
  test_id: string;
  Answers: any[];
};
export type TestCreate = {
  name: string;
  grade_id: string;
  coreSubject_id: string;
  subject_id: string;
  Questions?: QuestionType[]
};
export type TestInfoId = {
  id: string
  name: string;
  grade_id: string;
  coreSubject_id: string;
  subject_id: string;
  createdAt?: string
  test_URL?: string
};
export type TestInfo = {
  name?: string;
  grade_name?: string;
  coreSubject_name?: string;
  subject_name?: string;
  createdAt?: string
  test_URL?: string
  teacher_name?: string,
  teacher_email?: string
};
export type QuestionRequest = {
  testId: string,
  name: string
}

export type TestListResponse = {
  success: boolean;
  message?: string;
  data?: {
    tests: NameResponse[];
  }
}

export type TestCreateResponse = {
  success: boolean;
  message?: string;
  data?: {
    grade_id: string;
    id: string,
    name: string,
    subject_id: string,
    teacher_id: string
    coreSubject_id: string,
    test_URL?: string,
    createdAt?: string

  }
}
export type QuestionTypeResponse = {
  success: boolean;
  message?: string;
  data?: {
    id: string,
    name: string,
    test_id: string,
  }
}
export type TestDetailsTypeResponse = {
  success: boolean;
  message?: string;
  id: string,
  name: string,
}
export type teacherResponse = {
  success: boolean;
  message?: string;
  data?: {name: string,
  email: string,
  }
}
export type QuestionByIdTypeResponse = {
  success: boolean;
  message?: string;
  data: {
    id: string,
    name: string,
  }

}
export type AnswerTypeResponse = {
  success: boolean;
  message?: string;
  data?: {
    id: string,
    name: string,
    correctAnswer: boolean,
    question_id: string
  }[]
}

export type answerRequest = {
  id?: string
  name: string,
  correctAnswer: boolean
}

export type Modal = {
  isOpen: boolean,
  onClose: () => void,
  children: ReactNode
}
export type TestItem = {
  id: string
  name: string
  teacher_id: string
  grade_id: string
  coreSubject_id: string
  subject_id: string
}
export type FullTestResponse = {
  success: boolean;
  message?: string;
  data?: {
    token: string;
    id: string;
    user_id: string;
    test_id: string;
    start_time: string;
    end_time: string,
    status: string;
    Test: TestItem
  }
}
export type FullTestListProp = {

  id: string;
  user_id: string;
  test_id: string;
  start_time: string;
  end_time: string,
  status: string;
  Test: {
    id: string;
    name: string;
    teacher_id: string;
    grade_id: string;
    coreSubject_id: string;
    subject_id: string;
  }
}

export type testStaredRequest = {
  success: boolean;
  message?: string;
  data?: {
  id: string;
  user_id: string;
  test_id: string;
  start_time: string;
  end_time: string,
  status: string;
  }
}


export type testQuestionResponse = {
  success: boolean;
  message?: string;
  data?: {
    id: string;
    name: string;
    teacher_id: string;
    grade_id: string;
    coreSubject_id: string;
    subject_id: string;
    Questions: [{
      id: string;
      name: string;
      test_id: string;
      Answers: [{
        id: string;
        name: string;
        correctAnswer: boolean
        question_id: string

      }]
    }]
  }
}

export type testQuestionsProp = {


    id: string;
    name: string;
    test_id: string;
    Answers: {
    id: string
    name: string
    correctAnswer: boolean
    question_id: string
  }[]
 

}
export type QuestionAnswerPayload = {
  question: string
  answer: string[]
}[]

export type AnswerSentResponse = {
 success: boolean;
  message?: string;
  data?: {
    id: string;
    studentTest_id: string;
    chosenAnswer_id: string;
    question_id: string;
}[]
}

export type scoreResponse = {
  success: boolean;
  message?: string;
  data?: {
  student_id: string;
  test_id: string;
  score: string;
  start_time: string;
  totalQuestions: string,
  correctCount: string;
  }
}
export type scoreProp = {
 id?: string,
 name?: string
  student_id: string;
  test_id: string;
  score: string;
  start_time?: string;
  totalQuestions: string,
  correctCount: string;
}
export type ScoreApiItem = {
  id: string
  student_id: string
  test_id: string
  total_questions: string
  correct_answers: string
  score: string
}

export type scoreTestResponse = {
  success: boolean;
  message?: string;
  data?: ScoreApiItem
}
export type scoreTestsResponse = {
  success: boolean;
  message?: string;
  data?: ScoreApiItem[]
}
export type statiscticsProp = {
      studentId: string
      studentName: string
      testId: string
      testName: string
      grade: string
      coreSubject: string
      subject: string
      score: string
      correct: string
      total: string
      durationMs: string
      durationMinutes: string
      status: string
}[]
export type statisticResponse = {
  success: boolean;
  message?: string;
  data?: statiscticsProp
}


