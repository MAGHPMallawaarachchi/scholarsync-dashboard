type Props = {
    type?: string;
    title: string;
    state: string;
    placeholder: string;
    isTextArea?: boolean;
    setState: (value: string) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField = ({type, title, state, placeholder, isTextArea, setState}:Props) => {
  return (
    <div className="flexStart flex-col w-full gap-4">
        <label className="w-full text-white">
            {title}
        </label>
        {isTextArea ? (
            <textarea
                placeholder={placeholder}
                name={title}
                value={state}
                required
                className="w-full outline-0 bg-gray3 rounded-xl p-4 text-gray1"
                onChange={(e) => setState(e.target.value)}
            />
        ):  <input
                type={type || 'text'}
                name={title}
                value={state}
                placeholder={placeholder}
                onChange={(e) => setState(e.target.value)}
                required
                className="w-full outline-0 bg-gray3 rounded-xl p-4 text-gray1"
            />
        }
    </div>
  )
}

export default FormField