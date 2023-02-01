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

      timeoutId = setTimeout(typeText, 100);
    };

    typeText();
  }, []);

  return (
    <div className="dialogue-box">
      <p>{text}</p>
    </div>
  );
};