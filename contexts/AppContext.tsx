/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';
// services
import { getQuestionaries } from '../lib/contentful/get-entries.graphql';
import { PropsWithChildren } from 'react';

interface AppContextType {
    questionaries: QuestionaryType[];
    questions: QuestionType[];
    rightAnswer: boolean;
    questionIndex: number;
    score: number;
    lifes: number;
    selectedAnswers: SelectedAnswerType[];
    setRightAnswer: React.Dispatch<React.SetStateAction<boolean>>;
    setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    setLifes: React.Dispatch<React.SetStateAction<number>>;
    setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
    setQuestionaries: React.Dispatch<React.SetStateAction<QuestionaryType[]>>;
    setSelectedAnswers: React.Dispatch<React.SetStateAction<SelectedAnswerType[]>>;
}

const AppContextDefaultValues: AppContextType = {
    questionaries: [],
    questions: [],
    rightAnswer: false,
    questionIndex: 0,
    score: 0,
    lifes: 0,
    selectedAnswers: [],
    setRightAnswer: () => { },
    setQuestionIndex: () => { },
    setScore: () => { },
    setLifes: () => { },
    setQuestions: () => { },
    setQuestionaries: () => { },
    setSelectedAnswers: () => { }
}

export const AppContext = React.createContext<AppContextType>(AppContextDefaultValues);

export const AppContextProvider: React.FC<PropsWithChildren<Partial<AppContextType>>>  = ({ children}) => {
    const [questionaries, setQuestionaries] = React.useState<QuestionaryType[]>([]);
    const [questions, setQuestions] = React.useState<QuestionType[]>([]);
    const [rightAnswer, setRightAnswer] = React.useState<boolean>(false);
    const [questionIndex, setQuestionIndex] = React.useState<number>(0);
    const [selectedAnswers, setSelectedAnswers] = React.useState<SelectedAnswerType[]>([]);
    const [score, setScore] = React.useState<number>(0);
    const [lifes, setLifes] = React.useState<number>(3);

    React.useEffect(() => {
        const fetchQuestionaries = async () => {
            const response = await getQuestionaries();
            setQuestionaries(response.questionaries);
        }
        fetchQuestionaries();

    }
    , []);

    const values = React.useMemo(() => ({
        questions,
        rightAnswer,
        questionIndex,
        score,
        lifes,
        questionaries,
        selectedAnswers,
        setQuestions,
        setRightAnswer,
        setQuestionIndex,
        setScore,
        setLifes,
        setQuestionaries,
        setSelectedAnswers
    }), [questions, rightAnswer, questionIndex, score, lifes, questionaries, selectedAnswers]);
        
    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
};

export function useAppContext() {
    return React.useContext(AppContext);
}

export default useAppContext;