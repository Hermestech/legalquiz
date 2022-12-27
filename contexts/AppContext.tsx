import * as React from 'react';
// services
import { getQuestions, getQuestionaries } from '../lib/contentful/get-entries.graphql';
import { PropsWithChildren } from 'react';

interface AppContextType {
    questionaries: QuestionaryType[];
    questions: QuestionType[];
    rightAnswer: boolean;
    questionIndex: number;
    score: number;
    lifes: number;
    setRightAnswer: React.Dispatch<React.SetStateAction<boolean>>;
    setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    setLifes: React.Dispatch<React.SetStateAction<number>>;
    setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>;
    setQuestionaries: React.Dispatch<React.SetStateAction<QuestionaryType[]>>;
}

export const AppContext = React.createContext({} as AppContextType );

export const AppContextProvider: React.FC<PropsWithChildren<AppContextType>>  = ({ children}) => {
    const [questionaries, setQuestionaries] = React.useState<QuestionaryType[]>([]);
    const [questions, setQuestions] = React.useState<QuestionType[]>([]);
    const [rightAnswer, setRightAnswer] = React.useState<boolean>(false);
    const [questionIndex, setQuestionIndex] = React.useState<number>(0);
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
        setQuestions,
        setRightAnswer,
        setQuestionIndex,
        setScore,
        setLifes,
        setQuestionaries,
    }), [questions, rightAnswer, questionIndex, score, lifes, questionaries]);
        
    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
};

export function useAppContext() {
    const context = React.useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppContextProvider');
    }
    return context;
}

export default useAppContext;