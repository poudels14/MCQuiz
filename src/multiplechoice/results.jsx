import React, { useContext } from 'react';
import Context from './context';

const MdxQuestion = (props) => {
  return (
    <div {...props} className="py-2 font-semibold text-gray-700">
      {props.children}
    </div>
  )
}

const ShowCorrectAnswer = (props) => {
  return (
    <div {...props} className="text-xs">
      <b>Correct answer: </b>{props.children[0]}
    </div>
  );
}

const components = {
  h1: MdxQuestion,
  ol: ShowCorrectAnswer,
  li: (props) => <span {...props}>{props.children}</span>,
}

const Result = (props) => {
  const context = useContext(Context);
  const { selectedOptions, questions } = context;
  const wronglyAnswered = questions.filter((q, i) => selectedOptions[i] !== 0);
  return (
    <div>
      <div>
        <div className="text-2xl">
          Results
        </div>
        <div>
          Score: {selectedOptions.filter(index => index === 0).length} / {selectedOptions.length}
        </div>
      </div>
      {wronglyAnswered.length > 0 &&
        <div>
          <div className="py-2 font-bold text-xl">
            You didn't answer the following questions correctly
          </div>
          <div>
            {wronglyAnswered.map((Question, i) => {
              return (
                <div className="flex space-x-2">
                  <div className="py-3 text-sm">
                    {i + 1}.
                  </div>
                  <Question key={i} components={components} />
                </div>
              )}
            )}
          </div>
        </div>
      }
      {wronglyAnswered.length == 0 &&
        <div className="py-2 font-bold text-xl">
          Congrats, you answers all the questions correctly!
        </div>
      }
    </div>
  )
}

export default Result;