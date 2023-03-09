import * as React from 'react';

interface GameplayState { 
    questionIndex: number;
    score: number;
    lifes: number;
    selectedAnswers: SelectedAnswerType[];
}

interface GameplayActions { 
    resetGameplay: () => void;
    incrementQuestionIndex: () => void;
    incrementScore: () => void;
    decrementLifes: () => void;
    addSelectedAnswer: (answer: SelectedAnswerType) => void;
}

export function useGameplay(initialState: GameplayState): [GameplayState, GameplayActions] {
    const [state, setState] = React.useState<GameplayState>(initialState);

    const resetGameplay = React.useCallback(() => { 
        setState(initialState)
    }, [initialState]);

    const incrementQuestionIndex = React.useCallback(() => { 
        setState((prevState) => ({ ...prevState, questionIndex: prevState.questionIndex + 1 }));
    }, []);

    const incrementScore = React.useCallback(() => { 
        setState((prevState) => ({
            ...prevState,
            score: prevState.score + 1
        }));
    }, []);

    const decrementLifes = React.useCallback(() => { 
        setState((prevState) => ({
            ...prevState,
            lifes: prevState.lifes - 1
        }));
    }, []);

    const addSelectedAnswer = React.useCallback((answer: SelectedAnswerType) => { 
        setState((prevState) => ({
            ...prevState,
            selectedAnswers: [...prevState.selectedAnswers, answer]
        }));
    }, []);
    
    return [
        state,
        {
            resetGameplay,
            incrementQuestionIndex,
            incrementScore,
            decrementLifes,
            addSelectedAnswer
        }
    ];
}