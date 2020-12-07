import React, { Suspense, useMemo, useState } from 'react';
import Quiz from './quiz';
import Results from './results';
import questions from './questions';
import Context from './context';

const randomize = (arr) => arr.sort(() => Math.random() - 0.5);


export default (props) => {
  const randomizedQuestions = useMemo(() => {
    console.log("randomizing questions");
    return randomize(questions)
  }, [props]);
  const [selectedOptions, setSelectedOptions] = useState(new Array(randomizedQuestions.length));
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const context = {
    questions: randomizedQuestions,
    currentQuestion,
    selectedOptions,
    setAnswer: (questionIndex, selectedOption) => {
      selectedOptions[questionIndex] = selectedOption;
      setSelectedOptions(selectedOptions);
    },
    gotoNextQuestion: () => setCurrentQuestion(currentQuestion + 1),

  };

  const showResult = currentQuestion === randomizedQuestions.length;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="py-5 px-5">
        <Context.Provider value={context}>
          { showResult && <Results /> }
          { !showResult && <Quiz /> }
        </Context.Provider>
      </div>
    </Suspense>
  )
}
