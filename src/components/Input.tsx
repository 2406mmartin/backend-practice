interface Props {
    title?: string;
    name?: string;
    id?: string;
    type?: string;
    minlength?: number;
    placeholder?: string;
    description?: string;
    warning?: string;
    onBlur?: (e: Event) => void;
}

function Input(props: Props) {
    return (
        <div>
            <label class="text-sm font-normal text-white">{props.title}</label>
            <input id={props.id} type={props.type} name={props.name} onBlur={props.onBlur} class={`bg-zinc-900 w-full rounded-md border-0 p-2.5 ring-1 focus:ring-2 focus:ring-zinc-600 ring-inset ${props.warning ? 'ring-red-700' : 'ring-zinc-600'} outline-none focus:outline-none text-white placeholder:text-zinc-700 text-sm mt-2.5 font-robotomono shadow-md transition-all duration-100`} minlength={props.minlength} placeholder={props.placeholder}></input>

            {props.description && (
                <p class="text-xs font-light text-white mt-1.5">{props.description}</p>
            )}
            {props.warning && (
                <p class="text-xs font-light text-red-700 mt-1.5">{props.warning}</p>
            )}
        </div>
    )
}

export default Input;