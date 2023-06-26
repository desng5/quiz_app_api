import UserType from "./auth";

type QuestionType = {
  answer: string;
  author: UserType;
  created_on: string;
  id: number;
  question: string;
};

export default QuestionType;