import * as React from 'react'

type DialogueBoxProps = {
    questionaryText: string;
}

export const DialogueBox = ({ questionaryText }: DialogueBoxProps) => {
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    let index = 0;

    const typeText = () => {
      setText(questionaryText.slice(0, index));
      index += 1;

      if (index > questionaryText.length) {
        clearTimeout(timeoutId);
        return;
      }

      timeoutId = setTimeout(typeText, 30);
    };

    typeText();
  }, [questionaryText]); // Agrega questionaryText como una dependencia del useEffect

  return (
    <div>
      <p>{text}</p>
    </div>
  );
};
