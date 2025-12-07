import type { ReactNode } from "react";

export type userType = {
    id: string;
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
      id: string,
        name: string
}
export type GetResponse = {
    success: boolean;
    message?: string;
    data?: NameResponse
}
export type UpdateResponse = {
    success: boolean;
    message?: string;
}
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
  data?: {
    TeacherStudent: TeacherStudentType;
    student: RegistrationFormType;
  }[];
}
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

