import React, { useMemo, useContext } from 'react';
import classnames from 'classnames';
import Context from './context';
import MdxQuestion from './components/question';

const randomize = (arr) => arr.sort(() => Math.random() - 0.5);

const MdxAnswerChoices = (props) => {
  const context = useContext(Context);
  const choices = useMemo(() => {
    const allChoices = props.children.map((child, i) => {
      return {
        index: i,
        content: child,
      }
    });
    
    const wrongChoices = randomize(allChoices.slice(1)).slice(0, 3);
    return randomize([...wrongChoices, allChoices[0]]);
  }, [props.children]);

  const setSelectedChoice = (index) => context.setAnswer(context.currentQuestion, index);
  const selectedChoice = context.selectedOptions[context.currentQuestion];

  return (
    <ol {...props} className="space-y-3">
      {choices.map((child, i) => {
        return (
          <label
            key={i}
            className={classnames(
              'flex p-3 space-x-2 cursor-pointer rounded border-2 border-transparent',
              {
                'border-green-700 bg-green-200': selectedChoice === 0 && child.index === selectedChoice,
                'border-red-700 bg-red-200': child.index === selectedChoice && selectedChoice !== 0,
                'hover:bg-gray-200': child.index !== selectedChoice,
              }
            )}
            onClick={() => setSelectedChoice(child.index)}>
            <div>
              <input type='radio' name='answer' />
            </div>
            <div className="">
              {child.content}
            </div>
          </label>
        )
      })}
    </ol>
  )
}

const MdxChoice = (props) => {
  return (
    <span {...props}>
      {props.children}
    </span>
  )
}
const components = {
  h1: MdxQuestion,
  ol: MdxAnswerChoices,
  li: MdxChoice,
}

const Quiz = () => {
  const context = useContext(Context);
  const { questions, currentQuestion } = context;
  const Question = questions[currentQuestion];
  return (
    <>
      <div className="flex space-x-10">
        <div><b>Question: </b>{currentQuestion + 1} / {questions.length}</div>
      </div>
      <div className="py-5 px-5">
        <Question components={components} />
        <div className="">
          <button
            className="block m-auto px-10 py-2 rounded text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring focus:border-blue-300"
            onClick={context.gotoNextQuestion}
          >
            Next
          </button>
        </div>
      </div>
    </>
  )
}

export default Quiz;