import { Dispatch, MouseEvent, SetStateAction } from "react";
import QuestionType from "../types/question";
import UserType from "../types/auth";
import { deleteQuestion } from "../lib/apiWrapper";

type QuestionCardProps = {
  question: QuestionType;
  user: UserType | null;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  update: boolean;
};

export default function QuestionCard({
  question,
  user,
  setUpdate,
  update,
}: QuestionCardProps) {
  // const date = new Date(Question.dataCreated as string);

  const handleDeleteClick = async (_: MouseEvent): Promise<void> => {
    const token = localStorage.getItem("token");
    deleteQuestion(question.id!, token!);
      setUpdate(!update)
    };
  };

  return (
    <div className="mt-3">
      <div>
        <div>{question.title}</div>
        <div>{question.body}</div>
        <div>
          By {question.author?.firstName} {question.author?.lastName}
        </div>
        <div>Date Created: {DataTransfer.toString()}</div>
      </div>

      {question.author ===
      `${user?.firstName} ${user?.lastName}_${String(user?.user_id).padStart(
        4,
        "0"
      )}` ? (
        <button onClick={handleDeleteClick}>Delete Question</button>
      ) : null}
    </div>
  );
}