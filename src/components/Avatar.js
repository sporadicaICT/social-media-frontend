export const Avatar = (props) => {
    return(
        <span className="rounded-full h-24 w-24 border-[0.5px] border-slate-600">
            <img src={props.src}/>
        </span>
    )
}
