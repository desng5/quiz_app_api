import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import QuestionCard from "../components/QuestionCard";
import QuestionType from "../types/question";
import UserType from "../types/auth";
import { getAllQuestions, createQuestion } from "../lib/apiWrapper";

type HomeProps = {
  user: UserType | null;
};

export default function Home({ user }: HomeProps) {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  // const [displayForm, setDisplayForm] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllQuestions();
      if (response.data) {
        setQuestions(response.data);
      }
    };
    fetchData();
  }, [update]);

  // const handleFormSubmit = async (e: FormEvent): Promise<void> => {
  //   e.preventDefault();

  //   const token = localStorage.getItem("token");
  //   const response = await createQuestion(newQuestion, token!);
  //   if (response.error) {
  //     console.log(response.error);
  //   } else {
  //     const response = await getAllQuestions();
  //     if (response.data) {
  //       setQuestions(response.data);
  //     }
  //     setUpdate(!update);
  //     setNewQuestion({ title: "", body: "" });
  //     setDisplayForm(false);
  //     console.log(newQuestion.title + " has been created");
  //   }
  // };

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
  //   setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
  // };

  return (
    <>
      <h1>
        Hello {user?.firstName} {user?.lastName}
      </h1>
      {/* {user && (
        <button
          onClick={() => {
            setDisplayForm(!displayForm);
          }}>
          {displayForm ? "Close X" : "Compose +"}
        </button>
      )} */}
      {Array.isArray(questions) &&
        questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            update={update}
            setUpdate={setUpdate}
            user={user}
          />
        ))}
      <button
        onClick={() => {
          setQuestions([]);
        }}>
        Clear All Questions
      </button>
    </>
  );
}