
interface ButtonInterface {
  title: string;
  disabled?: boolean;
}

interface TextInput {
  placeholder: string;
}

interface TextArea {
  placeholder?: string;
  maxlength: number;
  name: string;
  id:string;
}

// To be done: implement disabled states for both of the button types

function Button(button: ButtonInterface) {
  if (button.disabled=true){
    return <button disabled className="p-2 rounded-sm bg-white/0 text-gray-400 border-gray-400 border-1">{button.title}</button>
  }
  else {
  return (
    <button className="p-2 rounded-sm bg-white/0 text-gray-800 border-gray-500 border-1 cursor-pointer hover:bg-gray-500 hover:text-white hover:duration-100">{button.title}</button>
  )}
}

function ButtonPrimary(button: ButtonInterface) {
  return (
    <button className="p-2 rounded-sm bg-amber-500 text-white border-amber-600 border-1 cursor-pointer hover:bg-amber-600 hover:duration-100">{button.title}</button>
  )
}

function InputText(input: TextInput) {
  return (
    <input type="text" className="p-2 rounded-sm border-1 border-gray-400 placeholder:text-gray-400 focus:outline-amber-500" placeholder={input.placeholder}></input>
  )
}

function AreaText(textarea: TextArea) {
  return (
    <textarea name={textarea.name} id={textarea.id} maxLength={textarea.maxlength} placeholder={textarea.placeholder}></textarea>
  )
}

export {Button, ButtonPrimary, InputText, AreaText}