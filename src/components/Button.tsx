interface Props {
  id?: string;
  title: string;
  type: string;
}

function Button(props: Props) {
  const { id, type, title } = props;

  return (
    <>
      {type === "lgAccented" && (
        <button
          id={id}
          class="rounded-md p-2.5 hover:bg-blue-900 hover:shadow-md hover:ring-0 bg-none ring-1 ring-inset ring-zinc-700 text-white font-medium text-sm transition-all duration-100"
        >
          {title}
        </button>
      )}
      {type === "lg" && (
        <button
          id={id}
          class="rounded-md p-2.5 bg-zinc-700 text-white font-medium text-sm transition-all duration-100"
        >
          {title}
        </button>
      )}
    </>
  );
};

export default Button;