import { FC } from 'react';

export interface IAppProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	classContainer: string;
	textAreaRef: React.RefObject<HTMLTextAreaElement>;
}

const TextArea: FC<IAppProps> = (props) => {
	const { classContainer, textAreaRef, ...rest } = props;
	return (
		<div className={classContainer}>
			<label htmlFor="content">Card content</label>
			<textarea {...rest} ref={textAreaRef}></textarea>
		</div>
	);
};
export default TextArea;
