interface Props {
    size: string;
    visible?: boolean;
}

function Break(props: Props) {
    props.visible ?? false
    
    return (
        <>
            {props.size === "xl" && props.visible && (
                <hr class="my-16 border-zinc-700 border-1" />
            )}
            {props.size === "xl" && !props.visible && (
                <hr class="my-16 border-none" />
            )}
            {props.size === "lg" && props.visible && (
                <hr class="my-8 border-zinc-700 border-1" />
            )}
            {props.size === "lg" && !props.visible && (
                <hr class="my-8 border-none" />
            )}
            {props.size === "md" && props.visible && (
                <hr class="my-4 border-zinc-700 border-1" />
            )}
            {props.size === "md" && !props.visible && (
                <hr class="my-4 border-none" />
            )}
            {props.size === "sm" && props.visible && (
                <hr class="my-2 border-zinc-700 border-1" />
            )}
            {props.size === "sm" && !props.visible && (
                <hr class="my-2 border-none" />
            )}
        </>
    )
}

export default Break;