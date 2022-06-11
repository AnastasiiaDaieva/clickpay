import s from "./FormText.module.scss";

function FormText({
  headingFirstPart,
  headingSecondPart,
  coloredHeading,
  text,
}) {
  return (
    <div>
      {" "}
      <h1 className={s.FormText__heading}>
        {headingFirstPart}{" "}
        <span className={s.FormText__colored}>{coloredHeading}</span>{" "}
        {headingSecondPart}
      </h1>
      <p className={s.FormText__text}>{text}</p>{" "}
    </div>
  );
}

export default FormText;
