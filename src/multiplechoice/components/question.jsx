const Question = (props) => {
  return (
    <div {...props} className="py-2 text-lg font-bold">
      {props.children}
    </div>
  )
}

export default Question;