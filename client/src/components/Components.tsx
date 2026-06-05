interface ButtonInterface {
  title: string;
  disabled?: boolean;
}

interface TextInput {
  placeholder: string;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasError?: boolean;
}

interface TextArea {
  placeholder?: string;
  name: string;
  id: string;
}

function Button(button: ButtonInterface) {
  if (button.disabled=true){
    return <button disabled className="p-2 rounded-sm bg-white/0 text-gray-400 border-gray-400 border-1 cursor-default">{button.title}</button>
  }
  else {
  return (
    <button className="p-2 rounded-sm bg-white/0 text-gray-800 border-gray-500 border-1 cursor-pointer duration-100 hover:bg-gray-500 hover:text-white ">{button.title}</button>
  )}
}

function ButtonPrimary(button: ButtonInterface) {
  if (button.disabled===true){
    return <button disabled className="p-2 rounded-sm bg-white/0 text-amber-600 border-amber-600 border-1 cursor-default">{button.title}</button>
  }
  else {
  return (
    <button className="p-2 rounded-sm bg-amber-500 text-white border-amber-600 border-1 duration-100 cursor-pointer hover:bg-amber-600">{button.title}</button>
  )}
}

function InputText(input: TextInput) {
  return (
    <input type="text" className="p-2 rounded-sm border-1 border-gray-400 placeholder:text-gray-400 focus:outline-amber-500" placeholder={input.placeholder}></input>
  )
}

function AreaText(textarea: TextArea) {
  return (
    <textarea name={textarea.name} id={textarea.id} placeholder={textarea.placeholder}></textarea>
  )
}

export {Button, ButtonPrimary, InputText, AreaText}